import React, { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import { Container, Typography, Grid2 as Grid } from "@mui/material";
import { AttachMoney, Group, Settings, School } from "@mui/icons-material";
import BSCCard from "../components/BSCCard";

const BSCPage = () => {
  const [bscData, setBscData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/analytics/bsc/dashboard/");
        setBscData(response.data);
      } catch (error) {
        console.error("Error cargando BSC", error);
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <Typography sx={{ m: 4 }}>Cargando Visión Empresarial...</Typography>
    );

  if (!bscData) return null;

  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Balanced Scorecard
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 5 }}
      >
        Visión: Impulsar la transformación digital con decisiones basadas en
        datos.
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <Grid xs={12} md={6} lg={3}>
          <BSCCard
            title="Financiera"
            icon={<AttachMoney fontSize="large" color="primary" />}
            data={bscData.financial}
            color="#1976d2"
          />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <BSCCard
            title="Cliente"
            icon={<Group fontSize="large" color="secondary" />}
            data={bscData.customer}
            color="#9c27b0"
          />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <BSCCard
            title="Procesos Internos"
            icon={<Settings fontSize="large" color="warning" />}
            data={bscData.internal}
            color="#ed6c02"
          />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <BSCCard
            title="Aprendizaje"
            icon={<School fontSize="large" color="success" />}
            data={bscData.learning}
            color="#2e7d32"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BSCPage;
