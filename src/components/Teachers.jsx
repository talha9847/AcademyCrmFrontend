import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";
import { Eye, Loader2, Plus, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teachers = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function getStudents() {
    const result = await axios.get(`${BASE_URL}/api/user/getAllTeachers`, {
      withCredentials: true,
    });
    if (result.status == 200) {
      console.log(result.data.data);
      setTeachers(result.data.data);
    }
  }
  const handleViewButton = (id) => {
    navigate("/teacher/detail", { state: { teacherId: id } });
    console.log(id);
  };

  useEffect(() => {
    getStudents();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = teachers.filter(
    (student) =>
      student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append("address", data.address);
    formData.append("birthdate", data.birthday);
    formData.append("department", data.department);
    formData.append("designation", data.designation);
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("gender", data.gender);
    formData.append("hireDate", data.hireDate);
    formData.append("mobile", data.mobile);
    formData.append("profilePhoto", data.profilePhoto[0]);

    if (!data.sectionId) data.sectionId = 1;

    try {
      const result = await axios.post(
        `${BASE_URL}/api/user/createTeacher`,
        formData,
        { withCredentials: true }
      );

      if (result.status === 200 && result.data.success) {
        toast.success("🎓 Teacher added successfully!");

        await getStudents();

        reset();
        setLoading(false);
        setShowModal(false);
      } else {
        toast.error(result.data.message || "Something went wrong!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || "Server error. Please try again."
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black">Teachers</h1>
            <p className="text-gray-600 mt-1">
              Manage and view all Teachers data
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Teacher
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
          />
        </div>

        <div className="bg-white border-2 border-black rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((row, ind) => (
                    <tr
                      key={ind}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ind + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {row.full_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {row.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {row.department == null ? "Not Found" : row.department}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-900">
                        <span className="px-1 bg-gray-100 border border-gray-300 rounded-full text-xs font-medium">
                          {row.gender === null ? "Not Found" : row.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleViewButton(row.id)}
                          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50 p-4">
          {/* Modal Container */}
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border-4 border-black">
            {/* Modal Header - STICKY TOP */}
            <div className="sticky top-0 bg-black text-white px-6 py-4 flex justify-between items-center shadow-lg z-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Add New Teacher
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close modal"
              >
                {/* Assuming X is an icon component */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
              <fieldset className="space-y-6">
                <legend className="text-xl font-bold mb-6 pb-2 border-b-2 border-gray-300">
                  Teacher Details
                </legend>

                {/* Row 1: Full Name, Email, Birthday, Hire Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Full Name *
                    </label>
                    <input
                      {...register("fullName", {
                        required: "Full Name is required",
                      })}
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.fullName?.message}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Email *
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      id="email"
                      name="email"
                      type="email"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.email?.message}
                    </p>
                  </div>

                  {/* Birthday - NEW FIELD */}
                  <div>
                    <label
                      htmlFor="birthday"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Birthday *
                    </label>
                    <input
                      {...register("birthday", {
                        required: "Birthday is required",
                      })}
                      id="birthday"
                      name="birthday"
                      type="date"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.birthday?.message}
                    </p>
                  </div>

                  {/* Hire Date */}
                  <div>
                    <label
                      htmlFor="hireDate"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Hire Date *
                    </label>
                    <input
                      {...register("hireDate", {
                        required: "Hire date is required",
                      })}
                      id="hireDate"
                      name="hireDate"
                      type="date"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.hireDate?.message}
                    </p>
                  </div>
                </div>

                {/* Row 2: Department, Gender, Designation, Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Department */}
                  <div>
                    <label
                      htmlFor="department"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Department *
                    </label>
                    <input
                      {...register("department", {
                        required: "Department is required",
                      })}
                      id="department"
                      name="department"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.department?.message}
                    </p>
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Gender *
                    </label>
                    <select
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      id="gender"
                      name="gender"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <p className="text-red-600 text-xs mt-1">
                      {errors.gender?.message}
                    </p>
                  </div>

                  {/* Designation */}
                  <div>
                    <label
                      htmlFor="designation"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Designation *
                    </label>
                    <input
                      {...register("designation", {
                        required: "Designation is required",
                      })}
                      id="designation"
                      name="designation"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.designation?.message}
                    </p>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Mobile *
                    </label>
                    <input
                      {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^\d{10,}$/,
                          message: "Please enter a valid mobile number",
                        },
                      })}
                      id="mobile"
                      name="mobile"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.mobile?.message}
                    </p>
                  </div>
                </div>

                {/* Row 3: Address & Digital Signature */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Address *
                    </label>
                    {/* Using textarea for address */}
                    <textarea
                      {...register("address", {
                        required: "Address is required",
                      })}
                      id="address"
                      name="address"
                      rows="2"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors resize-none"
                    ></textarea>
                    <p className="text-red-600 text-xs mt-1">
                      {errors.address?.message}
                    </p>
                  </div>

                  {/* Digital Signature - Styled as a simple, modern input */}
                  <div>
                    <label
                      htmlFor="profilePhoto"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Profile Photo *
                    </label>
                    <input
                      {...register("profilePhoto", {
                        required: "Profile Photo  is required",
                      })}
                      id="profilePhoto"
                      name="profilePhoto"
                      type="file"
                      accept="image/*"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 transition-colors cursor-pointer focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <p className="text-red-600 text-xs mt-1">
                      {errors.profilePhoto?.message}
                    </p>
                  </div>
                </div>
              </fieldset>

              {/* Buttons - Separated by a thin divider */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Submit</span>
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

export default Teachers;
