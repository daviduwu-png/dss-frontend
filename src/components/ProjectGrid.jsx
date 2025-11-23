import React from "react";
import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects }) => {
  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item key={project.project_id} xs={12} sm={6} md={4}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectGrid;
