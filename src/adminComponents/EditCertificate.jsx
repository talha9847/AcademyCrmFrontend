import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar"; // Assuming you want the same navbar
import { useLocation, useParams } from "react-router-dom"; // Import for potential routing
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// --- Theme Constants (Mirroring ViewCertificate.jsx) ---
const BASE_BG = "bg-white";
const BASE_TEXT = "text-black";
const HEADER_BG = "bg-black";
const HEADER_TEXT = "text-white";
const INPUT_BORDER = "border border-black";

const EditCertificate = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const location = useLocation();
  const certificateId = location.state?.certificateId;
  // Use a mock ID for static demonstration
  // In a real application, you would use useParams() to get the ID from the URL:
  const [photoUrl, setPhotoUrl] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [formData, setFormData] = useState({
    title: "Full Stack Development Mastery",
    studentName: "Alex Johnson",
    courseName: "MERN Stack Bootcamp",
    issueDate: "2025-10-20", // Use YYYY-MM-DD for date inputs
    certificateNumber: "CERT-FS-001A",
    verificationCode: "a1b2c3d4e5f6",
    isRevoked: false,
    // Add file names/URLs here to display current images
    templateFile: "template_standard.png",
    profileFile: "profile_alex.jpg",
    signatureFile: "signature_ceo.png",
    name: "",
    id: 0,
  });
  const getCertificateById = async () => {
    const id = certificateId;
    try {
      const result = await axios.post(
        `${BASE_URL}/api/extras/getCertificateById`,
        { id: id },
        { withCredentials: true }
      );
      if (result.status == 200) {
        console.log(result.data.data);
        const data = result.data.data;
        setFormData((prev) => ({
          ...prev,
          isRevoked: data.is_revoked,
          certificateNumber: data.certificate_number,
          studentName: data.title,
          title: data.description,
          verificationCode: data.verification_code,
          name: data.name,
          id: parseInt(data.template_id),
        }));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCertificatePhoto = async (fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getCerti/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setPhotoUrl(url);
    } catch (err) {
      console.error("Failed to load photo:", err);
    }
  };

  const getTempates = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/student/getAllTemplates`,
        { withCredentials: true }
      );
      if (result.status == 200) {
        setTemplates(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCertificateById();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      getCertificatePhoto(formData.name);
    }
  }, [formData]);
  // --- Static State for Form Fields (Simulating fetched data) ---

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, this would call axios.put or axios.patch
    console.log(formData);
    try {
      setIsLoading(true);
      const result = await axios.put(
        `${BASE_URL}/api/extras/updateCertificate`,
        {
          title: formData.studentName,
          description: formData.title,
          isRevoked: formData.isRevoked,
          templateId: formData.id,
          id: certificateId,
        },
        { withCredentials: true }
      );
      if (result.status == 200) {
        getCertificateById(certificateId);
        toast.success("Updated successfully");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error in updating");
    }
  };

  // --- Helper for Mock Image Display (Replace with actual ImageCell if needed) ---
  const MockImagePreview = ({ fileName, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 flex justify-center items-center border border-gray-400 bg-gray-50 mb-2 rounded-sm">
        <img src={fileName} alt="Certificate Not Found" />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${BASE_BG} ${BASE_TEXT} font-sans flex flex-col`}
      >
        <AdminNavbar />

        {/* Loader centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2
              className="mx-auto mb-4 animate-spin text-gray-500"
              size={48}
            />
            <p className="text-lg font-medium text-gray-600">
              Loading certificate details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${BASE_BG} ${BASE_TEXT} font-sans`}>
        <AdminNavbar />
        <div className="container mx-auto p-8">
          <p className="text-center text-xl text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${BASE_BG} ${BASE_TEXT} font-sans`}>
      <AdminNavbar />

      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-light mb-4 border-b pb-2">
          Edit Certificate: <span className="font-bold">{formData.title}</span>
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Certificate ID: **{certificateId}**
        </p>

        {/* --- Edit Form --- */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-4xl mx-auto p-6 border-2 border-black"
        >
          {/* --- Text Inputs --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Certificate Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full p-2 ${INPUT_BORDER} ${BASE_BG} ${BASE_TEXT} focus:outline-none focus:border-gray-500`}
              />
            </div>

            <div>
              <label
                htmlFor="studentName"
                className="block text-sm font-medium mb-1"
              >
                Student Name
              </label>
              {/* Note: This might be read-only if student info is in another table */}
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                readOnly // Often student name is read-only when editing a certificate
                className={`w-full p-2 ${INPUT_BORDER} ${BASE_BG} ${BASE_TEXT} bg-gray-100 cursor-not-allowed`}
              />
            </div>

            <div>
              <label
                htmlFor="certificateNumber"
                className="block text-sm font-medium mb-1"
              >
                Certificate Number
              </label>
              <input
                type="text"
                id="certificateNumber"
                name="certificateNumber"
                value={formData.certificateNumber}
                onChange={handleChange}
                readOnly
                className={`w-full p-2 ${INPUT_BORDER} ${BASE_BG} ${BASE_TEXT} focus:outline-none focus:border-gray-500`}
              />
            </div>

            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium mb-1"
              >
                Verification Code (Read Only)
              </label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={formData.verificationCode}
                readOnly
                className={`w-full p-2 ${INPUT_BORDER} ${BASE_BG} ${BASE_TEXT} bg-gray-100 cursor-not-allowed`}
              />
            </div>
          </div>

          {/* --- File/Image Upload Section --- */}
          <div className="pt-4 border-t border-gray-300">
            <h3 className="text-xl font-medium mb-4">Update Assets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Template Upload (Replaced file input with dropdown) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Certificate Template
                </label>

                {/* Image Preview stays */}
                <MockImagePreview fileName={photoUrl} />

                {/* Dropdown (only 1 option = formData.name) */}
                <select
                  onFocus={getTempates}
                  value={formData.id}
                  onChange={(e) => {
                    const selectedId = e.target.value;

                    const selectedTemplate = templates.find(
                      (t) => t.id == selectedId
                    );

                    setPhotoUrl(selectedTemplate.name);

                    setFormData((prev) => ({
                      ...prev,
                      id: selectedId,
                      name: selectedTemplate ? selectedTemplate.name : "", // set temp.name
                    }));
                  }}
                  className="mt-2 w-full p-2 border rounded-md"
                >
                  <option key={0} value="">
                    Default Template
                  </option>

                  {templates.length > 0 &&
                    templates.map((temp, ind) => (
                      <option key={ind + 1} value={temp.id}>
                        {temp.name.split("/")[2]}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* --- Status Checkbox --- */}
          <div className="pt-4 border-t border-gray-300">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isRevoked"
                name="isRevoked"
                checked={formData.isRevoked}
                onChange={handleChange}
                className="w-4 h-4 border-black text-black focus:ring-black"
              />
              <label htmlFor="isRevoked" className="ml-2 text-sm font-medium">
                Revoke Certificate (Mark as **REVOKED**)
              </label>
            </div>
            <p className="text-xs text-red-500 mt-1">
              *Checking this box will revoke the certificate and mark its status
              as REVOKED.
            </p>
          </div>

          {/* --- Submit Button --- */}
          <div className="flex justify-end pt-4 border-t border-gray-300">
            <button
              type="submit"
              className={`text-lg font-semibold ${HEADER_BG} ${HEADER_TEXT} px-6 py-2 border ${INPUT_BORDER} hover:bg-gray-800 transition duration-150`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCertificate;
