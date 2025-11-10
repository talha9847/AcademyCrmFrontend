import React, { useEffect, useState } from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";
import { X, Plus, Edit2, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Classes = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [classes, setClasses] = useState([]);
  const [classModal, setClassModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sessionModal, setSessionModal] = useState(false);
  const [sections, setSections] = useState([]);
  const [sectionModal, setSectionModal] = useState(false);
  const [className, setClassName] = useState("");
  const [editId, setEditId] = useState(0);
  const [edit, setEdit] = useState(false);

  async function getClasses() {
    const result = await axios.get(
      `${BASE_URL}/api/extras/getClasses`,
      { withCredentials: true }
    );
    if (result.status == 200) {
      setClasses(result.data.data);
    }
  }
  async function getSessions() {
    const result = await axios.get(
      `${BASE_URL}/api/extras/getSessions`,
      { withCredentials: true }
    );
    if (result.status == 200) {
      setSessions(result.data.data);
    }
  }
  async function getSections() {
    const result = await axios.get(
      `${BASE_URL}/api/extras/getSections`,
      { withCredentials: true }
    );
    if (result.status == 200) {
      setSections(result.data.data);
    }
  }

  const addClassHandle = async () => {
    if (edit) {
      const result = await axios.post(
        `${BASE_URL}/api/extras/updateClass`,
        { id: editId, name: className },
        {
          withCredentials: true,
        }
      );
      if (result.status == 200) {
        getClasses();
        setEdit(false);
        setClassName();
        setClassModal(false);
        setEdit(0);
        toast.success("Class updated Successfully");
      }
    } else {
      const result = await axios.post(
        `${BASE_URL}/api/extras/addClass`,
        { name: className },
        { withCredentials: true }
      );
      if (result.status == 200) {
        getClasses();
        setClassName();
        setClassModal(false);
        toast.success("Class added successfully");
      }
    }
  };

  const sessionHandle = async () => {
    if (edit) {
      const result = await axios.post(
        `${BASE_URL}/api/extras/updateSession`,
        {
          timing: className,
          id: editId,
        },
        { withCredentials: true }
      );
      if (result.status == 200) {
        getSessions();
        setSessionModal(false);
        setEditId(0);
        setEdit(false);
        setClassName("");
        toast.success("Session timing updated successfully");
      } else {
        setSessionModal(false);
        setEditId(0);
        setEdit(false);
        setClassName("");
        toast.error("Internal server error");
      }
    } else {
      const result = await axios.post(
        `${BASE_URL}/api/extras/addSession`,
        { timing: className },
        { withCredentials: true }
      );
      if (result.status == 200) {
        getSessions();
        setSessionModal(false);
        setEditId(0);
        setEdit(false);
        setClassName("");
        toast.success("Session timing updated successfully");
      } else {
        setSessionModal(false);
        setEditId(0);
        setEdit(false);
        setClassName("");
        toast.error("Internal server error");
      }
    }
  };

  useEffect(() => {
    getClasses();
    getSessions();
    getSections();
  }, []);

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
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Classes Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Classes</h2>
            <button
              onClick={() => {
                setEdit(false);
                setClassModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Class
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {classes.map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {data.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setClassName(data.name);
                            setClassModal(true);
                            setEdit(true);
                            setEditId(data.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sessions</h2>
            <button
              onClick={() => {
                setSessionModal(true);
                setEdit(false);
                setEditId(0);
                setClassName("");
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Session
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Timings
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sessions.map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {data.timing}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEdit(true);
                            setClassName(data.timing);
                            setEditId(data.id);
                            setSessionModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sections</h2>
            <button
              onClick={() => setSectionModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Section
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((cls) => (
              <div
                key={cls.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  {cls.name}
                </h3>
                <ul className="space-y-2">
                  {cls.sections.map((sec) => (
                    <li
                      key={sec.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <span className="text-gray-700">{sec.name}</span>
                      <div className="flex gap-1">
                        <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors cursor-pointer">
                          <Edit2 size={14} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors cursor-pointer">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {classModal && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setClassModal(false);
                setEdit(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {edit ? "Update Class" : "Add Class"}
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="className"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Class Name
                </label>
                <input
                  id="className"
                  type="text"
                  name="name"
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter class name"
                />
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setClassModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    addClassHandle(className);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {edit ? "Update Class" : "Add Class"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {sessionModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSessionModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {edit ? "Update Session" : "Add Session"}
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="sessionTiming"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Session Timing
                </label>
                <input
                  id="sessionTiming"
                  type="text"
                  name="name"
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., 9:00 AM - 10:00 AM"
                />
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setSessionModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    sessionHandle();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {edit ? "Update Session" : "Add Session"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {sectionModal && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSectionModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Add New Section
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="selectClass"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Class
                </label>
                <select
                  id="selectClass"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Choose a class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="sectionName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Section Name
                </label>
                <input
                  id="sectionName"
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Section A"
                />
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setSectionModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Add Section
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
