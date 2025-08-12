import React from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  // Redirect to the new dashboard structure
  return <Navigate to="/dashboard/matches" replace />;
};

export default Dashboard;
