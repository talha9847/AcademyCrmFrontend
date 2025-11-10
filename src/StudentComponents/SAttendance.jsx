import React, { useState, useMemo, useEffect } from "react";
import SNavbar from "./SNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getStatusClasses = (status) => {
  switch (status) {
    case "Present":
      return "bg-green-500 text-white hover:bg-green-600";
    case "Absent":
      return "bg-red-500 text-white hover:bg-red-600";
    case "Late":
      return "bg-yellow-500 text-gray-900 hover:bg-yellow-600";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"; // For non-class days
  }
};

// Function to calculate attendance summary
const getAttendanceSummary = (data) => {
  const totalDays = data.length;
  const presentCount = data.filter((d) => d.status === "Present").length;
  const absentCount = data.filter((d) => d.status === "Absent").length;
  const lateCount = data.filter((d) => d.status === "Late").length;
  const presentPercentage =
    totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(1) : 0;

  return { totalDays, presentCount, absentCount, lateCount, presentPercentage };
};

const groupAttendanceByMonth = (data) => {
  return data.reduce((acc, record) => {
    const key = record.date.substring(0, 7); // "YYYY-MM"
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(record);
    return acc;
  }, {});
};

const generateCalendar = (year, monthIndex, attendanceRecords) => {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const days = [];

  const attendanceMap = attendanceRecords.reduce((acc, record) => {
    const day = new Date(record.date).getDate();
    acc[day] = record;
    return acc;
  }, {});

  // Empty slots at the start of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ day: null, status: "Empty" });
  }

  // Fill actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const record = attendanceMap[i];
    const status = record ? record.status : "None";
    const remarks = record ? record.remarks : "No class scheduled";
    days.push({ day: i, status, remarks });
  }

  return days;
};

// Helper function for month navigation
const getMonthName = (monthIndex) =>
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][monthIndex];

