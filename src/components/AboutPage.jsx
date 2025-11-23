import axios from "axios";
import {
  Award,
  Users,
  Target,
  Heart,
  Shield,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Briefcase,
  Layers,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import { useEffect, useState } from "react";

// NOTE: Since the file structure requires a single file, the OurMission component logic is integrated directly below.

export default function ProfessionalAboutPage() {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [data, setData] = useState({
    heading1: "Empowering Futures in the Digital Age",
    description1:
      "With over two decades of dedicated excellence, Mehtab Computer Academy has transformed thousands of lives, setting the benchmark for quality computer education in Gujarat. Two Decades of Excellence, Defined by Impact",
    description2:
      "Mehtab Computer Academy was founded with a powerful vision: to make quality computer education accessible to everyone. What began as a local training center has evolved into one of the most trusted names in the industry.",
    description3:
      "For over 20 years, we have been committed to adapting our curriculum to the latest industry standards, ensuring our students are not just taught, but are truly prepared for successful careers in IT, design, and development.",
    description4:
      " We are driven by a commitment to quality and a focus on measurable career outcomes for every student.",
    heading2: "Two Decades of Excellence, Defined by Impact",
    heading3: "Our Core Mission",
    state_val: "20",
  });
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const getLucideIcon = (iconName) => {
    if (!iconName) return null;

    // Capitalize the first letter to match Lucide's exported component names
    const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);

    const IconComponent = LucideIcons[formattedName];
    return IconComponent ? (
      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
    ) : null; // fallback if the icon doesn't exist
  };

  const getAboutPageSection = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/front/getAboutPageSection`,
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
        console.log(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAboutPageSection();
    aboutCoreVision();
    aboutCoreMission();
  }, []);

  const aboutCoreVision = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/front/aboutCoreVision`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        setData2(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const aboutCoreMission = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/front/aboutCoreMission`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        setData3(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const missionPillars = [
    {
      icon: TrendingUp,
      title: "Empowerment",
      description:
        "Provide accessible, high-quality education that empowers individuals to achieve their career goals.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Cultivate a learning environment that encourages creativity, critical thinking, and problem-solving skills.",
    },
    {
      icon: Heart,
      title: "Career Growth",
      description:
        "Bridge the gap between education and employment with industry-relevant skills and placement assistance.",
    },
    {
      icon: Shield,
      title: "Excellence",
      description:
        "Uphold the highest standards of education quality, infrastructure, and student support services.",
    },
  ];

  return (
    <div className="font-sans">
      {/* 1. Hero Section - Gradient Banner */}
      <section id="about" className="bg-gray-50">
        <div className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 text-white overflow-hidden">
          {/* Subtle diagonal pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff)",
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 30px 30px",
            }}
          ></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-white/20 rounded-full tracking-widest uppercase mb-4">
                Our Legacy
              </span>
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 leading-tight">
                {data.heading1 || ""}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                {data.description1 || ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section - Image/Text Block */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">
            {/* Story Text Block */}
            <div className="space-y-6 lg:space-y-8">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">
                Our Journey
              </span>
              <h3 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-snug">
                {data.heading2 || ""}
              </h3>
              <div className="space-y-4 text-gray-600 text-base lg:text-lg leading-relaxed">
                <p>{data.description2 || ""}</p>
                <p>{data.description3 || ""}</p>
              </div>

              {/* Badges/Accolades */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                {[
                  { icon: Shield, text: "ISO 9001:2015 Certified" },
                  { icon: Award, text: "Govt. Recognized Partner" },
                  { icon: CheckCircle, text: "100% Job Assistance" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md text-sm transition-all hover:bg-gray-50 border border-gray-100"
                  >
                    <badge.icon className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-gray-700">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Block with Overlay Stat */}
            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-4 sm:ring-8 ring-blue-50/50">
                <img
                  // Placeholder image for a professional classroom setting
                  src="https://placehold.co/800x600/f0f9ff/1d4ed8?text=MCA+Student+Focus"
                  alt="Students learning in a modern classroom"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/800x600/f0f9ff/1d4ed8?text=MCA+Student+Focus";
                  }}
                />
              </div>

              {/* Stat Overlay Card */}
              <div className="absolute -bottom-6 sm:-bottom-8 -right-4 sm:-right-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 sm:p-10 rounded-xl sm:rounded-2xl shadow-2xl transform rotate-1 transition-all duration-300 hover:rotate-0 hover:scale-[1.05]">
                <div className="text-4xl sm:text-6xl font-extrabold mb-1">
                  {data.state_val}+
                </div>
                <div className="text-sm sm:text-base font-medium">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission (Pillars) - Dark Section */}
      <div className="py-16 sm:py-20 lg:py-28 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">
              {data.heading3}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              {data.description4}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {data3.map((mission, index) => (
              <div
                key={index}
                className="group bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 hover:border-blue-600 transition-all duration-300 transform hover:shadow-xl hover:translate-y-[-5px]"
              >
                <div className="bg-blue-600/20 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                  {getLucideIcon(mission.icon)}
                </div>
                <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-white">
                  {mission.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Core Values Section - Card Grid */}
      <div className="py-16 sm:py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-purple-600 font-bold text-sm uppercase tracking-widest">
              Guiding Principles
            </span>
            <h3 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mt-2 sm:mt-3 mb-3 sm:mb-4">
              Our Core Values
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              These principles form the foundation of our institution and guide
              every decision we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {data2.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 transform hover:shadow-2xl hover:border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-purple-500"
              >
                {/* Icon Circle */}

                <div
                  className={`bg-gradient-to-br ${value.color} w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-105 transition-transform shadow-lg`}
                >
                  {getLucideIcon(value.icon)}
                </div>
                <h4 className="font-extrabold text-xl sm:text-2xl text-gray-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
