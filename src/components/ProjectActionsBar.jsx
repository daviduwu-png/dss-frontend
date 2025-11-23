import React from "react";
import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InsightsIcon from "@mui/icons-material/Insights";

const ProjectActionsBar = ({
  isProjectManager,
  onNewProjectClick,
  onPredictClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h5">Proyectos Registrados (OLTP)</Typography>

      <div>
        {isProjectManager && (
          <>
            <Button
              variant="contained"
              color="warning"
              startIcon={<InsightsIcon />}
              onClick={onPredictClick}
              sx={{ mr: 2 }}
            >
              Predicción de Defectos
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={onNewProjectClick}
            >
              Nuevo Proyecto
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectActionsBar;
