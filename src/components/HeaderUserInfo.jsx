import React from "react";
import { Typography, Button, Chip, Stack } from "@mui/material";

const HeaderUserInfo = ({ user, isProjectManager, logoutUser }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div>
        <Typography variant="h4">Bienvenido, {user?.username}</Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip
            label={user?.role || "Sin Rol Asignado"}
            color={isProjectManager ? "primary" : "default"}
            variant="outlined"
          />
        </Stack>
      </div>
      <Button variant="outlined" color="secondary" onClick={logoutUser}>
        Cerrar Sesión
      </Button>
    </div>
  );
};

export default HeaderUserInfo;
