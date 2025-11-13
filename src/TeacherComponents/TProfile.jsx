import React, { useEffect, useState } from "react";
import TNavbar from "./TNavbar"; // Assuming a separate Teacher Navbar exists

import {
  User,
  GraduationCap,
  Calendar,
  MapPin,
  Mail,
  Phone,
  BookOpen,
  Briefcase,
  Lock,
  Key,
  ScrollText,
  X, // Added for the modal close button
} from "lucide-react";
import axios from "axios";

// --- Placeholder Data for Static Page ---
const staticTeacherData = {
  fullName: "Dr. Evelyn Reed",
  designation: "Associate Professor",
  employeeId: "TCH-00459",
  date_of_joining: "2018-08-15",
  department: "Computer Science Engineering",
  mobile: "98765 43210",
  email: "evelyn.reed@example.edu",
  address: "45-A, Faculty Residences, University Campus, Anytown - 110001",
  gender: "Female",
  date_of_birth: "1985-05-20",
  photoUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=ER", // Placeholder for photo
};

const DetailItem = ({ label, value, icon: Icon, color = "text-gray-600" }) => (
  <div className="flex items-center space-x-3 p-2 border-b last:border-b-0 border-gray-200">
    <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
    <div className="flex flex-col">
      <span className="text-xs font-medium uppercase text-gray-500">
        {label}
      </span>
      <span className="font-medium text-gray-900 break-words">{value}</span>
    </div>
  </div>
);

// Reusable component for section headers
const SectionHeader = ({ title, icon: Icon }) => (
  <h3 className="flex items-center text-xl font-bold text-gray-800 pb-3 mb-4 border-b border-gray-300">
    <Icon className="w-6 h-6 mr-2 text-gray-700" />
    {title}
  </h3>
);

// --- Static Change Password Modal Component (Simplified Static Version) ---
const ChangePasswordModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
    {/* Modal Content - Grayscale Theme */}
    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-300 transform transition-all duration-300 ease-out scale-100">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-gray-700" /> Change Password
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClose(); /* Static: Simulate close on submit */
        }}
      >
        {/* New Password Field */}
        <div className="mb-4">
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="Enter new password"
            disabled // Disabled in static version
          />
        </div>
        {/* Confirm Password Field */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="Confirm new password"
            disabled // Disabled in static version
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white rounded-md transition shadow-md flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
);

// --- Main Static Teacher Profile Component ---
const TProfile = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const [tData, setTData] = useState({});
  const getTProfile = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/user/getTeacherProfile`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTProfile();
  }, []);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal only

  const data = staticTeacherData;

  return (
    <div className="bg-gray-100 min-h-screen">
      <TNavbar /> {/* Use Teacher Navbar */}
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-2 border-b-4 border-gray-300">
          <User className="w-8 h-8 inline-block mr-2 text-gray-800" />
          Teacher Profile Overview
        </h1>

        {/* --- Header: Photo and Basic Info (Elevated Card) --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10 flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-200">
          {/* Photo & ID */}
          <div className="flex flex-col items-center">
            <img
              src={data.photoUrl}
              alt={`${data.fullName}'s Profile`}
              className="w-36 h-36 object-cover rounded-full border-4 border-gray-400 shadow-md"
            />
            <p className="mt-4 text-center">
              <span className="block text-sm font-semibold text-gray-500">
                Employee ID:
              </span>
              <span className="block text-xl font-bold text-gray-900">
                {data.employeeId}
              </span>
            </p>
          </div>
          {/* Basic Info & Department Summary */}
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900">
              {data.fullName}
            </h2>
            <p className="text-2xl text-gray-600 font-medium mt-1 mb-4">
              {data.designation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-300">
              <DetailItem
                label="Department"
                value={data.department}
                icon={BookOpen}
                color="text-gray-700"
              />
              <DetailItem
                label="Date of Joining"
                value={new Date(data.date_of_joining).toLocaleDateString(
                  "en-CA"
                )}
                icon={Calendar}
                color="text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 1. Contact & Personal Details Card (Large) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <SectionHeader
              title="Personal & Contact Information"
              icon={ScrollText}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <DetailItem
                label="Email"
                value={data.email}
                icon={Mail}
                color="text-gray-700"
              />
              <DetailItem
                label="Contact"
                value={data.mobile}
                icon={Phone}
                color="text-gray-700"
              />
              <DetailItem
                label="Gender"
                value={data.gender}
                icon={User}
                color="text-gray-700"
              />
              <DetailItem
                label="Date of Birth"
                value={new Date(data.date_of_birth).toLocaleDateString("en-CA")}
                icon={Calendar}
                color="text-gray-700"
              />
              <div className="sm:col-span-2">
                <DetailItem
                  label="Address"
                  value={data.address}
                  icon={MapPin}
                  color="text-gray-700"
                />
              </div>
            </div>

            {/* Change Password Block - Black/White */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border-t-4 border-gray-800">
              <SectionHeader title="Account Security" icon={Lock} />
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
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition duration-150 shadow-md"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Render the Change Password Modal */}
      {isModalOpen && (
        <ChangePasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TProfile;
