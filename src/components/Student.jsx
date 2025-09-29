import React, { useEffect, useState } from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import { Plus } from "lucide-react";
import { div } from "framer-motion/client";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Student = () => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);

  async function getStudents() {
    const result = await axios.get(
      "http://localhost:5000/api/user/getAllStudents",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setStudents(result.data.result);
    }
  }

  useEffect(() => {
    getStudents();
  },[]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="flex border-2 border-black items-center justify-end">
        <button
          onClick={() => {
            console.log("I am clicked");
            setShowModal(true);
          }}
          className="border-2 px-3 py-1 text-white bg-black rounded-xl"
        >
          Add Student+
        </button>
      </div>

      <div>
        <DataTable value={students} stripedRows tableStyle={{ minWidth: "50rem" }}>
          <Column field="full_name" header="Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="gender" header="Email"></Column>
        
        </DataTable>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-50  flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90vw] max-h-[90vh] overflow-y-auto">
            <form>
              {/* Student Information Section */}
              <h2 className="text-xl font-bold mb-4 text-blue-700">
                Student Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="classId"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Class ID
                  </label>
                  <input
                    id="classId"
                    name="classId"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sectionId"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Section ID
                  </label>
                  <input
                    id="sectionId"
                    name="sectionId"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admissionNumber"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Admission Number
                  </label>
                  <input
                    id="admissionNumber"
                    name="admissionNumber"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rollNo"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Roll Number
                  </label>
                  <input
                    id="rollNo"
                    name="rollNo"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dob"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sessionId"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Session ID
                  </label>
                  <input
                    id="sessionId"
                    name="sessionId"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="totalFee"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Total Fee
                  </label>
                  <input
                    id="totalFee"
                    name="totalFee"
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dueDate"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="discount"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Discount (%)
                  </label>
                  <input
                    id="discount"
                    name="discount"
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="description"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  ></textarea>
                </div>
              </div>

              {/* Parent Information Section */}
              <h2 className="text-xl font-bold mt-8 mb-4 text-green-700">
                Parent Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="p_name"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Parent Name
                  </label>
                  <input
                    id="p_name"
                    name="p_name"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="p_phone"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    id="p_phone"
                    name="p_phone"
                    type="tel"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="p_email"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="p_email"
                    name="p_email"
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="p_relation"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Relation
                  </label>
                  <input
                    id="p_relation"
                    name="p_relation"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g., Father, Mother"
                  />
                </div>

                <div>
                  <label
                    htmlFor="p_occupation"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Occupation
                  </label>
                  <input
                    id="p_occupation"
                    name="p_occupation"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="p_address"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="p_address"
                    name="p_address"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
