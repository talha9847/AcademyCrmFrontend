import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Certificate = () => {
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [classId, setClassId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [templates, setTemplates] = useState([]);
  const [student, setStudent] = useState([]);
  const [templateId, setTemplateId] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  const navigate = useNavigate();

  const getClasses = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/extras/getClasses",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setClasses(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSessions = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/extras/getSessions",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setSessions(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTemplates = async (classId) => {
    if (classId == "") {
      toast.error("Please Select Class");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/student/getTemplates",
        { classId: parseInt(classId) },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setTemplates(result.data.data);
        setSelectedTemplateId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadStudent = async (classId, sessionId) => {
    if (classId == "") {
      toast.error("Please Select Class");
    }
    if (sessionId == "") {
      toast.error("Please Select Session");
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/student/getStudentByClassAndSession",
        {
          classId,
          sessionId,
        },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setStudent(result.data.data);
        toast.success("Student loaded successfully");
      }
    } catch (error) {}
  };

  const assignCertificate = async (templateId, recipientId, title) => {
    if (templateId == null) {
      toast.error("Please select certificate template");
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:5000/api/student/assignCertificate",
        {
          recipientId,
          title,
          templateId,
        },
        { withCredentials: true }
      );
      if (result.status == 210) {
        navigate("/unauthorized");
      } else if (result.status == 245) {
        toast.error("Already assigned this certificate");
      } else if (result.status == 200) {
        toast.success("Certificate Assigned successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
    setTemplateId(templateId);
  };

  const handleViewCertificates = () => {
    navigate("/viewCertificate");
  };

  useEffect(() => {
    getClasses();
    getSessions();
  }, []);
  useEffect(() => {
    getTemplates(classId);
  }, [classId]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <AdminNavbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="container mx-auto p-6">
        {/* === RESPONSIVE UI IMPROVEMENT START === */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 border-b pb-2 border-gray-400">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-0">
            Certificate Management 📜
          </h1>
          <button
            onClick={() => {
              navigate("/admin/view-certificate");
            }}
            className="w-full sm:w-auto py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md  transition duration-200 ease-in-out flex items-center justify-center space-x-2"
          >
            <span> View Assigned Certificates</span>
          </button>
        </div>
        {/* === RESPONSIVE UI IMPROVEMENT END === */}

        {/* Class and Templates Section */}
        <div className="mb-8 p-6 border border-gray-400 bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            1. Select Class & Templates
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <select
              onChange={(e) => {
                setClassId(e.target.value);
              }}
              className="p-2 border-2 border-black bg-white text-black focus:ring-black focus:border-black transition duration-150 ease-in-out"
              name="class-select"
              id="class-select"
              value={classId}
            >
              <option key={0} value="">
                Select Class
              </option>
              {classes.map((value, ind) => (
                <option key={ind + 1} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>

            {/* <button
              onClick={() => {
                getTemplates(classId);
              }}
              className="py-2 px-4 border-2 border-black bg-black text-white hover:bg-gray-800 transition duration-150 ease-in-out"
            >
              Get Templates
            </button> */}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Available Templates:</h3>
            {templates.length < 1 ? (
              <div className="text-gray-600 italic">
                No templates found for this class.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((val, ind) => {
                  const isSelected = selectedTemplateId === val.id;
                  return (
                    // TEMPLATE CARD: Displaying image and button side-by-side
                    <div
                      key={val.id}
                      className="flex items-center gap-4 border border-gray-300 p-3 bg-gray-50"
                    >
                      {/* Image Thumbnail */}
                      <img
                        className="w-20 h-20 object-cover border border-black flex-shrink-0"
                        src={`http://localhost:5000/${val.name}`}
                        alt="Template Thumbnail"
                      />

                      {/* Select Button */}
                      <button
                        onClick={() => {
                          setTemplateId(val.id);
                          handleSelectTemplate(val.id);
                        }}
                        className={`py-2 px-4 text-sm font-semibold transition duration-150 ease-in-out w-full max-w-[120px] ${
                          isSelected
                            ? "bg-black text-white border-2 border-black cursor-default"
                            : "border-2 border-black text-black hover:bg-black hover:text-white"
                        }`}
                        disabled={isSelected}
                      >
                        {isSelected ? "Selected ✅" : "Select"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Session and Student Section (UNCHANGED) */}
        <div className="mb-8 p-6 border border-gray-400 bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            2. Select Session & Load Students
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <select
              onChange={(e) => {
                setSessionId(e.target.value);
              }}
              className="p-2 border-2 border-black bg-white text-black focus:ring-black focus:border-black transition duration-150 ease-in-out"
              name="session-select"
              id="session-select"
              value={sessionId}
            >
              <option key={0} value="">
                Select Session
              </option>
              {sessions.map((value, ind) => (
                <option key={ind + 1} value={value.id}>
                  {value.timing}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                loadStudent(classId, sessionId);
              }}
              className="py-2 px-4 border-2 border-black bg-black text-white hover:bg-gray-800 transition duration-150 ease-in-out"
            >
              Get Students
            </button>
          </div>
        </div>

        {/* Student List Section (UNCHANGED) */}
        <div className="p-6 border border-gray-400 bg-white shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            3. Student List for Certificate Assignment
          </h2>
          {student.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 border border-black">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-gray-700">
                      No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {student.map((val, ind) => (
                    <tr
                      key={val.id || ind}
                      className="hover:bg-gray-50 transition duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">
                        {ind + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-300">
                        {val.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => {
                            assignCertificate(
                              templateId,
                              val.student_id,
                              val.full_name
                            );
                          }}
                          className="text-black border border-black px-3 py-1 text-xs hover:bg-black hover:text-white transition duration-150 ease-in-out"
                        >
                          Assign Certificate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-600 italic">
              Please select a Class and Session and click 'Get Students' to load
              the student list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
