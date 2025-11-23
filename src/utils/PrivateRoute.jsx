import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // Si no hay usuario, redirige a login
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
