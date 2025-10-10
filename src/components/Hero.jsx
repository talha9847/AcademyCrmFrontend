"use client";

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Users,
  BookOpen,
  TrendingUp,
  Star,
  CheckCircle,
  Zap,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden pt-16 sm:pt-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl -top-32 -left-32 sm:-top-48 sm:-left-48 animate-pulse"></div>
        <div
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/10 rounded-full blur-3xl -bottom-32 -right-32 sm:-bottom-48 sm:-right-48 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              ISO Certified Institute Since 2003
            </div>

            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              Shape Your Future with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Quality Education
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join Surat's leading computer education institute with 20+ years
              of excellence. Master in-demand skills in programming, design, and
              languages with expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105">
                Explore Courses
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all hover:shadow-lg">
                Contact Us
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8">
              {[
                { value: "20+", label: "Years", icon: TrendingUp },
                { value: "50+", label: "Trainers", icon: Users },
                { value: "10k+", label: "Students", icon: Star },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                >
                  <stat.icon className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform mx-auto lg:mx-0" />
                  <div className="font-bold text-xl sm:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-4 sm:ring-8 ring-white/50">
              <img
                src="/api/placeholder/600/600"
                alt="Students learning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Cards - Hidden on small mobile */}
            <div className="hidden sm:block absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl animate-float max-w-[160px] sm:max-w-none">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 sm:p-4 rounded-lg sm:rounded-xl">
                  <CheckCircle className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg sm:text-2xl text-gray-900">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    Job Assist
                  </div>
                </div>
              </div>
            </div>

            <div
              className="hidden sm:block absolute -top-6 sm:-top-8 -right-4 sm:-right-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl animate-float max-w-[140px] sm:max-w-none"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-2 sm:p-4 rounded-lg sm:rounded-xl">
                  <BookOpen className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg sm:text-2xl text-gray-900">
                    40+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    Courses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
