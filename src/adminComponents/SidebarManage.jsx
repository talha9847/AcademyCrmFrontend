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
    { name: "Featured Courses", path: "/admin/manage/featuredcourses", icon: Star },
    // { name: "About Manage", path: "/admin/manage/about", icon: Info },
    // { name: "Journey Manage", path: "/admin/manage/journey", icon: Map },
    // { name: "Choose Us", path: "/admin/manage/choose-us", icon: ThumbsUp },
    // { name: "Blog Manage", path: "/admin/manage/blog", icon: BookOpen },
    // { name: "Testimonials", path: "/admin/manage/testimonials", icon: MessageSquare },
    // { name: "Contact Manage", path: "/admin/manage/contact", icon: Phone },
    // { name: "CTA Section", path: "/admin/manage/cta", icon: Zap },
    { name: "Footer Manage", path: "/admin/manage/footer", icon: SquareTerminal },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-40 p-2 text-gray-500 hover:text-teal-500 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 h-screen bg-white text-gray-500 fixed left-0 z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pl-8 mt-4 pr-4">
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>
          </div>
          <nav>
            <ul className="space-y-4">
              {menuItems.map(({ name, path, icon: Icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 transition hover:text-teal-400 ${
                      isActive(path) ? "text-teal-500 font-semibold" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {name}
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