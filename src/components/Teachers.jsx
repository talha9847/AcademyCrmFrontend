import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";
import { Eye, Plus, Search } from "lucide-react";

const Teachers = () => {
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
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
    navigate("/student/detail", { state: { studentId: id } });
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
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
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
      </div>{" "}
    </div>
  );
};

export default Teachers;
