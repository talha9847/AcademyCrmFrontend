import React, { useEffect, useState } from "react";
import TNavbar from "./TNavbar";

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
  X,
  Shield,
  Award,
} from "lucide-react";
import axios from "axios";

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
  photoUrl: "https://via.placeholder.com/150/808080/FFFFFF?text=ER",
};

const DetailItem = ({ label, value, icon: Icon, color = "text-gray-600" }) => (
  <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
    <div className={`mt-0.5 p-2.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 ${color} group-hover:shadow-md transition-shadow`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
        {label}
      </span>
      <span className="font-semibold text-gray-900 break-words leading-relaxed">{value}</span>
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
  </div>
);

const ChangePasswordModal = ({ onClose }) => (
  <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-in fade-in duration-200">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 transform transition-all duration-300 ease-out scale-100 animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
              placeholder="Enter new password"
              disabled
            />
          </div>
          
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
              placeholder="Confirm new password"
              disabled
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800"
          >
            <Key className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
);

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const data = staticTeacherData;

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      <TNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Enhanced Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Teacher Profile
            </h1>
          </div>
          <p className="text-gray-600 ml-16 text-lg">View and manage your profile information</p>
        </div>

        {/* Enhanced Header Card with Gradient */}
        <div className="bg-white rounded-2xl shadow-xl mb-10 overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 h-32"></div>
          <div className="px-8 pb-8 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              {/* Enhanced Photo */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={data.photoUrl}
                    alt={`${data.fullName}'s Profile`}
                    className="w-40 h-40 object-cover rounded-2xl border-4 border-white shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
                  <span className="block text-xs font-semibold text-gray-500 text-center">
                    Employee ID
                  </span>
                  <span className="block text-lg font-bold text-gray-900 text-center">
                    {data.employeeId}
                  </span>
                </div>
              </div>

              {/* Enhanced Basic Info */}
              <div className="flex-grow text-center md:text-left mb-4">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                  {data.fullName}
                </h2>
                <p className="text-2xl text-gray-600 font-semibold mb-6">
                  {data.designation}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      <BookOpen className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Department
                      </span>
                      <span className="block font-bold text-gray-900">{data.department}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      <Calendar className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Joined
                      </span>
                      <span className="block font-bold text-gray-900">
                        {new Date(data.date_of_joining).toLocaleDateString("en-CA")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Contact & Personal Details Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8">
              <SectionHeader
                title="Personal & Contact Information"
                icon={ScrollText}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

              {/* Enhanced Change Password Block */}
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Account Security</h4>
                </div>
                <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col flex-1 pr-4">
                    <span className="font-bold text-gray-900 text-lg mb-1">
                      Change Account Password
                    </span>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      Update your security credentials regularly to keep your account safe.
                    </span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-5 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    <Key className="w-5 h-5 mr-2" />
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <ChangePasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TProfile;