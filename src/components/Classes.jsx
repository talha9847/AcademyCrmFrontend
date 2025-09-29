import React, { useEffect, useState } from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import axios from "axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [classModal, setClassModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sessionModal, setSessionModal] = useState(false);
  const [sections, setSections] = useState([]);
  const [sectionModal, setSectionModal] = useState(false);

  async function getClasses() {
    const result = await axios.get(
      "http://localhost:5000/api/extras/getClasses",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setClasses(result.data.data);
    }
  }
  async function getSessions() {
    const result = await axios.get(
      "http://localhost:5000/api/extras/getSessions",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setSessions(result.data.data);
    }
  }
  async function getSections() {
    const result = await axios.get(
      "http://localhost:5000/api/extras/getSections",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setSections(result.data.data);
    }
  }

  useEffect(() => {
    getClasses();
    getSessions();
    getSections();
  }, []);
  return (
    <div>
      <AdminNavbar />
      <div className="classes">
        <div className="flex justify-end">
          <button
            onClick={() => setClassModal(true)}
            className="border-2 border-black px-2"
          >
            Add Class+
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td className="flex gap-1.5">
                    <button>Edit</button> <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sections">
        <div className="flex justify-end">
          <button
            onClick={() => setSessionModal(true)}
            className="border-2 border-black px-2"
          >
            Add Sessions+
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Timings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.timing}</td>
                  <td className="flex gap-1.5">
                    <button>Edit</button> <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sections">
        <div className="flex justify-end">
          <button
            onClick={() => {
              setSectionModal(true);
            }}
            className="border-2 border-black px-2"
          >
            Add Sections+
          </button>
        </div>
        <div>
          {sections.map((cls) => (
            <div key={cls.id}>
              <strong>{cls.name}</strong>
              <ul>
                {cls.sections.map((sec) => (
                  <li key={sec.id}>
                    {sec.name} <button>Edit</button> <button>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {classModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center border-2 border-black">
          <div className="border-2 border-black p-2">
            <h2 className="text-center text-2xl">Add New Class</h2>
            <div>
              <label htmlFor="name">Class Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="border-2 border-black rounded"
              />
            </div>
            <button onClick={() => setClassModal(false)}>Close</button>
          </div>
        </div>
      )}
      {sessionModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center ">
          <div className="border-2 border-black p-2">
            <h2 className="text-center text-2xl">Add New Sessions</h2>
            <div>
              <label htmlFor="name">Session Timing</label>
              <input
                id="name"
                type="text"
                name="name"
                className="border-2 border-black rounded"
              />
            </div>
            <button onClick={() => setSessionModal(false)}>Close</button>
          </div>
        </div>
      )}
      {sectionModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center ">
          <div className="border-2 border-black bg-white p-2">
            <h2 className="text-center text-2xl">Add New Sessions</h2>
            <div>
              <label htmlFor="name">Select Class</label>
              <input
                id="name"
                type="text"
                name="name"
                className="border-2 border-black rounded"
              />
            </div>
            <div>
              <label htmlFor="name">Section Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="border-2 border-black rounded"
              />
            </div>
            <button onClick={() => setSectionModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
