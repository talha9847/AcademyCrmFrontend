import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  ChevronDown,
  Loader2,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  X,
} from "lucide-react";
import TNavbar from "./TNavbar";
import TAttedanceNavbar from "./TAttendanceNavbar";

const TAttendanceView = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [students, setStudents] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);

  const getClasses = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/extras/getClasses`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        setClasses(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSessions = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/extras/getSessions`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        setSessions(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadStudent = async (data) => {
    try {
      setLoadingStudent(true);
      const result = await axios.post(
        `${BASE_URL}/api/attendance/viewStudent`,
        { classId: data.classId, sessionId: data.sessionId },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setLoadingStudent(false);
        setStudents(result.data.data);
        console.log(result.data.data);
      }
    } catch (error) {
      setLoadingStudent(false);
    }
  };

  const getAttendanceData = async (studentId) => {
    console.log(studentId);
    try {
      const result = await axios.post(
        `${BASE_URL}/api/attendance/viewAttendance`,
        { studentId: studentId },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setAttendanceData(result.data.data);
        console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAvailableMonths = (data) => {
    const months = data.map((record) => {
      const localDate = new Date(record.attendance_date);
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, "0"); // getMonth is 0-based
      return `${year}-${month}`;
    });

    const uniqueMonths = [...new Set(months)].sort((a, b) =>
      b.localeCompare(a)
    );

    return ["all", ...uniqueMonths];
  };

  const formatMonthKey = (key) => {
    if (key === "all") return "All Months (Total History)";
    const [year, month] = key.split("-");
    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "Present":
        return (
          <span className="flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={14} className="mr-1" /> Present
          </span>
        );
      case "Absent":
        return (
          <span className="flex items-center text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-medium">
            <XCircle size={14} className="mr-1" /> Absent
          </span>
        );
      case "Late":
        return (
          <span className="flex items-center text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium">
            <Clock size={14} className="mr-1" /> Late
          </span>
        );
      default:
        return status;
    }
  };

  const handleViewAttendance = (student) => {
    setViewingStudent(student);
    setSelectedMonth("all");
  };

  const availableMonths = getAvailableMonths(attendanceData);

  const filteredHistory = attendanceData
    .filter((record) => {
      if (selectedMonth === "all") return true;

      const recordMonth = record.attendance_date.slice(0, 7); // "YYYY-MM"

      return recordMonth === selectedMonth;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalDays = filteredHistory.length;
  const presentCount = filteredHistory.filter(
    (h) => h.status === "Present"
  ).length;
  const absentCount = filteredHistory.filter(
    (h) => h.status === "Absent"
  ).length;
  const lateCount = filteredHistory.filter((h) => h.status === "Late").length;
  const attendancePercentage =
    totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(1) : 0;

  useEffect(() => {
    getClasses();
    getSessions();
  }, []);
  return (
    <div>
      <TNavbar />
      <div className="flex">
        <TAttedanceNavbar />
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 md:ml-64 pt-16 md:pt-8 w-full">
          <div className="max-w-4xl mx-auto">
            {viewingStudent ? (
              // Attendance Detail View
              <div className="mt-8 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
                <div className="flex justify-between items-start mb-6 border-b pb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <ArrowLeft
                      onClick={() => setViewingStudent(null)}
                      className="w-6 h-6 mr-3 text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors"
                    />
                    Attendance History:{" "}
                    <span className="text-indigo-600 ml-2">
                      {viewingStudent.full_name}
                    </span>
                  </h2>
                  <button
                    onClick={() => setViewingStudent(null)}
                    className="text-gray-500 hover:text-gray-800 transition-colors p-1"
                    aria-label="Close details"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Month Selector */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between flex-wrap bg-gray-50 p-4 rounded-lg">
                  <label
                    htmlFor="month-selector"
                    className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:mr-4"
                  >
                    Filter by:
                  </label>
                  <div className="relative w-full sm:w-64">
                    <select
                      id="month-selector"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="appearance-none block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-semibold text-sm"
                    >
                      {availableMonths.map((monthKey) => (
                        <option key={monthKey} value={monthKey}>
                          {formatMonthKey(monthKey)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 bg-indigo-100 rounded-xl shadow-md">
                    <p className="text-xs text-indigo-700 font-medium uppercase">
                      Total Days
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {totalDays}
                    </p>
                  </div>
                  <div className="p-4 bg-green-100 rounded-xl shadow-md">
                    <p className="text-xs text-green-700 font-medium uppercase">
                      Present
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {presentCount}
                    </p>
                  </div>
                  <div className="p-4 bg-red-100 rounded-xl shadow-md">
                    <p className="text-xs text-red-700 font-medium uppercase">
                      Absent
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {absentCount}
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-100 rounded-xl shadow-md">
                    <p className="text-xs text-yellow-700 font-medium uppercase">
                      Attendance %
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {attendancePercentage}%
                    </p>
                  </div>
                </div>

                {/* History Table */}
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Detailed Log
                </h3>
                <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Roll No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredHistory.map((record, index) => (
                        <tr
                          key={index}
                          className="hover:bg-indigo-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {record.attendance_date.slice(0, 10)}{" "}
                            {/* Outputs YYYY-MM-DD */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {viewingStudent.roll_no}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {getStatusDisplay(record.status)}
                          </td>
                        </tr>
                      ))}
                      {filteredHistory.length === 0 && (
                        <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-6 text-center text-gray-500"
                          >
                            No attendance records found for this selection.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // Student List View
              <>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
                  Attendance View Dashboard
                </h1>

                <div className="bg-white p-6 rounded-xl shadow-2xl mb-8">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Load Student Records
                  </h2>
                  <form
                    onSubmit={handleSubmit(loadStudent)}
                    className="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4"
                  >
                    <div className="flex-1">
                      <label
                        htmlFor="classId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Class
                      </label>
                      <div className="relative">
                        <select
                          {...register("classId", {
                            required: "Class is required",
                          })}
                          name="classId"
                          id="classId"
                          className="appearance-none block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option key={0} value="">
                            Select a Class
                          </option>{" "}
                          {classes.map((className, ind) => (
                            <option key={ind + 1} value={className.id}>
                              {className.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.classId && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.classId.message}
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="sessionId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Session
                      </label>
                      <div className="relative">
                        <select
                          {...register("sessionId", {
                            required: "Session is required",
                          })}
                          className="appearance-none block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          name="sessionId"
                          id="sessionId"
                        >
                          <option key={0} value="">
                            Select a Session
                          </option>
                          {sessions.map((session, ind) => (
                            <option key={ind + 1} value={session.id}>
                              {session.timing}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.sessionId && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.sessionId.message}
                        </p>
                      )}
                    </div>

                    <div className="md:pt-0">
                      <button
                        type="submit"
                        disabled={loadingStudent}
                        className="w-full md:w-auto flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed h-[40px]"
                      >
                        {loadingStudent ? (
                          <>
                            <Loader2 className="animate-spin h-5 w-5 mr-2" />
                            Loading...
                          </>
                        ) : (
                          "Load Students"
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {students.length > 0 && (
                  <div className="bg-white p-6 rounded-xl shadow-2xl">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Student List ({students.length} found)
                    </h3>
                    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                              Roll No.
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {students.map((student, ind) => (
                            <tr
                              key={student.id || ind}
                              className="hover:bg-indigo-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {student.full_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.roll_no}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => {
                                    handleViewAttendance(student);
                                    getAttendanceData(student.id);
                                  }}
                                  className="text-indigo-600 hover:text-indigo-900 font-semibold transition-colors p-2 rounded-lg hover:bg-indigo-100"
                                >
                                  View Attendance
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {students.length === 0 && !loadingStudent && (
                  <div className="bg-white p-8 rounded-xl shadow-md">
                    <p className="text-center text-gray-500 border border-dashed rounded-lg bg-gray-50 p-8">
                      Please select a Class and Session above, then click 'Load
                      Students' to view records.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TAttendanceView;
