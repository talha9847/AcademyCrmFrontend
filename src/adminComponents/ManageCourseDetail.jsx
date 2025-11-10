// CourseDetails.jsx - Professional & Fully Responsive
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  DollarSign,
  Zap,
  X,
  PlusCircle,
  Save,
  Edit,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import SidebarManage from "./SidebarManage";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// --- Static Course Data (UPDATED to match new PostgreSQL schema fields) ---
const staticCourse = {
  id: 5,
  title: "Advanced PostgreSQL and Data Warehousing",
  slug: "advanced-postgres-data-warehousing",
  tagline:
    "Master SQL performance, replication, and data modeling for large-scale applications.",

  // 💡 NEW FIELD MATCH: This maps to 'short_description'
  short_description:
    "Dive deep into PostgreSQL features beyond basic CRUD operations. This course covers advanced indexing, partitioning, writing efficient stored procedures, and implementing high-availability setups for enterprise-level data solutions.",

  // 💡 NEW FIELD MATCH: This maps to 'long_description' (JSONB array of strings)
  long_description: [
    "Learn to optimize slow queries using execution plans and custom indexes.",
    "Implement data partitioning for massive tables to improve read/write performance.",
    "Understand various replication strategies (Streaming, Logical) for high availability.",
    "Design robust schemas for complex analytical and transactional requirements.",
  ],

  // 💡 NEW FIELD MATCH: This maps to 'curriculum' (JSONB array of strings)
  curriculum: [
    "Module 1: Advanced Indexing and Query Optimization",
    "Module 2: Stored Procedures, Functions, and Triggers",
    "Module 3: Table Partitioning and Inheritance",
    "Module 4: Replication, Failover, and High Availability (HA)",
    "Module 5: Data Modeling for OLAP/OLTP Systems",
    "Module 6: Security and Auditing in PostgreSQL",
  ],

  // 💡 NEW FIELD MATCH: Instructor details
  instructor_name: "Sarah Chen",
  instructor_title: "Database Architect & Senior Trainer",
  instructor_bio:
    "15+ years of experience designing and managing PostgreSQL databases for Fortune 500 companies. Dedicated to sharing performance tuning secrets.",
  instructor_image_url:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  category: "Databases & SQL",
  level: "Advanced",

  // 💡 NEW FIELD MATCH: Renamed/Consolidated from 'image' to 'image_url'
  image:
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  price: 699.0, // Numeric type
  duration: "8 Weeks",
  modules: 6,
  featured: true, // Existing boolean field
};

