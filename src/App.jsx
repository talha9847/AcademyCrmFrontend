import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AdminDashboard from "./adminComponents/AdminDashboard";
import Teachers from "./components/Teachers";
import UnauthorizedPage from "./components/UnauthorizedPage";
import Student from "./components/Student";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Classes from "./components/Classes";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import ViewStudent from "./components/ViewStudent";
import Fees from "./components/Fees";
import Website from "./components/Website";
import ViewTeacher from "./components/ViewTeacher";
import ViewStudentTransaction from "./components/ViewStudentTransaction";
import TDashboard from "./TeacherComponents/Dashboard";
import SDashboard from "./StudentComponents/SDashboard";
import SProfile from "./StudentComponents/SProfile";
import ManageCourses from "./adminComponents/ManageCourses";
import ManageHero from "./adminComponents/ManageHero";
import ManageFCourses from "./adminComponents/ManageFCourses";
import SCertificates from "./StudentComponents/SCertificates";
import SNavbar from "./StudentComponents/SNavbar";
import Attendence from "./adminComponents/Attendence";
import CreateAttendancePage from "./adminComponents/CreateAttendancePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Website />} />
            <Route path="/test" element={<Dashboard />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <RoleProtectedRoute role="admin">
                  <AdminDashboard />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/admin/classes"
              element={
                <RoleProtectedRoute role="admin">
                  <Classes />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/admin/manage"
              element={
                <RoleProtectedRoute role="admin">
                  <ManageCourses />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/attendence/"
              element={
                <RoleProtectedRoute role="admin">
                  <Attendence />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/admin/fees/detail"
              element={
                <RoleProtectedRoute role="admin">
                  <ViewStudentTransaction />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/admin/manage/hero"
              element={
                <RoleProtectedRoute role="admin">
                  <ManageHero />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/manage/featuredcourses"
              element={
                <RoleProtectedRoute role="admin">
                  <ManageFCourses />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/talha/"
              element={
                <RoleProtectedRoute role="admin">
                  <CreateAttendancePage />
                </RoleProtectedRoute>
              }
            />

            {/* Teachers Route */}
            <Route
              path="/teacher/dashboard"
              element={
                <RoleProtectedRoute role="teacher">
                  <TDashboard />
                </RoleProtectedRoute>
              }
            />

            {/* Student Route    */}
            <Route
              path="/student/dashboard"
              element={
                <RoleProtectedRoute role="student">
                  <SDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/student/profile"
              element={
                <RoleProtectedRoute role="student">
                  <SProfile />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/student/certificate"
              element={
                <RoleProtectedRoute role="student">
                  <SCertificates />
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

            <Route
              path="/teacher/detail"
              element={
                <ProtectedRoute slug="teachers">
                  <ViewTeacher />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/detail"
              element={
                <ProtectedRoute slug="students">
                  <ViewStudent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/students"
              element={
                <ProtectedRoute slug="students">
                  <Student />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fees"
              element={
                <ProtectedRoute slug="fees">
                  <Fees />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<UnauthorizedPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
