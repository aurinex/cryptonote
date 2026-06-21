import {
  Box,
  TextField,
  Button,
  Card,
  Typography,
  Divider,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerEmail, verifyCode } from "../../services/authService";

export const AuthPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const sendCode = async () => {
    await registerEmail(email, name, surname);

    setStep(2);
  };

  const verify = async () => {
    const data = await verifyCode(email, code);

    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("surname", data.surname);

    navigate("/");
  };

  const guestLogin = () => {
    localStorage.setItem("guest", "true");

    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          width: 420,
          p: 5,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ShieldOutlinedIcon
            sx={{
              fontSize: 38,
              color: "#000",
            }}
          />

          <Typography variant="h5" fontWeight={600}>
            CryptoNote
          </Typography>

          <Typography variant="body2" color="#777">
            Электронная подпись документов
          </Typography>
        </Box>

        {step === 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <MailOutlineIcon sx={{ mr: 1, color: "#888" }} />
                ),
              }}
            />

            <Button
              variant="contained"
              onClick={sendCode}
              sx={{
                color: theme.palette.background.inversion,
                background: theme.palette.background.first,
                "&:hover": {
                  color: theme.palette.background.first,
                  background: theme.palette.background.inversion,
                 },
                textTransform: "none",
              }}
            >
              Получить код
            </Button>
          </Box>
        )}

        {step === 2 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Код подтверждения"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              onClick={verify}
              sx={{
                color: theme.palette.background.inversion,
                background: theme.palette.background.first,
                "&:hover": {
                  color: theme.palette.background.first,
                  background: theme.palette.background.inversion,
                 },
                textTransform: "none",
              }}
            >
              Подтвердить
            </Button>
          </Box>
        )}

        <Divider />

        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#ccc",
            color: "#000",
            "&:hover": {
              borderColor: "#999",
              background: "#fafafa",
            },
          }}
          onClick={() =>
            alert("Интеграция с Госуслугами будет добавлена позже")
          }
        >
          Войти через Госуслуги
        </Button>

        <Button
          variant="text"
          sx={{
            textTransform: "none",
            color: "#555",
          }}
          onClick={guestLogin}
        >
          Войти как гость
        </Button>
      </Card>
    </Box>
  );
};
