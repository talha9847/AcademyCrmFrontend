"use client";

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
    { href: "#top", label: "Home" },
    { href: "/about", label: "About" },
    { href: "#featured-courses", label: "Courses" },
    { href: "/government-programs", label: "Government Programs" },
    { href: "/why-choose-us", label: "Why Choose Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary-dark transition-colors">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-serif font-bold text-xl text-foreground">
                Mehtab Computer Academy
              </div>
              <div className="text-xs text-muted-foreground">
                ISO Certified Institute
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Enroll Now
            </Link>
            <Link
              to="/Login"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-center"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
