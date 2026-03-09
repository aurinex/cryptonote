import { jsPDF } from "jspdf";
import font from "../assets/fonts/Montserrat-Regular.ttf";

export const loadPdfFont = (pdf: jsPDF) => {
  pdf.addFileToVFS("Montserrat.ttf", font);
  pdf.addFont("Montserrat.ttf", "Montserrat", "normal");
  pdf.setFont("Montserrat");
};
