import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";
import { Eye, Plus, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teachers = () => {
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  async function getStudents() {
    const result = await axios.get(
      "http://localhost:5000/api/user/getAllTeachers",
      { withCredentials: true }
    );
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
    if (!data.sectionId) data.sectionId = 1;

    try {
      const result = await axios.post(
        "http://localhost:5000/api/user/createTeacher",
        data,
        { withCredentials: true }
      );

      if (result.status === 201 && result.data.success) {
        toast.success("🎓 Teacher added successfully!");

        await getStudents();

        reset();
        setShowModal(false);
      } else {
        toast.error(result.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting student:", error);
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
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border-2 border-black">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black text-white px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">Add New Teacher</h2>
              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-gray-800 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} action="" className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-black">
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.fullName?.message}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="fullName"
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
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.email?.message}
                    </p>
                  </div>

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
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.hireDate?.message}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.department?.message}
                    </p>
                  </div>
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
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <p className="text-red-500 text-xs">
                      {errors.gender?.message}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t-2 border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
