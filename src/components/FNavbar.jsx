import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

export default function ProfessionalNavbar() {
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
    { href: "#about", label: "About Us" },
    { href: "#courses", label: "Programs" },
    { href: "#testimonials", label: "Success Stories" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 sm:gap-3 group">
            <div className=" rounded-lg group-hover:scale-105 transition-transform">
              <img
                className="w-8 h-8 sm:w-12 sm:h-12"
                alt="MCA Logo"
                src="/logo.png"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-gray-900">
                Mehtab Computer Academy
              </div>
              <div className="text-xs text-gray-500 font-medium">
                ISO 9001:2015 Certified
              </div>
            </div>
            <div className="sm:hidden">
              <div className="font-bold text-base text-gray-900">
                MCA
              </div>
              <div className="text-[10px] text-gray-500 font-medium">
                ISO Certified
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium text-[15px] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-semibold text-[15px] px-5 py-2 transition-colors"
            >
              Login
            </a>
            <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold text-[15px] transition-all shadow-md hover:shadow-lg">
              Enroll Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-2 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <a
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors border border-gray-200"
                >
                  Login
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md"
                >
                  Enroll Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}