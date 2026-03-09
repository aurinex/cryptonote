import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  updateDocumentTitle,
  signDocument,
  deleteDocument,
} from "../../services/documentService";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import InfoIcon from "@mui/icons-material/Info";

import { ContextMenu } from "../../utils/ContextMenu";

import { useTheme } from "@mui/material/styles";

export const DocumentCard = ({
  id,
  title,
  author_id,
  status,
  onUpdate,
}: any) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);

  // Состояния для контекстного меню
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const openDocument = () => {
    if (!editing && !contextMenu) navigate(`/editor/${id}`);
  };

  const saveTitle = async () => {
    setEditing(false);
    await updateDocumentTitle(id, value, author_id);
    window.dispatchEvent(new Event("documentsUpdated"));
    if (onUpdate) onUpdate();
  };

  // Обработчик ПКМ
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault(); // Отключаем стандартное контекстное меню
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  // Обработчики действий меню
  const handleEdit = () => {
    handleCloseContextMenu();
    setEditing(true);
  };

  const handleSign = async () => {
    handleCloseContextMenu();
    try {
      await signDocument(id);
      window.dispatchEvent(new Event("documentsUpdated"));
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error signing document:", error);
    }
  };

  const handleDelete = async () => {
    handleCloseContextMenu();
    if (window.confirm("Вы уверены, что хотите удалить документ?")) {
      try {
        await deleteDocument(id);
        window.dispatchEvent(new Event("documentsUpdated"));
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const handleDownload = async () => {
    handleCloseContextMenu();
    // Логика скачивания документа
    console.log("Download document:", id);
  };

  return (
    <>
      <Box
        onClick={openDocument}
        onContextMenu={handleContextMenu}
        sx={{
          width: 194,
          height: 74,
          background: theme.palette.background.second,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {editing ? (
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
              if (e.key === "Escape") {
                setEditing(false);
                setValue(title);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Montserrat",
              width: "100%",
              marginTop: "8px",
              marginBottom: "1px",
              fontWeight: "600",
              maxWidth: "170px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          />
        ) : (
          <Typography
            onDoubleClick={() => setEditing(true)}
            sx={{
              fontSize: 16,
              mt: "6px",
              maxWidth: "170px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              color: theme.palette.background.first,
            }}
          >
            {value}
          </Typography>
        )}

        <Box
          sx={{
            mt: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.background.first,
            width: 184,
            height: 27,
            fontSize: 12,
            borderRadius: "11px",
            gap: "8px",
            background:
              status === "signed"
                ? theme.palette.background.sixth
                : status === "changed"
                  ? theme.palette.background.eighth
                  : "#999",
          }}
        >
          {status === "signed" && <CheckCircleIcon sx={{ fontSize: 20 }} />}
          {status === "changed" && <NewReleasesIcon sx={{ fontSize: 20 }} />}
          {status === "unsigned" && <InfoIcon sx={{ fontSize: 20 }} />}

          {status === "signed" && "Документ подписан"}
          {status === "changed" && "Документ изменён"}
          {status === "unsigned" && "Не подписан"}
        </Box>
      </Box>

      <ContextMenu
        open={contextMenu !== null}
        position={{
          x: contextMenu?.mouseX ?? 0,
          y: contextMenu?.mouseY ?? 0,
        }}
        onClose={handleCloseContextMenu}
        onEdit={handleEdit}
        onSign={handleSign}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
    </>
  );
};
