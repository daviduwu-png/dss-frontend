import React from "react";
import { Typography, Button } from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";

const ProjectActionsBar = ({ isProjectManager, onPredictClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h5">Proyectos Registrados</Typography>

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
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectActionsBar;
