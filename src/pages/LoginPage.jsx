import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const success = await loginUser(e);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 350,
          bgcolor: "rgba(25,25,25,0.95)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: "0 0 15px rgba(0,188,212,0.5)",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            InputLabelProps={{ style: { color: "#00ffcc" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{ style: { color: "#ff9900" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#00bcd4",
              "&:hover": { bgcolor: "#0097a7" },
              boxShadow: "0 0 8px rgba(0,188,212,0.6)",
            }}
          >
            INGRESAR
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
