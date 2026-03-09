import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import {
  Description as DocumentIcon,
  Security as SecurityIcon,
  VerifiedUser as VerifiedIcon,
  Download as DownloadIcon,
  Code as CodeIcon,
} from "@mui/icons-material";

import { useTheme } from "@mui/material";

export const AboutPage: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "210mm",
        mx: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 9962px 0 9999px rgba(0, 0, 0, 0.8)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          bgcolor: theme.palette.background.nineth,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          background: "rgba(0,0,0,0.5",
          backdropFilter: "blur(100px)",
        }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom>
          О проекте
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          CryptoNote - это веб-приложение для создания и подписания электронных
          документов с использованием криптографических методов.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" fontWeight={600} gutterBottom>
          Основные возможности:
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <DocumentIcon sx={{ color: "#6366f1" }} />
            </ListItemIcon>
            <ListItemText
              primary="Редактор документов"
              secondary="Создание и форматирование документов в формате A4 с поддержкой различных стилей текста"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SecurityIcon sx={{ color: "#6366f1" }} />
            </ListItemIcon>
            <ListItemText
              primary="Электронная подпись"
              secondary="Формирование и проверка ЭЦП на основе асимметричного шифрования (RSA)"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <VerifiedIcon sx={{ color: "#6366f1" }} />
            </ListItemIcon>
            <ListItemText
              primary="Проверка целостности"
              secondary="Автоматическое определение изменений в подписанных документах"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <DownloadIcon sx={{ color: "#6366f1" }} />
            </ListItemIcon>
            <ListItemText
              primary="Экспорт в PDF"
              secondary="Сохранение документов с визуальным отображением подписи"
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Chip icon={<CodeIcon />} label="React" variant="outlined" />
          <Chip icon={<CodeIcon />} label="TypeScript" variant="outlined" />
          <Chip icon={<CodeIcon />} label="Material-UI" variant="outlined" />
          <Chip icon={<CodeIcon />} label="FastAPI" variant="outlined" />
          <Chip icon={<CodeIcon />} label="MongoDB" variant="outlined" />
          <Chip icon={<CodeIcon />} label="Docker" variant="outlined" />
        </Box>

        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 3 }}
          color="text.secondary"
        >
          Версия: 1.0.0
        </Typography>
      </Paper>
    </Box>
  );
};
