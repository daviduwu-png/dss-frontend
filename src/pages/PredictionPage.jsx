import React, { useState } from "react";
import api from "../api/axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid2 as Grid,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const PredictionPage = () => {
  // Estado para los inputs del formulario
  const [formData, setFormData] = useState({
    estimated_duration: 12,
    peak_month: 4,
    total_defects_estimate: 100,
  });

  // Estado para los datos de la gráfica
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar datos al backend
  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        "/api/analytics/predictions/predict_defects/",
        {
          estimated_duration: parseInt(formData.estimated_duration),
          peak_month: parseInt(formData.peak_month),
          total_defects_estimate: parseInt(formData.total_defects_estimate),
        }
      );
      setChartData(response.data.chart_data);
    } catch (error) {
      console.error("Error en predicción:", error);
      alert("Error al generar la predicción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Modelo Predictivo de Defectos (Rayleigh)
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Herramienta para estimar la curva de descubrimiento de defectos basada
        en la duración y complejidad del proyecto.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Parámetros del Proyecto
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Duración Estimada (Meses)"
                name="estimated_duration"
                type="number"
                fullWidth
                margin="normal"
                value={formData.estimated_duration}
                onChange={handleChange}
              />
              <TextField
                label="Mes Pico de Pruebas (Moda)"
                name="peak_month"
                type="number"
                fullWidth
                margin="normal"
                helperText="Mes donde se espera encontrar más defectos"
                value={formData.peak_month}
                onChange={handleChange}
              />
              <TextField
                label="Estimación Total de Defectos"
                name="total_defects_estimate"
                type="number"
                fullWidth
                margin="normal"
                value={formData.total_defects_estimate}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                onClick={handlePredict}
                disabled={loading}
              >
                {loading ? "Calculando..." : "Generar Simulación"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* --- GRÁFICA DE RESULTADOS --- */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              p: 3,
              height: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Curva de Proyección de Defectos
            </Typography>

            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorDefects"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    label={{
                      value: "Mes del Proyecto",
                      position: "insideBottomRight",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Defectos",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Area
                    type="monotone"
                    dataKey="predicted_defects"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorDefects)"
                    name="Defectos Esperados"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "text.secondary",
                }}
              >
                <Typography>
                  Ingresa los parámetros y pulsa "Generar Simulación" para ver
                  la gráfica.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PredictionPage;
