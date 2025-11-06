import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  Star,
  Info,
  Map,
  ThumbsUp,
  BookOpen,
  MessageSquare,
  Phone,
  Zap,
  SquareTerminal,
  Menu,
  X,
} from "lucide-react";

const SidebarManage = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Hero Manage", path: "/admin/manage/hero", icon: Home },
    // { name: "Navbar Manage", path: "/admin/manage/navbar", icon: Menu },
    // { name: "Stats Manage", path: "/admin/manage/stats", icon: BarChart2 },
    {
      name: "Featured Courses",
      path: "/admin/manage/featuredcourses",
      icon: Star,
    },
    { name: "About Manage", path: "/admin/manage/about", icon: Info },
    // { name: "Journey Manage", path: "/admin/manage/journey", icon: Map },
    // { name: "Choose Us", path: "/admin/manage/choose-us", icon: ThumbsUp },
    // { name: "Blog Manage", path: "/admin/manage/blog", icon: BookOpen },
    { name: "Testimonials", path: "/admin/manage/testimonials", icon: MessageSquare },
    // { name: "Contact Manage", path: "/admin/manage/contact", icon: Phone },
    // { name: "CTA Section", path: "/admin/manage/cta", icon: Zap },
    {
      name: "Footer Manage",
      path: "/admin/manage/footer",
      icon: SquareTerminal,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[45px] left-[17px] z-50 p-2 text-indigo-600 bg-white border border-indigo-100 rounded-lg shadow-md hover:bg-indigo-50 transition"
        aria-label="Toggle Attendance Navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 h-screen bg-white text-gray-700 fixed top-0 left-0 z-40 transition-transform duration-300 transform md:translate-x-0 border-r border-gray-200 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-20 md:pt-8 pl-6 pr-4">
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

export default SidebarManage;
