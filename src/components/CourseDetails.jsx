import { ArrowLeft, BookOpen, Clock, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import FNavbar from "./FNavbar";
import { useLocation } from "react-router-dom";

// --- Static Course Data for Detail Page ---
const staticCourse = {
  id: 1,
  title: "Full-Stack Development with MERN",
  tagline: "Build Scalable Web Applications from Zero to Deployment.",
  description:
    "Master the MERN stack (MongoDB, Express, React, Node.js) in this intensive, project-based bootcamp. Learn database design, API creation, front-end state management, and deployment strategies essential for modern web development roles.",
  longDescription: [
    "This course is designed for aspiring and current developers who want to become proficient in the most popular JavaScript-based stack today. We cover everything from setting up your development environment to securing and deploying your final application.",
    "You will complete several real-world projects, including an e-commerce platform and a social media dashboard, providing a comprehensive portfolio piece upon graduation.",
  ],
  category: "Web Development",
  image:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  level: "Advanced",
  price: 499.99,
  duration: "16 Weeks",
  modules: 10,
  instructor: {
    name: "Alex Johnson",
    bio: "Lead Software Engineer with 10+ years of experience in JavaScript frameworks and cloud architecture. Passionate about teaching modern development practices.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a8207c0800b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  curriculum: [
    "Module 1: Node.js & Express Fundamentals",
    "Module 2: Introduction to MongoDB and Mongoose",
    "Module 3: RESTful API Design and Implementation",
    "Module 4: React Basics and Component Structure",
    "Module 5: React Router and Client-Side Routing",
    "Module 6: State Management with Redux/Context API",
    "Module 7: Authentication (JWT) and Security",
    "Module 8: Advanced React Hooks and Performance",
    "Module 9: Project: E-commerce Platform Build",
    "Module 10: Deployment (Vercel/AWS) and CI/CD",
  ],
};

export default function CourseDetails() {
  const location = useLocation();
  const { courseId } = location.state || {}; // ✅ Destructure courseId safely
  const course = staticCourse; // Using the static data object

  const handleEnrollClick = () => {
    console.log(`User attempting to enroll in: ${course.title}`);
    // Placeholder for payment/checkout navigation
    alert(`Enrollment process started for ${course.title}!`);
  };

  return (
    // Light background for the overall page
    <section className="bg-gray-50 py-12 md:py-20 min-h-screen">
      <FNavbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Link */}
        <Link
          to="/allcourses" // Link back to your ViewAllCourses component
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2 mt-3" />
          Back to Course Catalog
        </Link>

        {/* --- */}

        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Main Content Area (Left/Two-thirds) */}
          <div className="lg:col-span-2">
            {/* Header and Image */}
            <div className="mb-8">
              <span className="inline-block px-4 py-1 text-sm font-bold tracking-widest uppercase rounded-full text-blue-700 bg-blue-100 mb-3">
                {course.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6 font-light italic">
                {course.tagline}
              </p>

              <img
                src={course.image}
                alt={course.title}
                className="w-full h-auto rounded-xl shadow-xl object-cover max-h-[450px]"
              />
            </div>

            {/* Course Overview */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What You'll Learn
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {course.description}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4 ml-4">
                {course.longDescription.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Curriculum Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-7 h-7 mr-3 text-purple-600" />
                Detailed Curriculum
              </h2>
              <ul className="space-y-4">
                {course.curriculum.map((module, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 border-l-4 border-purple-300 rounded-lg shadow-sm"
                  >
                    <span className="font-semibold text-gray-800">
                      {module}
                    </span>
                    <span className="text-sm text-gray-500">~8-10 Hours</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar / Enrollment Panel (Right/One-third) */}
          <div className="lg:col-span-1 mt-10 lg:mt-0">
            <div className="sticky top-10 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
              <h3 className="text-3xl font-extrabold text-green-600 mb-4">
                <DollarSign className="inline w-7 h-7 mb-1 text-green-600" />
                {course.price === 0 ? "Free" : `$${course.price.toFixed(2)}`}
              </h3>

              {/* Enrollment CTA */}
              <button
                onClick={handleEnrollClick}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-300/50 hover:shadow-xl hover:scale-[1.01] transform duration-300 mb-6"
              >
                Enroll Now
              </button>

              {/* Key Details */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center font-semibold">
                    <Clock className="w-5 h-5 mr-3 text-blue-500" />
                    Duration
                  </span>
                  <span className="font-bold text-gray-900">
                    {course.duration}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center font-semibold">
                    <Users className="w-5 h-5 mr-3 text-purple-500" />
                    Level
                  </span>
                  <span className="font-bold text-gray-900">
                    {course.level}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center font-semibold">
                    <BookOpen className="w-5 h-5 mr-3 text-pink-500" />
                    Modules
                  </span>
                  <span className="font-bold text-gray-900">
                    {course.modules}
                  </span>
                </div>
              </div>

              {/* Instructor Card */}
              <div className="mt-8 border-t pt-6">
                <h4 className="text-xl font-bold mb-4 text-gray-800">
                  Your Instructor
                </h4>
                <div className="flex items-center">
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-400"
                  />
                  <div>
                    <p className="font-bold text-lg text-gray-900">
                      {course.instructor.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Lead Developer & Educator
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3 italic">
                  "{course.instructor.bio}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
