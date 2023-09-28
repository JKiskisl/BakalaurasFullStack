import React from "react";

import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth.service";

const ProtectedRoute = ({ element: Element }) => {
  const isLoggedIn = isAuthenticated();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Element />;
};

export default ProtectedRoute;
