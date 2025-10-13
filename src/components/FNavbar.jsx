import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";

export default function FNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#courses", label: "Courses" },
    { href: "#why-us", label: "Why Us" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className=" rounded-lg group-hover:scale-110 transition-transform">
              <img
                className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-white"
                alt="Logo"
                src="/logo.png"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-base sm:text-xl text-gray-900">
                Mehtab Computer Academy
              </div>
              <div className="text-xs text-gray-600">
                ISO Certified Institute
              </div>
            </div>
            <div className="sm:hidden">
              <div className="font-bold text-sm text-gray-900">MCA</div>
              <div className="text-xs text-gray-600">ISO Certified</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                {link.label}
              </a>
            ))}
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all ml-2 shadow-md hover:shadow-lg">
              Enroll Now
            </button>
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all ml-2 shadow-md hover:shadow-lg"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-104 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-blue-50"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 text-[16px] rounded-lg font-medium transition-all mt-2 shadow-md"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
