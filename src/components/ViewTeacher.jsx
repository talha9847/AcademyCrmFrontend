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
  X,
  Key,
  Lock, // For salary
} from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

// --- DUMMY TEACHER DATA (Replace with API call logic later) ---

const ViewTeacher = () => {
  const {
    reset,
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm();
  const newPassword = watch("newPassword");

  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const location = useLocation();
  const teacherId = location.state.teacherId;
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [edit1Modal, setEdit1Modal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [updating, setUpdating] = useState(false);
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
  const [updateLoading, setUpdateLoading] = useState(false);

  const changePassword = async (data) => {
    setUpdating(true);
    const newData = { ...data, id: teacherId };
    try {
      const result = await axios.post(
        `${BASE_URL}/api/student/changePasswordByAdmin`,
        newData,
        { withCredentials: true }
      );
      console.log(result.status);
      if (result.status == 233) {
        setUpdating(false);
        toast.warn("Password can't be same previous one");
        setPasswordModal(false);
      }
      if (result.status == 200) {
        toast.success("Password updated Successfully");
        setUpdating(false);
        setPasswordModal(false);
      }
    } catch (error) {
      console.log(error);
      setUpdating(false);
      setPasswordModal(false);
      toast.error("Error in updating password");
    }
  };

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
    setUpdateLoading(true);
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
        setUpdateLoading(false);
        toast.success("updated successfully");
      }
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
      toast.error("Unexpected error occured");
    }
  };
  const updateHireDateAndDesignationOfTeacher = async () => {
    setUpdateLoading(true);
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
        setEdit3Modal(false);
        setUpdateLoading(false);
        toast.success("updated successfully");
      }
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
      setEdit3Modal(false);
      toast.error("Unexpected error occured");
    }
  };

  const updateDobAndContactOfTeacher = async () => {
    const id = teacherId;
    setUpdateLoading(true);
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
        setUpdateLoading(false);
        toast.success("updated successfully");
      }
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
      setEdit1Modal(false);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Actions */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-black hover:text-white transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline ml-3 font-medium">Back</span>
              </button>
              <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                  Teacher Profile
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Comprehensive staff information management
                </p>
              </div>
            </div>
            {/* Placeholder for any LG-only header actions if they existed - already covered by flex-col/lg:flex-row */}
          </div>
        </div>

        {/* Main Content Grid: Stacks on mobile, 1:2 ratio on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Teacher Overview (Full width on mobile, 1/3 on large) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              {/* Teacher Image and Name */}
              <div className="p-6 sm:p-8 text-center relative z-10">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-2xl overflow-hidden mb-6 border-2 border-white/20 group shadow-2xl">
                  {teacher.profile_photo ? (
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                      <User className="w-16 h-16 sm:w-20 sm:h-20 text-white/30" />
                    </div>
                  )}

                  {/* Edit button overlay */}
                  <label
                    htmlFor="profilePhotoInput"
                    className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  >
                    <Camera className="w-6 h-6 sm:w-8 sm:h-8 mb-2" />
                    <span className="font-semibold">Change Photo</span>
                  </label>

                  <input
                    id="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProfilePhotoChange(e, teacher.email)}
                    className="hidden"
                  />
                </div>

                {/* Teacher Info */}
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-2 tracking-tight">
                  {teacher.full_name}
                </h2>
                <p className="text-sm text-gray-400 mb-4 font-medium">
                  {teacher.designation}
                </p>

                <span
                  onClick={handleStatusClick}
                  className={`inline-flex px-4 py-2 text-xs font-bold rounded-full border-2 cursor-pointer transition-all duration-300 uppercase tracking-wider ${
                    teacher.is_active
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                  }`}
                >
                  {teacher.is_active ? "Active" : "Terminated"}
                </span>
              </div>

              {/* Quick Info */}
              <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-4 sm:p-6 space-y-6 border-t border-white/10 m-4 sm:m-6">
                {/* Edit Button */}
                <button
                  type="button"
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-700 transition-all duration-300 border border-white/20 shadow-lg backdrop-blur-sm"
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
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>

                {/* Staff Details */}
                <div className="flex items-start space-x-4 pt-8 sm:pt-0">
                  {" "}
                  {/* Adjusted padding for edit button position */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <Hash className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Staff ID
                    </label>
                    <p className="text-black font-semibold text-base sm:text-lg">
                      {teacher.staff_id}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/5"></div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <Calendar className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Date of Birth
                    </label>
                    <p className="text-gray-900 font-semibold text-base">
                      {new Date(teacher.birthdate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/5"></div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Contact Number
                    </label>
                    <p className="text-black font-semibold text-base">
                      {teacher.mobile}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Detailed Information (Full width on mobile, 2/3 on large) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal & Contact Information */}
            <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-6 sm:p-8 border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-black flex items-center">
                  <div className="p-2 rounded-lg bg-white/10 border border-white/20 mr-3">
                    <User className="w-5 h-5 text-black" />
                  </div>
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
                  className="text-xs sm:text-sm text-white hover:text-white/80 flex items-center font-bold px-3 py-1.5 sm:px-4 sm:py-2 bg-black rounded-lg hover:bg-gray-700 transition-all duration-300 border border-white/20"
                >
                  <Edit3 className="w-4 h-4 mr-1 sm:mr-2" />{" "}
                  <span className="hidden sm:inline">Edit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm relative z-10">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="font-bold text-gray-400 block mb-2 text-xs uppercase tracking-wider">
                    Email Address
                  </span>
                  <span className="text-black font-semibold text-base break-all">
                    {teacher.email}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="font-bold text-gray-400 block mb-2 text-xs uppercase tracking-wider">
                    Gender
                  </span>
                  <span className="text-black font-semibold text-base">
                    {teacher.gender}
                  </span>
                </div>
                <div className="md:col-span-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="font-bold text-gray-400 block mb-2 text-xs uppercase tracking-wider">
                        Address
                      </span>
                      <span className="text-black font-medium leading-relaxed text-base">
                        {teacher.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Employment & Academic Information */}
            <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-6 sm:p-8 border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-black flex items-center">
                  <div className="p-2 rounded-lg bg-white/10 border border-white/20 mr-3">
                    <Briefcase className="w-5 h-5 text-black" />
                  </div>
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
                  className="text-xs sm:text-sm text-white hover:text-white/80 flex items-center font-bold px-3 py-1.5 sm:px-4 sm:py-2 bg-black rounded-lg hover:bg-gray-700 transition-all duration-300 border border-white/20"
                >
                  <Edit className="w-4 h-4 mr-1 sm:mr-2" />{" "}
                  <span className="hidden sm:inline">Edit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm relative z-10">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="font-bold text-gray-400 block mb-2 text-xs uppercase tracking-wider">
                    Joining Date
                  </span>
                  <span className="text-black font-semibold text-base">
                    {new Date(teacher.hire_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="font-bold text-gray-400 block mb-2 text-xs uppercase tracking-wider">
                    Designation
                  </span>
                  <span className="text-black font-semibold text-base">
                    {teacher.designation}
                  </span>
                </div>
              </div>
            </div>

            {/* Update Password Section - Admin Only */}
            <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-6 sm:p-8 border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-black flex items-center">
                  <div className="p-2 rounded-lg bg-white/10 border border-white/20 mr-3">
                    <Lock className="w-5 h-5 text-black" />
                  </div>
                  Security Settings
                </h3>
                <button
                  onClick={() => {
                    // Function to be implemented later
                    setPasswordModal(true);
                  }}
                  className="text-sm text-white bg-black flex items-center font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 border border-blue-400/50 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
                >
                  <Key className="w-4 h-4 mr-2" /> Update Password
                </button>
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
              <Edit className="w-5 h-5 mr-2 text-black" />
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
                className="text-sm text-white hover:text-white/80 flex items-center font-bold px-4 py-2 bg-black rounded-lg hover:bg-gray-700 transition-all duration-300 border border-white/20"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateLoading ? "Saving...." : "Save Changes"}
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
              <Edit className="w-5 h-5 mr-2 text-black" />
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
                className="text-sm text-white hover:text-white/80 flex items-center font-bold px-4 py-2 bg-black rounded-lg hover:bg-gray-700 transition-all duration-300 border border-white/20"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateLoading ? "Saving...." : "Save Changes"}
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
              <Edit className="w-5 h-5 mr-2 text-black" />
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
                className="text-sm text-white hover:text-white/80 flex items-center font-bold px-4 py-2 bg-black rounded-lg hover:bg-gray-700 transition-all duration-300 border border-white/20"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateLoading ? "Saving...." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
      {passwordModal && (
        <div className="fixed inset-0 bg-opacity-70 z-50 flex justify-center items-center">
          {/* Modal Content - Changed to Grayscale Theme */}
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-300 transform transition-all duration-300 ease-out scale-100">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-gray-700" /> Change Password
              </h2>
              <button
                onClick={() => {
                  setPasswordModal(false);
                  reset();
                }}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(changePassword)}>
              <div className="mb-4">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  {...register("newPassword", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must be at least 6 characters, with one uppercase, one lowercase, one number, and can include special characters",
                    },
                  })}
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter new password"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword?.message}
                </p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "This field is required",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Confirm new password"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordModal(false);
                    reset();
                  }}
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition shadow-md flex items-center justify-center gap-2
                          ${
                            updating
                              ? "bg-gray-600 cursor-not-allowed"
                              : "bg-gray-800 hover:bg-gray-700"
                          }`}
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeacher;
