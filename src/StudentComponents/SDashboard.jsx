import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  Award,
  Wallet2,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import SNavbar from "./SNavbar";
import { useNavigate } from "react-router-dom";

const SDashboard = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState(null);

  const getDashboardData = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/student/getDashboardData`,
        { withCredentials: true }
      );

      if (result.status === 200) {
        setStudentData(result.data.data[0]); // your data is an array
      }
    } catch (error) {
      toast.error("Kindly re login");
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SNavbar />

        {/* Centered Loader */}
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
          {/* Animated Lucide Loader */}
          <div className="animate-spin text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>

          {/* Loading Text */}
          <p className="text-gray-700 text-lg font-semibold tracking-wide">
            Loading dashboard…
          </p>

          {/* Subtle shimmer bar */}
          <div className="w-36 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // DESTRUCTURE DATA BASED ON YOUR REAL API RESPONSE
  const {
    name,
    email,
    profile_photo,
    admission_number,
    attendance_percentage,
    attendance_history,
    certificate_title,
    certificate_number,
    certificate_issue_date,
    verification_code,
    total_fee,
    total_paid,
    pending_amount,
    last_payment_date,
  } = studentData;

  // FEES STATUS FIX
  const isFeesPaid = Number(pending_amount) === 0;

  // UI STATUS STYLES
  const getStatusClasses = (status) => {
    if (status === "Present") {
      return "text-gray-900 bg-gray-100";
    }
    if (status === "Absent") {
      return "text-gray-600 bg-white border border-gray-300";
    }
    return "text-gray-700 bg-gray-100";
  };

  // REUSABLE CARD
  const renderStatCard = (Icon, title, value) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-[1.02]">
      <div className="p-3 rounded-full inline-flex text-gray-900 bg-gray-100 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
        {title}
      </p>
      <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* NAV */}
      <SNavbar />

      {/* MAIN */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
        {/* WELCOME */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-l-4 border-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back, {name}
              </h2>
              <p className="text-lg text-gray-600 mt-1">
                Your performance snapshot for this session.
              </p>
            </div>

            <img
              src="https://placehold.co/64x64/E0E0E0/333333?text=ST"
              className="w-16 h-16 rounded-full border-2 border-gray-900 object-cover shadow-md"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {renderStatCard(
            CalendarCheck,
            "Avg. Attendance",
            attendance_percentage
          )}
          {renderStatCard(
            Award,
            "Certificates Earned",
            certificate_title ? 1 : 0
          )}
          {renderStatCard(
            Wallet2,
            "Fees Status",
            isFeesPaid ? "Paid" : "Pending"
          )}
        </div>

        {/* ATTENDANCE + FEES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ATTENDANCE */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold border-b pb-3 mb-4 text-gray-800">
              Daily Attendance Record
            </h3>

            <ul className="space-y-3">
              {attendance_history?.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-3 px-4 rounded-lg border border-gray-200"
                >
                  <span className="font-medium text-gray-700">{item.date}</span>
                  <div
                    className={`flex items-center font-semibold text-sm px-3 py-1 rounded-full ${getStatusClasses(
                      item.status
                    )}`}
                  >
                    {item.status === "Present" ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    {item.status}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* FEES */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold border-b pb-3 mb-4 text-gray-800">
                Financial Overview
              </h3>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Total Course Fee:</span>
                  <span className="font-semibold">
                    ₹ {Number(total_fee).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount Paid:</span>
                  <span className="font-semibold">
                    ₹ {Number(total_paid).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-bold">Pending Balance:</span>
                  <span className="font-extrabold text-lg">
                    ₹ {Number(pending_amount).toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-gray-500 pt-2">
                  Last payment:{" "}
                  {new Date(last_payment_date).toLocaleDateString() ||
                    "No payments made"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CERTIFICATE */}
        {certificate_title ? (
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl mt-8 flex flex-col sm:flex-row justify-between items-center border border-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <Award className="w-8 h-8 mr-4 text-gray-300" />
              <div>
                <p className="font-semibold text-lg">{certificate_title}</p>
                <p className="text-sm text-gray-400">
                  Certificate No: {certificate_number}
                </p>
                <p className="text-sm text-gray-400">
                  Issued on: {new Date(certificate_issue_date).toDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                navigate("/student/certificate");
              }}
              className="flex items-center bg-white text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-gray-200"
            >
              View Certificate <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        ) : (
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl mt-8 text-center">
            <Award className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            <p className="font-semibold text-lg">No certificates yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SDashboard;
