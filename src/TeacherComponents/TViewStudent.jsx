import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import {
  User,
  Mail,
  Calendar,
  Hash,
  MapPin,
  Phone,
  Users,
  Clock,
  BookOpen,
  Edit2,
  ArrowLeft,
  MoreVertical,
  Download,
  Printer,
  CreditCard,
  Edit3,
  X,
  Plus,
  Camera,
  Lock,
} from "lucide-react";
import { useForm } from "react-hook-form";
import TNavbar from "./TNavbar";

const TViewStudent = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const location = useLocation();
  const { studentId } = location.state || {};
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit1, setEdit1] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form1Data, setForm1Data] = useState({
    roll_no: "",
    gender: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const navigate = useNavigate();
  const [edit3, setEdit3] = useState(false);
  const [add, setAdd] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classes1, setClasses1] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [feeEdit, setFeeEdit] = useState(false);
  const [feeValue, setFeeValue] = useState();

  const [saveData, setSaveData] = useState({
    classId: 1,
    sessionId: 1,
  });
  const [saveData2, setSaveData2] = useState({
    dob: "",
    status: "",
    address: "",
    contact: "",
  });

  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [signLoading, setSignLoading] = useState(true);
  const [signUrl, setSignUrl] = useState(null);
  const [passwordModal, setPasswordModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const edit1Click = async (rollNo, gender) => {
    setForm1Data({
      roll_no: rollNo,
      gender: gender,
    });
  };

  const newPassword = watch("newPassword");

  const changePassword = async (data) => {
    setUpdating(true);
    const newData = { ...data, id: studentId };
    try {
      const result = await axios.post(
        `${BASE_URL}/api/student/changePasswordByAdmin`,
        newData,
        { withCredentials: true }
      );
      console.log(result.status);
      if (result.status == 233) {
        setUpdating(false);
        toast.warn("Password can't be same previous one");
        setPasswordModal(false);
      }
      if (result.status == 200) {
        toast.success("Password updated Successfully");
        setUpdating(false);
        setPasswordModal(false);
      }
    } catch (error) {
      console.log(error);
      setUpdating(false);
      setPasswordModal(false);
      toast.error("Error in updating password");
    }
  };

  const deleteStudent = async () => {
    // 1. Get Input from the user (e.g., student ID or confirmation text)
    const { value: inputIdentifier } = await Swal.fire({
      title: "Enter Student Roll Number to Confirm Deletion",
      input: "text",
      inputLabel: "Roll Number",
      inputPlaceholder: "abc123@gmail.com",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter the Roll Number to proceed!";
        }
      },
    });

    // Check if the user provided input and didn't cancel the first prompt
    if (inputIdentifier) {
      // 2. Confirmation Dialog using the received input
      const result = await Swal.fire({
        title: "Are you absolutely sure?",
        text: `You are about to delete the student with Email: ${inputIdentifier}. This action is irreversible.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33", // Changed color to red for deletion
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, permanently delete!",
      });

      // 3. Process Deletion if confirmed
      if (result.isConfirmed) {
        // --- Actual Deletion Logic (API call) would go here ---
        // try {
        //   await axios.delete(`/api/student/${inputIdentifier}`);
        // --------------------------------------------------------

        // 4. Success Dialog
        Swal.fire({
          title: "Deleted!",
          text: `Student ${inputIdentifier} has been permanently removed.`,
          icon: "success",
        });

        // } catch (error) {
        //   Swal.fire(
        //     'Error!',
        //     'There was an error deleting the student on the server.',
        //     'error'
        //   );
        // }
      } else {
        // Confirmation cancelled
        Swal.fire(
          "Action Cancelled",
          "The deletion process was stopped by the user.",
          "info"
        );
      }
    } else {
      // Input prompt cancelled
      Swal.fire(
        "Input Required",
        "Deletion requires entering the student identifier.",
        "info"
      );
    }
  };

  const handleStatusClick = async () => {
    const action = student.is_active ? "disable" : "enable";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this account?`,
      text: student.is_active
        ? "The user will not be able to log in after this."
        : "The user will regain access after this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${action} it`,
    });

    if (result.isConfirmed) {
      const result = await axios.post(
        `${BASE_URL}/api/student/statusUpdate`,
        {
          status: !student.is_active,
          userId: studentId,
        },
        { withCredentials: true }
      );
      if (result.status == 200) {
        studentDetails(studentId);
        Swal.fire({
          title: "Updated!",
          text: `User account has been ${action}d successfully.`,
          icon: "success",
        });
      }
    }
  };
  const handleSignatureChange = async (e, email) => {
    try {
      const formData = new FormData();
      console.log(email);
      const photo = e.target.files[0];
      formData.append("signaturePhoto", photo);
      formData.append("email", email);
      formData.append("userId", studentId);
      const result = await axios.post(
        `${BASE_URL}/api/student/updateStudentSignature`,
        formData,
        { withCredentials: true }
      );
      if (result.status == 200) {
        studentDetails(studentId);
        toast.success("Profile picture changed kindly refresh");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error kindly refresh");
    }
  };

  const feeSave = async () => {
    setEditLoading(true);
    if (feeValue == "" || feeValue == null) {
      toast.error("Fee is required");
    }

    try {
      const result = await axios.post(
        `${BASE_URL}/api/student/updateFee`,
        { fee: feeValue, userId: studentId },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setFeeEdit(false);
        toast.success("fee updated successfully");
        studentDetails(studentId);
        setEditLoading(false);
      }
    } catch (error) {
      setEditLoading(false);
    }
  };

  const handleProfilePhotoChange = async (e, email) => {
    console.log(email);
    const file = e.target.files[0]; // get the first selected file
    if (!file) return; // if no file selected, do nothing
    console.log("Selected photo name:", file.name);
    const formData = new FormData();
    formData.append("profilePhoto", file);
    formData.append("email", email);
    formData.append("userId", studentId);
    try {
      const result = await axios.post(
        `${BASE_URL}/api/student/updateStudentProfile`,
        formData,
        { withCredentials: true }
      );
      if (result.status == 200) {
        toast.success("Profile picture changed kindly refresh");
        studentDetails(studentId);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error kindly refresh");
    }
  };

  const handleSave2 = async (id, saveData) => {
    console.log(saveData);
    try {
      if (add) {
        const result = await axios.post(
          `${BASE_URL}/api/student/addEnrolledClasses`,
          {
            userId: studentId,
            classId: saveData.classId,
            sessionId: saveData.sessionId,
          },
          { withCredentials: true }
        );
        if (result.status == 200) {
          toast.success("Added successfully");
          studentDetails(studentId);
        }
      } else {
        const result = await axios.post(
          `${BASE_URL}/api/student/updateEnrolledClasses`,
          { eId: id, classId: saveData.classId, sessionId: saveData.sessionId },
          { withCredentials: true }
        );
        if (result.status == 200) {
          toast.success("Updated successfully");
          studentDetails(studentId);
        }
      }
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.post(
        `${BASE_URL}/api/student/deleteEnrolledClasses`,
        { id: id },
        { withCredentials: true }
      );
      if (result.status == 200) {
        studentDetails(studentId);
        toast.warn("Deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave1 = async (form1Data) => {
    setEditLoading(true);
    try {
      if (edit1) {
        const result = await axios.post(
          `${BASE_URL}/api/student/updateStudentRollAndGender`,
          { rollNo: form1Data.roll_no, studentId, gender: form1Data.gender },
          { withCredentials: true }
        );
        if (result.status == 200) {
          toast.success("Details updated successfully");
          studentDetails(studentId);
          setIsModalOpen(false);
          setEdit1(false);
          setEditLoading(false);
        }
      }
      if (edit3) {
        const result = await axios.post(
          `${BASE_URL}/api/student/updatePI`,
          {
            dob: saveData2.dob,
            userId: studentId,
            address: saveData2.address,
            status: saveData2.status,
            contact: saveData2.contact,
          },
          { withCredentials: true }
        );
        if (result.status == 200) {
          setIsModalOpen(false);
          setEdit1(false);
          toast.success("Details updated successfully");
          studentDetails(studentId);
          setEditLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setEditLoading(false);
    }
  };
  async function studentDetails(studentId) {
    try {
      setLoading(true);
      const result = await axios.get(`${BASE_URL}/api/user/getStudentDetail`, {
        withCredentials: true,
        params: {
          id: studentId,
        },
      });

      if (result.status == 200) {
        setClasses(result.data.data.enrolledClasses);
        setStudent(result.data.data.student);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  }

  const getClasses = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/extras/getClasses`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        setClasses1(result.data.data);
      }
    } catch (error) {}
  };

  const getSessions = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/extras/getSessions`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        setSessions(result.data.data);
      }
    } catch (error) {}
  };

  const studentPhoto = async (fileName) => {
    setPhotoLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setPhotoUrl(url);
      setPhotoLoading(false);
    } catch (err) {
      console.error("Failed to load photo:", err);
      setPhotoLoading(false);
    }
  };
  const signaturePhoto = async (fileName) => {
    setSignLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/user/getPhoto/${fileName}`, {
        responseType: "blob",
        withCredentials: true,
      });
      const url = URL.createObjectURL(res.data);
      setSignUrl(url);
      setSignLoading(false);
    } catch (err) {
      console.error("Failed to load photo:", err);
      setSignLoading(false);
    }
  };

  useEffect(() => {
    studentDetails(studentId);
    getClasses();
    getSessions();
  }, []);

  useEffect(() => {
    if (student?.profile_photo) {
      studentPhoto(student.profile_photo);
    }
    if (student?.signature_photo) {
      signaturePhoto(student.signature_photo);
    }
  }, [student]);

  const handlePrint = () => {
    if (!student) return;

    const printWindow = window.open("", "_blank");
    const profilePhotoUrl = student.profile_photo
      ? `${BASE_URL}/uploads/${student.profile_photo}`
      : "";
    const signatureUrl = student.signature_photo
      ? `${BASE_URL}/uploads/${student.signature_photo}`
      : "";

    const printContent = `
       <!DOCTYPE html>
      <html>
        <head>
          <title>Student Admission Form - ${student.student_name}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Times New Roman', serif;
              padding: 30px 60px; /* Reduced vertical padding from 50px to 30px */
              color: #000;
              background: #fff;
              line-height: 1.35; /* Slightly reduced line-height */
            }
            .letterhead {
              text-align: center;
              margin-bottom: 25px; /* Reduced from 30px */
              padding-bottom: 8px; /* Reduced from 10px */
              border-bottom: 2px solid #000;
            }
            .institution-name {
              font-size: 28px;
              font-weight: bold;
              color: #000;
              margin-bottom: 5px;
              letter-spacing: 0.5px;
              text-decoration: underline;
            }
            .institution-tagline {
              font-size: 13px;
              color: #333;
              font-style: italic;
              margin-bottom: 5px;
            }
            .institution-address, .institution-contact {
              font-size: 11px;
              color: #444;
              margin-bottom: 2px;
            }
            .form-header {
              color: #000;
              padding: 5px 0;
              margin: 20px 0 15px 0; /* Reduced margins */
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              letter-spacing: 2px;
              border-bottom: 3px double #000;
              border-top: 1px solid #000;
            }
            .form-number {
              text-align: right;
              font-size: 11px;
              margin-bottom: 10px; /* Reduced from 15px */
              color: #333;
            }
            .photo-section {
              float: right;
              margin-left: 30px;
              margin-bottom: 15px;
              margin-top: -10px;
            }
            .photo-container {
              border: 1px solid #000;
              padding: 2px;
              background: white;
              box-shadow: none;
            }
            .photo-box {
              width: 130px;
              height: 150px;
              border: 1px dashed #666;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #fff;
              overflow: hidden;
            }
            .photo-box img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .photo-placeholder {
              font-size: 10px;
              color: #999;
              text-align: center;
              padding: 5px;
            }
            .signature-container {
              margin-top: 15px;
              text-align: center;
            }
            .signature-box {
              width: 130px;
              height: 40px;
              border: none;
              border-bottom: 1px solid #000;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              background: none;
              margin-bottom: 0px;
            }
            .signature-box img {
              max-width: 125px;
              max-height: 35px;
              object-fit: contain;
            }
            .signature-label {
              font-size: 10px;
              color: #333;
              padding-top: 3px;
              width: 130px;
              margin: 0 auto;
              font-style: italic;
            }
            .section {
              margin-bottom: 15px; /* Reduced from 20px */
              clear: both;
              page-break-inside: avoid;
            }
            .section-heading {
              background: none;
              border-left: none;
              padding: 5px 0;
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 8px; /* Reduced from 10px */
              text-transform: uppercase;
              letter-spacing: 0.5px;
              border-bottom: 1px solid #000;
              display: inline-block;
            }
            /* New style for fillable lines */
            .info-line {
              display: flex;
              align-items: flex-end;
              margin-bottom: 6px; /* Reduced from 8px */
              font-size: 13px;
              line-height: 1.4; /* Adjusted line-height */
              padding-bottom: 2px;
            }
            .info-label-inline {
              font-weight: bold;
              color: #000;
              white-space: nowrap;
              padding-right: 5px;
            }
            .info-value-fill {
              flex-grow: 1;
              border-bottom: 1px dotted #000;
              padding: 0 5px;
              font-weight: normal;
              color: #000;
            }
            .info-table {
              width: 100%;
              border-collapse: collapse;
            }
            .info-row {
              border-bottom: 1px dotted #ccc;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              width: 30%;
              padding: 6px 10px 6px 0; /* Reduced padding */
              font-weight: bold;
              font-size: 12px;
              color: #333;
              background: none;
              vertical-align: top;
              text-align: left;
            }
            .info-value {
              padding: 6px 15px; /* Reduced padding */
              font-size: 12px;
              color: #000;
              border-left: 1px dotted #999;
            }
            
            /* Make Declaration look like an important box */
            .declaration-box {
              border: 1px solid #000;
              border-top: 5px solid #000;
              padding: 15px;
              margin: 15px 0; /* Reduced margin from 20px */
              background: #f8f8f8;
              page-break-inside: avoid;
            }
            .declaration-title {
              font-weight: bold;
              font-size: 14px;
              margin-bottom: 8px; /* Reduced from 10px */
              text-transform: uppercase;
              color: #000;
              text-align: center;
              border-bottom: 1px solid #000;
              padding-bottom: 3px;
            }
            .declaration-text {
              font-size: 11px;
              line-height: 1.4; /* Tighter line height for declaration */
              text-align: justify;
              margin-bottom: 8px; /* Reduced from 10px */
            }
            .declaration-date {
              display: flex;
              justify-content: flex-start;
              gap: 80px;
              margin-top: 10px; /* Reduced from 15px */
              font-size: 12px;
            }
            .date-field {
              border-bottom: 1px solid #000;
              min-width: 120px;
              display: inline-block;
              padding: 0 5px;
            }
            .signature-footer {
              display: flex;
              justify-content: space-around;
              margin-top: 40px; /* Reduced from 50px */
              page-break-inside: avoid;
            }
            .signature-block {
              text-align: center;
              width: 30%;
            }
            .signature-space {
              height: 20px;
              border-bottom: 1px solid #000;
              margin-bottom: 5px;
            }
            .signature-text {
              font-size: 11px;
              font-weight: bold;
              color: #000;
              border-top: 1px dotted #000;
              padding-top: 3px;
            }
            .signature-role {
              font-size: 10px;
              color: #666;
              margin-top: 2px;
            }
            .office-stamp {
              margin-top: 30px; /* Reduced from 40px */
              text-align: right;
              page-break-inside: avoid;
            }
            .stamp-box {
              display: inline-block;
              border: 2px solid #000;
              border-radius: 50%;
              padding: 25px 35px;
              text-align: center;
              font-size: 10px;
              color: #000;
              font-weight: bold;
              border-style: double;
            }
            .admission-date {
              text-align: right;
              font-size: 12px;
              margin-bottom: 10px;
              color: #333;
            }
            @media print {
              body {
                padding: 30px;
              }
              .section {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <!-- Letterhead -->
          <div class="letterhead">
            <div class="institution-name">MEHTAB COMPUTER ACADEMY</div>
            <div class="institution-tagline">"Empowering Future Through Technology Education"</div>
            <div class="institution-address">Regd. Office: 123 Education Street, City - 395006"}</div>
            <div class="institution-contact">Phone: +91 91067-04675 | Email: info@mehtabacademy.edu.in | Web: www.mehtabacademy.edu.in</div>
          </div>

          <!-- Form Title and Numbers -->
          <div class="form-header">STUDENT ADMISSION FORM (ACADEMIC YEAR ${new Date().getFullYear()}-${
      new Date().getFullYear() + 1 - 2000
    })</div>

          <div class="form-number">
            FORM NO.${student.admission_number || "_______________"}
          </div>

          <div class="admission-date">
            Date of Admission: <span class="date-field"> ${
              student.admission_date || "DD/MM/YYYY"
            } </span>
          </div>

          <!-- Photo and Signature (Floated Right) -->
          <div class="photo-section">
            <div class="photo-container">
              <div class="photo-box">
                ${
                  profilePhotoUrl
                    ? `<img src="${photoUrl}" alt="Student Photo" />`
                    : '<div class="photo-placeholder">PASTE RECENT<br>PASSPORT SIZE<br>PHOTOGRAPH HERE</div>'
                }
              </div>
            </div>
            <div class="signature-container">
              <div class="signature-box">
                ${
                  signatureUrl ? `<img src="${signUrl}" alt="Signature" />` : ""
                }
              </div>
              <div class="signature-label">Student's Signature (Mandatory)</div>
            </div>
          </div>

          <!-- Academic Information -->
          <div class="section">
            <div class="section-heading">Academic Information</div>
            <div class="info-line">
              <span class="info-label-inline">1. Class Enrolled:</span>
              <span class="info-value-fill">${
                student.class_name || "____________________"
              }</span>
              <span class="info-label-inline" style="padding-left: 30px;">2. Section:</span>
              <span class="info-value-fill" style="flex-basis: 150px;">${
                student.section_name || "_________"
              }</span>
            </div>
            <div class="info-line">
              <span class="info-label-inline">3. Roll Number:</span>
              <span class="info-value-fill" style="flex-basis: 250px;">${
                student.roll_no || "____________________"
              }</span>
              <span class="info-label-inline" style="padding-left: 30px;">4. Session Timing:</span>
              <span class="info-value-fill">${
                student.session_timing || "____________________"
              }</span>
            </div>
          </div>

          <!-- Personal Information -->
          <div class="section">
            <div class="section-heading">Personal Information</div>
            
            <div class="info-line">
              <span class="info-label-inline">5. Full Name of Student (Block Letters):</span>
              <span class="info-value-fill">${
                student.student_name ||
                "__________________________________________________________________________________"
              }</span>
            </div>
            <div class="info-line">
              <span class="info-label-inline">6. Date of Birth (DD/MM/YYYY):</span>
              <span class="info-value-fill" style="flex-basis: 200px;">${
                student.date_of_birth || "DD / MM / YYYY"
              }</span>
              <span class="info-label-inline" style="padding-left: 30px;">7. Gender:</span>
              <span class="info-value-fill" style="flex-basis: 150px;">${
                student.gender || "__________"
              }</span>
              <span class="info-label-inline" style="padding-left: 30px;">8. Nationality:</span>
              <span class="info-value-fill" style="flex-basis: 150px;">${
                student.nationality || "Indian"
              }</span>
            </div>
            <div class="info-line">
              <span class="info-label-inline">9. Residential Address (Permanent):</span>
              <span class="info-value-fill">${
                student.student_address ||
                "__________________________________________________________________________________"
              }</span>
            </div>
            <div class="info-line">
              <span class="info-label-inline">10. Contact Number:</span>
              <span class="info-value-fill" style="flex-basis: 250px;">${
                student.mobile || "____________________"
              }</span>
              <span class="info-label-inline" style="padding-left: 30px;">11. Email Address:</span>
              <span class="info-value-fill">${
                student.student_email ||
                "________________________________________________"
              }</span>
            </div>
          </div>

          <!-- Parent / Guardian Information - Using the simplified table structure for density -->
          <div class="section">
            <div class="section-heading">Parent / Guardian Information</div>
            <table class="info-table">
              <tr class="info-row">
                <td class="info-label">12. Parent/Guardian Name:</td>
                <td class="info-value">${
                  student.parent_name || "_________________________________"
                }</td>
                <td class="info-label">13. Relationship:</td>
                <td class="info-value">${
                  student.parent_relation || "____________________"
                }</td>
              </tr>
              <tr class="info-row">
                <td class="info-label">14. Contact Number:</td>
                <td class="info-value">${
                  student.parent_phone || "_________________________________"
                }</td>
                <td class="info-label">15. Occupation:</td>
                <td class="info-value">${
                  student.parent_occupation || "____________________"
                }</td>
              </tr>
              <tr class="info-row">
                <td class="info-label">16. Email Address:</td>
                <td class="info-value" colspan="3">${
                  student.parent_email ||
                  "__________________________________________________________________________________________________________________"
                }</td>
              </tr>
            </table>
            <div class="info-line" style="margin-top: 10px;">
              <span class="info-label-inline">17. Address if different from student:</span>
              <span class="info-value-fill">${
                student.parent_address ||
                "__________________________________________________________________________________"
              }</span>
            </div>
          </div>

          <!-- Declaration -->
          <div class="declaration-box">
            <div class="declaration-title">DECLARATION BY PARENT/GUARDIAN</div>
            <div class="declaration-text">
              I hereby solemnly affirm and declare that the information provided above is true and correct to the best of my knowledge and belief. I understand that any discrepancy or false information discovered later may result in the cancellation of the student's admission. I further agree that my ward and I shall strictly adhere to all the rules, regulations, and disciplinary policies enforced by Mehtab Computer Academy, and that attendance will be maintained as per institutional requirements.
            </div>
            <div class="declaration-date">
              <div>
                Place: <span class="date-field">____________________</span>
              </div>
              <div>
                Date: <span class="date-field">____________________</span>
              </div>
            </div>
          </div>

          <!-- Signature Footer -->
          <div class="signature-footer">
            <div class="signature-block">
              <div class="signature-space"></div>
              <div class="signature-text">Student's Signature</div>
            </div>
            <div class="signature-block">
              <div class="signature-space"></div>
              <div class="signature-text">Parent's/Guardian's Signature</div>
            </div>
            <div class="signature-block">
              <div class="signature-space"></div>
              <div class="signature-text">For Office Use Only - Verified By</div>
            </div>
          </div>

          <div class="office-stamp">
            <div class="stamp-box">
              OFFICIAL SEAL / STAMP<br>
              (DO NOT WRITE OR SIGN BELOW)
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleIDCardPrint = () => {
    if (!student) return;

    const printWindow = window.open("", "_blank");
    const profilePhotoUrl = student.profile_photo
      ? `${BASE_URL}/uploads/${student.profile_photo}`
      : "";

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Student ID Card - ${student.student_name}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f0f0f0;
              padding: 20px;
            }
            .id-card-container {
              display: flex;
              gap: 30px;
              flex-wrap: wrap;
              justify-content: center;
            }
            .id-card {
              width: 340px;
              height: 215px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              overflow: hidden;
              position: relative;
              page-break-inside: avoid;
            }
            .id-card-front {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .id-card-back {
              background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            }
            .card-header {
              background: rgba(255,255,255,0.95);
              padding: 12px;
              text-align: center;
            }
            .school-name {
              font-size: 16px;
              font-weight: bold;
              color: #333;
              margin-bottom: 2px;
            }
            .card-type {
              font-size: 11px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .card-body {
              display: flex;
              padding: 15px;
              gap: 12px;
            }
            .photo-section {
              flex-shrink: 0;
            }
            .id-photo {
              width: 90px;
              height: 110px;
              border: 3px solid white;
              border-radius: 8px;
              background: white;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }
            .id-photo img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .info-section {
              flex: 1;
              color: white;
            }
            .student-name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 8px;
              text-transform: uppercase;
            }
            .info-row {
              display: flex;
              margin-bottom: 5px;
              font-size: 11px;
            }
            .info-label {
              font-weight: 600;
              min-width: 70px;
              opacity: 0.9;
            }
            .info-value {
              font-weight: 500;
            }
            .card-footer {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              background: rgba(255,255,255,0.95);
              padding: 8px 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .validity {
              font-size: 9px;
              color: #666;
            }
            .barcode {
              height: 20px;
              background: linear-gradient(90deg, #000 0%, #000 10%, transparent 10%, transparent 20%, #000 20%, #000 30%, transparent 30%, transparent 40%, #000 40%, #000 50%, transparent 50%, transparent 60%, #000 60%, #000 70%, transparent 70%, transparent 80%, #000 80%, #000 90%, transparent 90%, transparent 100%);
              width: 80px;
              border-radius: 2px;
            }
            .back-content {
              padding: 20px;
              color: white;
            }
            .back-title {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 12px;
              text-align: center;
              border-bottom: 2px solid rgba(255,255,255,0.3);
              padding-bottom: 8px;
            }
            .emergency-info {
              font-size: 11px;
              line-height: 1.6;
              margin-bottom: 15px;
            }
            .emergency-info p {
              margin-bottom: 6px;
            }
            .emergency-label {
              font-weight: bold;
              opacity: 0.9;
            }
            .back-signature {
              margin-top: 20px;
              text-align: center;
            }
            .signature-line {
              border-top: 2px solid white;
              width: 120px;
              margin: 30px auto 5px;
            }
            .signature-text {
              font-size: 10px;
              opacity: 0.8;
            }
            @media print {
              body { background: white; }
              .id-card {
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
              }
            }
          </style>
        </head>
        <body>
          <div class="id-card-container">
            <div class="id-card id-card-front">
              <div class="card-header">
                <div class="school-name">YOUR SCHOOL NAME</div>
                <div class="card-type">Student Identity Card</div>
              </div>
              <div class="card-body">
                <div class="photo-section">
                  <div class="id-photo">
                    ${
                      profilePhotoUrl
                        ? '<img src="' + photoUrl + '" alt="Student" />'
                        : '<div style="font-size: 10px; color: #999;">PHOTO</div>'
                    }
                  </div>
                </div>
                <div class="info-section">
                  <div class="student-name">${
                    student.student_name || "N/A"
                  }</div>
                  <div class="info-row">
                    <div class="info-label">ID No:</div>
                    <div class="info-value">${
                      student.admission_number || "N/A"
                    }</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Class:</div>
                    <div class="info-value">${student.class_name || "N/A"} - ${
      student.section_name || "N/A"
    }</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Roll No:</div>
                    <div class="info-value">${student.roll_no || "N/A"}</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Session:</div>
                    <div class="info-value">${
                      student.session_timing || "N/A"
                    }</div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="validity">Valid Till: 2025-26</div>
                <div class="barcode"></div>
              </div>
            </div>

            <div class="id-card id-card-back">
              <div class="back-content">
                <div class="back-title">EMERGENCY CONTACT INFORMATION</div>
                <div class="emergency-info">
                  <p><span class="emergency-label">Parent/Guardian:</span><br/>${
                    student.parent_name || "N/A"
                  }</p>
                  <p><span class="emergency-label">Contact:</span> ${
                    student.parent_email || "N/A"
                  }</p>
                  <p><span class="emergency-label">Address:</span><br/>${
                    student.parent_address || "N/A"
                  }</p>
                </div>
                <div style="font-size: 9px; line-height: 1.5; margin-top: 15px; opacity: 0.9;">
                  <strong>Note:</strong> This card is property of the institution. If found, please return to the school office.
                </div>
                <div class="back-signature">
                  <div class="signature-line"></div>
                  <div class="signature-text">Authorized Signature</div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TNavbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <p className="text-gray-900 text-xl">Student not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Actions */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Student Details
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  View and manage student information
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={handleIDCardPrint}
                className="px-3 sm:px-4 py-2 text-sm text-white bg-blue-600 border border-blue-700 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <CreditCard className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">ID Card</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-3 sm:px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <Printer className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Print Form</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Student Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden relative">
              {/* Edit Button */}
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setEdit1(true);
                  setEdit3(false);
                  edit1Click(student.roll_no, student.gender);
                }}
                className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
              >
                <Edit3 className="w-5 h-5" />
              </button>

              {/* Student Image and Name */}
              <div className="p-6 text-center border-b border-gray-200">
                <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden mb-4 border-2 border-gray-200 group">
                  {student.profile_photo ? (
                    <img
                      // src={`${BASE_URL}/uploads/${student.profile_photo}`}
                      src={photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  {/* Edit button overlay (appears on hover) */}
                  <label
                    htmlFor="profilePhotoInput"
                    className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-6 h-6 mb-1" />
                    Change Photo
                  </label>

                  {/* Hidden file input */}
                  <input
                    id="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleProfilePhotoChange(e, student.student_email)
                    }
                    className="hidden"
                  />
                </div>

                {/* Student Info */}
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {student.student_name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">Student</p>

                <span
                  onClick={() => {
                    handleStatusClick();
                  }}
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border cursor-pointer ${
                    student.is_active
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {student.is_active ? "Enabled" : "Disabled"}
                </span>
              </div>

              {/* Quick Info */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Student ID
                  </label>
                  <p className="text-gray-900 font-medium">
                    {student.admission_number}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900 text-sm">
                    {student.student_email}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Roll Number
                  </label>
                  <p className="text-gray-900 font-medium">{student.roll_no}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Gender
                  </label>
                  <p className="text-gray-900 font-medium capitalize">
                    {student.gender}
                  </p>
                </div>

                {/* Signature Section */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Student Signature
                  </label>

                  <div className="relative w-full h-24 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center group">
                    {student.signature_photo ? (
                      <img
                        // src={`${BASE_URL}/uploads/${student.signature_photo}`}
                        src={signUrl}
                        alt="Signature"
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No signature</div>
                    )}

                    {/* Edit overlay on hover */}
                    <label
                      htmlFor="signatureInput"
                      className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Camera className="w-5 h-5 mb-1" />
                      Change Signature
                    </label>

                    {/* Hidden file input */}
                    <input
                      id="signatureInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleSignatureChange(e, student.student_email)
                      }
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  {/* Header: Title and Icon (No change needed, it's already stacked) */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-blue-700 uppercase flex items-center">
                      {/* Assuming 'Lock' is a React component for the icon */}
                      <Lock className="w-4 h-4 mr-2" />
                      Manage Password
                    </h3>
                  </div>

                  {/* Content: Description and Button - Improved for Responsiveness */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
                    {/* Description Text: Takes full width on small screens, stays above the button */}
                    <p className="text-xs text-gray-600 mb-2 sm:mb-0">
                      Reset or update the student's login credentials.
                    </p>

                    {/* Button: Stacks below the text on small screens, then moves to the side on 'sm' and up */}
                    <button
                      onClick={() => {
                        setPasswordModal(true);
                      }}
                      className="w-full sm:w-auto px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all shadow-sm"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Fee Details Section */}
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">
                      Fee Details
                    </h3>

                    {/* Static Edit Button */}
                    <button
                      onClick={() => {
                        setFeeEdit(true);
                      }}
                      className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex justify-between text-gray-900 font-medium">
                    <span>Total Fee:</span>
                    <span>{student.total_fee}</span>{" "}
                    {/* Static value for now */}
                  </div>
                </div>

                {/* Delete Section */}
                <div className="mt-6 p-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Danger Zone
                  </h3>

                  <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-md p-4">
                    <div>
                      <h4 className="text-sm font-medium text-red-700">
                        Delete Student Record
                      </h4>
                      <p className="text-xs text-red-500">
                        Once deleted, this student’s data cannot be recovered.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        deleteStudent();
                      }}
                      className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                    >
                      Delete Student
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Information */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-700" />
                  Academic Information
                </h3>
                <button
                  onClick={() => {
                    setEdit1(false);
                    setAdd(true);
                    setEditModal(true);
                    setSaveData({
                      classId: "",
                      sessionId: "",
                    });
                  }}
                  className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 p-2 -my-2 rounded-lg hover:bg-indigo-50"
                >
                  <span className="text-sm font-medium">Add</span>
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Classes List */}
                {classes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((cs, ind) => (
                      <div
                        key={ind}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="mb-3">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                            Class
                          </label>
                          <p className="text-gray-900 font-semibold text-lg">
                            {cs.name}
                          </p>
                        </div>

                        <div className="mb-3">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                            Session Timing
                          </label>
                          <p className="text-gray-900 font-medium">
                            {cs.timing}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => {
                              setEditModal(true);
                              setSaveData({
                                classId: cs.class_id,
                                sessionId: cs.session_id,
                              });
                              setAdd(false);
                              setEditId(cs.id);
                            }}
                            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-50 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cs.id)}
                            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 italic py-6">
                    No academic records found.
                  </div>
                )}

                {/* Admission Number */}
                <div className="border-t border-gray-200 pt-4">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Admission Number
                  </label>
                  <p className="text-gray-900 font-medium text-lg">
                    {student.admission_number}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-gray-700" />
                  Personal Information
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setEdit1(false);
                    setEdit3(true);
                    setSaveData2({
                      dob: new Date(student.date_of_birth)
                        .toISOString()
                        .split("T")[0],
                      status: student.status,
                      address: student.student_address,
                      contact: student.mobile,
                    });
                  }}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 p-2 -my-2 rounded-lg hover:bg-gray-100"
                >
                  Edit
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  {/* Date of Birth */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Date of Birth
                    </label>
                    <p className="text-gray-900 font-medium">
                      {new Date(student.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Status
                    </label>
                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                      {student.status}
                    </span>
                  </div>

                  {/* Contact + Address in one row */}
                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    {/* Contact */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                        Contact
                      </label>
                      <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                        {student.mobile}
                      </span>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Residential Address
                      </label>
                      <p className="text-gray-900 leading-relaxed">
                        {student.student_address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-700" />
                  Parent/Guardian Details
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Full Name
                    </label>
                    <p className="text-gray-900 font-medium">
                      {student.parent_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Email Address
                    </label>
                    <p className="text-gray-900 font-medium break-all">
                      {student.parent_email}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      Mobile Number
                    </label>
                    <p className="text-gray-900 font-medium">
                      {student.parent_phone}
                    </p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address
                    </label>
                    <p className="text-gray-900 leading-relaxed">
                      {student.parent_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Edit Student Details</h2>
            {edit1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="roll_no"
                    value={form1Data.roll_no}
                    onChange={(e) => {
                      setForm1Data({
                        ...form1Data,
                        roll_no: e.target.value,
                      });
                    }}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form1Data.gender}
                    onChange={(e) => {
                      setForm1Data({
                        ...form1Data,
                        gender: e.target.value,
                      });
                    }}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {edit3 && (
              <div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={saveData2.dob}
                    onChange={(e) => {
                      setSaveData2({
                        ...saveData2,
                        dob: e.target.value,
                      });
                    }}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <select
                    name="status"
                    value={saveData2.status}
                    onChange={(e) =>
                      setSaveData2({
                        ...saveData2,
                        status: e.target.value,
                      })
                    }
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={saveData2.address}
                    onChange={(e) => {
                      setSaveData2({
                        ...saveData2,
                        address: e.target.value,
                      });
                    }}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Contact
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={saveData2.contact}
                    onChange={(e) => {
                      setSaveData2({
                        ...saveData2,
                        contact: e.target.value,
                      });
                    }}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSave1(form1Data);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {feeEdit && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-black rounded-lg shadow-lg w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Fee Details
            </h2>

            <div className="mb-4">
              <label
                htmlFor="fee"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Enter Fee Amount
              </label>
              <input
                id="fee"
                type="text"
                name="fee"
                placeholder="e.g. 50000"
                value={feeValue}
                onChange={(e) => {
                  setFeeValue(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setFeeEdit(false);
                  setFeeValue(student.total_fee);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  feeSave();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {editLoading ? "Saving...." : "Save"}{" "}
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {add ? "Add Class" : "Edit Enrolled Class"}
              </h2>
              <button
                onClick={() => setEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
              <select
                onChange={(e) => {
                  setSaveData({
                    ...saveData,
                    classId: e.target.value,
                  });
                }}
                value={saveData.classId}
                name=""
                id=""
              >
                {classes1.map((cs, ind) => (
                  <option value={cs.id}>{cs.name}</option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setSaveData({
                    ...saveData,
                    sessionId: e.target.value,
                  });
                }}
                value={saveData.sessionId}
                name=""
                id=""
              >
                {sessions.map((ss, ind) => (
                  <option value={ss.id}>{ss.timing}</option>
                ))}
              </select>
            </div>

            {/* Modal Footer */}
            <div className="border-t px-6 py-3 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEditModal(false);
                  setAdd(true);
                  handleSave2(editId, saveData);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {passwordModal && (
        <div className="fixed inset-0 bg-opacity-70 z-50 flex justify-center items-center">
          {/* Modal Content - Changed to Grayscale Theme */}
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-300 transform transition-all duration-300 ease-out scale-100">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-gray-700" /> Change Password
              </h2>
              <button
                onClick={() => {
                  setPasswordModal(false);
                  reset();
                }}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(changePassword)}>
              <div className="mb-4">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  {...register("newPassword", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must be at least 6 characters, with one uppercase, one lowercase, one number, and can include special characters",
                    },
                  })}
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter new password"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword?.message}
                </p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "This field is required",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Confirm new password"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordModal(false);
                    reset();
                  }}
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition shadow-md flex items-center justify-center gap-2
                    ${
                      updating
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TViewStudent;
