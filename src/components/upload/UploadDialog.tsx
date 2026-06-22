import { Dialog, Box, Typography, Button } from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useRef, useState } from "react";
import { uploadDocument } from "../../services/documentService";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../utils/UserContext";

import { useTheme } from "@mui/material";

export const UploadDialog = ({ open, onClose }: any) => {
  const theme = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = async (file: File) => {
    if (!user) return;

    const doc = await uploadDocument(
      file,
      user._id,
      `${user.surname} ${user.name}`,
    );

    window.dispatchEvent(new Event("documentsUpdated"));

    onClose();

    navigate(`/editor/${doc._id}`);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDrag(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    setFile(file);
  };

  const handleSelect = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    setFile(file);
  };

  const upload = () => {
    if (!file) return;
    handleFile(file);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 4, background: theme.palette.background.second }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Загрузить документ
        </Typography>

        {/* DROP ZONE */}

        <Box
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed",
            borderColor: drag ? "#1976d2" : "#ccc",
            borderRadius: "16px",
            height: 180,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            transition: "0.2s",
            background: drag
              ? `${theme.palette.background.second}`
              : `${theme.palette.background.second}`,
            mb: 3,
          }}
        >
          <UploadFileIcon
            sx={{
              fontSize: 48,
              color: drag ? "#1976d2" : "#999",
              mb: 1,
            }}
          />

          <Typography sx={{ fontSize: 14 }}>Перетащите файл сюда</Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#777",
            }}
          >
            или выберите файл ниже
          </Typography>
        </Box>

        {/* FILE NAME */}

        {file && (
          <Typography
            sx={{
              fontSize: 13,
              mb: 2,
              color: theme.palette.background.first,
            }}
          >
            Файл: {file.name}
          </Typography>
        )}

        {/* INPUT */}

        <input
          ref={inputRef}
          type="file"
          accept=".txt,.pdf,.docx"
          style={{ display: "none" }}
          onChange={handleSelect}
        />

        {/* BUTTONS */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={() => inputRef.current?.click()}
            sx={{
              color: theme.palette.background.first,
              border: `1px solid ${theme.palette.background.first}`,
              borderRadius: 16,
              fontWeight: 600,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                border: `1px solid ${theme.palette.background.hovered}`,
                color: theme.palette.background.hovered,
              },
            }}
          >
            Выбрать файл
          </Button>

          <Button
            variant="contained"
            fullWidth
            disabled={!file}
            onClick={upload}
            sx={{
              color: theme.palette.background.inversion,
              backgroundColor: theme.palette.background.first,
              borderRadius: 16,
              fontWeight: 600,
              transition: "all 0.3s ease",
              ":hover": {
                backgroundColor: theme.palette.background.hovered,
                color: theme.palette.background.first,
              },
            }}
          >
            Загрузить
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
