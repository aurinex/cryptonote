import { Box, Typography, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const VerifyBanner = ({ valid }: any) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 80,
        background: valid ? "#2e7d32" : "#d32f2f",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
        color: "#fff",
        fontFamily: "Montserrat",
        px: 3,
      }}
    >
      <IconButton onClick={() => navigate("/")} sx={{ color: "#fff" }}>
        <ArrowBackIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {valid ? (
          <CheckCircleIcon sx={{ fontSize: 40, mr: 2 }} />
        ) : (
          <NewReleasesIcon sx={{ fontSize: 40, mr: 2 }} />
        )}
        <Typography fontSize={22} fontWeight={600}>
          {valid
            ? "Подпись действительна"
            : "Документ был изменён после подписи"}
        </Typography>
      </Box>

      <Box sx={{ width: 48 }} />
    </Box>
  );
};
