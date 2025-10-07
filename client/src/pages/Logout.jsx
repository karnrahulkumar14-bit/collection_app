import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // clear token + state on mount
    LogoutUser();
    navigate("/login"); // redirect to login page after logout
  }, [LogoutUser, navigate]);

  return null; // nothing to render
};
