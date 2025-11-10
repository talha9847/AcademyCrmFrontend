import React, { useEffect, useState } from "react";
import {
  Award,
  ArrowRight,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { HashLink } from "react-router-hash-link";

export default function HeroSection() {
  const [data, setData] = useState({});
  const getData = async () => {
    try {
      const result = await axios.get(
        "https://academycrmbackend.onrender.com/api/front/getHeroData",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    // Adjusted height for better mobile viewing, ensuring content fits well.
    // min-h-[75vh] ensures it's tall enough, but allows it to grow if content is larger.
    <section
      id="home"
      className="relative min-h-[75vh] lg:h-screen flex items-center overflow-hidden py-24 sm:py-32"
    >
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
          alt="Students collaborating"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-lg animate-fade-in">
            <Award className="w-4 h-4" />
            {data.badge_text}
          </div>

          {/* Main Heading */}
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-4 sm:mb-6 animate-slide-up">
            {data.heading1}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {data.heading2}
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 sm:mb-10 animate-slide-up-delay">
            {data.description}
          </p>

          {/* CTA Buttons - Stacked on mobile, side-by-side on sm screens and up */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16 animate-slide-up-delay-2">
            <HashLink
              key={123}
              smooth
              to={`/#contact`}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-2xl hover:scale-[1.02]"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </HashLink>
          </div>

          {/* Stats - Changed to a 2-column grid on mobile to prevent overcrowding */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 animate-fade-in-delay">
            <div className="group">
              <div className="flex items-center gap-3 mb-1 sm:mb-2">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="font-bold text-2xl sm:text-3xl md:text-4xl text-white">
                  {data.stat1_value}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-300 font-medium">
                Years Experience
              </div>
            </div>

            <div className="group">
              <div className="flex items-center gap-3 mb-1 sm:mb-2">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="font-bold text-2xl sm:text-3xl md:text-4xl text-white">
                  {data.stat2_value}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-300 font-medium">
                Expert Trainers
              </div>
            </div>

            <div className="group col-span-2 md:col-span-1">
              {" "}
              {/* Forces 3rd stat onto new row on xs/sm screen */}
              <div className="flex items-center gap-3 mb-1 sm:mb-2">
                <div className="bg-gradient-to-br from-pink-500 to-orange-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div className="font-bold text-2xl sm:text-3xl md:text-4xl text-white">
                  {data.stat3_value}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-300 font-medium">
                Happy Students
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating feature card (Remains hidden below lg breakpoint) */}
      <div className="hidden lg:block absolute bottom-12 right-12 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl animate-float">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-xl">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="font-bold text-2xl text-white">100%</div>
            <div className="text-sm text-gray-300 font-medium">
              {data.floating_card1_subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations (No changes needed) */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.6s both;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .animate-slide-up-delay {
          animation: slideUp 0.8s ease-out 0.4s both;
        }

        .animate-slide-up-delay-2 {
          animation: slideUp 0.8s ease-out 0.6s both;
        }
      `}</style>
    </section>
  );
}
