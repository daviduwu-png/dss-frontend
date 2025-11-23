import React, { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import HeaderUserInfo from "../components/HeaderUserInfo";
import ProjectActionsBar from "../components/ProjectActionsBar";
import CreateProjectDialog from "../components/CreateProjectDialog";
import ProjectGrid from "../components/ProjectGrid";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    budget: "",
    start_date: "",
    status: "Planned",
    client: 1,
  });

  // Verificamos si es Admin O si tiene el grupo 'Project Managers' en su lista
  const isProjectManager =
    user?.is_superuser || user?.groups?.includes("Project Managers");

  const displayUser = {
    ...user,
    role:
      user?.groups && user.groups.length > 0
        ? user.groups[0]
        : "Miembro del Equipo",
  };

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const response = await api.get("/api/gestion/projects/");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      if (error.response && error.response.status === 401) {
        logoutUser();
      }
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = async () => {
    try {
      await api.post("/api/gestion/projects/", newProject);
      setOpen(false);
      getProjects();
      setNewProject({
        name: "",
        budget: "",
        start_date: "",
        status: "Planned",
        client: 1,
      });
    } catch (error) {
      alert("Error al crear proyecto. Revisa los campos.");
    }
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <HeaderUserInfo
        user={displayUser}
        isProjectManager={isProjectManager}
        logoutUser={logoutUser}
      />

      <ProjectActionsBar
        isProjectManager={isProjectManager}
        onNewProjectClick={isProjectManager ? handleClickOpen : undefined}
        onPredictClick={() => navigate("/predict")}
      />

      <ProjectGrid projects={projects} />

      <CreateProjectDialog
        open={open}
        onClose={handleClose}
        onCreate={handleCreate}
        newProject={newProject}
        onChange={handleChange}
      />
    </Container>
  );
};

export default Dashboard;
