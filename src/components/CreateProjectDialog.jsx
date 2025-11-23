import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const CreateProjectDialog = ({
  open,
  onClose,
  onCreate,
  newProject,
  onChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Nombre del Proyecto"
          fullWidth
          variant="outlined"
          value={newProject.name}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="budget"
          label="Presupuesto ($)"
          type="number"
          fullWidth
          variant="outlined"
          value={newProject.budget}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="start_date"
          label="Fecha de Inicio"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={newProject.start_date}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="client"
          label="ID Cliente"
          type="number"
          fullWidth
          variant="outlined"
          value={newProject.client}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onCreate} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProjectDialog;
