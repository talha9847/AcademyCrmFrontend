import { useState } from "react";
import { ChevronDown, LogIn, Download, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses", dropdown: true },
  { label: "About Us", href: "/about", dropdown: true },
  { label: "Top Performers", href: "/top-performers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Services", href: "/services" },
  { label: "Verification", href: "/student_verification" },
  { label: "Franchise Registration", href: "/franchise-registration" },
];

function EnrollButton() {
  return (
    <a
      href="/enroll"
      className="relative shrink-0 overflow-hidden rounded-full border-2 border-indigo-500 w-[120px] h-[44px] flex items-center text-[15px] font-semibold text-indigo-600"
    >
      <div className="animate-marquee flex whitespace-nowrap">
        <span className="mx-5">Enroll Now</span>
        <span className="mx-5">Enroll Now</span>
        <span className="mx-5">Enroll Now</span>
        <span className="mx-5">Enroll Now</span>
        <span className="mx-5">Enroll Now</span>
        <span className="mx-5">Enroll Now</span>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-nowrap items-center justify-between px-6 py-3">
        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative flex shrink-0 items-center gap-1 whitespace-nowrap text-sm 2xl:text-[15px] font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-300"
            >
              {link.label}

              {link.dropdown && (
                <ChevronDown
                  size={14}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              )}

              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-orange-400 transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions — ml-auto keeps them on the right on mobile, where the nav above is hidden */}
        <div className="ml-auto flex items-center gap-4 xl:gap-5">
          {/* Login */}
          <a
            href="/login"
            aria-label="Login"
            className="group flex items-center gap-1.5 text-[15px] font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-300"
          >
            <LogIn
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />

            <span className="hidden xl:inline">Login</span>
          </a>

          {/* Download */}
          <button
            aria-label="Download brochure"
            className="group text-slate-700 hover:text-indigo-600 transition-colors duration-300"
          >
            <Download
              size={18}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </button>

          {/* Desktop Enroll */}
          <div className="hidden xl:block">
            <EnrollButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-slate-700 hover:text-indigo-600 transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-100 px-6 py-4 space-y-4 bg-white">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-slate-700 font-medium hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Enroll */}
          <EnrollButton />
        </div>
      </div>
    </header>
  );
}
