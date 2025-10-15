// FullAttendanceWorkflow.jsx (Single Page combining Selection and Marking)

import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { div } from "framer-motion/client";

/**
 * A static JSX component demonstrating the full attendance workflow on one page.
 * It simulates the selection of criteria (daily_attendance data) and the subsequent
 * marking of student records (daily_attendance_records data).
 */
const FullAttendanceWorkflow = () => {
  // --- Static Placeholder Data ---
  const classes = [
    { id: 1, name: "Grade 10 - Science" },
    { id: 2, name: "Grade 11 - Commerce" },
    { id: 3, name: "Grade 12 - Arts" },
  ];
  const sections = [
    { id: 101, name: "A" },
    { id: 102, name: "B" },
    { id: 103, name: "C" },
  ];
  const sessions = [
    { id: 10, name: "Morning Session" },
    { id: 20, name: "Afternoon Session" },
  ];
  const students = [
    { id: 1001, name: "Alice Johnson", roll: 1, initialStatus: "Present" },
    { id: 1002, name: "Bob Smith", roll: 2, initialStatus: "Absent" },
    { id: 1003, name: "Charlie Davis", roll: 3, initialStatus: "Present" },
    { id: 1004, name: "Diana Prince", roll: 4, initialStatus: "Late" },
    { id: 1005, name: "Ethan Hunt", roll: 5, initialStatus: "Present" },
  ];
  const attendanceStatuses = ["Present", "Absent", "Late", "Leave"];

  // --- Component State (Simulated) ---
  const [criteriaSelected, setCriteriaSelected] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState({});

  // --- Handlers ---

  // Handles the initial selection/submission
  const handleCriteriaSelection = (e) => {
    e.preventDefault();

    // In a real app, you would gather form data (class, section, session, date) here.
    // This is where you would check/create the record in the `daily_attendance` table.
    const formData = {
      class: e.target["class-select"].value,
      session: e.target["session-select"].value,
      date: e.target["attendance-date"].value,
      // ... other fields
    };

    setSelectedCriteria(formData);
    setCriteriaSelected(true); // Show the student list table

    alert(
      `Criteria Loaded:\nClass: ${formData.class}\nSession: ${formData.session}\nDate: ${formData.date}\nProceeding to mark attendance...`
    );
  };

  // Handles the final save of all student records
  const handleSaveAttendance = () => {
    // In a real app, you would collect all marked statuses and remarks
    // and send them to the API to populate the `daily_attendance_records` table.
    alert(
      "Attendance Successfully Saved!\nData for all students has been submitted to daily_attendance_records."
    );
    setCriteriaSelected(false); // Reset the view after saving
  };

  return (
    <div>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-4">
          Full Daily Attendance Workflow
        </h1>

        {/* 1. Selection Criteria Form (daily_attendance table creation) */}
        <div className="bg-white p-6 rounded-lg shadow-xl border border-indigo-200 mb-8">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            {criteriaSelected
              ? "Selected Criteria (Read-Only)"
              : "1. Select Class Details"}
          </h2>

          <form
            onSubmit={handleCriteriaSelection}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
          >
            {/* Class Selection */}
            <div className="md:col-span-1">
              <label
                htmlFor="class-select"
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                CLASS <span className="text-red-500">*</span>
              </label>
              <select
                id="class-select"
                required
                disabled={criteriaSelected}
                className={`w-full text-sm py-2 px-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  criteriaSelected
                    ? "bg-gray-100 text-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">-- Class --</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Selection */}
            <div className="md:col-span-1">
              <label
                htmlFor="section-select"
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                SECTION
              </label>
              <select
                id="section-select"
                disabled={criteriaSelected}
                className={`w-full text-sm py-2 px-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  criteriaSelected
                    ? "bg-gray-100 text-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">All</option>
                {sections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Session Selection */}
            <div className="md:col-span-1">
              <label
                htmlFor="session-select"
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                SESSION <span className="text-red-500">*</span>
              </label>
              <select
                id="session-select"
                required
                disabled={criteriaSelected}
                className={`w-full text-sm py-2 px-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  criteriaSelected
                    ? "bg-gray-100 text-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">-- Session --</option>
                {sessions.map((sess) => (
                  <option key={sess.id} value={sess.id}>
                    {sess.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="md:col-span-1">
              <label
                htmlFor="attendance-date"
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                DATE <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="attendance-date"
                required
                disabled={criteriaSelected}
                defaultValue={new Date().toISOString().split("T")[0]}
                className={`w-full text-sm py-2 px-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  criteriaSelected
                    ? "bg-gray-100 text-gray-600"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            {/* Action Button */}
            <div className="md:col-span-1">
              <button
                type="submit"
                disabled={criteriaSelected}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium transition shadow-md ${
                  criteriaSelected
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Load Students
              </button>
            </div>
          </form>
        </div>

        {/* 2. Student List and Marking Table (daily_attendance_records data) */}
        {criteriaSelected && (
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              2. Mark Student Attendance
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remarks (Optional)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition duration-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.roll}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {student.name}
                      </td>

                      {/* Status Selection */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          defaultValue={student.initialStatus}
                          className="w-full text-sm py-1 px-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                        >
                          {attendanceStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Remarks Text */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <input
                          type="text"
                          placeholder="Enter remarks..."
                          className="w-full text-sm py-1 px-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-4 border-t text-right flex justify-end gap-3">
              <button
                onClick={() => setCriteriaSelected(false)} // Simulate a "Cancel" or "Change Criteria" action
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-150"
              >
                Change Criteria
              </button>
              <button
                onClick={handleSaveAttendance}
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Attendance (5 Records)
              </button>
            </div>
          </div>
        )}

        {!criteriaSelected && (
          <div className="text-center p-12 bg-white rounded-lg shadow-md text-gray-500">
            Please select the criteria above and click "Load Students" to begin
            marking attendance.
          </div>
        )}
      </div>
    </div>
  );
};

export default FullAttendanceWorkflow;
