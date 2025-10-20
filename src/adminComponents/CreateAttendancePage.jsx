import { useFieldArray, useForm } from "react-hook-form";
import AttedanceNavbar from "./AttendanceNavbar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAttendancePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetFilter,
  } = useForm();

  const {
    register: r,
    handleSubmit: hs,
    formState: { errors: er },
    reset: resetAttendance,
    control,
  } = useForm({
    defaultValues: {
      students: [],
    },
  });

  const [storeLoadin, setStoreLoading] = useState(false);
  const [studentLoad, setStudentLoad] = useState(false);
  const [atdId, setAtdId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const { fields } = useFieldArray({
    control,
    name: "students",
  });

  // const classes = [
  //   { id: "1", name: "Grade 10 - Science" },
  //   { id: "2", name: "Grade 11 - Commerce" },
  //   { id: "3", name: "Grade 12 - Arts" },
  // ];
  const sections = [
    { id: "101", name: "A" },
    { id: "102", name: "B" },
    { id: "103", name: "C" },
  ];
  // const sessions = [
  //   { id: "1", name: "Morning Session" },
  //   { id: "2", name: "Afternoon Session" },
  // ];

  const [students, setStudents] = useState([]);

  const handleLoadStudents = async (data) => {
    setStudentLoad(true);
    try {
      const result = await axios.post(
        "http://localhost:5000/api/attendance/addAttendance",
        {
          classId: data.classId,
          date: data.date,
          sessionId: data.sessionId,
          sectionId: data.sectionId,
        },
        {
          withCredentials: true,
        }
      );
      if (result.status == 200) {
        if (result.data.root == "/unauthorized") {
          navigate("/unathorized");
        }
        setStudentLoad(false);
        setAtdId(result.data.data.attendanceId);
        const cleanedData = result.data.data.student.map((student) => ({
          ...student,
          status: student.status || "",
          remarks: student.remarks || "",
        }));

        setStudents(cleanedData);
        resetAttendance({ students: cleanedData });
        toast.success("Students loaded successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Attendance = async (data) => {
    const students = { student: data.students, id: atdId };
    setStoreLoading(true);
    const result = await axios.post(
      "http://localhost:5000/api/attendance/storeAttendance",
      { students },
      { withCredentials: true }
    );
    console.log(result.status);
    if (result.status == 200) {
      toast.success("Attendance stored successfully");
      setStoreLoading(false);
    } else {
      setStoreLoading(false);
      toast.error("Please select all the feilds");
    }
  };

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

  useEffect(() => {
    getClasses();
    getSessions();
  }, []);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <AdminNavbar />
      <div className="flex">
        <AttedanceNavbar />
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 md:ml-64 pt-16 md:pt-8 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left border-b pb-4">
            Full Daily Attendance Workflow
          </h1>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl border border-indigo-200 mb-8">
            <form
              onSubmit={handleSubmit(handleLoadStudents)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
            >
              {/* Class Select */}
              <div className="col-span-1">
                <label
                  htmlFor="class-select"
                  className="block text-xs font-medium text-gray-500 mb-1"
                >
                  CLASS <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("classId", { required: true })}
                  id="class-select"
                  className="w-full text-sm py-2 px-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-gray-600"
                >
                  <option value="">-- Class --</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                {errors.classId && (
                  <p className="text-red-500 text-xs mt-1">Class is required</p>
                )}
              </div>

              {/* Section Select */}
              <div className="col-span-1">
                <label
                  htmlFor="section-select"
                  className="block text-xs font-medium text-gray-500 mb-1"
                >
                  SECTION
                </label>
                <select
                  {...register("sectionId")}
                  id="section-select"
                  className="w-full text-sm py-2 px-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-gray-600"
                >
                  <option value="">All</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Session Select */}
              <div className="col-span-1">
                <label
                  htmlFor="session-select"
                  className="block text-xs font-medium text-gray-500 mb-1"
                >
                  SESSION <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("sessionId", { required: true })}
                  id="session-select"
                  className="w-full text-sm py-2 px-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500  bg-gray-100 text-gray-600"
                >
                  <option value="">-- Session --</option>
                  {sessions.map((sess) => (
                    <option key={sess.id} value={sess.id}>
                      {sess.timing}
                    </option>
                  ))}
                </select>
                {errors.sessionId && (
                  <p className="text-red-500 text-xs mt-1">
                    Session is required
                  </p>
                )}
              </div>

              {/* Date Input */}
              <div className="col-span-1">
                <label
                  htmlFor="attendance-date"
                  className="block text-xs font-medium text-gray-500 mb-1"
                >
                  DATE <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("date", { required: true })}
                  type="date"
                  id="attendance-date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="`w-full text-sm py-2 px-3 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-gray-600"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">Date is required</p>
                )}
              </div>

              {/* Load Students Button */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <button
                  className={`w-full sm:w-auto px-8 py-1  text-white font-semibold rounded-lg shadow-lg transition duration-150 ${
                    studentLoad ? "bg-gray-700" : "bg-indigo-700"
                  } `}
                  type="submit"
                >
                  {studentLoad ? "Loading...." : "Load Students"}
                </button>
              </div>
            </form>
          </div>

          {/* Attendance Marking Table */}
          {fields.length > 0 && (
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                2. Mark Student Attendance
              </h2>

              <div className="overflow-x-auto">
                <form onSubmit={hs(Attendance)} action="">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[50px]">
                          Roll
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                          Student Name
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                          Remarks (Optional)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fields.map((data, ind) => (
                        <tr key={data.id}>
                          <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                            {data.roll_no}
                            <input
                              {...r(`students.${ind}.rollNo`)}
                              type="hidden"
                            />
                          </td>
                          <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                            {data.full_name}
                            <input
                              {...r(`students.${ind}.fullName`)}
                              type="hidden"
                            />
                          </td>
                          <td className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                            <select
                              {...r(`students.${ind}.status`, {
                                required: "Status is required here",
                              })}
                            >
                              <option value="">--select--</option>
                              <option value="Present">Present</option>
                              <option value="Absent">Absent</option>
                              <option value="Late">Late</option>
                            </select>

                            <p className="text-red-500 text-xs mt-1">
                              {er?.students?.[ind]?.status?.message}
                            </p>
                          </td>

                          <td className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                            <input
                              type="text"
                              placeholder="Remarks"
                              {...r(`students.${ind}.remarks`)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-8 pt-4 border-t flex flex-col sm:flex-row justify-end gap-3">
                    <button className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-150">
                      Change Criteria
                    </button>
                    <button
                      type="submit"
                      className={`w-full sm:w-auto px-8 py-3 text-white font-semibold rounded-lg shadow-lg  transition duration-150 ${
                        storeLoadin ? "bg-gray-500" : "bg-indigo-600"
                      }`}
                    >
                      {storeLoadin ? "Saving......" : "Save Records"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Initial State Placeholder */}
          {fields.length <= 0 && (
            <div className="text-center p-12 bg-white rounded-lg shadow-md text-gray-500">
              Please select the criteria above and click "Load Students" to
              begin marking attendance.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAttendancePage;
