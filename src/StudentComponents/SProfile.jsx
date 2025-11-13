import React, { useEffect, useState } from "react";
import SNavbar from "./SNavbar";

import {
  User,
  GraduationCap,
  DollarSign,
  Calendar,
  Shield,
  MapPin,
  Mail,
  Phone,
  AtSign,
  ScrollText,
  Key,
  Lock,
  Loader2,
  X, // Added for the modal close button
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Helper function to format currency (Assuming INR based on usage)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

// --- Static Change Password Modal Component (New) ---

// --- Main Component ---
const SProfile = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState(null);
  const [signUrl, setSignUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const newPassword = watch("newPassword");

  const changePassword = async (data) => {
    setUpdating(true);
    console.log(data);
    try {
      const result = await axios.post(
        `${BASE_URL}/api/student/changePassword`,
        data,
        { withCredentials: true }
      );
      if (result.status == 200) {
        setUpdating(false);
        setIsModalOpen(false);
        toast.success("password updated successfully");
      }
      if (result.status == 233) {
        setUpdating(false);
        setIsModalOpen(false);

        toast.warn("Your password can't be same as previous one");
      }
    } catch (error) {
      setUpdating(false);
      toast.error("Internal server error");
      setIsModalOpen(false);
      console.log(error);
    }
  };

  const getProfileData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/student/profile`, {
        withCredentials: true,
      });
      if (result.status == 210) {
        navigate("/unauthorized");
      }
      if (result.status == 200) {
        setLoading(false);
        setData(result.data.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Internal server error");
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  const fetchProfile = async (fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setPhotoUrl(url);
    } catch (err) {
      console.error("Failed to load photo:", err);
    }
  };
  const fetchSign = async (fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setSignUrl(url);
    } catch (err) {
      console.error("Failed to load photo:", err);
    }
  };

  useEffect(() => {
    if (data?.profile_photo) {
      fetchProfile(data.profile_photo);
      fetchSign(data.signature_photo);
    }
  }, [data]);
  // Reusable component for displaying a detail item
  const DetailItem = ({
    label,
    value,
    icon: Icon,
    color = "text-gray-600", // Changed default color
  }) => (
    <div className="flex items-center space-x-3 p-2 border-b last:border-b-0 border-gray-200">
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase text-gray-500">
          {label}
        </span>
        <span className="font-medium text-gray-900 break-words">{value}</span>{" "}
        {/* Changed value color */}
      </div>
    </div>
  );

  // Reusable component for section headers
  const SectionHeader = ({ title, icon: Icon }) => (
    <h3 className="flex items-center text-xl font-bold text-gray-800 pb-3 mb-4 border-b border-gray-300">
      {" "}
      {/* Changed border color */}
      <Icon className="w-6 h-6 mr-2 text-gray-700" /> {/* Changed icon color */}
      {title}
    </h3>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {" "}
      {/* Changed main background to light gray */}
      <SNavbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-2 border-b-4 border-gray-300">
          {" "}
          {/* Changed border color */}
          <User className="w-8 h-8 inline-block mr-2 text-gray-800" />{" "}
          {/* Changed icon color */}
          Student Profile Overview
        </h1>

        {/* --- Header: Photo and Basic Info (Elevated Card) --- */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-gray-600" />{" "}
              {/* Changed loader color */}
              <p className="text-gray-500 font-medium text-lg">
                Loading student details...
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg mb-10 flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-200">
              {" "}
              {/* Added border */}
              {/* Photo & ID */}
              <div className="flex flex-col items-center">
                <img
                  src={`${photoUrl}`}
                  alt={`${data.fullName}'s Profile`}
                  className="w-36 h-36 object-cover rounded-full border-4 border-gray-400 shadow-md" // Changed border color
                />
                <p className="mt-4 text-center">
                  <span className="block text-sm font-semibold text-gray-500">
                    ID: {data.admission_number}
                  </span>
                  <span className="block text-xl font-bold text-gray-900">
                    {data.rollNo}
                  </span>
                </p>
              </div>
              {/* Basic Info & Academic Summary */}
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-gray-900">
                  {data.fullName}
                </h2>
                <p className="text-2xl text-gray-600 font-medium mt-1 mb-4">
                  {" "}
                  {/* Changed text color */}
                  {data.name}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-300">
                  {" "}
                  {/* Changed border color */}
                  <DetailItem
                    label="Email"
                    value={data.email}
                    icon={Mail}
                    color="text-gray-700" // Changed color
                  />
                  <DetailItem
                    label="Session"
                    value={data.timing}
                    icon={Calendar}
                    color="text-gray-700" // Changed color
                  />
                  <DetailItem
                    label="Gender"
                    value={data.gender}
                    icon={User}
                    color="text-gray-700"
                  />{" "}
                  {/* Changed color */}
                  <DetailItem
                    label="Date of Birth"
                    value={new Date(data.date_of_birth).toLocaleDateString(
                      "en-CA"
                    )}
                    icon={Calendar}
                    color="text-gray-700" // Changed color
                  />
                  <DetailItem
                    label="Contact"
                    value={data.mobile}
                    icon={Phone}
                    color="text-gray-700" // Changed color
                  />
                </div>
              </div>
            </div>

            {/* --- Main Content Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 1. Details & Guardian Card (Large) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                {" "}
                {/* Added border */}
                <SectionHeader
                  title="Personal & Contact Information"
                  icon={ScrollText}
                />
                <div className="space-y-4">
                  <DetailItem
                    label="Address"
                    value={data.address}
                    icon={MapPin}
                    color="text-gray-700" // Changed color
                  />
                </div>
                <SectionHeader title="Parent/Guardian Details" icon={Shield} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <DetailItem
                    label="Name & Relation"
                    value={`${data.full_name} (${data.relation})`}
                    icon={User}
                    color="text-gray-700"
                  />
                  <DetailItem
                    label="Occupation"
                    value={data.occupation}
                    icon={GraduationCap}
                    color="text-gray-700"
                  />
                  <DetailItem
                    label="Phone"
                    value={data.phone}
                    icon={Phone}
                    color="text-gray-700"
                  />
                  <DetailItem
                    label="Email"
                    value={data.email}
                    icon={Mail}
                    color="text-gray-700"
                  />
                </div>
                {/* Change Password Block - Updated to Black/White */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-800">
                  {" "}
                  {/* Changed border color */}
                  <SectionHeader title="Account Security" icon={Lock} />{" "}
                  {/* Changed Header */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        Change Account Password
                      </span>
                      <span className="text-sm text-gray-500">
                        Update your security credentials regularly to keep your
                        account safe.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                      }} // Added click handler
                      className="flex items-center px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition duration-150 shadow-md" // Changed button style
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Fee & Signature Column */}
              <div className="lg:col-span-1 space-y-8">
                {/* Fee Summary Card - Updated to Black/White */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-800 border border-gray-200">
                  {" "}
                  {/* Changed border color and added full border */}
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                    {" "}
                    {/* Changed text color */}
                    <DollarSign className="w-6 h-6 mr-2 text-gray-700" />{" "}
                    {/* Changed icon color */}
                    Fee Structure
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-end border-b pb-2 border-gray-300">
                      <span className="text-gray-600 font-medium">
                        Total Fee:
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {formatCurrency(data.total_fee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-end border-b pb-2 border-gray-300">
                      <span className="text-gray-600 font-medium">
                        Discount:
                      </span>
                      <span className="text-lg font-semibold text-red-600">
                        {" "}
                        {/* Kept red for discount/negative value */}
                        (-{formatCurrency(data.discount)})
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-gray-100 p-2 rounded-lg border border-gray-300">
                      {" "}
                      {/* Changed background to light gray */}
                      <span className="text-xl font-bold text-gray-800">
                        {" "}
                        {/* Changed text color */}
                        Net Payable:
                      </span>
                      <span className="text-2xl font-extrabold text-gray-900">
                        {" "}
                        {/* Changed text color */}
                        {formatCurrency(data.payable)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">
                      Payment Due:
                    </span>{" "}
                    {data.dueDate}
                  </p>
                </div>

                {/* Signature Card */}
                <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
                  {" "}
                  {/* Added border */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-300">
                    Official Signature
                  </h3>
                  <img
                    src={signUrl}
                    alt={`${data.fullName}'s Signature`}
                    className="w-full h-20 max-w-sm mx-auto border-2 border-gray-400 p-2 bg-white object-contain" // Changed border color, added object-contain
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    {data.full_name}'s Signature
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-70 z-50 flex justify-center items-center">
            {/* Modal Content - Changed to Grayscale Theme */}
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-300 transform transition-all duration-300 ease-out scale-100">
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-gray-700" /> Change
                  Password
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
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
                      setIsModalOpen(false);
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
      {/* Render the Change Password Modal */}
    </div>
  );
};

export default SProfile;
