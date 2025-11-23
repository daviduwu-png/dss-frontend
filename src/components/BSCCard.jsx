import { Paper, Box, Typography, Divider, Chip } from "@mui/material";

const BSCCard = ({ title, icon, data, color }) => (
  <Paper
    elevation={3}
    sx={{
      width: "100%",
      p: 3,
      height: "100%",
      minHeight: 300,
      borderTop: `6px solid ${color}`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      {icon}
      <Typography variant="h5" sx={{ ml: 1, fontWeight: "bold" }}>
        {title}
      </Typography>
    </Box>

    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      OKR: {data.okr}
    </Typography>

    <Divider sx={{ my: 2 }} />

    {data.kpis.map((kpi, index) => (
      <Box key={index} sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body1">{kpi.name}</Typography>
        <Typography
          variant="h3"
          color={data.status === "error" ? "error.main" : "text.primary"}
        >
          {kpi.value} <span style={{ fontSize: "1rem" }}>{kpi.unit}</span>
        </Typography>
        <Chip
          label={
            data.status === "success" ? "Meta Alcanzada" : "Requiere Atención"
          }
          color={data.status}
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>
    ))}
  </Paper>
);

export default BSCCard;
