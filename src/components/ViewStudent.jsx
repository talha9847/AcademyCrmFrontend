import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";
import { User, Mail, Calendar, Hash, MapPin, Phone, Users, Clock, BookOpen, Edit2, ArrowLeft, MoreVertical, Download, Printer } from "lucide-react";

const ViewStudent = () => {
  const location = useLocation();
  const { studentId } = location.state || {};
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Student Details</h1>
                <p className="text-xs sm:text-sm text-gray-500">View and manage student information</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button className="px-3 sm:px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="px-3 sm:px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <Printer className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Print</span>
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
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Student Image and Name */}
              <div className="p-6 text-center border-b border-gray-200">
                <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden mb-4 border-2 border-gray-200">
                  {student.student_image ? (
                    <img 
                      src={student.student_image} 
                      alt={student.student_name}
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
                  <p className="text-gray-900 font-medium">{student.admission_number}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900 text-sm">{student.student_email}</p>
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
                  <p className="text-gray-900 font-medium capitalize">{student.gender}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Information */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-700" />
                  Academic Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Class
                    </label>
                    <p className="text-gray-900 font-medium text-lg">{student.class_name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Section
                    </label>
                    <p className="text-gray-900 font-medium text-lg">{student.section_name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Session Timing
                    </label>
                    <p className="text-gray-900 font-medium">{student.session_timing}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Admission Number
                    </label>
                    <p className="text-gray-900 font-medium">{student.admission_number}</p>
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
                    <p className="text-gray-900 font-medium">{student.session_timing}</p>
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
                    <p className="text-gray-900 leading-relaxed">{student.student_address}</p>
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
                    <p className="text-gray-900 font-medium">{student.parent_name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Email Address
                    </label>
                    <p className="text-gray-900 font-medium break-all">{student.parent_email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Mobile Number
                    </label>
                    <p className="text-gray-900 font-medium">{student.session_timing}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address
                    </label>
                    <p className="text-gray-900 leading-relaxed">{student.parent_address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
