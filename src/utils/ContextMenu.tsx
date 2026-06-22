// ContextMenu.tsx
import { Menu, MenuItem } from "@mui/material";

interface ContextMenuProps {
  open: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onEdit: () => void;
  onSign: () => void;
  onDelete: () => void;
  onDownload?: () => void;
}

export const ContextMenu = ({
  open,
  position,
  onClose,
  onEdit,
  onSign,
  onDelete,
  onDownload,
}: ContextMenuProps) => {
  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        position.y !== null && position.x !== null
          ? { top: position.y, left: position.x }
          : undefined
      }
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px",
          minWidth: "180px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <MenuItem onClick={onEdit} sx={{ py: 1.5 }}>
        ✏️ Переименовать
      </MenuItem>
      <MenuItem onClick={onSign} sx={{ py: 1.5 }}>
        📝 Подписать
      </MenuItem>
      {onDownload && (
        <MenuItem onClick={onDownload} sx={{ py: 1.5 }}>
          📥 Скачать
        </MenuItem>
      )}
      <MenuItem onClick={onDelete} sx={{ py: 1.5, color: "error.main" }}>
        🗑️ Удалить
      </MenuItem>
    </Menu>
  );
};
