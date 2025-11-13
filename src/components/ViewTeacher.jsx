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
  Loader2,
  Save,
  Edit,
  X, // For salary
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [edit1Modal, setEdit1Modal] = useState(false);
  const [edit1Data, setEdit1Data] = useState({
    dob: "",
    contact: "",
  });
  const [edit2Modal, setEdit2Modal] = useState(false);
  const [edit2Data, setEdit2Data] = useState({
    gender: "",
    address: "",
  });
  const [edit3Modal, setEdit3Modal] = useState(false);
  const [edit3Data, setEdit3Data] = useState({
    hireDate: "",
    designation: "",
  });

  const handleStatusClick = async () => {
    const action = teacher.is_active ? "disable" : "enable";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this account?`,
      text: teacher.is_active
        ? "The user will not be able to log in after this."
        : "The user will regain access after this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${action} it`,
    });

    if (result.isConfirmed) {
      const result = await axios.post(
        `${BASE_URL}/api/student/statusUpdate`,
        {
          status: !teacher.is_active,
          userId: teacherId,
        },
        { withCredentials: true }
      );
      if (result.status == 200) {
        getTeacherDetail(teacherId);
        Swal.fire({
          title: "Updated!",
          text: `User account has been ${action}d successfully.`,
          icon: "success",
        });
      }
    }
  };

  const handleProfilePhotoChange = async (e, email) => {
    console.log(email);
    const file = e.target.files[0]; // get the first selected file
    if (!file) return; // if no file selected, do nothing
    console.log("Selected photo name:", file.name);
    const formData = new FormData();
    formData.append("profilePhoto", file);
    formData.append("email", email);
    formData.append("userId", teacherId);
    try {
      const result = await axios.put(
        `${BASE_URL}/api/user/updateTeacherProfile`,
        formData,
        { withCredentials: true }
      );
      if (result.status == 200) {
        getTeacherDetail(teacherId);
        toast.success("Profile picture changed kindly refresh");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error kindly refresh");
    }
  };

  const updateGenderAndAddressOfTeacher = async () => {
    const id = teacherId;
    try {
      console.log(edit2Data);
      const result = await axios.put(
        `${BASE_URL}/api/user/updateGenderAndAddressOfTeacher`,
        { address: edit2Data.address, gender: edit2Data.gender, teacherId: id },
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        getTeacherDetail(teacherId);
        setEdit2Modal(false);
        toast.success("updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unexpected error occured");
    }
  };
  const updateHireDateAndDesignationOfTeacher = async () => {
    const id = teacherId;
    try {
      console.log(edit3Data);
      const result = await axios.put(
        `${BASE_URL}/api/user/updateHireDateAndDesignationOfTeacher`,
        {
          hireDate: edit3Data.hireDate,
          designation: edit3Data.designation,
          teacherId: id,
        },
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        getTeacherDetail(teacherId);
        setEdit2Modal(false);
        toast.success("updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unexpected error occured");
    }
  };

  const updateDobAndContactOfTeacher = async () => {
    const id = teacherId;
    try {
      console.log(edit1Data);
      const result = await axios.put(
        `${BASE_URL}/api/user/updateDobAndContactOfTeacher`,
        { dob: edit1Data.dob, contact: edit1Data.contact, teacherId: id },
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        getTeacherDetail(teacherId);
        setEdit1Modal(false);
        toast.success("updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unexpected error occured");
    }
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
                onClick={() => {}}
                className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
              >
                <Edit3 className="w-5 h-5" />
              </button>

              {/* Teacher Image and Name */}
              <div className="p-6 text-center border-b border-gray-200">
                <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden mb-4 border-2 border-gray-200 group">
                  {teacher.profile_photo ? (
                    <img
                      // src={`${BASE_URL}/uploads/${student.profile_photo}`}
                      src={photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  {/* Edit button overlay (appears on hover) */}
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
                    onChange={(e) => handleProfilePhotoChange(e, teacher.email)}
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
              <div className="relative bg-white rounded-lg shadow-md p-6 space-y-4">
                {/* --- Edit Button --- */}
                <button
                  type="button"
                  className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition shadow-sm"
                  onClick={() => {
                    setEdit1Modal(true);
                    setEdit1Data({
                      dob: new Date(teacher.birthdate)
                        .toISOString()
                        .split("T")[0],
                      contact: teacher.mobile,
                    });
                  }}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>

                {/* --- Staff Details --- */}
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
                      {new Date(teacher.birthdate).toLocaleDateString()}
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
                      {teacher.mobile}
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
                  onClick={() => {
                    setEdit2Modal(true);
                    setEdit2Data({
                      gender: teacher.gender,
                      address: teacher.address,
                    });
                  }}
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
                <button
                  onClick={() => {
                    setEdit3Modal(true);
                    console.log(teacher.hire_date);
                    setEdit3Data({
                      hireDate: new Date(teacher.hire_date)
                        .toISOString()
                        .split("T")[0],
                      designation: teacher.designation,
                    });
                  }}
                >
                  <Edit />
                </button>
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

      {edit1Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setEdit1Modal(false);
                setEdit1Data({
                  dob: "",
                  contact: "",
                });
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Edit className="w-5 h-5 mr-2 text-indigo-600" />
              Edit Teacher Info
            </h2>

            <div className="space-y-4">
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={edit1Data.dob}
                  onChange={(e) => {
                    setEdit1Data({
                      ...edit1Data,
                      dob: e.target.value,
                    });
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-gray-50"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={edit1Data.contact}
                  onChange={(e) => {
                    setEdit1Data({
                      ...edit1Data,
                      contact: e.target.value,
                    });
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-gray-50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEdit1Modal(false);
                  setEdit1Data({
                    dob: "",
                    contact: "",
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateDobAndContactOfTeacher();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {edit2Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setEdit2Modal(false);
                setEdit2Data({
                  gender: "",
                  address: "",
                });
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Edit className="w-5 h-5 mr-2 text-indigo-600" />
              Edit Teacher Info
            </h2>

            <div className="space-y-4">
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <textarea
                  rows={3}
                  value={edit2Data.address || ""}
                  onChange={(e) => {
                    setEdit2Data({
                      ...edit2Data,
                      address: e.target.value,
                    });
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                />
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Gender
                </label>
                <select
                  value={edit2Data.gender || ""}
                  onChange={(e) => {
                    setEdit2Data({
                      ...edit2Data,
                      gender: e.target.value,
                    });
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEdit2Modal(false);
                  setEdit2Data({
                    dob: "",
                    contact: "",
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateGenderAndAddressOfTeacher();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {edit3Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setEdit3Modal(false);
                setEdit3Data({
                  gender: "",
                  address: "",
                });
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Edit className="w-5 h-5 mr-2 text-indigo-600" />
              Edit Teacher Info
            </h2>

            <div className="space-y-4">
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Hire Date
                </label>
                <input
                  type="date"
                  value={edit3Data.hireDate}
                  onChange={(e) => {
                    setEdit3Data({
                      ...edit3Data,
                      hireDate: e.target.value,
                    });
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-gray-50"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={edit3Data.designation}
                  onChange={(e) => {
                    setEdit3Data({
                      ...edit3Data,
                      designation: e.target.value,
                    });
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-gray-50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEdit3Modal(false);
                  setEdit3Data({
                    hireDate: "",
                    designation: "",
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateHireDateAndDesignationOfTeacher();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeacher;
