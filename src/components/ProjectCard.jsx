import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

// Diccionario de traducción
export const projectStatusMap = {
  Planned: "Planeado",
  Active: "Activo",
  Completed: "Completado",
  "On Hold": "En Pausa",
  Cancelled: "Cancelado",
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success"; // Verde
    case "Planned":
      return "primary"; // Azul
    case "On Hold":
      return "warning"; // Naranja
    case "Completed":
      return "default"; // Gris
    default:
      return "default";
  }
};

const ProjectCard = ({ project }) => {
  return (
    <Card elevation={3}>
      <CardContent
        sx={{
          minHeight: 150,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            {project.name}
          </Typography>

          <Chip
            label={projectStatusMap[project.status] || project.status}
            color={getStatusColor(project.status)}
            size="small"
          />
        </Box>

        <Box>
          <Typography variant="body2">
            Presupuesto: ${project.budget}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 1, color: "text.secondary" }}
          >
            Inicio: {project.start_date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
