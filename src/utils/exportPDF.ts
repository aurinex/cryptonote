import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { hashDocument } from "./hashDocument";
import QRCode from "qrcode";

import { loadPdfFont } from "./pdfFont";

export const exportPDF = async (editor: HTMLElement, signedAt?: string) => {
  const text = editor.innerText;
  const hash = await hashDocument(text);

  const canvas = await html2canvas(editor, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  loadPdfFont(pdf);

  const pageWidth = 210;
  const pageHeight = 297;

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;

    pdf.addPage();

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;
  }

  const pageCount = pdf.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {
    pdf.setPage(page);

    /* ---------- QR CODE ---------- */

    const qrData = `http://localhost:5173/verify/${hash}`;
    const qrImage = await QRCode.toDataURL(qrData);

    /* ---------- SIGNATURE BOX ---------- */

    const boxWidth = 70;
    const boxHeight = 35;
    const boxX = pageWidth - boxWidth - 10;
    const boxY = pageHeight - boxHeight - 10;

    pdf.setDrawColor(0);
    pdf.rect(boxX, boxY, boxWidth, boxHeight);

    /* ---------- TITLE ---------- */

    pdf.setFontSize(9);

    pdf.text("Документ подписан ЭЦП", boxX + 3, boxY + 6);

    /* ---------- HASH ---------- */

    const hashLines = [
      hash.slice(0, 16),
      hash.slice(16, 32),
      hash.slice(32, 48),
      hash.slice(48, 64),
    ];

    pdf.setFontSize(7);

    hashLines.forEach((line, i) => {
      const prefix = i === 0 ? "SHA256: " : "";

      pdf.text(prefix + line, boxX + 3, boxY + 16 + i * 3.5);
    });

    if (signedAt) {
      pdf.text(
        `Подписано: ${new Date(signedAt).toLocaleString("ru-RU")}`,
        boxX + 3,
        boxY + 12,
      );
    }

    /* ---------- QR CODE ---------- */

    pdf.addImage(
      qrImage,
      "PNG",
      boxX + boxWidth - 24,
      boxY + boxHeight - 24,
      20,
      20,
    );
  }

  pdf.save("document_signed.pdf");
};
