import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Using ArrowLeft for a "Back" or "Home" link
import { useEffect, useState } from "react";
import FNavbar from "./FNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- Static Data for Demonstration ---

// --- End Static Data ---

export default function ViewAllCourses() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getAllCourse = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/front/getAllCourses",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCourse();
  }, []);

  const handleCourseClick = (course) => {
    console.log("Navigating to course details for:", course.title);
  };

  return (
    // Use a very light gray background for contrast, similar to FeaturedCourses
    <section
      id="all-courses"
      className="py-16 md:py-24 bg-gray-50 min-h-screen"
    >
      <FNavbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          {/* Back Link/Button */}
          <Link
            to="/" // Assuming your homepage is the root
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="font-medium text-sm uppercase tracking-wider">
              Back to Home
            </span>
          </Link>

          {/* Main Title */}
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 mt-2 mb-3">
            Our Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Course
            </span>{" "}
            Catalog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Discover all the cutting-edge courses we offer, designed to help you
            master new skills and advance your career.
          </p>
        </div>

        {/* --- */}

        {/* Course Filters/Search (Optional, but good for a full page) */}
        <div className="mb-12">
          {/* Placeholder for future Search Bar and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <input
              type="text"
              placeholder="Search courses by title or keyword..."
              className="w-full md:w-2/3 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <select className="w-full md:w-1/3 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150">
              <option value="">Filter by Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Cloud/DevOps">Cloud/DevOps</option>
              <option value="Design">Design</option>
              {/* Add more categories based on data */}
            </select>
          </div>
        </div>

        {/* --- */}

        {/* Courses Grid - Similar to FeaturedCourses, but perhaps denser (4-5 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {data.map((course) => (
            <div
              key={course.id}
              onClick={() => {
                navigate("/coursedetail", { state: { courseId: course.id } });
              }}
              // Course Card styling matching your FeaturedCourses component
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-7 flex flex-col flex-1">
                {/* Category Badge */}
                <span className="inline-block max-w-full text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full whitespace-normal text-center">
                  {course.category}
                </span>

                {/* Title */}
                <h3 className="font-extrabold text-xl mt-3 text-gray-900 line-clamp-2">
                  {course.title}
                </h3>

                {/* Description with fixed height */}
                <p
                  className="text-gray-500 text-sm mt-2 overflow-hidden"
                  style={{ height: "3.6rem" }}
                >
                  {course.description}
                </p>

                {/* Spacer to push meta info to bottom */}
                <div className="flex-1"></div>

                {/* Meta Info */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700 px-3 py-1 rounded-full bg-gray-200">
                    {course.level}
                  </span>
                  <span className="font-extrabold text-lg text-green-600">
                    ${course.price}
                  </span>
                </div>

                {/* Duration */}
                <div className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
                  <span className="text-base">⏱️</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- */}

        {/* Call to Action at the Bottom */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Start Learning?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Select any course above to see the full curriculum and enrollment
            details.
          </p>
          {/* CTA Button/Link to Home or Contact */}
          <Link
            to="/" // Assuming this links back to the main site for other navigation
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 sm:px-10 py-3 rounded-full font-bold text-md transition-all shadow-lg shadow-blue-300/50 hover:shadow-xl hover:opacity-90 transform duration-300"
          >
            Explore Other Sections
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
