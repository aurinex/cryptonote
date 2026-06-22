import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { EditorToolbar } from "./EditorToolbar";
import { useEditor } from "../../utils/EditorContext";
import { HistoryTimeline } from "../layout/HistoryTimeline";

import { exportPDF } from "../../utils/exportPDF";

import { useTheme } from "@mui/material/styles";

export const A4Editor = ({
  onSave,
  onSign,
  saveStatus,
  history,
  signedAt,
}: any) => {
  const theme = useTheme();

  const { editorRef } = useEditor();

  const pageHeight = 1130;
  const pageGap = 40;

  const [pages, setPages] = useState(1);

  const calculatePages = () => {
    if (!editorRef.current) return;

    const height = editorRef.current.scrollHeight;

    const pagesCount = Math.ceil(height / pageHeight);

    setPages(Math.max(1, pagesCount));
  };

  useEffect(() => {
    if (!editorRef.current) return;

    let timeout: any;

    const handler = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        calculatePages();
      }, 100);
    };

    editorRef.current.addEventListener("input", handler);

    calculatePages();

    return () => {
      editorRef.current?.removeEventListener("input", handler);
    };
  }, []);

  const handleExport = () => {
    if (!editorRef.current) return;

    exportPDF(editorRef.current, signedAt);
  };

  return (
    <>
      <EditorToolbar
        onSave={onSave}
        onSign={onSign}
        onExport={handleExport}
        saveStatus={saveStatus}
      />

      <Box
        sx={{
          background: theme.palette.background.paper,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "40px",
        }}
      >
        <Box
          sx={{
            width: 800,
            position: "relative",
            overflow: "clip",
            border: `1px solid ${theme.palette.background.nineth}`,
            boxShadow: theme.palette.mode === "dark" ? "0 2px 8px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* EDITOR */}

          <Box
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            sx={(theme) => ({
              width: 800,
              minHeight: pageHeight,
              padding: "40px",
              outline: "none",
              fontFamily: "Montserrat",

              background: `
      repeating-linear-gradient(
        to bottom,
        ${theme.palette.background.nineth} 0px,
        ${theme.palette.background.nineth} ${pageHeight}px,
        ${theme.palette.background.fiveth} ${pageHeight}px,
        ${theme.palette.background.fiveth} ${pageHeight + pageGap}px
      )
    `,

              boxShadow: theme.palette.mode === "dark" ? "0 0 3px rgba(0,0,0,0.5)" : "0 0 3px rgba(0,0,0,0.15)",
            })}
          />

          {/* PAGE NUMBERS */}

          {Array.from({ length: pages }).map((_, i) => (
            <Typography
              key={i}
              sx={{
                position: "absolute",
                top: pageHeight * (i + 1) - 20,
                transform: "translateY(-100%)",
                width: "100%",
                textAlign: "center",
                fontSize: 14,
                color: theme.palette.background.seventh,
                pointerEvents: "none",
              }}
            >
              {i + 1}
            </Typography>
          ))}
        </Box>
      </Box>

      {history?.length > 0 && (
        <Box
          sx={{
            width: 800,
            margin: "0 auto",
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: 450 }}>
            <HistoryTimeline history={history} />
          </Box>
        </Box>
      )}
    </>
  );
};