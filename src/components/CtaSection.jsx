"use client";

import { Link } from "react-router-dom";
import { ArrowRight, Phone, MapPin,Mail  } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed px-4">
            Join Mehtab Computer Academy today and take the first step towards a
            successful career. Get expert training, industry certifications, and
            100% job assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
            <button className="group inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105">
              Enroll Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+919825123456"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call Us Now
            </a>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/20">
            <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">
              Visit our campus or contact us for more information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-white/80" />
                  <span className="text-xs font-semibold text-white/60">
                    Address
                  </span>
                </div>
                <p className="text-xs sm:text-sm">Surat, Gujarat, India</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-white/80" />
                  <span className="text-xs font-semibold text-white/60">
                    Phone
                  </span>
                </div>
                <p className="text-xs sm:text-sm">+91 98251 23456</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-white/80" />
                  <span className="text-xs font-semibold text-white/60">
                    Email
                  </span>
                </div>
                <p className="text-xs sm:text-sm">info@mehtabacademy.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
