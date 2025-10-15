import {
  Award,
  GraduationCap,
  BookOpen,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; // New import for animations


export default function Journey() {
  const milestones = [
    {
      year: "2002",
      title: "The Founding",
      description:
        "Mehtab Shaikh started as an English tutor, committed to delivering quality education. Successfully trained 10,000+ students, helping them achieve excellence in language skills.",
      icon: BookOpen,
      color: "bg-blue-600",
    },
    {
      year: "2013",
      title: "Computer Academy Launch",
      description:
        "We expanded our vision and laid the foundation of Mehtab Computer Academy, integrating essential computer education to empower students with technical and professional knowledge.",
      icon: GraduationCap,
      color: "bg-purple-600",
    },
    {
      year: "2023",
      title: "Global Certification",
      description:
        "Introduced globally recognized language proficiency courses such as IELTS, PTE, TOEFL, and Duolingo, ensuring our students are well-prepared for international opportunities.",
      icon: Globe,
      color: "bg-teal-500",
    },
    {
      year: "Today",
      title: "Benchmark of Excellence",
      description:
        "Mehtab Computer Academy stands as a leading, highly-rated academy in Surat, known for its unwavering commitment to excellence and a team of qualified and certified educators.",
      icon: Award,
      color: "bg-pink-600",
    },
  ];

  return (
    <section
      id="journey"
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-pink-600 font-bold text-sm uppercase tracking-widest">
            Our History
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
            Our Milestones
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Charting our course from humble beginnings to becoming a regional
            leader in skill development.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mb-16 sm:mb-20 last:mb-0"
            >
              {/* Timeline line (Desktop) */}
              {index !== milestones.length - 1 && (
                <div className="absolute left-1/2 top-4 bottom-[-4rem] w-1 bg-gray-200 -translate-x-1/2 hidden lg:block" />
              )}
              {/* Timeline line (Mobile) */}
              {index !== milestones.length - 1 && (
                <div className="absolute left-0 top-4 bottom-[-4rem] w-1 bg-gray-200 block lg:hidden" />
              )}

              <div
                className={`flex flex-col lg:flex-row items-start lg:gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 lg:max-w-[45%] ${
                    index % 2 === 0
                      ? "lg:text-right lg:ml-0 ml-6"
                      : "lg:text-left lg:mr-0 mr-6"
                  }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.01,
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div
                      className={`inline-block px-4 py-1.5 rounded-full ${milestone.color} text-white font-bold text-base mb-3`}
                    >
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Icon Circle */}
                <div className="relative z-20 hidden lg:flex w-[10%] justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={`w-14 h-14 rounded-full ${milestone.color} flex items-center justify-center shadow-2xl ring-4 ring-white transition-transform`}
                  >
                    <milestone.icon className="w-7 h-7 text-white" />
                  </motion.div>
                </div>

                {/* Mobile Icon Marker (Left aligned) */}
                <div className="relative z-20 flex lg:hidden -translate-x-1/2 absolute left-0 top-0">
                  <motion.div
                    className={`w-8 h-8 rounded-full ${milestone.color} flex items-center justify-center shadow-lg ring-2 ring-white`}
                  >
                    <milestone.icon className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden lg:block" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-xl tracking-wider">
            20+ Years of Educational Excellence
          </div>
        </motion.div>
      </div>
    </section>
  );
}
