import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../adminComponents/AdminNavbar";

const RoleProtectedRoute = ({ role, children }) => {
  const [access, setAccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "https://academycrmbackend.onrender.com/api/auth/roleAccess",
        { role },
        { withCredentials: true }
      )
      .then(() => setAccess(true))
      .catch(() => setAccess(false))
      .finally(() => setLoading(false));
  }, [role]);

  // ✅ Modern centered loader
  if (loading)
    return (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            {/* Loading Text */}
            <p className="text-gray-700 font-semibold text-lg animate-pulse">
              Checking access...
            </p>
          </div>
        </div>
      </div>
    );

  if (!access) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleProtectedRoute;
