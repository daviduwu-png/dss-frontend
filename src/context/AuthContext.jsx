import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);
  const [loading, setLoading] = useState(true);
  // useNavigate no se puede usar aquí directamente si AuthProvider envuelve a Router.
  // Por simplicidad, manejaremos la redirección en los componentes.

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
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
      localStorage.setItem("token", data.access); // Guardar token simple
      localStorage.setItem("authTokens", JSON.stringify(data)); // Guardar tokens completos
      return true; // Login exitoso
    } else {
      alert("Algo salió mal con el login");
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
    let authTokensLocal = localStorage.getItem("authTokens");
    if (authTokensLocal) {
      let tokens = JSON.parse(authTokensLocal);
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));
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
