import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getDocumentByHash } from "../../services/documentService";
import { VerifyBanner } from "../../components/verify/VerifyBanner";
import { A4Viewer } from "../../components/verify/A4Viewer";

import { useTheme } from "@mui/material";

export const VerifyPage = () => {
  const theme = useTheme();
  const { hash } = useParams();

  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    if (!hash) return;
    const load = async () => {
      const document = await getDocumentByHash(hash);
      setDoc(document);
    };

    load();
  }, [hash]);

  if (!doc) {
    return (
      <Box sx={{ textAlign: "center", mt: 20 }}>
        Документ не найден или подпись недействительна
      </Box>
    );
  }

  return (
    <>
      <VerifyBanner valid={doc.status === "signed"} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: "120px",
          pb: "60px",
          background: theme.palette.background.third,
        }}
      >
        <A4Viewer content={doc.content} />
      </Box>
    </>
  );
};
