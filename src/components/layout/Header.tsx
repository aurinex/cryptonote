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

  const { user, logout } = useUser();

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
    color: theme.palette.background.first,
    borderBottom: active(path) ? `2px solid ${theme.palette.background.first}` : "2px solid transparent",
    borderRadius: 0,
    pb: "2px",
    fontFamily: "Montserrat",
  });

  const { mode, setMode } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuEl, setUserMenuEl] = useState<null | HTMLElement>(null);

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

  const handleLogout = () => {
    setUserMenuEl(null);
    logout();
    navigate("/auth");
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
      <Box sx={{ display: "flex", gap: "16px", px: "24px" }}>
        <Button sx={{ ...tabStyle("/"), "&:hover": { backgroundColor: "transparent !important" }, color: theme.palette.background.seventh }}
          onClick={() => navigate("/")} disableRipple
        >
          <Typography sx={{ color: theme.palette.background.first }}>Создать</Typography>
        </Button>

        <Button sx={tabStyle("/documents")} onClick={onDocumentsClick} disableRipple>
          <Typography sx={{ color: theme.palette.background.first }}>Документы</Typography>
        </Button>

        <Button sx={tabStyle("/about")} onClick={() => navigate("/about")} disableRipple>
          <Typography sx={{ color: theme.palette.background.first }}>О нас</Typography>
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <IconButton onClick={openMenu} sx={{ color: "text.primary", "&:hover": { backgroundColor: "transparent" } }}>
          {getThemeIcon()}
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem onClick={() => { setMode("light"); closeMenu(); }}>Светлая</MenuItem>
          <MenuItem onClick={() => { setMode("dark"); closeMenu(); }}>Темная</MenuItem>
          <MenuItem onClick={() => { setMode("system"); closeMenu(); }}>Системная</MenuItem>
        </Menu>

        <Box sx={{ display: "flex", alignItems: "center", gap: "12px", px: "12px", cursor: "pointer" }}
          onClick={(e) => setUserMenuEl(e.currentTarget)}
        >
          <Typography fontSize={18} color={theme.palette.background.first}>
            {user?.name} {user?.surname}
          </Typography>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: "50%",
              border: "1px solid #ddd", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 14,
            }}
          >
            {user?.name?.[0] || "Г"}
          </Box>
        </Box>

        <Menu anchorEl={userMenuEl} open={Boolean(userMenuEl)} onClose={() => setUserMenuEl(null)}>
          <MenuItem onClick={handleLogout}>Выйти</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};