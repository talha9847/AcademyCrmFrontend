"use client";

import { Link } from "react-router-dom";
import {
  GraduationCap,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/courses", label: "Courses" },
    { href: "/programs", label: "Programs" },
  ];

  const courses = [
    { href: "#programming", label: "Programming" },
    { href: "#web-development", label: "Web Development" },
    { href: "#design", label: "Design & Multimedia" },
    { href: "#languages", label: "Language Training" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="font-bold text-base sm:text-xl">
                Mehtab Academy
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 sm:mb-6">
              ISO certified computer education institute in Surat with 20+ years
              of excellence in training.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">
              Popular Courses
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {courses.map((course) => (
                <li key={course.href}>
                  <a
                    href={course.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {course.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-400">
                  Surat, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <a
                  href="tel:+919825123456"
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +91 98251 23456
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <a
                  href="mailto:info@mehtabacademy.com"
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  info@mehtabacademy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © 2025 Mehtab Computer Academy. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a
                href="/privacy"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
 