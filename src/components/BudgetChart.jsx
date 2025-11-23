import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const BudgetChart = ({ data }) => {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 300 }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Rendimiento Financiero (Presupuesto vs Real)
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget_allocated" fill="#8884d8" name="Presupuesto" />
          <Bar dataKey="actual_cost" fill="#82ca9d" name="Costo Real" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BudgetChart;
