import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// --- Static Data (Re-used for completeness) ---
const STATIC_COURSES = [
  {
    id: 1,
    title: "Full-Stack Web Development Bootcamp",
    category: "Development",
    description: "Master the MERN stack: MongoDB, Express, React, and Node.js to build modern web applications.",
    image: "https://via.placeholder.com/300x160/3b82f6/ffffff?text=Development", // Placeholder image
    level: "Intermediate",
    price: "$499",
    duration: "60 hours",
  },
  {
    id: 2,
    title: "Complete Figma UI/UX Design Course",
    category: "Design",
    description: "Learn to design beautiful and functional user interfaces for web and mobile apps using Figma.",
    image: "https://via.placeholder.com/300x160/8b5cf6/ffffff?text=Design", // Placeholder image
    level: "Beginner",
    price: "$199",
    duration: "25 hours",
  },
  {
    id: 3,
    title: "Introduction to Data Science with Python",
    category: "Data Science",
    description: "Get started with Python, Pandas, NumPy, and Matplotlib for data analysis and visualization.",
    image: "https://via.placeholder.com/300x160/10b981/ffffff?text=Data+Science", // Placeholder image
    level: "Beginner",
    price: "$299",
    duration: "40 hours",
  },
  {
    id: 4,
    title: "Advanced React Hooks and State Management",
    category: "Development",
    description: "Deep dive into custom hooks, Context API, and Redux Toolkit for complex React applications.",
    image: "https://via.placeholder.com/300x160/ef4444/ffffff?text=React+Advanced", // Placeholder image
    level: "Advanced",
    price: "$349",
    duration: "30 hours",
  },
];
// ------------------------------------

export default function FeaturedCourses() {
  const courses = STATIC_COURSES;

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
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Popular</span> Courses
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from a curated collection of cutting-edge, industry-relevant training programs designed for real-world impact.
          </p>
        </div>

        {/* Courses Grid - Better Responsive Grid and Gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
              // Super Sexy Card Styling:
              // Elevated shadow, rounded corners, border on hover, strong transition, slight lift
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-500 hover:-translate-y-2"
            >
              
              {/* Image Container */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  // More pronounced image hover effect
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-7">
                
                {/* Category Badge */}
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                  {course.category}
                </span>

                {/* Title */}
                <h3 className="font-extrabold text-xl mt-3 text-gray-900 line-clamp-2">
                  {course.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {course.description}
                </p>

                {/* Meta Info Divider */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    
                    {/* Level Badge */}
                    <span className="text-xs font-semibold text-gray-700 px-3 py-1 rounded-full bg-gray-200">
                      {course.level}
                    </span>
                    
                    {/* Price */}
                    <span className="font-extrabold text-lg text-green-600">
                      {course.price}
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
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-300/50 hover:shadow-2xl hover:scale-[1.02] transform duration-300">
            View All Courses
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}