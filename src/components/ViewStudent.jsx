import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";
import {
  User,
  Mail,
  Calendar,
  Hash,
  MapPin,
  Phone,
  Users,
  Clock,
  BookOpen,
  Edit2,
  ArrowLeft,
  MoreVertical,
  Download,
  Printer,
  CreditCard,
  Edit3,
  X,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewStudent = () => {
  const location = useLocation();
  const { studentId } = location.state || {};
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form1Data, setForm1Data] = useState({
    roll_no: "",
    gender: "",
  });

  const edit1Click = async (rollNo, gender) => {
    setForm1Data({
      roll_no: rollNo,
      gender: gender,
    });
  };

  const handleSave1 = async (form1Data) => {
    try {
      console.log(form1Data);
      const result = await axios.post(
        "http://localhost:5000/api/student/updateStudentRollAndGender",
        { rollNo: form1Data.roll_no, studentId, gender: form1Data.gender },
        { withCredentials: true }
      );
      if (result.status == 200) {
        toast.success("Student Updated Successfully");
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.log(error);
    }
  };
  async function studentDetails(studentId) {
    try {
      setLoading(true);
      const result = await axios.get(
        "http://localhost:5000/api/user/getStudentDetail",
        {
          withCredentials: true,
          params: {
            id: studentId,
          },
        }
      );

      if (result.status == 200) {
        console.log(result.data.data[0]);
        setStudent(result.data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    studentDetails(studentId);
  }, []);

  const handlePrint = () => {
    if (!student) return;

    const printWindow = window.open("", "_blank");
    const profilePhotoUrl = student.profile_photo
      ? `http://localhost:5000/uploads/${student.profile_photo}`
      : "";
    const signatureUrl = student.signature_photo
      ? `http://localhost:5000/uploads/${student.signature_photo}`
      : "";

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Student Admission Form - ${student.student_name}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              padding: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #000;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              font-size: 28px;
              margin-bottom: 5px;
              text-transform: uppercase;
            }
            .header h2 {
              font-size: 20px;
              color: #666;
              font-weight: normal;
            }
            .form-title {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 30px;
              text-decoration: underline;
            }
            .photo-section {
              float: right;
              width: 150px;
              margin-left: 20px;
              margin-bottom: 20px;
            }
            .photo-box {
              width: 150px;
              height: 150px;
              border: 2px solid #000;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 10px;
              background: #f5f5f5;
            }
            .photo-box img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .signature-box {
              width: 150px;
              height: 60px;
              border: 2px solid #000;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #f5f5f5;
            }
            .signature-box img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              padding: 5px;
            }
            .signature-label {
              text-align: center;
              font-size: 12px;
              margin-top: 5px;
              font-weight: bold;
            }
            .section {
              margin-bottom: 30px;
              clear: both;
            }
            .section-title {
              background: #000;
              color: white;
              padding: 8px 15px;
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 15px;
            }
            .field-row {
              display: flex;
              margin-bottom: 12px;
              page-break-inside: avoid;
            }
            .field-label {
              font-weight: bold;
              width: 200px;
              flex-shrink: 0;
            }
            .field-value {
              flex: 1;
              border-bottom: 1px dotted #999;
              padding-bottom: 2px;
            }
            .footer {
              margin-top: 50px;
              display: flex;
              justify-content: space-between;
              page-break-inside: avoid;
            }
            .signature-area {
              text-align: center;
              width: 30%;
            }
            .signature-line {
              border-top: 2px solid #000;
              margin-top: 60px;
              padding-top: 5px;
            }
            @media print {
              body { padding: 20px; }
              .photo-section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>YOUR SCHOOL NAME</h1>
            <h2>Student Admission Form</h2>
          </div>

          <div class="form-title">STUDENT ADMISSION DETAILS</div>

          <div class="photo-section">
            <div class="photo-box">
              ${
                profilePhotoUrl
                  ? '<img src="' + profilePhotoUrl + '" alt="Student Photo" />'
                  : "<div>PHOTO</div>"
              }
            </div>
            <div class="signature-box">
              ${
                signatureUrl
                  ? '<img src="' + signatureUrl + '" alt="Signature" />'
                  : '<div style="font-size: 12px;">SIGNATURE</div>'
              }
            </div>
            <div class="signature-label">Student Signature</div>
          </div>

          <div class="section">
            <div class="section-title">ACADEMIC INFORMATION</div>
            <div class="field-row">
              <div class="field-label">Admission Number:</div>
              <div class="field-value">${
                student.admission_number || "N/A"
              }</div>
            </div>
            <div class="field-row">
              <div class="field-label">Roll Number:</div>
              <div class="field-value">${student.roll_no || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Class:</div>
              <div class="field-value">${student.class_name || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Section:</div>
              <div class="field-value">${student.section_name || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Session Timing:</div>
              <div class="field-value">${student.session_timing || "N/A"}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">PERSONAL INFORMATION</div>
            <div class="field-row">
              <div class="field-label">Student Name:</div>
              <div class="field-value">${student.student_name || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Email Address:</div>
              <div class="field-value">${student.student_email || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Gender:</div>
              <div class="field-value">${student.gender || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Residential Address:</div>
              <div class="field-value">${student.student_address || "N/A"}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">PARENT/GUARDIAN INFORMATION</div>
            <div class="field-row">
              <div class="field-label">Parent Name:</div>
              <div class="field-value">${student.parent_name || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Parent Email:</div>
              <div class="field-value">${student.parent_email || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="field-label">Parent Address:</div>
              <div class="field-value">${student.parent_address || "N/A"}</div>
            </div>
          </div>

          <div class="footer">
            <div class="signature-area">
              <div class="signature-line">Student Signature</div>
            </div>
            <div class="signature-area">
              <div class="signature-line">Parent Signature</div>
            </div>
            <div class="signature-area">
              <div class="signature-line">Principal Signature</div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleIDCardPrint = () => {
    if (!student) return;

    const printWindow = window.open("", "_blank");
    const profilePhotoUrl = student.profile_photo
      ? `http://localhost:5000/uploads/${student.profile_photo}`
      : "";

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Student ID Card - ${student.student_name}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f0f0f0;
              padding: 20px;
            }
            .id-card-container {
              display: flex;
              gap: 30px;
              flex-wrap: wrap;
              justify-content: center;
            }
            .id-card {
              width: 340px;
              height: 215px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              overflow: hidden;
              position: relative;
              page-break-inside: avoid;
            }
            .id-card-front {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .id-card-back {
              background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            }
            .card-header {
              background: rgba(255,255,255,0.95);
              padding: 12px;
              text-align: center;
            }
            .school-name {
              font-size: 16px;
              font-weight: bold;
              color: #333;
              margin-bottom: 2px;
            }
            .card-type {
              font-size: 11px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .card-body {
              display: flex;
              padding: 15px;
              gap: 12px;
            }
            .photo-section {
              flex-shrink: 0;
            }
            .id-photo {
              width: 90px;
              height: 110px;
              border: 3px solid white;
              border-radius: 8px;
              background: white;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }
            .id-photo img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .info-section {
              flex: 1;
              color: white;
            }
            .student-name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 8px;
              text-transform: uppercase;
            }
            .info-row {
              display: flex;
              margin-bottom: 5px;
              font-size: 11px;
            }
            .info-label {
              font-weight: 600;
              min-width: 70px;
              opacity: 0.9;
            }
            .info-value {
              font-weight: 500;
            }
            .card-footer {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              background: rgba(255,255,255,0.95);
              padding: 8px 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .validity {
              font-size: 9px;
              color: #666;
            }
            .barcode {
              height: 20px;
              background: linear-gradient(90deg, #000 0%, #000 10%, transparent 10%, transparent 20%, #000 20%, #000 30%, transparent 30%, transparent 40%, #000 40%, #000 50%, transparent 50%, transparent 60%, #000 60%, #000 70%, transparent 70%, transparent 80%, #000 80%, #000 90%, transparent 90%, transparent 100%);
              width: 80px;
              border-radius: 2px;
            }
            .back-content {
              padding: 20px;
              color: white;
            }
            .back-title {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 12px;
              text-align: center;
              border-bottom: 2px solid rgba(255,255,255,0.3);
              padding-bottom: 8px;
            }
            .emergency-info {
              font-size: 11px;
              line-height: 1.6;
              margin-bottom: 15px;
            }
            .emergency-info p {
              margin-bottom: 6px;
            }
            .emergency-label {
              font-weight: bold;
              opacity: 0.9;
            }
            .back-signature {
              margin-top: 20px;
              text-align: center;
            }
            .signature-line {
              border-top: 2px solid white;
              width: 120px;
              margin: 30px auto 5px;
            }
            .signature-text {
              font-size: 10px;
              opacity: 0.8;
            }
            @media print {
              body { background: white; }
              .id-card {
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
              }
            }
          </style>
        </head>
        <body>
          <div class="id-card-container">
            <div class="id-card id-card-front">
              <div class="card-header">
                <div class="school-name">YOUR SCHOOL NAME</div>
                <div class="card-type">Student Identity Card</div>
              </div>
              <div class="card-body">
                <div class="photo-section">
                  <div class="id-photo">
                    ${
                      profilePhotoUrl
                        ? '<img src="' + profilePhotoUrl + '" alt="Student" />'
                        : '<div style="font-size: 10px; color: #999;">PHOTO</div>'
                    }
                  </div>
                </div>
                <div class="info-section">
                  <div class="student-name">${
                    student.student_name || "N/A"
                  }</div>
                  <div class="info-row">
                    <div class="info-label">ID No:</div>
                    <div class="info-value">${
                      student.admission_number || "N/A"
                    }</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Class:</div>
                    <div class="info-value">${student.class_name || "N/A"} - ${
      student.section_name || "N/A"
    }</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Roll No:</div>
                    <div class="info-value">${student.roll_no || "N/A"}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Session:</div>
                    <div class="info-value">${
                      student.session_timing || "N/A"
                    }</div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="validity">Valid Till: 2025-26</div>
                <div class="barcode"></div>
              </div>
            </div>

            <div class="id-card id-card-back">
              <div class="back-content">
                <div class="back-title">EMERGENCY CONTACT INFORMATION</div>
                <div class="emergency-info">
                  <p><span class="emergency-label">Parent/Guardian:</span><br/>${
                    student.parent_name || "N/A"
                  }</p>
                  <p><span class="emergency-label">Contact:</span> ${
                    student.parent_email || "N/A"
                  }</p>
                  <p><span class="emergency-label">Address:</span><br/>${
                    student.parent_address || "N/A"
                  }</p>
                </div>
                <div style="font-size: 9px; line-height: 1.5; margin-top: 15px; opacity: 0.9;">
                  <strong>Note:</strong> This card is property of the institution. If found, please return to the school office.
                </div>
                <div class="back-signature">
                  <div class="signature-line"></div>
                  <div class="signature-text">Authorized Signature</div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <p className="text-gray-900 text-xl">Student not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Actions */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Student Details
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  View and manage student information
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={handleIDCardPrint}
                className="px-3 sm:px-4 py-2 text-sm text-white bg-blue-600 border border-blue-700 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <CreditCard className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">ID Card</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3 sm:px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <Printer className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Print Form</span>
              </button>
              <button className="px-3 sm:px-4 py-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors flex items-center">
                <Edit2 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Edit Student</span>
                <span className="sm:hidden">Edit</span>
              </button>
              <button className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Student Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden relative">
              {/* Edit Button */}
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  edit1Click(student.roll_no, student.gender);
                }}
                className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
              >
                <Edit3 className="w-5 h-5" />
              </button>

              {/* Student Image and Name */}
              <div className="p-6 text-center border-b border-gray-200">
                <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden mb-4 border-2 border-gray-200">
                  {student.profile_photo ? (
                    <img
                      src={`http://localhost:5000/uploads/${student.profile_photo}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {student.student_name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">Student</p>
                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                  Active
                </span>
              </div>

              {/* Quick Info */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Student ID
                  </label>
                  <p className="text-gray-900 font-medium">
                    {student.admission_number}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900 text-sm">
                    {student.student_email}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Roll Number
                  </label>
                  <p className="text-gray-900 font-medium">{student.roll_no}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Gender
                  </label>
                  <p className="text-gray-900 font-medium capitalize">
                    {student.gender}
                  </p>
                </div>

                {/* Signature Section */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Student Signature
                  </label>
                  <div className="w-full h-24 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    {student.signature_photo ? (
                      <img
                        src={`http://localhost:5000/uploads/${student.signature_photo}`}
                        alt="Signature"
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No signature</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Information */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-700" />
                  Academic Information
                </h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 p-2 -my-2 rounded-lg hover:bg-gray-100"
                >
                  Edit
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Class
                    </label>
                    <p className="text-gray-900 font-medium text-lg">
                      {student.class_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Section
                    </label>
                    <p className="text-gray-900 font-medium text-lg">
                      {student.section_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Session Timing
                    </label>
                    <p className="text-gray-900 font-medium">
                      {student.session_timing}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Admission Number
                    </label>
                    <p className="text-gray-900 font-medium">
                      {student.admission_number}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-700" />
                  Personal Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Date of Birth
                    </label>
                    <p className="text-gray-900 font-medium">
                      {student.session_timing}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Status
                    </label>
                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                      {student.session_timing}
                    </span>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Residential Address
                    </label>
                    <p className="text-gray-900 leading-relaxed">
                      {student.student_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-700" />
                  Parent/Guardian Details
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Full Name
                    </label>
                    <p className="text-gray-900 font-medium">
                      {student.parent_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Email Address
                    </label>
                    <p className="text-gray-900 font-medium break-all">
                      {student.parent_email}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Mobile Number
                    </label>
                    <p className="text-gray-900 font-medium">
                      {student.session_timing}
                    </p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address
                    </label>
                    <p className="text-gray-900 leading-relaxed">
                      {student.parent_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Edit Student Details</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="roll_no"
                  value={form1Data.roll_no}
                  onChange={(e) => {
                    setForm1Data({
                      ...form1Data,
                      roll_no: e.target.value,
                    });
                  }}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form1Data.gender}
                  onChange={(e) => {
                    setForm1Data({
                      ...form1Data,
                      gender: e.target.value,
                    });
                  }}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSave1(form1Data);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudent;