const SAttendance = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [attendanceData, setAttendanceData] = useState([]);
  const [userInfo, setUser] = useState({});
  const [id, setId] = useState(null);
  const [classError, setClassError] = useState("");

  const navigate = useNavigate();

  const checkId = async (id) => {
    console.log(id);
    if (id == null || id == "") {
      setClassError("Please select class");
    } else {
      setClassError("");
    }
  };
  const getAttendanceData = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/api/attendance/getAttendanceByStudent`,
        {},
        { withCredentials: true }
      );
      if (result.status == 230) {
        navigate("/unauthorized");
      }
      if (result.status === 200) {
        setAttendanceData(result.data.data);
        setUser(result.data.user);
        console.log(result.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAttendanceDataByClass = async () => {
    try {
      const result = await axios.post(
        `${BASE_URL}/api/attendance/getAttendanceByStudent`,
        { classId: id },
        { withCredentials: true }
      );
      if (result.status == 230) {
        navigate("/unauthorized");
      }
      if (result.status === 200) {
        setAttendanceData(result.data.data);
        setUser(result.data.user);
        toast.success("Attendance loaded successfully");
      }
    } catch (error) {}
  };
  const [enrolled, setEnrolled] = useState([]);
  const getEnrolledClass = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/attendance/getEnrolledClass`,
        {
          withCredentials: true,
        }
      );
      if (result.status == 200) {
        setEnrolled(result.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAttendanceData();
    getEnrolledClass();
  }, []);

  const groupedAttendance = useMemo(
    () => groupAttendanceByMonth(attendanceData),
    [attendanceData]
  );

  const latestMonthYearKey = React.useMemo(() => {
    const keys = Object.keys(groupedAttendance);
    if (keys.length === 0) {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    }
    return keys.sort().pop();
  }, [groupedAttendance]);

  const [year, month] = latestMonthYearKey.split("-").map(Number);
  const monthIndex = month - 1;

  const currentAttendance = groupedAttendance[latestMonthYearKey] || [];

  const calendarDays = generateCalendar(year, monthIndex, currentAttendance);

  const summary = getAttendanceSummary(currentAttendance);

  const [currentMonthKey, setCurrentMonthKey] =
    React.useState(latestMonthYearKey);

  const handleMonthChange = (direction) => {
    const [curYear, curMonth] = currentMonthKey.split("-").map(Number);
    let newYear = curYear;
    let newMonth = curMonth + direction;

    if (newMonth < 1) {
      newYear -= 1;
      newMonth = 12;
    } else if (newMonth > 12) {
      newYear += 1;
      newMonth = 1;
    }

    const newKey = `${newYear}-${String(newMonth).padStart(2, "0")}`;
    setCurrentMonthKey(newKey);
  };

  const currentMonthAttendance = groupedAttendance[currentMonthKey] || [];
  const currentMonthYear = Number(currentMonthKey.split("-")[0]);
  const currentMonthIndex = Number(currentMonthKey.split("-")[1]) - 1;
  const currentCalendarDays = generateCalendar(
    currentMonthYear,
    currentMonthIndex,
    currentMonthAttendance
  );
  const currentSummary = getAttendanceSummary(currentMonthAttendance);
  console.log(currentSummary);

  return (
    <div className="bg-gray-50 min-h-screen">
      <SNavbar />
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
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
          Student Attendance Calendar 🗓️
        </h1>

        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            Student Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Name:</span>{" "}
              {userInfo.fullName}
            </p>
            <p>
              <span className="font-medium text-gray-800">ID:</span>{" "}
              {"MCA-" + (userInfo.id + 500)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md p-4 rounded-lg border border-gray-200 gap-4">
          <div className="w-full sm:w-auto">
            {enrolled.length > 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <select
                  onChange={(e) => {
                    setId(e.target.value);
                    checkId(e.target.value);
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">-- Select Class --</option>
                  {enrolled.map((en, ind) => (
                    <option key={ind} value={en.id}>
                      {en.name}
                    </option>
                  ))}
                </select>
                {classError && (
                  <p className="text-red-500 text-xs mt-1 sm:mt-0">
                    {classError}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={() => {
                console.log("get clicked");
                checkId(id);
                getAttendanceDataByClass();
              }}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-200"
            >
              Get Attendance
            </button>
          </div>
        </div>

        {/* --- Calendar View --- */}
        <div className="bg-white p-6 rounded-lg shadow-xl">
          {/* Calendar Navigation (Month/Year Selector) */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => handleMonthChange(-1)}
              className="flex items-center p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
              // Optional: Disable button if no data exists for the previous month key
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Previous
            </button>
            <h3 className="text-2xl font-bold text-gray-800">
              {getMonthName(currentMonthIndex)} {currentMonthYear}
            </h3>
            <button
              onClick={() => handleMonthChange(1)}
              className="flex items-center p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
              // Optional: Disable button if no data exists for the next month key
            >
              Next
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Calendar Grid Header (Days of Week) */}
          <div className="grid grid-cols-7 text-center font-semibold text-gray-600 border-b pb-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-sm uppercase">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid Body (Dates) */}
          <div className="grid grid-cols-7 gap-1">
            {currentCalendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  p-2 h-20 rounded-lg text-center relative transition duration-150 border
                  ${
                    day.day
                      ? "border-gray-200"
                      : "bg-transparent border-transparent"
                  } 
                  ${
                    day.status !== "Empty" && day.day
                      ? getStatusClasses(day.status)
                      : ""
                  }
                  ${
                    day.status === "None" && day.day
                      ? "bg-gray-100 hover:bg-gray-200"
                      : ""
                  }
                `}
                // Tooltip shows Status and Remarks on hover
                title={
                  day.day
                    ? `Status: ${day.status}\nRemarks: ${day.remarks}`
                    : ""
                }
              >
                {day.day && (
                  <>
                    <span className="font-bold text-lg">{day.day}</span>
                    <p className="text-xs mt-1 truncate opacity-90 font-medium">
                      {day.status !== "None" ? day.status : ""}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow"></span>{" "}
              **Present**
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2 shadow"></span>{" "}
              **Absent**
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2 shadow"></span>{" "}
              **Late**
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-full mr-2"></span>{" "}
              No Class
            </span>
          </div>
        </div>

        {/* --- Summary Cards (Dynamic for Selected Month) --- */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Attendance Rate */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Attendance Rate
            </p>
            <h3 className="text-4xl font-bold text-indigo-700 mt-1">
              {currentSummary.presentPercentage}%
            </h3>
            <p className="text-sm text-gray-400">Monthly Performance</p>
          </div>

          {/* Card 2: Total Classes */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Total Classes Held
            </p>
            <h3 className="text-4xl font-bold text-blue-700 mt-1">
              {currentSummary.totalDays}
            </h3>
            <p className="text-sm text-gray-400">
              In {getMonthName(monthIndex)}
            </p>
          </div>

          {/* Card 3: Days Absent */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Days Absent
            </p>
            <h3 className="text-4xl font-bold text-red-700 mt-1">
              {currentSummary.absentCount}
            </h3>
            <p className="text-sm text-gray-400">Total missed classes</p>
          </div>

          {/* Card 4: Times Late */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Times Late
            </p>
            <h3 className="text-4xl font-bold text-yellow-700 mt-1">
              {currentSummary.lateCount}
            </h3>
            <p className="text-sm text-gray-400">Recorded late entries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAttendance;
