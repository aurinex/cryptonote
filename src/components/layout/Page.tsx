import { Box, Typography } from "@mui/material";

export const Page = ({ children, number }: any) => {
  return (
    <Box
      sx={{
        width: 800,
        height: 1130,
        background: "#fff",
        border: "1px solid #B5B5B5",
        p: 4,
        position: "relative",
        fontFamily: "Montserrat",
      }}
    >
      {children}

      <Typography
        sx={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
          fontSize: 14,
          color: "#888",
        }}
      >
        {number}
      </Typography>
    </Box>
  );
};
