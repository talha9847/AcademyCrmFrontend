import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { div, p } from "framer-motion/client";

const Certificate = () => {
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [classId, setClassId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [templates, setTemplates] = useState([]);
  const [student, setStudent] = useState([]);
  const getClasses = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/extras/getClasses",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setClasses(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSessions = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/extras/getSessions",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setSessions(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTemplates = async (classId) => {
    if (classId == "") {
      toast.error("Please Select Class");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/student/getTemplates",
        { classId: parseInt(classId) },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setTemplates(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadStudent = async (classId, sessionId) => {
    if (classId == "") {
      toast.error("Please Select Class");
    }
    if (sessionId == "") {
      toast.error("Please Select Session");
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/student/getStudentByClassAndSession",
        {
          classId,
          sessionId,
        },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setStudent(result.data.data);
        toast.success("Student loaded successfully");
        console.log(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getClasses();
    getSessions();
  }, []);
  useEffect(() => {
    getTemplates(classId);
  }, [classId]);
  return (
    <div>
      <AdminNavbar />
      <ToastContainer
        position="top-right" // ✅ You can change this
        autoClose={3000} // closes after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // "light", "dark", "colored"
      />
      <div>
        <div>
          <select
            onChange={(e) => {
              setClassId(e.target.value);
            }}
            className="border-2 border-black"
            name=""
            id=""
          >
            <option key={0} value="">
              select class
            </option>
            {classes.map((value, ind) => (
              <option key={ind + 1} value={value.id}>
                {value.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              getTemplates(classId);
            }}
            className="border-2 border-black px-2"
          >
            Get templates
          </button>
        </div>

        <div>
          <h2>Templates</h2>
          {templates.length < 1 && <div> no templates found</div>}

          <div>
            {templates.map((val, ind) => (
              <div className="flex gap-2">
                <img
                  key={ind + 1}
                  className="w-50"
                  src={`http://localhost:5000/${val.name}`}
                  alt=""
                />
                <button>Select</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <select
            onChange={(e) => {
              setSessionId(e.target.value);
            }}
            className="border-2 border-black"
            name=""
            id=""
          >
            <option key={0} value="">
              select session
            </option>
            {sessions.map((value, ind) => (
              <option key={ind + 1} value={value.id}>
                {value.timing}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={() => {
              loadStudent(classId, sessionId);
            }}
            className="border-2 border-black"
          >
            Get Student
          </button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {student.map((val, ind) => (
                <tr>
                  <td>{ind + 1}</td>
                  <td>{val.full_name}</td>
                  <td>Assign Certificate</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
