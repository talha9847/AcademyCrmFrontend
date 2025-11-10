import { Award, GraduationCap, BookOpen, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import * as LucideIcons from "lucide-react";

export default function Journey() {
  const [data, setData] = useState([]);

  const getMilestones = async () => {
    try {
      const result = await axios.get(
        "https://academycrmbackend.onrender.com/api/front/getMilestones",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLucideIcon = (iconName) => {
    if (!iconName) return null;
    const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = LucideIcons[formattedName];
    return IconComponent ? (
      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
    ) : null;
  };

  const getLucideIcon2 = (iconName) => {
    if (!iconName) return null;
    const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = LucideIcons[formattedName];
    return IconComponent ? (
      <IconComponent className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
    ) : null;
  };

  useEffect(() => {
    getMilestones();
  }, []);

  return (
    <section
      id="journey"
      className="py-12 sm:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-20"
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
          {data.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mb-16 sm:mb-20 last:mb-0" 
            >
              {/* Timeline line (Desktop) */}
              {index !== data.length - 1 && (
                <div className="absolute left-1/2 top-4 bottom-[-4rem] w-1 bg-gray-200 -translate-x-1/2 hidden lg:block" />
              )}
              
              <div
                // Forces a consistent left-to-right flex layout
                className="flex flex-row items-start lg:gap-8" 
              >
                {/* 🌟 NEW: Mobile Visual Column (Line and Icon) 🌟 */}
                <div className="relative w-12 hidden flex-col items-center pt-1 lg:flex w-[10%] justify-center lg:w-[10%]">
                    {/* Desktop Icon Circle (w-[10%] is used, but this column is hidden on mobile) */}
                    <div className="relative z-20 hidden lg:flex justify-center w-full">
                        <motion.div
                            style={{ backgroundColor: milestone.color }}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white transition-transform`}
                        >
                            {getLucideIcon(milestone.icon)}
                        </motion.div>
                    </div>
                </div>

                {/* 🌟 NEW: Mobile Visual Column (Line and Icon) 🌟 */}
                {/* This column is present ONLY on mobile and ensures alignment */}
                <div className="relative w-12 flex flex-col items-center pt-1 lg:hidden">
                    {/* Mobile Icon Marker */}
                    <motion.div
                        style={{ backgroundColor: milestone.color }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white z-10`}
                    >
                        {getLucideIcon2(milestone.icon)}
                    </motion.div>
                    
                    {/* Timeline line (Mobile) - Positioned relative to this column */}
                    {index !== data.length - 1 && (
                        <div className="absolute top-0 bottom-[-4rem] w-1 bg-gray-200" />
                    )}
                </div>

                {/* Content */}
                <div
                  // Content takes remaining space, always aligned left on mobile
                  className={`flex-1 ${
                    index % 2 === 0
                      ? "lg:max-w-[45%] lg:text-right" 
                      : "lg:max-w-[45%] lg:text-left"
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
                      style={{ backgroundColor: milestone.color }}
                      className={`inline-block px-4 py-1.5 rounded-full text-white font-bold text-base mb-3`}
                    >
                      {milestone.year}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for alignment (Desktop only) */}
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
          className="text-center mt-12 sm:mt-20"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-xl tracking-wider">
            20+ Years of Educational Excellence
          </div>
        </motion.div>
      </div>
    </section>
  );
}