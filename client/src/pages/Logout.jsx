
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication token and user state
    LogoutUser();

    // Redirect to login page
    navigate("/login", { replace: true });
  }, [LogoutUser, navigate]);

  return null;
};

export default Logout;