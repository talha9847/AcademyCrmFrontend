import { Link } from "react-router-dom";
import { Code, Palette, Globe, Languages, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedCourses() {
  const [course, setCourse] = useState([]);

  const getCourses = async () => {
    const result = await axios.get(
      "http://localhost:5000/api/front/getCourses",
      { withCredentials: true }
    );
    if (result.status == 200) {
      setCourse(result.data.data);
    }
  };
  useEffect(() => {
    getCourses();
  });
  return (
    <section id="courses" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Our Courses
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 mt-2">
            Popular Course Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Choose from our wide range of industry-relevant courses
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {course.map((course, index) => {
            return (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden bg-gray-200">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {course.category}
                  </span>
                  <h3 className="font-bold text-lg mt-2 text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <span className="font-bold text-blue-600">
                      {course.price}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    ⏱️ {course.duration}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105">
            View All Courses
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
