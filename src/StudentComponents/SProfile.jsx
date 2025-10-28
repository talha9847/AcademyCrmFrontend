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
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const STUDENT_PROFILE_DATA = {
  fullName: "Alex Johnson",
  email: "alex.johnson@example.edu",
  admissionNumber: "ADM/2024/0101",
  rollNo: "S05",
  class: "Web Development Fundamentals",
  section: "A",
  sessionId: "2024-2025",
  dob: "1998-07-21",
  gender: "Male",
  address: "123 Technology Ave, Silicon Valley, CA 94000",

  totalFee: 15000,
  discount: 1500,
  netFee: 13500,
  dueDate: "2024-11-15",
  description: "Annual course fee covering tuition and material.",

  p_name: "Sarah Johnson",
  p_phone: "+1 (555) 123-4567",
  p_email: "sarah.parent@example.com",
  p_relation: "Mother",
  p_occupation: "Software Engineer",
  p_address: "123 Technology Ave, Silicon Valley, CA 94000",

  // Images
  photoUrl: "https://via.placeholder.com/150/1f2937/FFFFFF?text=A.J.",
  signatureUrl:
    "https://via.placeholder.com/300x80/f3f4f6/1f2937?text=Digital+Signature",
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

// --- Main Component ---
const SProfile = () => {
  const navigate = useNavigate();
  const getProfileData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/student/profile",
        { withCredentials: true }
      );
      if (result.status == 210) {
        navigate("/unauthorized");
      }
      if (result.status == 200) {
        console.log(result.data.data);
        setData(result.data.data);
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);
  const [data, setData] = useState({});
  // Reusable component for displaying a detail item
  const DetailItem = ({
    label,
    value,
    icon: Icon,
    color = "text-gray-500",
  }) => (
    <div className="flex items-center space-x-3 p-2 border-b last:border-b-0 border-gray-100">
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase text-gray-500">
          {label}
        </span>
        <span className="font-medium text-gray-800 break-words">{value}</span>
      </div>
    </div>
  );

  // Reusable component for section headers
  const SectionHeader = ({ title, icon: Icon }) => (
    <h3 className="flex items-center text-xl font-bold text-gray-800 pb-3 mb-4 border-b border-gray-200">
      <Icon className="w-6 h-6 mr-2 text-indigo-600" />
      {title}
    </h3>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <SNavbar />
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
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-2 border-b-4 border-indigo-100">
          <User className="w-8 h-8 inline-block mr-2 text-indigo-600" />{" "}
          {/* Lucide User icon */}
          Student Profile Overview
        </h1>

        {/* --- Header: Photo and Basic Info (Elevated Card) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Photo & ID */}
          <div className="flex flex-col items-center">
            <img
              src={`http://localhost:5000/uploads/${data.profile_photo}`}
              alt={`${data.fullName}'s Profile`}
              className="w-36 h-36 object-cover rounded-full border-4 border-indigo-500 shadow-md"
            />
            <p className="mt-4 text-center">
              <span className="block text-sm font-semibold text-gray-500">
                ID: {data.admissionNumber}
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
            <p className="text-2xl text-indigo-600 font-medium mt-1 mb-4">
              {data.name}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <DetailItem
                label="Email"
                value={data.email}
                icon={Mail}
                color="text-blue-500"
              />
              <DetailItem label="Session" value={data.timing} icon={Calendar} />
              <DetailItem label="Gender" value={data.gender} icon={User} />
              <DetailItem
                label="Date of Birth"
                value={new Date(data.date_of_birth).toLocaleDateString("en-CA")}
                icon={Calendar}
              />
              <DetailItem
                label="Contact"
                value={data.p_phone}
                icon={Phone}
                color="text-green-500"
              />
            </div>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 1. Details & Guardian Card (Large) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <SectionHeader
              title="Personal & Contact Information"
              icon={ScrollText}
            />{" "}
            {/* Lucide ScrollText */}
            <div className="space-y-4">
              <DetailItem
                label="Address"
                value={data.address}
                icon={MapPin}
                color="text-red-500"
              />
            </div>
            <SectionHeader title="Parent/Guardian Details" icon={Shield} />{" "}
            {/* Lucide Shield */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <DetailItem
                label="Name & Relation"
                value={`${data.full_name} (${data.relation})`}
                icon={User}
              />
              <DetailItem
                label="Occupation"
                value={data.occupation}
                icon={GraduationCap}
              />
              <DetailItem label="Phone" value={data.phone} icon={Phone} />
              <DetailItem label="Email" value={data.email} icon={Mail} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-slate-600">
              <SectionHeader title="Parent/Guardian Details" icon={Lock} />{" "}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    Change Account Password
                  </span>
                  <span className="text-sm text-gray-500">
                    Update your security credentials regularly.
                  </span>
                </div>
                <button
                  // onClick={handleChangePassword}
                  className="flex items-center px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition duration-150 shadow-md"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* 2. Fee & Signature Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Fee Summary Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-600">
              <h3 className="text-2xl font-bold text-indigo-700 flex items-center mb-4">
                <DollarSign className="w-6 h-6 mr-2" />{" "}
                {/* Lucide DollarSign */}
                Fee Structure
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-end border-b pb-2 border-gray-200">
                  <span className="text-gray-600 font-medium">Total Fee:</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {formatCurrency(data.total_fee)}
                  </span>
                </div>
                <div className="flex justify-between items-end border-b pb-2 border-gray-200">
                  <span className="text-gray-600 font-medium">Discount:</span>
                  <span className="text-lg font-semibold text-red-600">
                    (-{formatCurrency(data.discount)})
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 bg-indigo-50 p-2 rounded-lg">
                  <span className="text-xl font-bold text-indigo-700">
                    Net Payable:
                  </span>
                  <span className="text-2xl font-extrabold text-indigo-800">
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
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Official Signatures
              </h3>
              <img
              src={`http://localhost:5000/uploads/${data.signature_photo}`}
                alt={`${data.fullName}'s Signature`}
                className="w-full h-20 max-w-sm mx-auto border-2 border-gray-300 p-2 bg-white"
              />
              <p className="mt-2 text-sm text-gray-500">{data.full_name}'s Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SProfile;
