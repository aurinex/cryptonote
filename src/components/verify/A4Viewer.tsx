import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

export const A4Viewer = ({ content }: any) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 800,
        minHeight: 1130,
        background: theme.palette.background.nineth,
        border: `1px solid ${theme.palette.background.nineth}`,
        p: "40px",
        fontFamily: "Montserrat",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
