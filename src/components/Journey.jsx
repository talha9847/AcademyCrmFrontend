import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import * as LucideIcons from "lucide-react";

export default function Journey() {
  const [data, setData] = useState([]);
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const getMilestones = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/front/getMilestones`
      );
      if (result.status === 200) {
        setData(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  // Single utility function for getting Lucide icons
  const getLucideIcon = (iconName, className) => {
    if (!iconName) return null;
    const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = LucideIcons[formattedName];
    return IconComponent ? (
      <IconComponent className={className || "w-7 h-7 text-white"} />
    ) : null;
  };

  // Dedicated component for the center desktop icon
  const DesktopIconMarker = ({ milestone }) => (
    <motion.div
      style={{ backgroundColor: milestone.color }}
      whileHover={{ scale: 1.2, rotate: 5 }}
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`hidden lg:flex w-16 h-16 rounded-full items-center justify-center shadow-2xl ring-8 ring-white transition-transform absolute left-1/2 -translate-x-1/2 z-20 backdrop-blur-sm`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
      {getLucideIcon(milestone.icon, "w-8 h-8 text-white relative z-10")}
    </motion.div>
  );

  useEffect(() => {
    getMilestones();
  }, []);

  const cardVariants = {
    hidden: (index) => ({ 
        opacity: 0, 
        x: index % 2 === 0 ? -100 : 100,
        y: 50,
        scale: 0.8
    }),
    visible: { 
        opacity: 1, 
        x: 0,
        y: 0,
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 20, 
          delay: 0.1,
          duration: 0.6
        }
    }
  };


  return (
    <section
      id="journey"
      className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm uppercase tracking-widest px-6 py-2 rounded-full shadow-lg mb-4"
          >
            Our History
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 mt-4 mb-6 leading-tight">
            Our Milestones 📜
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Charting our course from humble beginnings to becoming a regional
            leader in skill development.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-6xl mx-auto relative">
          {/* Main Timeline Line (Desktop: Center, Mobile: Left) with gradient */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 lg:-translate-x-1/2 rounded-full shadow-lg" />

          {data.map((milestone, index) => (
            <div key={milestone.year} className="relative mb-20 sm:mb-24 last:mb-0">

              {/* 1. Desktop Icon Marker (Placed absolutely on the center line) */}
              <DesktopIconMarker milestone={milestone} />
              
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`flex ${index % 2 !== 0 ? "lg:ml-auto" : ""} lg:w-1/2`} 
              >
                
                {/* 2. Mobile Visual Column (Icon and Line segment) - Always on the LEFT for mobile */}
                <div className="relative w-8 flex flex-col items-center pt-1 lg:hidden shrink-0">
                  {/* Mobile Icon Marker */}
                  <motion.div
                      style={{ backgroundColor: milestone.color }}
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white z-10 shrink-0 backdrop-blur-sm`}
                  >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                      {getLucideIcon(milestone.icon, "w-5 h-5 text-white relative z-10")}
                  </motion.div>
                </div>

                {/* 3. Content Card (Takes the rest of the space) */}
                <div 
                  className={`flex-1 min-w-0 ${index % 2 === 0 ? "ml-4 lg:mr-12" : "ml-4 lg:ml-12"} `}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -4,
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 relative overflow-hidden group"
                  >
                    {/* Card decorative gradient overlay */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    
                    <div className="relative z-10">
                      <motion.div
                        style={{ backgroundColor: milestone.color }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        className={`inline-block px-6 py-2 rounded-full text-white font-bold text-lg mb-4 shadow-lg backdrop-blur-sm`}
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent"></div>
                        <span className="relative z-10">{milestone.year}</span>
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Hover effect border */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
                  </motion.div>
                </div>

              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 sm:mt-24"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-full font-extrabold text-xl shadow-2xl tracking-wider relative overflow-hidden group cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative z-10">20+ Years of Educational Excellence 🎉</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}