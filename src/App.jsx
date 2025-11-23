import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AnalyticsPage from "./pages/AnalyticsPage";
import PredictionPage from "./pages/PredictionPage";
import BSCPage from "./pages/BSCPage";

const Navigation = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema DSS
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">
          Gestión (OLTP)
        </Button>

        <Button color="inherit" component={Link} to="/analytics">
          Misión (KPIs)
        </Button>

        <Button color="inherit" component={Link} to="/bsc">
          Visión (BSC)
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas Protegidas */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              {/* Rutas Hijas */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="predict" element={<PredictionPage />} />
              <Route path="bsc" element={<BSCPage />} />

              {/* Redirección por defecto */}
              <Route index element={<Navigate to="/dashboard" />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
