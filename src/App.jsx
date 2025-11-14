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
import CreateAttendancePage from "./adminComponents/CreateAttendancePage";
import AttendanceView from "./adminComponents/AttendanceView";
import SAttendance from "./StudentComponents/SAttendance";
import SFeePayment from "./StudentComponents/SFeePayment";
import SStudyMaterial from "./StudentComponents/SStudyMaterial";
import Expense from "./adminComponents/Expense";
import Certificate from "./adminComponents/Certificate";
import ViewCertificate from "./adminComponents/ViewCertificate";
import Verification from "./components/Verification";
import Test from "./adminComponents/Test";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewAllCourses from "./components/ViewAllCourses";
import CourseDetails from "./components/CourseDetails";
import ManageTestimonial from "./adminComponents/ManageTestimonial";
import AboutManage from "./adminComponents/AboutManage";
import MilestoneManage from "./adminComponents/MilestoneManage";
import FullGallery from "./components/FullGalary";
import { AllBlogs } from "./components/AllBlog";
import ManageCourseDetail from "./adminComponents/ManageCourseDetail";
import TProfile from "./TeacherComponents/TProfile";
import ChangePassword from "./adminComponents/ChangePassword";
import TFees from "./TeacherComponents/TFees";
import TStudent from "./TeacherComponents/TStudent";
import TestingResult from "./components/TestingResult";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <ToastContainer
          position="top-right" // ✅ You can change this
          autoClose={3000} // closes after 3 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" // "light", "dark", "colored"
        />
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Website />} />
            <Route path="/test" element={<Dashboard />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/test2" element={<Test />} />
            <Route path="/allcourses" element={<ViewAllCourses />} />
            <Route path="/coursedetail" element={<CourseDetails />} />
            <Route path="/gallery" element={<FullGallery />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/election" element={<TestingResult />} />

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
              path="/admin/change-password"
              element={
                <RoleProtectedRoute role="admin">
                  <ChangePassword />
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
              path="/admin/manage/testimonials"
              element={
                <RoleProtectedRoute role="admin">
                  <ManageTestimonial />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/manage/about"
              element={
                <RoleProtectedRoute role="admin">
                  <AboutManage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/manage/milestone"
              element={
                <RoleProtectedRoute role="admin">
                  <MilestoneManage />
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
              path="/admin/manage/coursedetail"
              element={
                <RoleProtectedRoute role="admin">
                  <ManageCourseDetail />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/attendance/"
              element={
                <RoleProtectedRoute role="admin">
                  <CreateAttendancePage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/attendance/view"
              element={
                <RoleProtectedRoute role="admin">
                  <AttendanceView />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/expense/"
              element={
                <RoleProtectedRoute role="admin">
                  <Expense />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/certificate/"
              element={
                <RoleProtectedRoute role="admin">
                  <Certificate />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin/view-certificate/"
              element={
                <RoleProtectedRoute role="admin">
                  <ViewCertificate />
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

            <Route
              path="teacher/fees"
              element={
                <ProtectedRoute slug="fees">
                  <TFees />
                </ProtectedRoute>
              }
            />
            <Route
              path="teacher/students"
              element={
                <ProtectedRoute slug="students">
                  <TStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/profile"
              element={
                <RoleProtectedRoute role="teacher">
                  <TProfile />
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
              path="/student/attendance"
              element={
                <RoleProtectedRoute role="student">
                  <SAttendance />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/student/fees"
              element={
                <RoleProtectedRoute role="student">
                  <SFeePayment />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/student/studymaterial"
              element={
                <RoleProtectedRoute role="student">
                  <SStudyMaterial />
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
