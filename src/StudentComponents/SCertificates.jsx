import React, { useEffect, useState } from "react";
import SNavbar from "./SNavbar";
import QRCode from "qrcode";

import {
  Award,
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  Loader2,
} from "lucide-react"; // Importing Lucide icons
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiBuildingOffice2 } from "react-icons/hi2";

const SCertificates = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const navigate = useNavigate();
  const [cData, setCData] = useState([]);
  const [templateUrl, setTemplateUrl] = useState({});
  const [profileUrl, setProfileUrl] = useState({});
  const [signUrl, setSignUrl] = useState({});
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCertificates = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/student/getCertificatesByStudent`,
        { withCredentials: true }
      );
      if (result.status == 240) {
        navigate("/unauthorized");
      }
      if (result.status == 200) {
        setLoading(false);
        setCData(result.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDownload = async (
    name,
    issueDate,
    certNumber,
    templatePath,
    verificationCode,
    profile,
    sign
  ) => {
    console.log(templatePath);
    if (!templatePath) return alert("Error: Certificate template not found.");
    const fullImageUrl = `${templatePath}`;
    const formattedDate = issueDate
      ? new Date(issueDate).toLocaleDateString("en-US")
      : "N/A";

    const safeLoadImage = (src) => {
      return new Promise((resolve) => {
        if (!src) return resolve(null); // no source → skip
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.warn(`⚠️ Failed to load image: ${src}`);
          resolve(null); // skip instead of throwing
        };
      });
    };

    const image = await safeLoadImage(fullImageUrl);
    // Use a temporary off-screen canvas (no need for useRef here)
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 2000;
    canvas.height = 1414;

    if (image) ctx.drawImage(image, 0, 0, 2000, 1414);
    else {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 2000, 1414);
    }

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
    const verificationUrl = `https://academy-crm-frontend.vercel.app//verify?code=${verificationCode}`; // Use actual verification link
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 250,
      margin: 1,
    });

    const qrImg = await safeLoadImage(qrDataUrl);
    const profileImage = await safeLoadImage(`${profile}`);
    const signatureImage = await safeLoadImage(`${sign}`);

    if (profileImage) ctx.drawImage(profileImage, 1500, 200, 250, 250);
    else {
      ctx.strokeStyle = "#aaa";
      ctx.strokeRect(1500, 200, 250, 250);
      ctx.font = "30px Arial";
      ctx.fillStyle = "#888";
      ctx.fillText("No Photo", 1625, 340);
    }

    if (signatureImage) ctx.drawImage(signatureImage, 1500, 460, 250, 125);
    else {
      ctx.strokeStyle = "#aaa";
      ctx.strokeRect(1500, 460, 250, 125);
      ctx.font = "30px Arial";
      ctx.fillStyle = "#888";
      ctx.fillText("No Sign", 1625, 540);
    }

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

  useEffect(() => {
    getCertificates();
  }, []);

  const fetchTemplate = async (id, fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getCerti/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setTemplateUrl((prev) => ({ ...prev, [id]: url }));
    } catch (err) {
      console.error("Failed to load photo:", err);
    }
  };
  const fetchProfile = async (id, fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setProfileUrl((prev) => ({ ...prev, [id]: url }));
    } catch (err) {
      console.error("Failed to load photo:", err);
    }
  };
  const fetchSign = async (id, fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setSignUrl((prev) => ({ ...prev, [id]: url }));
    } catch (err) {
      console.error("Failed to load photo:", err);
    }
  };

  useEffect(() => {
    if (cData.length > 0) {
      cData.map((val, ind) => {
        fetchTemplate(val.verification_code, val.name);
        fetchProfile(val.verification_code, val.profile_photo);
        fetchSign(val.verification_code, val.signature_photo);
      });
    }
  }, [cData]);

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
              key={ind}
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-indigo-500 flex flex-col h-full overflow-hidden"
            >
              {console.log(cert)}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20  z-0" // opacity and blur for subtlety
                style={{
                  backgroundImage: `url(${
                    templateUrl[cert.verification_code]
                  })`,
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
                    onClick={() => {
                      handleDownload(
                        cert.title,
                        cert.issue_date,
                        cert.certificate_number,
                        templateUrl[cert.verification_code],
                        cert.verification_code,
                        profileUrl[cert.verification_code],
                        signUrl[cert.verification_code]
                      );
                      console.log(cert.name);
                    }}
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
            <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-600">
              {loading ? (
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                  <p className="text-lg font-medium text-gray-500">
                    Loading certificates...
                  </p>
                </div>
              ) : (
                <p className="text-lg text-gray-500 font-medium">
                  No certificates or awards are currently available.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SCertificates;
