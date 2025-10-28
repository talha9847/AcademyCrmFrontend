import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserCheck,
  CalendarCheck2,
  FileBarChart2,
  Menu,
  X,
} from "lucide-react";

const AttedanceNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Take Attendance", path: "/admin/attendance", icon: UserCheck },
    { name: "View Attendance", path: "/admin/attendance/view", icon: CalendarCheck2 }, 
    { name: "Attendance Report", path: "/admin/attendance/report", icon: FileBarChart2 }, 
  ];

  const isActive = (path) => location.pathname === path;

  // Close sidebar on route change on mobile
  useEffect(() => {
    // Only close if it's currently open (for mobile users)
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Menu Button - Hidden on md and above */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[46px] left-[16px] z-50 p-2 text-indigo-600 bg-white border border-indigo-100 rounded-lg shadow-md hover:bg-indigo-50 transition"
        aria-label="Toggle Attendance Navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        // Key responsive classes:
        // fixed w-64: Sets the size and position
        // md:translate-x-0: Ensures it's always visible on desktop (overrides mobile translation)
        // mobile state logic: translates it based on isOpen state
        className={`w-64 h-screen bg-white text-gray-700 fixed top-0 left-0 z-40 transition-transform duration-300 transform md:translate-x-0 border-r border-gray-200 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* pt-20 for mobile clearance of fixed button, md:pt-8 for cleaner desktop spacing */}
        <div className="pt-20 md:pt-8 pl-6 pr-4"> 
          {/* Hidden on mobile, shown on md and above */}
          <h3 className="text-sm font-bold uppercase text-indigo-500 mb-6 hidden md:block">
            Attendance Menu
          </h3>
          <nav>
            <ul className="space-y-2">
              {menuItems.map(({ name, path, icon: Icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition duration-150 ease-in-out ${
                      isActive(path)
                        ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
                        : "hover:bg-gray-100 hover:text-indigo-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AttedanceNavbar;