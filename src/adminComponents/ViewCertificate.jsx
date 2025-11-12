import React, { useEffect, useState, useMemo } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import QRCode from "qrcode";
const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

// Helper component for clearer image presentation
const ImageCell = ({ src, alt }) => (
  <div className="flex justify-center items-center h-full">
    {src ? (
      <img
        className="w-16 h-16 object-cover border border-black rounded-sm"
        src={src}
        alt={alt}
      />
    ) : (
      <span className="text-gray-500 text-xs">No Image</span>
    )}
  </div>
);
const ImageCell2 = ({ src, alt }) => (
  <div className="flex justify-center items-center h-full">
    {src ? (
      <img
        className="w-16 h-16 object-cover border border-black rounded-sm"
        src={src}
        alt={alt}
      />
    ) : (
      <span className="text-gray-500 text-xs">No Image</span>
    )}
  </div>
);

// Component for the status pill - simple black/white theme
const StatusPill = ({ isRevoked }) => (
  <span
    className={`px-3 py-1 text-xs font-semibold rounded-full border ${
      isRevoked
        ? "bg-black text-white border-red-500" // Revoked
        : "bg-white text-black border-green-500" // Assigned
    }`}
  >
    {isRevoked ? "REVOKED" : "ASSIGNED"}
  </span>
);

