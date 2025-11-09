import React, { useEffect, useState } from "react";
import SNavbar from "./SNavbar";
import QRCode from "qrcode";

import {
  Award,
  BookOpen,
  CalendarDays,
  Download,
  FileText,
} from "lucide-react"; // Importing Lucide icons
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiBuildingOffice2 } from "react-icons/hi2";

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
const handleDownload = async (
  name,
  issueDate,
  certNumber,
  templatePath,
  verificationCode,
  profile,
  sign
) => {
  if (!templatePath) return alert("Error: Certificate template not found.");
  const fullImageUrl = `https://academycrmbackend.onrender.com/${templatePath}`;
  const formattedDate = issueDate
    ? new Date(issueDate).toLocaleDateString("en-US")
    : "N/A";

  // Use a temporary off-screen canvas (no need for useRef here)
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size (2000x1414 resolution)
  canvas.width = 2000;
  canvas.height = 1414;

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = fullImageUrl;

  // Wrap image loading in a Promise for robust async flow
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  // --- Draw Template and Text ---
  ctx.drawImage(image, 0, 0, 2000, 1414);

  ctx.font = "bold 70px 'Times New Roman'";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText(name || "Student Name", 1000, 700);

  ctx.font = "40px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Certificate No: ${certNumber || "N/A"}`, 10, 100); // Example position

  ctx.textAlign = "right";
  ctx.fillText(`Date: ${formattedDate}`, 1980, 110);

  // --- Draw QR Code ---
  const verificationUrl = `http://localhost:5173/verify?code=${verificationCode}`; // Use actual verification link
  const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
    width: 250,
    margin: 1,
  });

  const qrImg = new Image();
  qrImg.src = qrDataUrl;

  const profileImage = new Image();
  profileImage.crossOrigin = "anonymous";
  profileImage.src = `https://academycrmbackend.onrender.com/uploads/${profile}`;

  const signatureImage = new Image();
  signatureImage.crossOrigin = "anonymous";
  signatureImage.src = `https://academycrmbackend.onrender.com/uploads/${sign}`;

  await new Promise((resolve, reject) => {
    qrImg.onload = resolve;
    qrImg.onerror = reject;
  });

  await new Promise((resolve, reject) => {
    profileImage.onload = resolve;
    profileImage.onerror = reject;
  });

  await new Promise((resolve, reject) => {
    signatureImage.onload = resolve;
    signatureImage.onerror = reject;
  });

  const profileImageSize = 250;
  ctx.drawImage(profileImage, 1500, 200, profileImageSize, profileImageSize);

  const signatureImageSize = 125;
  ctx.drawImage(
    signatureImage,
    1500,
    460,
    signatureImageSize * 2,
    signatureImageSize
  );

  // Draw QR code (Bottom Left Area - adjust X/Y)
  const qrSize = 250;
  ctx.drawImage(qrImg, 100, 1414 - qrSize - 150, qrSize, qrSize);

  // --- Final Output to Print/Save Dialog ---
  const dataUrl = canvas.toDataURL("image/png", 0.95); // Use JPEG for smaller size
  const printWindow = window.open("about:blank", "_blank");
  printWindow.document.write(`
  <html>
    <head><title>${name} Certificate</title></head>
    <body style="margin:0;display:flex;justify-content:center;align-items:center;">
      <img src="${dataUrl}" width="100%" />
      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
  </html>
`);
  printWindow.document.close();
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
  const navigate = useNavigate();
  const [cData, setCData] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCertificates = async () => {
    try {
      const result = await axios.get(
        "https://academycrmbackend.onrender.com/api/student/getCertificatesByStudent",
        { withCredentials: true }
      );
      if (result.status == 240) {
        navigate("/unauthorized");
      }
      if (result.status == 200) {
        setCData(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCertificates();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <SNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-2 border-b-4 border-indigo-100">
          <Award className="w-8 h-8 inline-block mr-2 text-indigo-600" />
          My Certificates & Awards
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cData.map((cert, ind) => (
            <div
              key={cert.id}
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-indigo-500 flex flex-col h-full overflow-hidden"
            >
              {console.log(cert)}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20  z-0" // opacity and blur for subtlety
                style={{
                  backgroundImage: `url(https://academycrmbackend.onrender.com/${cert.name})`,
                }} // Use cert.name for the image URL
              ></div>
              {console.log(cert)}

              {/* Content of the card (z-10 to be above the background) */}
              <div className="relative z-10 flex flex-col h-full">
                {/* TOP SECTION: Title and Certificate Number */}
                <div className="flex flex-col items-start pb-4 border-b border-gray-100 mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Assuming FileText, BookOpen, BuildingOffice2, CalendarDays are imported Heroicons */}
                    <FileText className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                    <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                      {cert.title}
                    </h1>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600 mt-2 ml-9">
                    Certificate No: **{cert.certificate_number}**
                  </p>
                </div>

                {/* MIDDLE SECTION: Course Details and Metadata */}
                <div className="flex-grow space-y-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <p>
                      <span className="font-medium text-gray-700">Course:</span>{" "}
                      <span className="font-bold text-gray-800">
                        {cert.class_name}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <HiBuildingOffice2 className="w-4 h-4 text-gray-500" />
                    <p>
                      <span className="font-medium text-gray-700">
                        Issued By:
                      </span>{" "}
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    <p>
                      <span className="font-medium text-gray-700">
                        Date Issued:
                      </span>{" "}
                      <span className="font-semibold">
                        {formatDate(cert.issue_date)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* BOTTOM SECTION: Download and Verification */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() =>
                      handleDownload(
                        cert.title,
                        cert.issue_date,
                        cert.certificate_number,
                        cert.name,
                        cert.verification_code,
                        cert.profile_photo,
                        cert.signature_photo
                      )
                    }
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition duration-150 shadow-md bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Certificate</span>
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-3 truncate">
                    <span className="font-medium">Verification Code:</span> **
                    {cert.verification_code}**
                  </p>
                </div>
              </div>
            </div>
          ))}

          {cData.length === 0 && (
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
