// CourseDetails.jsx - Professional & Fully Responsive
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  DollarSign,
  Zap,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FNavbar from "./FNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

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
  image_url:
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  price: 699.0, // Numeric type
  duration: "8 Weeks",
  modules: 6,
  featured: true, // Existing boolean field
};

export default function CourseDetails() {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);

  const location = useLocation();
  const { courseId } = location.state;
  console.log(courseId);

  const getCoursDetailById = async () => {
    const id = courseId;
    try {
      const result = await axios.post(
        "https://academycrmbackend.onrender.com/api/front/getCoursDetailById",
        { courseId: id },
        { withCredentials: true }
      );
      if (result.status == 200) {
        setCourse(result.data.data);
        console.log(result.data.data);
      }
    } catch (error) {}
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
    <section className="bg-gray-100 py-16 md:py-24 min-h-screen">
      <FNavbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <span
          onClick={() => {
            navigate(-1);
          }}
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-10 font-medium group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-0.5 transition-transform" />
          Back to Course Catalog
        </span>

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
              src={course.image} // 💡 Using image_url
              alt={course.title}
              className="w-full h-auto rounded-xl shadow-xl object-cover mb-12"
              style={{ maxHeight: "480px" }}
            />

            {/* Course Overview */}
            <div className="bg-white p-10 rounded-2xl shadow-2xl mb-12 border-t-4 border-blue-600">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3 flex items-center">
                <Zap className="w-7 h-7 mr-3 text-blue-600" />
                What You Will Master
              </h2>
              <div className="text-gray-700 text-lg leading-relaxed space-y-6">
                <p>{course.short_description}</p>{" "}
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
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
                <BookOpen className="w-7 h-7 mr-3 text-purple-600" />
                Program Curriculum ({course.modules || curriculum.length}{" "}
                Modules)
              </h2>
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
                  {/* 💡 Using toFixed(2) on numeric price */}
                  {course.price === 0
                    ? "Free"
                    : `$${
                        typeof course.price === "number"
                          ? course.price.toFixed(2)
                          : parseFloat(course.price || 0).toFixed(2)
                      }`}
                </h3>
              </div>

              {/* Enrollment CTA */}
              <HashLink
                key={123}
                smooth
                to={`/#contact`}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-extrabold text-xl transition-all shadow-xl shadow-blue-400/50 hover:shadow-2xl hover:scale-[1.01] transform duration-300 mb-4"
              >
                Start Learning Now
              </HashLink>
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
              <div className="mt-8 border-t pt-6 border-gray-200">
                <h4 className="text-lg font-bold mb-4 text-gray-700 uppercase tracking-wider">
                  Expert Instructor
                </h4>
                <div className="flex items-center">
                  <img
                    src={course.instructor_image_url} // 💡 Using instructor_image_url
                    alt={course.instructor_name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-blue-200"
                  />
                  <div>
                    <p className="font-extrabold text-lg text-gray-900">
                      {course.instructor_name}
                    </p>
                    <p className="text-sm text-blue-600 font-semibold">
                      {course.instructor_title}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 italic p-3 border-l-4 border-gray-200">
                  "{course.instructor_bio}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
