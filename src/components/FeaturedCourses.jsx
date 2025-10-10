import { Link } from "react-router-dom";
import { Code, Palette, Globe, Languages, ArrowRight } from "lucide-react";

export default function FeaturedCourses() {
  const courses = [
    {
      icon: Code,
      title: "Programming & Development",
      description: "Master C, C++, Java, Python, and modern web development.",
      courses: ["C & C++", "Java", "Python", "Full Stack"],
      color: "text-blue-600",
      bg: "bg-blue-50",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Build modern websites with latest frameworks.",
      courses: ["HTML/CSS", "JavaScript", "React", "Node.js"],
      color: "text-purple-600",
      bg: "bg-purple-50",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: "Design & Multimedia",
      description: "Create stunning visuals with design tools.",
      courses: ["Photoshop", "CorelDRAW", "Video Edit", "3D Animation"],
      color: "text-orange-600",
      bg: "bg-orange-50",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Languages,
      title: "Language Training",
      description: "Achieve study abroad dreams with expert coaching.",
      courses: ["IELTS", "PTE", "Spoken English", "Business"],
      color: "text-green-600",
      bg: "bg-green-50",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

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
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <div
                key={index}
                className="group bg-white border-2 border-gray-100 hover:border-transparent rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`inline-flex p-3 sm:p-3 rounded-lg ${course.bg} mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${course.color}`} />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                  {course.description}
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {course.courses.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm flex items-center gap-2 text-gray-700"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.gradient}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
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
