"use client"

import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Globe, Award } from "lucide-react"

export default function Journey() {
  const milestones = [
    {
      year: "2002",
      title: "The Beginning",
      description:
        "Mehtab Shaikh started as an English tutor, committed to delivering quality education. Successfully trained 10,000+ students, helping them achieve excellence in language skills.",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      year: "2013",
      title: "Expansion & Vision",
      description:
        "We expanded our vision and laid the foundation of Mehtab Computer Academy, integrating computer education with language skills to empower students with technical and professional knowledge.",
      icon: GraduationCap,
      color: "bg-teal-500",
    },
    {
      year: "2023",
      title: "Global Recognition",
      description:
        "Introduced globally recognized language proficiency courses such as IELTS, PTE, TOEFL, Duolingo, and Life Skills, ensuring our students are well-prepared for international opportunities.",
      icon: Globe,
      color: "bg-orange-500",
    },
    {
      year: "Today",
      title: "Excellence & Success",
      description:
        "Mehtab Computer Academy stands as one of the most successful academies in Surat, known for its commitment to excellence. We take pride in our team of highly qualified and certified teachers.",
      icon: Award,
      color: "bg-blue-600",
    },
  ]

  return (
    <section id="journey" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to becoming Surat's leading educational institution
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline line */}
              {index !== milestones.length - 1 && (
                <div className="absolute left-1/2 top-24 w-0.5 h-full bg-gradient-to-b from-blue-300 to-transparent -translate-x-1/2 hidden md:block" />
              )}

              <div
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-full ${milestone.color} text-white font-bold text-lg mb-4`}
                    >
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </motion.div>
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 rounded-full ${milestone.color} flex items-center justify-center shadow-lg`}
                  >
                    <milestone.icon className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg">
            20+ Years of Educational Excellence
          </div>
        </motion.div>
      </div>
    </section>
  )
}
