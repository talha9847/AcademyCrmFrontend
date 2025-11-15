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
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    <div
      className={`mt-0.5 p-2.5 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 ${color} group-hover:shadow-md transition-shadow`}
    >
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
        {label}
      </span>
      <span className="font-semibold text-gray-900 break-words leading-relaxed">
        {value}
      </span>
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

const TProfile = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [updating, setUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const newPassword = watch("newPassword");

  const [tData, setTData] = useState({});

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

  const getTProfile = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/user/getTeacherProfile`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        console.log(result.data.data);
        setTData(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTProfile();
  }, []);

  useEffect(() => {
    if (tData?.profile_photo) {
      console.log(tData)
      fetchProfile(tData.profile_photo);
    }
  }, [tData]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

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
          <p className="text-gray-600 ml-16 text-lg">
            View and manage your profile information
          </p>
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
                    src={photoUrl}
                    alt={`${tData.full_name}'s Profile`}
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
                    {tData.staff_id}
                  </span>
                </div>
              </div>

              {/* Enhanced Basic Info */}
              <div className="flex-grow text-center md:text-left mb-4">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                  {tData.full_name}
                </h2>
                <p className="text-2xl text-gray-600 font-semibold mb-6">
                  {tData.designation}
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
                      <span className="block font-bold text-gray-900">
                        {tData.department}
                      </span>
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
                        {new Date(tData.hire_date).toLocaleDateString("en-CA")}
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
                  value={tData.email}
                  icon={Mail}
                  color="text-gray-700"
                />
                <DetailItem
                  label="Contact"
                  value={tData.mobile}
                  icon={Phone}
                  color="text-gray-700"
                />
                <DetailItem
                  label="Gender"
                  value={tData.gender}
                  icon={User}
                  color="text-gray-700"
                />
                <DetailItem
                  label="Date of Birth"
                  value={new Date(tData.birthdate).toLocaleDateString("en-CA")}
                  icon={Calendar}
                  color="text-gray-700"
                />
                <div className="sm:col-span-2">
                  <DetailItem
                    label="Address"
                    value={tData.address}
                    icon={MapPin}
                    color="text-gray-700"
                  />
                </div>
              </div>

              {/* Enhanced Change Password Block */}
              <div className="mt-8 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Account Security
                  </h4>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col flex-1 pr-0 sm:pr-4 mb-3 sm:mb-0">
                    <span className="font-bold text-gray-900 text-lg mb-1">
                      Change Account Password
                    </span>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      Update your security credentials regularly to keep your
                      account safe.
                    </span>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center px-5 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
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
        <div className="fixed inset-0 bg-opacity-70 z-50 flex justify-center items-center">
          {/* Modal Content - Changed to Grayscale Theme */}
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-300 transform transition-all duration-300 ease-out scale-100">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-gray-700" /> Change Password
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
  );
};

export default TProfile;
