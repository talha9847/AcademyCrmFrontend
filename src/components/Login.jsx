import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function formSubmit(data) {
    console.log(data);

    const result = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email: data.identifier, password: data.password },
      { withCredentials: true }
    );
    if (result.status == 200) {
      if (result.data.role == "admin") {
        window.location.href = "/admin/dashboard";
      }
      if (result.data.role == "teacher") {
        window.location.href = "teacher/dashboard";
      }
      if (result.data.role == "student") {
        window.location.href = "student/dashboard";
      }
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-gray-100 min-h-[88.5vh] flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
            {/* Email/Mobile Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email, Mobile
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  {...register("identifier", {
                    required: "Email is required",
                  })}
                  type="text"
                  placeholder="Enter your email or mobile"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                />
              </div>
              <p className="text-red-500 text-sm">
                {errors.identifier?.message}
              </p>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgotpassword"
                  className="text-sm text-black hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "At least 6 character",
                    },
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-md  focus:border-black text-sm"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
            >
              {!loading ? (
                "Sign in"
              ) : (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-sm">Signing in...</span>
                </div>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signone"
              className="text-black font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
