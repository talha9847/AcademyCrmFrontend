import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import FNavbar from "./FNavbar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FaCertificate,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { BookOpen, Calendar, CheckCircle, Key, Mail, User } from "lucide-react";

const Verification = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const [searchParams] = useSearchParams();
  const [certNumber, setCertNumber] = useState(searchParams.get("code") || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyCertificate = async (number) => {
    if (!number.trim()) {
      setError("Please enter a certificate number.");
      setData(null);
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const result = await axios.get(
        `http://localhost:5000/api/student/verify?code=${number}`
      );
      // const result = await axios.get(
      //   `https://academycrmbackend.onrender.com/api/student/verify?code=${number}`
      // );

      if (result.status === 200 && result.data?.data?.length > 0) {
        setData(result.data.data[0]);
      } else {
        setError("Certificate not found. Please check the code and try again.");
      }
    } catch (err) {
      setError("Unable to verify certificate. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (certNumber) verifyCertificate(certNumber);
  }, []);

  const getProfilePhotos = async (fileName) => {
    setPhotoLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/user/getCertiPhoto/${fileName}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );
      const url = URL.createObjectURL(res.data);
      setPhotoUrl(url);
      setPhotoLoading(false);
    } catch (err) {
      console.error("Failed to load photo:", err);
      setPhotoLoading(false);
    }
  };

  useEffect(() => {
    if (data?.profile_photo) {
      console.log(data.profile_photo);
      getProfilePhotos(data.profile_photo);
    }
  }, [data]);

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded-2xl shadow-lg bg-white relative overflow-hidden">
      <FNavbar />

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
        <FaCertificate className="text-blue-600" /> Certificate Verification
      </h1>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Certificate Code"
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => verifyCertificate(certNumber)}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </button>
      </div>

      {/* Feedback States */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-2xl mx-auto mb-2" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-600">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl mx-auto mb-2 text-blue-600" />
          <p>Verifying certificate...</p>
        </div>
      )}

      {/* Certificate Found */}
      {!loading && data && (
        <div
          className={`mt-8 p-6 border rounded-2xl shadow-lg transition-all ${
            data.is_revoked
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <h2
            className={`text-2xl font-bold text-center mb-5 flex items-center justify-center gap-2 ${
              data.is_revoked ? "text-red-700" : "text-green-700"
            }`}
          >
            {data.is_revoked ? (
              <>
                <FaExclamationTriangle /> Certificate Revoked
              </>
            ) : (
              <>
                <FaCheckCircle /> Certificate Verified
              </>
            )}
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b pb-6 mb-6 border-gray-200">
            <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-300">
              <img
                className="w-full h-full object-cover"
                src={photoUrl}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/100x100/6B7280/FFFFFF?text=USER";
                }}
              />
            </div>
            <div className="flex-grow">
              <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                {data.title}
              </p>
              <p className="text-lg text-gray-600 mt-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" /> {data.email}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 text-gray-800">
            {/* Certificate Details */}
            <div className="flex items-start">
              <Key className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-700 block text-sm uppercase tracking-wider">
                  Certificate No.
                </span>
                <span className="text-lg font-mono break-all">
                  {data.certificate_number}
                </span>
              </div>
            </div>

            <div className="flex items-start">
              <BookOpen className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-700 block text-sm uppercase tracking-wider">
                  Course Name
                </span>
                <span className="text-lg font-medium">{data.name}</span>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-teal-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-700 block text-sm uppercase tracking-wider">
                  Issue Date
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  {new Date(data.issue_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-start">
              <User className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold text-gray-700 block text-sm uppercase tracking-wider">
                  Recipient Name
                </span>
                <span className="text-lg font-medium">{data.title}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <span
              className={`inline-block px-4 py-1 rounded-full font-semibold text-sm ${
                data.is_revoked
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {data.is_revoked ? "❌ Status: Revoked" : "✅ Status: Valid"}
            </span>
          </div>
        </div>
      )}

      {/* Certificate Not Found (only show if no data & not loading & no error) */}
      {!loading && !data && !error && (
        <div className="mt-10 p-6 border rounded-2xl bg-gray-50 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Enter a Certificate Code Above
          </h2>
          <p className="text-gray-500">
            You can scan a QR code or manually input the code to verify.
          </p>
        </div>
      )}
    </div>
  );
};

export default Verification;