const ViewCertificate = () => {
  const [Certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState({});
  const [profileUrl, setProfileUrl] = useState({});
  const [signUrl, setSignUrl] = useState({});

  const certificatePrint = async (
    name,
    issueDate,
    certNumber,
    templatePath,
    verificationCode,
    srcProfile,
    sign,
    srcTemplate
  ) => {
    if (!templatePath) return alert("Error: Certificate template not found.");

    const formattedDate = issueDate
      ? new Date(issueDate).toLocaleDateString("en-US")
      : "N/A";

    const fullImageUrl = srcTemplate;

    // Create canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 2000;
    canvas.height = 1414;

    // --- Safe image loading helper ---
    const safeLoadImage = (src) => {
      return new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.warn("Image failed to load:", src);
          resolve(null);
        };
      });
    };

    const [templateImg, qrImg, profileImg, signatureImg] = await Promise.all([
      safeLoadImage(fullImageUrl),
      (async () => {
        const verificationUrl = `https://academy-crm-frontend.vercel.app/verify?code=${verificationCode}`;
        const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
          width: 250,
          margin: 1,
        });
        return safeLoadImage(qrDataUrl);
      })(),
      safeLoadImage(srcProfile),
      safeLoadImage(`${sign}`),
    ]);

    // --- Draw Template (if available) ---
    if (templateImg) ctx.drawImage(templateImg, 0, 0, 2000, 1414);

    // --- Draw Text ---
    ctx.font = "bold 70px 'Times New Roman'";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(name || "Student Name", 1000, 700);

    ctx.font = "40px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Certificate No: ${certNumber || "N/A"}`, 10, 100);

    ctx.textAlign = "right";
    ctx.fillText(`Date: ${formattedDate}`, 1980, 110);

    // --- Optional images ---
    if (profileImg) ctx.drawImage(profileImg, 1500, 200, 250, 250);
    if (signatureImg) ctx.drawImage(signatureImg, 1500, 460, 250, 125);
    if (qrImg) ctx.drawImage(qrImg, 100, 1414 - 250 - 150, 250, 250);

    // --- Print ---
    const dataUrl = canvas.toDataURL("image/png", 0.95);
    const printWindow = window.open("about:blank", "_blank");
    printWindow.document.write(`
    <html>
      <head><title>${name} Certificate</title></head>
      <body style="margin:0;display:flex;justify-content:center;align-items:center;">
        <img src="${dataUrl}" width="100%" />
        <script>window.onload = () => window.print();</script>
      </body>
    </html>
  `);
    printWindow.document.close();
  };

  const getAllAssignedCertificates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await axios.get(
        `${BASE_URL}/api/student/getAllAssignedCertificates`,
        { withCredentials: true }
      );
      if (result.status === 200) {
        setCertificates(result.data.data || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch certificates.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAssignedCertificates();
  }, []);

  const getCertificatePhotos = async (id, fileName) => {
    setPhotoLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getCerti/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setPhotoUrl((prev) => ({ ...prev, [id]: url }));
      setPhotoLoading(false);
    } catch (err) {
      console.error("Failed to load photo:", err);
      setPhotoLoading(false);
    }
  };
  const getProfilePhotos = async (id, fileName) => {
    setPhotoLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setProfileUrl((prev) => ({ ...prev, [id]: url }));
      setPhotoLoading(false);
    } catch (err) {
      console.error("Failed to load photo:", err);
      setPhotoLoading(false);
    }
  };
  const getSignPhotos = async (id, fileName) => {
    setPhotoLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setSignUrl((prev) => ({ ...prev, [id]: url }));
      setPhotoLoading(false);
    } catch (err) {
      console.error("Failed to load photo:", err);
      setPhotoLoading(false);
    }
  };

  useEffect(() => {
    if (Certificates.length > 0) {
      Certificates.map((val, ind) => {
        getCertificatePhotos(val.id, val.template);
        getProfilePhotos(val.id, val.profile_photo);
        getSignPhotos(val.id, val.signature_photo);
      });
    }
  }, [Certificates]);

  const filteredCertificates = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (!lowerCaseSearchTerm) return Certificates;

    return Certificates.filter(
      (certificate) =>
        certificate.title?.toLowerCase().includes(lowerCaseSearchTerm) ||
        certificate.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
        (certificate.is_revoked ? "revoked" : "assigned").includes(
          lowerCaseSearchTerm
        )
    );
  }, [Certificates, searchTerm]);

  /**
   * --- Action Handlers (Stubs) ---
   */
  const handleEdit = (certificateId) => {
    alert(
      `Editing Certificate ID: ${certificateId}. (Implement actual navigation/modal here)`
    );
  };

  // --- Simple Black/White Theme Classes ---
  const BASE_BG = "bg-white";
  const BASE_TEXT = "text-black";
  const HEADER_BG = "bg-black";
  const HEADER_TEXT = "text-white";
  const ROW_HOVER = "hover:bg-gray-100";
  const TABLE_BORDER = "border border-black";

  return (
    <div className={`min-h-screen ${BASE_BG} ${BASE_TEXT} font-sans`}>
      <AdminNavbar />

      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-light mb-8 border-b pb-2">
          View Assigned Certificates
        </h1>

        {/* --- Search Bar --- */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Title, Course Name, or Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 border-2 ${TABLE_BORDER} rounded-none ${BASE_BG} ${BASE_TEXT} placeholder-gray-500 focus:outline-none focus:border-gray-500`}
          />
        </div>

        {/* --- Loading and Error States --- */}
        {isLoading && (
          <p className="text-center text-xl text-gray-600">
            Loading certificates...
          </p>
        )}
        {error && <p className="text-center text-xl text-red-600">{error}</p>}

        {/* --- Certificate Table --- */}
        {!isLoading && !error && (
          <div className="overflow-x-auto shadow-lg">
            <table
              className={`min-w-full divide-y divide-black ${TABLE_BORDER}`}
            >
              {/* Table Header */}
              <thead className={`${HEADER_BG} ${HEADER_TEXT}`}>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                    Certificate Title
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase tracking-wider">
                    Profile Photo
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-300">
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((val, ind) => (
                    <tr
                      key={ind}
                      className={`${ROW_HOVER} transition duration-100 ease-in-out`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {ind + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm">
                        {val.title || "N/A"}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm">
                        <ImageCell2
                          src={profileUrl[val.id]}
                          alt="Profile Photo"
                        />
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm">
                        <ImageCell
                          src={photoUrl[val.id]}
                          alt="Certificate Template"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {val.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <StatusPill isRevoked={val.is_revoked} />
                      </td>
                      {/* --- Actions Column --- */}
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(val.id)}
                            className="text-sm font-semibold bg-black text-white px-3 py-1 border border-black hover:bg-gray-800 transition duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              certificatePrint(
                                val.title,
                                val.issue_date,
                                val.certificate_number,
                                val.template,
                                val.verification_code,
                                profileUrl[val.id],
                                signUrl[val.id],
                                photoUrl[val.id]
                              );
                            }}
                            className="text-sm font-semibold bg-white text-black px-3 py-1 border border-black hover:bg-gray-200 transition duration-150"
                          >
                            Print
                          </button>
                        </div>
                      </td>
                      {/* --- End Actions Column --- */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-10 text-center text-gray-500 text-lg"
                    >
                      {searchTerm
                        ? "No certificates match your search criteria."
                        : "No certificates have been assigned yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCertificate;
