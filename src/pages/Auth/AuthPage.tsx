import {
  Box, TextField, Button, Card, Typography, Divider, Tabs, Tab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerEmail, verifyCode, loginEmail } from "../../services/authService";
import { useUser } from "../../utils/UserContext";

export const AuthPage = () => {
  const theme = useTheme();
  const { refreshUser } = useUser();
  const [mode, setMode] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendCode = async () => {
    setError("");
    try {
      if (mode === 0) {
        const data = await loginEmail(email);
        if (data.error) { setError(data.error); return; }
      } else {
        const data = await registerEmail(email, name, surname);
        if (data.error) { setError(data.error); return; }
      }
      setStep(2);
    } catch { setError("Ошибка соединения"); }
  };

  const verify = async () => {
    setError("");
    try {
      const data = await verifyCode(email, code);
      if (data.error) { setError(data.error); return; }
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("surname", data.surname);
      localStorage.removeItem("guest");
      await refreshUser();
      navigate("/");
    } catch { setError("Ошибка соединения"); }
  };

  const guestLogin = () => {
    localStorage.setItem("guest", "true");
    navigate("/");
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: theme.palette.background.fiveth }}>
      <Card sx={{ width: 420, p: 5, borderRadius: 3, display: "flex", flexDirection: "column", gap: 3, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <ShieldOutlinedIcon sx={{ fontSize: 38, color: theme.palette.background.first }} />
          <Typography variant="h5" fontWeight={600}>CryptoNote</Typography>
          <Typography variant="body2" color={theme.palette.background.seventh}>Электронная подпись документов</Typography>
        </Box>

        <Tabs value={mode} onChange={(_, v) => { setMode(v); setStep(1); setError(""); }} centered>
          <Tab label="Войти" />
          <Tab label="Регистрация" />
        </Tabs>

        {error && <Typography color="error.main" fontSize={14} textAlign="center">{error}</Typography>}

        {step === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {mode === 1 && (
              <>
                <TextField label="Имя" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)} />
              </>
            )}
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth
              InputProps={{ startAdornment: <MailOutlineIcon sx={{ mr: 1, color: theme.palette.background.seventh }} /> }}
            />
            <Button variant="contained" onClick={sendCode}
              sx={{ color: theme.palette.background.inversion, background: theme.palette.background.first,
                "&:hover": { color: theme.palette.background.first, background: theme.palette.background.inversion }, textTransform: "none" }}
            >Получить код</Button>
          </Box>
        )}

        {step === 2 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography fontSize={14} color={theme.palette.background.seventh}>Код отправлен на {email}</Typography>
            <TextField label="Код подтверждения" value={code} onChange={(e) => setCode(e.target.value)} fullWidth />
            <Button variant="contained" onClick={verify}
              sx={{ color: theme.palette.background.inversion, background: theme.palette.background.first,
                "&:hover": { color: theme.palette.background.first, background: theme.palette.background.inversion }, textTransform: "none" }}
            >Подтвердить</Button>
          </Box>
        )}

        {step === 1 && <Divider />}

        {step === 1 && (
          <>
            <Button variant="outlined" disabled sx={{ textTransform: "none", borderColor: "#ccc", color: "#999" }}>
              Войти через Госуслуги
            </Button>
            <Button variant="text" onClick={guestLogin} sx={{ textTransform: "none", color: theme.palette.background.seventh }}>
              Войти как гость
            </Button>
          </>
        )}
      </Card>
    </Box>
  );
};