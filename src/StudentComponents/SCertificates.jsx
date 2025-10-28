import React from "react";
import SNavbar from "./SNavbar";
import { Award, Download, FileText } from "lucide-react"; // Importing Lucide icons

// --- Static Data for Certificates ---
const CERTIFICATES_DATA = [
  {
    id: "CERT2024WEB",
    name: "Web Development Fundamentals Completion",
    issueDate: "2024-10-25",
    type: "Course Completion",
    issuer: "Tech Institute",
    status: "Issued",
  },
  {
    id: "CERT2024JS",
    name: "Advanced JavaScript Proficiency",
    issueDate: "2024-09-10",
    type: "Skill Certification",
    issuer: "Coding Guild",
    status: "Issued",
  },
  {
    id: "CERT2024MERIT",
    name: "Outstanding Academic Merit Award",
    issueDate: "2024-08-01",
    type: "Award",
    issuer: "Academic Dean",
    status: "Issued",
  },
  {
    id: "CERT2025INTERN",
    name: "Industry Internship Certification",
    issueDate: "2025-02-15", // Future date for 'Pending' example
    type: "Internship",
    issuer: "Future Corp",
    status: "Pending",
  },
];

// Helper function to handle the download action
const handleDownload = (certificateId, certificateName) => {
  // In a real application, this would trigger an API call to fetch/generate the certificate PDF.
  alert(`Attempting to download: "${certificateName}" (ID: ${certificateId}).`);
};

// Helper function to get status badge classes (Professional Theme)
const getStatusBadge = (status) => {
  switch (status) {
    case "Issued":
      return (
        <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
          {status}
        </span>
      );
    case "Pending":
      return (
        <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
          {status}
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
          {status}
        </span>
      );
  }
};

const SCertificates = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-2 border-b-4 border-indigo-100">
          <Award className="w-8 h-8 inline-block mr-2 text-indigo-600" />
          My Certificates & Awards
        </h1>

        {/* --- Certificates Grid/List --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-indigo-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  <h2 className="text-lg font-bold text-gray-800">
                    {cert.name}
                  </h2>
                </div>
                {getStatusBadge(cert.status)}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Type:</span>{" "}
                  {cert.type}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Issued By:</span>{" "}
                  {cert.issuer}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  {cert.issueDate}
                </p>
              </div>

              {/* Static Download Button */}
              <button
                onClick={() => handleDownload(cert.id, cert.name)}
                className={`mt-6 w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition duration-150 shadow-md 
                  ${
                    cert.status === "Issued"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }
                `}
                disabled={cert.status !== "Issued"} // Disable if not yet issued
              >
                <Download className="w-5 h-5" />
                <span>
                  {cert.status === "Issued" ? "Download Receipt" : "Pending..."}
                </span>
              </button>
            </div>
          ))}

          {CERTIFICATES_DATA.length === 0 && (
            <p className="col-span-3 py-10 text-center text-gray-500 text-lg">
              No certificates or awards are currently available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SCertificates;