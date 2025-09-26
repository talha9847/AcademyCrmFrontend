import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AdminDahsboard from "./adminComponents/AdminDashboard";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<AdminDahsboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
              
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
