import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AdminDashboard from "./adminComponents/AdminDashboard";
import Teachers from "./components/Teachers";
import UnauthorizedPage from "./components/UnauthorizedPage";
import Student from "./components/Student";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/test" element={<Dashboard />} />

            <Route
              path="/admin/dashboard"
              element={
                <RoleProtectedRoute role="admin">
                  <AdminDashboard />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/teachers"
              element={
                <ProtectedRoute slug="teachers">
                  <Teachers />
                </ProtectedRoute>
              }
            />
            <Route path="/students" element={<Student />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
