import React, { useState, useEffect } from "react";
import api from "../api/axios";
import {
  Container,
  Grid2 as Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import BudgetChart from "../components/BudgetChart";

const AnalyticsPage = () => {
  const [kpiData, setKpiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/analytics/mission-kpis/");
        setKpiData(response.data);
      } catch (error) {
        console.error("Error cargando analíticas", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tablero de Control (DSS) - Misión
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <BudgetChart data={kpiData} />
        </Grid>
        {kpiData.map((project) => (
          <Grid key={project.id} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {project.name}
                </Typography>
                {/* CPI */}
                <Typography variant="h5" component="h2">
                  CPI: {project.cpi}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  CV: ${project.cost_variance}
                </Typography>
                <Typography
                  variant="body2"
                  color={project.cpi >= 1 ? "success.main" : "error.main"}
                >
                  {project.cpi >= 1 ? "Eficiente" : "Sobre Costo"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AnalyticsPage;
