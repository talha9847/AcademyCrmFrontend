import React, { useState, useMemo } from "react";
import SNavbar from "./SNavbar";
// Assuming SNavbar is defined in a separate file and works correctly.
// import SNavbar from "./SNavbar";

// --- Static Data for Demonstration (SINGLE FLAT ARRAY) ---
const studentInfo = {
  name: "Alex Johnson",
  id: "S00101",
  course: "Web Development Fundamentals",
};

// **This is the single array structure you requested.**
const ALL_ATTENDANCE_ARRAY = [
  // October 2024 Data
  { date: "2024-10-01", status: "Present", remarks: "Active participation." },
  {
    date: "2024-10-02",
    status: "Present",
    remarks: "Submitted homework early.",
  },
  { date: "2024-10-03", status: "Absent", remarks: "Sick leave (reported)." },
  { date: "2024-10-04", status: "Late", remarks: "Arrived 10 mins late." },
  {
    date: "2024-10-07",
    status: "Present",
    remarks: "Great work on the CSS task.",
  },
  { date: "2024-10-08", status: "Present", remarks: "Perfect attendance." },
  { date: "2024-10-09", status: "Absent", remarks: "Unexcused absence." },
  { date: "2024-10-10", status: "Present", remarks: "Completed quiz 100%." },
  {
    date: "2024-10-11",
    status: "Late",
    remarks: "Technical issue with internet.",
  },
  { date: "2024-10-14", status: "Present", remarks: "Good engagement." },
  { date: "2024-10-15", status: "Present", remarks: "No issues." },
  {
    date: "2024-10-16",
    status: "Present",
    remarks: "Worked well in the group project.",
  },
  {
    date: "2024-10-17",
    status: "Absent",
    remarks: "Attended doctor's appointment.",
  },
  {
    date: "2024-10-18",
    status: "Present",
    remarks: "Final class of the week.",
  },
  // September 2024 Data
  { date: "2024-09-02", status: "Present", remarks: "First day of class." },
  { date: "2024-09-03", status: "Present", remarks: "Setup complete." },
  { date: "2024-09-04", status: "Late", remarks: "Traffic delay." },
  { date: "2024-09-05", status: "Present", remarks: "Good progress." },
];

// Map status to Tailwind background/text classes for the calendar cells
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

// Function to group the flat array data by month/year key (e.g., "2024-10")
const groupAttendanceByMonth = (data) => {
  return data.reduce((acc, record) => {
    // Extracts YYYY-MM from YYYY-MM-DD
    const monthYearKey = record.date.substring(0, 7);
    if (!acc[monthYearKey]) {
      acc[monthYearKey] = [];
    }
    acc[monthYearKey].push(record);
    return acc;
  }, {});
};

// Function to generate the calendar grid structure
const generateCalendar = (year, monthIndex, attendanceRecords) => {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const days = [];

  // Map attendance data for quick lookup by day number
  const attendanceMap = attendanceRecords.reduce((acc, record) => {
    acc[new Date(record.date).getDate()] = record;
    return acc;
  }, {});

  // 1. Add leading empty slots
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ day: null, status: "Empty" });
  }

  // 2. Add days of the month
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

// Main Component
const SAttendance = () => {
  // Use useMemo to process the flat data into a grouped object only once
  const groupedAttendance = useMemo(
    () => groupAttendanceByMonth(ALL_ATTENDANCE_ARRAY),
    []
  );

  // Set initial date to the latest month available in the data (October 2024 in this static example)
  const initialDateKey =
    Object.keys(groupedAttendance).sort().pop() || "2024-10";
  const [initialYear, initialMonth] = initialDateKey.split("-").map(Number);

  // Initialize state to the calculated initial month/year
  const [currentDate, setCurrentDate] = useState(
    new Date(initialYear, initialMonth - 1, 1)
  );

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const monthYearKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

  // Get attendance data for the selected month
  const currentAttendance = groupedAttendance[monthYearKey] || [];

  // Recalculate summary and calendar view based on the current month
  const summary = getAttendanceSummary(currentAttendance);
  const calendarDays = generateCalendar(year, monthIndex, currentAttendance);

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
          Student Attendance Calendar 🗓️
        </h1>

        {/* Student Information Header */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            Student Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Name:</span>{" "}
              {studentInfo.name}
            </p>
            <p>
              <span className="font-medium text-gray-800">ID:</span>{" "}
              {studentInfo.id}
            </p>
            <p>
              <span className="font-medium text-gray-800">Course:</span>{" "}
              {studentInfo.course}
            </p>
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
              disabled={
                !groupedAttendance[
                  `${year}-${String(monthIndex).padStart(2, "0")}`
                ] && monthYearKey !== Object.keys(groupedAttendance).sort()[0]
              }
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
              {getMonthName(monthIndex)} {year}
            </h3>
            <button
              onClick={() => handleMonthChange(1)}
              className="flex items-center p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
              // Optional: Disable button if no data exists for the next month key
              disabled={
                !groupedAttendance[
                  `${year}-${String(monthIndex + 2).padStart(2, "0")}`
                ] &&
                monthYearKey !== Object.keys(groupedAttendance).sort().pop()
              }
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
            {calendarDays.map((day, index) => (
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
              {summary.presentPercentage}%
            </h3>
            <p className="text-sm text-gray-400">Monthly Performance</p>
          </div>

          {/* Card 2: Total Classes */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Total Classes Held
            </p>
            <h3 className="text-4xl font-bold text-blue-700 mt-1">
              {summary.totalDays}
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
              {summary.absentCount}
            </h3>
            <p className="text-sm text-gray-400">Total missed classes</p>
          </div>

          {/* Card 4: Times Late */}
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Times Late
            </p>
            <h3 className="text-4xl font-bold text-yellow-700 mt-1">
              {summary.lateCount}
            </h3>
            <p className="text-sm text-gray-400">Recorded late entries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAttendance;
