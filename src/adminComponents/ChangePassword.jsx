import React, { useState } from "react";
// Assuming you use icons from a library like Lucide React
import { Lock, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const result = await axios.post(
        `${BASE_URL}/api/user/changeAdminPassword`,
        data,
        { withCredentials: true }
      );
      if (result.status == 234) {
        setLoading(false);
        navigate("/unauthorized");
      }
      if (result.status == 240) {
        setLoading(false);
        toast.error("You current password is not valid");
      }
      if (result.status == 200) {
        setLoading(false);
        toast.success("Password updated successfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Unexpected error occured");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 sm:pt-20 lg:pt-24 px-4">
        {/* Centered Card Container */}
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-100">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 mb-4 bg-black rounded-full">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Change Admin Password
            </h2>
            <p className="mt-1 text-sm text-gray-500 text-center">
              Update your account security settings.
            </p>
          </div>

          {/* Change Password Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Current Password Field */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <div className="mt-1">
                <input
                  {...register("currentPassword", {
                    required: "This field is required",
                  })}
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
                <p className="text-xs text-red-500">
                  {errors.currentPassword?.message}
                </p>
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password (min. 7 characters)
              </label>
              <div className="mt-1">
                <input
                  {...register("newPassword", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,}$/,
                      message:
                        "Password must be at least 7 characters long and include uppercase, lowercase, number, and special character",
                    },
                  })}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
                <p className="text-xs text-red-500">
                  {errors.newPassword?.message}
                </p>
              </div>
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1">
                <input
                  {...register("confirmNewPassword", {
                    required: "This field is required",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
                <p className="text-xs text-red-500">
                  {errors.confirmNewPassword?.message}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
