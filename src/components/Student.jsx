import React, { useEffect, useState } from "react";
import { Eye, Plus, X, Search, Users } from "lucide-react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Mock AdminNavbar component

const Student = () => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [classId, setClassId] = useState(null);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitStudent = async (data) => {
    if (!data.sectionId) data.sectionId = 1;

    try {
      const result = await axios.post(
        "http://localhost:5000/api/user/createStudent",
        data,
        { withCredentials: true }
      );

      if (result.status === 201 && result.data.success) {
        toast.success("🎓 Student added successfully!");

        // Fetch updated list before closing modal
        await getStudents();

        // Then reset form & close modal
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

  async function getStudents() {
    console.log("I am called");
    const result = await axios.get(
      "http://localhost:5000/api/user/getAllStudents",
      { withCredentials: true }
    );
    if (result.status == 200) {
      console.log("  i am here still what is ngoijij kjlfkl kdjsl ksdfkl ");
      setStudents(result.data.result);
    }
  }
  const handleViewButton = (id) => {
    navigate("/student/detail", { state: { studentId: id } });
  };
  async function getClasses() {
    const result = await axios.get(
      "http://localhost:5000/api/extras/getClasses",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setClasses(result.data.data);
    }
  }

  async function getSectionById(classId) {
    if (classId > 0) {
      const result = await axios.get(
        "http://localhost:5000/api/extras/getSectionById",
        {
          params: { id: classId },
          withCredentials: true,
        }
      );
      if (result.status == 200) {
        setSections(result.data.data);
      }
    }
  }

  async function getSession() {
    const result = await axios.get(
      "http://localhost:5000/api/extras/getSessions",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setSessions(result.data.data);
    }
  }
  useEffect(() => {
    getSectionById(classId);
  }, [classId]);

  useEffect(() => {
    getStudents();
    getClasses();
    getSession();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
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
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black">Students</h1>
            <p className="text-gray-600 mt-1">
              Manage and view all student records
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Student
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

        {/* Students Table */}
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
                    Class
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
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs font-medium">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border-2 border-black">
            {/* Modal Header */}
            <div className="sticky top-0 bg-black text-white px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">Add New Student</h2>
              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-gray-800 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(submitStudent)} className="p-6">
              {/* Student Information Section */}
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
                        required: "Full name is required",
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
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.email?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="classId"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Class ID
                    </label>
                    <select
                      {...register("classId", {
                        required: "Please select class",
                        onChange: (e) => setClassId(e.target.value), // ✅ use onChange inside register
                      })}
                      id="classId"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    >
                      <option value="">--select class--</option>
                      {classes.map((val) => (
                        <option key={val.id} value={val.id}>
                          {val.name}
                        </option>
                      ))}
                    </select>

                    <p className="text-red-500 text-xs">
                      {errors.classId?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="sectionId"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Section ID
                    </label>
                    <select
                      {...register("sectionId", {
                        required: false,
                      })}
                      id="sectionId"
                      name="sectionId"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                      disabled={classId == null}
                    >
                      <option key={0} value="">
                        --select section--
                      </option>
                      {sections.map((val, ind) => (
                        <option key={ind + 1} value={val.id}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="admissionNumber"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Admission Number
                    </label>
                    <input
                      {...register("admissionNumber", {
                        required: "Admission Number is required",
                      })}
                      id="admissionNumber"
                      name="admissionNumber"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.admissionNumber?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="rollNo"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Roll Number
                    </label>
                    <input
                      {...register("rollNo", {
                        required: "Roll No is required",
                      })}
                      id="rollNo"
                      name="rollNo"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.rollNo?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="dob"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Date of Birth
                    </label>
                    <input
                      {...register("dob", {
                        required: "Date of birth is required",
                      })}
                      id="dob"
                      name="dob"
                      type="date"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.dob?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Gender
                    </label>
                    <select
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      id="gender"
                      name="gender"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <p className="text-red-500 text-xs">
                      {errors.gender?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="sessionId"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Session ID
                    </label>
                    <select
                      {...register("sessionId", {
                        required: "Session is required",
                      })}
                      id="sessionId"
                      name="sessionId"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    >
                      <option key={0} value="">
                        --select session--
                      </option>
                      {sessions.map((val, ind) => (
                        <option key={ind + 1} value={val.id}>
                          {val.timing}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-xs">
                      {errors.sessionId?.message}
                    </p>
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label
                      htmlFor="address"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Address
                    </label>
                    <input
                      {...register("address", {
                        required: "Address is required",
                      })}
                      id="address"
                      name="address"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.address?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="totalFee"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Total Fee
                    </label>
                    <input
                      {...register("totalFee", {
                        required: "Total fee is required",
                      })}
                      id="totalFee"
                      name="totalFee"
                      type="number"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.totalFee?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Due Date
                    </label>
                    <input
                      {...register("dueDate", {
                        required: "Due date is required",
                      })}
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.dueDate?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="discount"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Discount (%)
                    </label>
                    <input
                      {...register("discount")}
                      id="discount"
                      name="discount"
                      type="number"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label
                      htmlFor="description"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      id="description"
                      name="description"
                      rows="3"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    ></textarea>
                    <p className="text-red-500 text-xs">
                      {errors.description?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-black">
                  Parent Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="p_name"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Parent Name
                    </label>
                    <input
                      {...register("p_name", {
                        required: "parent name is required",
                      })}
                      id="p_name"
                      name="p_name"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.p_name?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="p_phone"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Phone
                    </label>
                    <input
                      {...register("p_phone", {
                        required: "parent contact number is required",
                      })}
                      id="p_phone"
                      name="p_phone"
                      type="tel"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.p_phone?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="p_email"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Email
                    </label>
                    <input
                      {...register("p_email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      id="p_email"
                      name="p_email"
                      type="email"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.p_email?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="p_relation"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Relation
                    </label>
                    <input
                      {...register("p_relation", {
                        required: "Relation is required",
                      })}
                      id="p_relation"
                      name="p_relation"
                      type="text"
                      placeholder="e.g., Father, Mother"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.p_relation?.message}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="p_occupation"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Occupation
                    </label>
                    <input
                      {...register("p_occupation", {
                        required: "Occupation is required",
                      })}
                      id="p_occupation"
                      name="p_occupation"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.p_occupation?.message}
                    </p>
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label
                      htmlFor="p_address"
                      className="block mb-2 font-semibold text-gray-900 text-sm"
                    >
                      Address
                    </label>
                    <input
                      {...register("p_address", {
                        required: "Address is required",
                      })}
                      id="p_address"
                      name="p_address"
                      type="text"
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-black focus:outline-none transition-colors"
                    />
                    <p className="text-red-500 text-xs">
                      {errors.p_address?.message}
                    </p>
                  </div>
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
