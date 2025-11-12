import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../adminComponents/AdminNavbar"; // Assuming you have this component
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase, // For designation/job
  Hash, // For staff ID
  Edit3,
  CreditCard,
  Printer,
  Camera,
  BookOpen, // For subjects
  Clock, // For joining date
  DollarSign,
  Loader2, // For salary
} from "lucide-react";
import axios from "axios";

// --- DUMMY TEACHER DATA (Replace with API call logic later) ---
const DUMMY_TEACHER = {
  full_name: "Dr. Evelyn Reed",
  email: "evelyn.reed@school.edu",
  staff_id: "TCH84920",
  designation: "Head of Science Department",
  gender: "Female",
  birthdate: "1985-05-15",
  hire_date: "2010-08-20",
  mobile: "+91 98765 43210",
  address: "45-A, Green Acres Colony, City, State - 560001",
  is_active: true, // true or false for status
  current_salary: 85000,
  subjects_taught: ["Physics", "Chemistry", "Mathematics"],
  profile_photo: "teacher_evelyn.jpg", // Placeholder name
};

const ViewTeacher = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const location = useLocation();
  const teacherId = location.state.teacherId;
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(DUMMY_TEACHER);
  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");

  const handleStatusClick = () => {
    alert(`Status for ${teacher.teacher_name} will be toggled.`);
    // In a real app, you'd integrate the Swal.fire and axios call here
  };

  const getTeacherDetail = async () => {
    setLoading(true);
    const userId = teacherId;
    try {
      const result = await axios.post(
        `${BASE_URL}/api/user/getTeacherById`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );
      if (result.status == 200) {
        setLoading(false);
        console.log(result.data.data);
        setTeacher(result.data.data);
      }
    } catch (error) {}
  };

  const fetchTeacherPhoto = async (fileName) => {
    setPhotoLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setPhotoUrl(url);
      setPhotoLoading(false);
    } catch (err) {
      console.error("Failed to load photo:", err);
      setPhotoLoading(false);
    }
  };

  useEffect(() => {
    getTeacherDetail();
  }, [teacherId]);
  useEffect(() => {
    if (teacher?.profile_photo) {
      fetchTeacherPhoto(teacher.profile_photo);
    }
  }, [teacher]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <AdminNavbar />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-700" />
        </div>
      </div>
    );
  }

  const handlePrint = () => alert("Printing Staff Information Form...");
  const handleIDCardPrint = () => alert("Printing Staff ID Card...");
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("New photo selected:", file.name);
      alert("Profile photo updated! (Requires API integration)");
    }
  };
  const openEditModal = () => alert("Opening Edit Modal for basic info...");

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Actions */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Teacher Details
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  View and manage staff information
                </p>
              </div>
            </div>

            {/* Action Buttons */}
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
            </div>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. Left Sidebar - Teacher Overview (Similar to Student Card) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden relative">
              {/* Edit Button */}
              <button
                onClick={openEditModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
              >
                <Edit3 className="w-5 h-5" />
              </button>

              {/* Teacher Image and Name */}
              <div className="p-6 text-center border-b border-gray-200">
                <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden mb-4 border-2 border-gray-200 group">
                  {photoLoading ? (
                    <Loader2 className="w-10 h-10 animate-spin text-gray-700" />
                  ) : (
                    <img
                      src={photoUrl || "/placeholder.jpg"} // fallback placeholder
                      alt="Teacher Profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}

                  {/* Edit button overlay */}
                  <label
                    htmlFor="profilePhotoInput"
                    className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-6 h-6 mb-1" />
                    Change Photo
                  </label>

                  {/* Hidden file input */}
                  <input
                    id="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                  />
                </div>

                {/* Teacher Info */}
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {teacher.full_name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  {teacher.designation}
                </p>

                <span
                  onClick={handleStatusClick}
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border cursor-pointer ${
                    teacher.is_active
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {teacher.is_active ? "Active" : "Terminated"}
                </span>
              </div>

              {/* Quick Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <Hash className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-0.5">
                      Staff ID
                    </label>
                    <p className="text-gray-900 font-medium">
                      {teacher.staff_id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-0.5">
                      Date of Birth
                    </label>
                    <p className="text-gray-900 font-medium">
                      {new Date(teacher.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-0.5">
                      Contact Number
                    </label>
                    <p className="text-gray-900 font-medium">
                      {teacher.contact_number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Right Content - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* --- Personal & Contact Information --- */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>
                <button
                  onClick={openEditModal}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center font-medium"
                >
                  <Edit3 className="w-4 h-4 mr-1" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-semibold text-gray-600 block">
                    Email:
                  </span>
                  <span className="text-gray-800">{teacher.email}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-600 block">
                    Gender:
                  </span>
                  <span className="text-gray-800">{teacher.gender}</span>
                </p>
                <div className="md:col-span-2">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-600 block">
                        Address:
                      </span>
                      <span className="text-gray-800">{teacher.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Employment & Academic Information --- */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                  Employment Details
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-semibold text-gray-600 block">
                    Joining Date:
                  </span>
                  <span className="text-gray-800">
                    {new Date(teacher.hire_date).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-600 block">
                    Designation:
                  </span>
                  <span className="text-gray-800">{teacher.designation}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacher;
