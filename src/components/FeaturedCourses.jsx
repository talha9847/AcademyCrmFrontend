import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedCourses() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getCourses = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/front/getCourses",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleCourseClick = (course) => {
    // Placeholder for navigation or modal open
    console.log("Navigating to course:", course.title);
  };

  return (
    // Use a very light gray background for contrast
    <section id="courses" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          {/* Enhanced Tagline */}
          <span className="inline-block px-3 py-1 text-sm font-medium tracking-widest uppercase rounded-full text-blue-700 bg-blue-100">
            Featured
          </span>
          <h2 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 mt-4 mb-3">
            Explore{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Popular
            </span>{" "}
            Courses
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from a curated collection of cutting-edge, industry-relevant
            training programs designed for real-world impact.
          </p>
        </div>

        {/* Courses Grid - Better Responsive Grid and Gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
          {data.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
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

        {/* View All Button - Big, Bold, and Gradient */}
        <div className="text-center">
          {/* Removed <Link> wrapping to simplify, assuming it's a button here */}
          <button
            onClick={() => {navigate("/allcourses")}}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-300/50 hover:shadow-2xl hover:scale-[1.02] transform duration-300"
          >
            View All Courses
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
