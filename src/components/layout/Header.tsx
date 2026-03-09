import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { useUser } from "../../utils/UserContext";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useThemeContext } from "../../utils/ThemeContext";
import { useState } from "react";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LaptopIcon from "@mui/icons-material/Laptop";

import { useTheme } from "@mui/material/styles";

export const Header = ({ onDocumentsClick }: any) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const user = useUser();

  const active = (path: string) => {
    if (path === "/documents") {
      return (
        location.pathname === "/documents" ||
        location.pathname.startsWith("/editor/")
      );
    }
    return location.pathname === path;
  };

  const tabStyle = (path: string) => ({
    fontSize: 20,
    textTransform: "none",
    color: "#000",
    borderBottom: active(path) ? "2px solid #c70000" : "2px solid transparent",
    borderRadius: 0,
    pb: "2px",
    fontFamily: "Montserrat",
  });

  const { mode, setMode } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const getThemeIcon = () => {
    if (mode === "light") return <LightModeIcon />;

    if (mode === "dark") return <DarkModeIcon />;

    return <LaptopIcon />;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 74,
        width: "100%",
        background: theme.palette.background.third,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          px: "24px",
        }}
      >
        <Button
          sx={{
            ...tabStyle("/"),
            "&:hover": {
              backgroundColor: "transparent !important",
            },
            color: theme.palette.background.seventh,
          }}
          onClick={() => navigate("/")}
          disableRipple={true}
        >
          <Typography sx={{ color: theme.palette.background.first }}>
            Создать
          </Typography>
        </Button>

        <Button
          sx={{
            ...tabStyle("/documents"),
            fontSize: 20,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent !important",
            },
            color: theme.palette.background.seventh,
          }}
          onClick={onDocumentsClick}
          disableRipple={true}
        >
          <Typography sx={{ color: theme.palette.background.first }}>
            Документы
          </Typography>
        </Button>

        <Button
          sx={{
            ...tabStyle("/about"),
            "&:hover": {
              backgroundColor: "transparent !important",
            },
            color: theme.palette.background.seventh,
          }}
          onClick={() => navigate("/about")}
          disableRipple
        >
          <Typography sx={{ color: theme.palette.background.first }}>
            О нас
          </Typography>
        </Button>
      </Box>

      <IconButton
        onClick={openMenu}
        sx={{
          color: "text.primary",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {getThemeIcon()}
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            setMode("light");
            closeMenu();
          }}
        >
          Светлая
        </MenuItem>

        <MenuItem
          onClick={() => {
            setMode("dark");
            closeMenu();
          }}
        >
          Темная
        </MenuItem>

        <MenuItem
          onClick={() => {
            setMode("system");
            closeMenu();
          }}
        >
          Системная
        </MenuItem>
      </Menu>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          px: "24px",
          color: theme.palette.background.first,
        }}
      >
        <Typography fontSize={18}>
          {user?.name} {user?.surname}
        </Typography>

        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ИП
        </Box>
      </Box>
    </Box>
  );
};
