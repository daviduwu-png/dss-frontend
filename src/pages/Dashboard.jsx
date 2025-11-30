import React, { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import HeaderUserInfo from "../components/HeaderUserInfo";
import ProjectActionsBar from "../components/ProjectActionsBar";
import ProjectGrid from "../components/ProjectGrid";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <HeaderUserInfo
        user={displayUser}
        isProjectManager={isProjectManager}
        logoutUser={logoutUser}
      />

      <ProjectActionsBar
        isProjectManager={isProjectManager}
        onPredictClick={() => navigate("/predict")}
      />

      <ProjectGrid projects={projects} />
    </Container>
  );
};

export default Dashboard;
