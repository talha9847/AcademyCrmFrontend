import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const RoleProtectedRoute = ({ role, children }) => {
  const [access, setAccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("https://academycrmbackend.onrender.com/api/auth/roleAccess", { role }, { withCredentials: true })
      .then(() => setAccess(true))
      .catch(() => setAccess(false))
      .finally(() => setLoading(false));
  }, [role]);

  if (loading) return <p>Loading...</p>;
  if (!access) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleProtectedRoute;
