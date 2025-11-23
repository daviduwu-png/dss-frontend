import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = async (e) => {
    e.preventDefault();
    const baseURL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${baseURL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("token", data.access);
        localStorage.setItem("authTokens", JSON.stringify(data));
        return true; // Login exitoso
      } else {
        alert("Credenciales incorrectas o error en el servidor");
        return false;
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error de conexión. Revisa tu internet");
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("token");
  };

  // Al cargar la página, verificar si hay token guardado
  useEffect(() => {
    const authTokensLocal = localStorage.getItem("authTokens");
    if (authTokensLocal) {
      try {
        const tokens = JSON.parse(authTokensLocal);
        setAuthTokens(tokens);
        setUser(jwtDecode(tokens.access));
      } catch (error) {
        // Si el token está corrupto, limpiamos todo
        console.error("Error al restaurar sesión:", error);
        logoutUser();
      }
    }
    setLoading(false);
  }, []);

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