export default function ManageCourseDetail() {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const location = useLocation();
  const courseId = location.state?.courseId; // safely access it
  const [course, setCourse] = useState([]);
  const [editModule, setEditModule] = useState(false);
  const [editDes, setEditDes] = useState(false);
  const [module, setModule] = useState([]);
  const [lDescription, setLDescription] = useState([]);
  const [sDescription, setSDescription] = useState([]);
  const [editInstructor, setEditInstructor] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const [instructorTitle, setInstructorTitle] = useState("");
  const [instructorDes, setInstructorDes] = useState("");

  const [newModuleTitle, setNewModuleTitle] = useState("");

  const handleAddModule = () => {
    if (newModuleTitle.trim() === "") return;
    setModule([...module, newModuleTitle]);
    setNewModuleTitle("");
  };
  const handleAddDes = () => {
    if (newModuleTitle.trim() === "") return;
    setLDescription([...lDescription, newModuleTitle]);
    setNewModuleTitle("");
  };

  const updateCourseInstructor = async () => {
    const id = courseId;
    try {
      const result = await axios.put(
        `${BASE_URL}/api/front/updateCourseInstructor`,
        {
          name: instructorName,
          title: instructorTitle,
          des: instructorDes,
          courseId: id,
        },
        { withCredentials: true }
      );
      if (result.status == 200) {
        getCoursDetailById(courseId);
        setEditInstructor(false);
        toast.success("Instructor updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };
  const updateCourseModule = async () => {
    const id = courseId;
    const result = await axios.put(
    `${BASE_URL}/api/front/updateCourseModule`,
      { module: module, courseId: id },
      { withCredentials: true }
    );
    if (result.status == 200) {
      setEditModule(false);
      getCoursDetailById(courseId);
      toast.success("Module updated successfully");
    }
  };

  const handleSaveDes = async () => {
    const id = courseId;
    try {
      const result = await axios.put(
        `${BASE_URL}/api/front/updateCourseDescription`,
        {
          long_description: lDescription,
          short_description: sDescription,
          courseId: id,
        },
        {
          withCredentials: true,
        }
      );
      if (result.status == 200) {
        getCoursDetailById(courseId);
        setEditDes(false);
        toast.success("Description updated Successfully");
      }
    } catch (error) {}
  };

  const getCoursDetailById = async () => {
    const id = courseId;
    try {
      const result = await axios.post(
        `${BASE_URL}/api/front/getCoursDetailById`,
        { courseId: id },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setCourse(result.data.data);
        setModule(result.data.data.curriculum);
        setLDescription(result.data.data.long_description);
        setSDescription(result.data.data.short_description);
        setInstructorName(result.data.data.instructor_name);
        setInstructorTitle(result.data.data.instructor_title);
        setInstructorDes(result.data.data.instructor_bio);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditModule = async (modules) => {
    console.log(modules);
    modules.map((m, i) => (
      <input className="border-2 border-black " type="text" value={m} />
    ));
  };

  useEffect(() => {
    getCoursDetailById();
  }, []);

  const handleEnrollClick = () => {
    console.log(`User attempting to enroll in: ${course.title}`);
    alert(`Enrollment process started for ${course.title}!`);
  };

  const longDescription = course.long_description || [];
  const curriculum = course.curriculum || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1">
        <SidebarManage />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
          <Link
            to="/admin/manage/featuredcourses"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-10 font-medium group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-0.5 transition-transform" />
            Back to Course Catalog
          </Link>

          <div className="lg:grid lg:grid-cols-3 lg:gap-16">
            {/* Main Content Area (Left/Two-thirds) */}
            <div className="lg:col-span-2">
              {/* Header Block */}
              <div className="mb-10">
                <span className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-lg text-blue-700 bg-blue-100 mb-3">
                  {course.category}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {course.title}
                </h1>
                <p className="text-xl text-gray-500 font-normal italic border-l-4 border-blue-300 pl-4">
                  {course.tagline}
                </p>
              </div>

              {/* Main Image */}
              <img
                src={course.image} // 💡 Using image
                alt={course.title}
                className="w-full h-auto rounded-xl shadow-xl object-cover mb-12"
                style={{ maxHeight: "480px" }}
              />

              {/* Course Overview */}
              <div className="bg-white p-10 rounded-2xl shadow-2xl mb-12 border-t-4 border-blue-600">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3 flex items-center">
                    <Zap className="w-7 h-7 mr-3 text-blue-600" />
                    What You Will Master
                  </h2>
                  <button
                    onClick={() => {
                      setEditDes(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="text-gray-700 text-lg leading-relaxed space-y-6">
                  <p>{sDescription}</p>
                  {/* 💡 Using short_description */}
                  {longDescription.length > 0 && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                      {longDescription.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-base text-gray-600"
                        >
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Curriculum Section */}
              <div className="bg-white p-10 rounded-2xl shadow-2xl mb-12">
                <div className="flex  justify-between items-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
                    <BookOpen className="w-7 h-7 mr-3 text-purple-600" />
                    Program Curriculum ({course.modules ||
                      curriculum.length}{" "}
                    Modules)
                  </h2>
                  <button
                    onClick={() => {
                      setEditModule(true);
                      handleEditModule(course.curriculum);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <ul className="space-y-4">
                  {curriculum.map((module, index) => (
                    <li
                      key={index}
                      className="p-5 bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 hover:border-purple-400 hover:shadow-lg flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <span className="font-bold text-xl text-purple-600 mr-4 w-8 text-center">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-lg text-gray-800">
                          {module}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                        ~8-10 Hours
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar / Enrollment Panel (Right/One-third) */}
            <div className="lg:col-span-1 mt-10 lg:mt-0">
              <div className="bg-white p-8 rounded-2xl shadow-2xl ring-4 ring-blue-50 border-t-8 border-blue-600 lg:sticky lg:top-10">
                {/* Price */}
                <div className="text-center mb-6">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Investment
                  </p>
                  <h3 className="text-5xl font-extrabold text-green-700 mt-1">
                    ${Math.floor(course.price)}
                  </h3>
                </div>

                {/* Enrollment CTA */}
                <button
                  onClick={handleEnrollClick}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-extrabold text-xl transition-all shadow-xl shadow-blue-400/50 hover:shadow-2xl hover:scale-[1.01] transform duration-300 mb-4"
                >
                  Start Learning Now
                </button>
                <p className="text-center text-xs text-gray-500">
                  Secure checkout. Instant access upon enrollment.
                </p>

                {/* Key Details List */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                  {[
                    {
                      icon: Clock,
                      label: "Total Duration",
                      value: course.duration,
                      color: "text-blue-500",
                    },
                    {
                      icon: Users,
                      label: "Difficulty Level",
                      value: course.level,
                      color: "text-purple-500",
                    },
                    {
                      icon: BookOpen,
                      label: "Total Modules",
                      value: course.modules || curriculum.length,
                      color: "text-pink-500",
                    },
                    {
                      icon: Zap,
                      label: "Core Subject",
                      value: course.category,
                      color: "text-orange-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center font-medium text-gray-600">
                        <item.icon className={`w-5 h-5 mr-3 ${item.color}`} />
                        {item.label}
                      </span>
                      <span className="font-extrabold text-gray-800">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Instructor Card */}
                <div className="relative mt-8 border-t pt-6 border-gray-200">
                  {/* Header with Edit button */}
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-gray-700 uppercase tracking-wider">
                      Expert Instructor
                    </h4>

                    {/* ✏️ Static Edit Button */}
                    <button
                      onClick={() => setEditInstructor(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>

                  {/* Instructor Info */}
                  <div className="flex items-center">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={course.instructor_name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-blue-200"
                    />
                    <div>
                      <p className="font-extrabold text-lg text-gray-900">
                        {instructorName}
                      </p>
                      <p className="text-sm text-blue-600 font-semibold">
                        {instructorTitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4 italic p-3 border-l-4 border-gray-200">
                    "{instructorDes}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {editModule && (
        <div className="fixed inset-0 z-50 bg-opacity-70 flex items-center justify-center p-4">
          {/* Modal Container */}
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-purple-600" />
                Edit Course Curriculum
              </h3>
              <button
                // onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-8">
              {/* Module List */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-700">
                  {/* Current Modules ({modules.length}) */}
                </h4>
                {
                  <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {module.map((m, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {console.log(m)}
                        {/* Module Number */}
                        <span className="font-semibold text-purple-600 min-w-[24px] text-center">
                          {index + 1}.
                        </span>

                        {/* Editable Input */}
                        <input
                          className="flex-1 font-medium border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          value={m}
                          onChange={(e) => {
                            const updatedModules = [...module];
                            updatedModules[index] = e.target.value;
                            setModule(updatedModules);
                          }}
                        />

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            setModule(module.filter((_, i) => i !== index));
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium p-2 rounded-full hover:bg-red-100"
                          aria-label={`Delete module ${index + 1}`}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                }
              </div>

              {/* Add New Module Form */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Add New Module
                </h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    placeholder="e.g., Module 7: Advanced Security Practices"
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <button
                    onClick={() => {
                      handleAddModule();
                    }}
                    className="flex items-center gap-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
                    disabled={newModuleTitle.trim() === ""}
                  >
                    <PlusCircle className="w-5 h-5" />
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Press **Enter** or click **Add** to include the module.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-100 flex justify-end gap-3 z-10 rounded-b-3xl">
              <button
                onClick={() => {
                  setEditModule(false);
                }}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateCourseModule}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-extrabold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200/50"
              >
                <Save className="w-5 h-5" />
                Save Curriculum
              </button>
            </div>
          </div>
        </div>
      )}
      {editDes && (
        <div className="fixed inset-0 z-50  bg-opacity-40 flex items-center justify-center p-4 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-purple-600" />
                Edit Course Curriculum
              </h3>
              <button
                onClick={() => setEditDes(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-8">
              {/* Short Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Short Description
                </label>
                <textarea
                  value={sDescription}
                  onChange={(e) => setSDescription(e.target.value)}
                  placeholder="Write a short description about this course..."
                  className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none min-h-[100px] transition-all"
                />
              </div>

              {/* Module List */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-700">
                  Current Modules ({lDescription.length})
                </h4>
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {lDescription.map((m, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-purple-600 min-w-[24px] text-center">
                        {index + 1}.
                      </span>

                      <input
                        className="flex-1 font-medium border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={m}
                        readOnly
                      />

                      <button
                        onClick={() =>
                          setLDescription(
                            lDescription.filter((_, i) => i !== index)
                          )
                        }
                        className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium p-2 rounded-full hover:bg-red-100"
                        aria-label={`Delete module ${index + 1}`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add New Module Form */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Add New Description
                </h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    placeholder="e.g., Module 7: Advanced Security Practices"
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <button
                    onClick={() => handleAddDes()}
                    className="flex items-center gap-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
                    disabled={newModuleTitle.trim() === ""}
                  >
                    <PlusCircle className="w-5 h-5" />
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Press <strong>Enter</strong> or click <strong>Add</strong> to
                  include the module.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-6 border-t border-gray-100 flex justify-end gap-3 z-10 rounded-b-3xl">
              <button
                onClick={() => setEditDes(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSaveDes();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-extrabold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200/50"
              >
                <Save className="w-5 h-5" />
                Save Description
              </button>
            </div>
          </div>
        </div>
      )}

      {editInstructor && (
        <div className="fixed inset-0 z-50 bg-opacity-40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                Edit Instructor
              </h3>
              <button
                onClick={() => setEditInstructor(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Instructor Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={instructorName}
                  onChange={(e) => {
                    setInstructorName(e.target.value);
                  }}
                  placeholder="e.g., John Doe"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title / Position
                </label>
                <input
                  type="text"
                  name="title"
                  value={instructorTitle}
                  onChange={(e) => {
                    setInstructorTitle(e.target.value);
                  }}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={instructorDes}
                  onChange={(e) => {
                    setInstructorDes(e.target.value);
                  }}
                  placeholder="Write a short instructor bio..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setEditInstructor(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={updateCourseInstructor}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-extrabold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200/50"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
