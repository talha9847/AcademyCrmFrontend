import React, { useEffect, useState } from "react";
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  BarChart3,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  Wallet,
  icons,
} from "lucide-react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [slugs, setSlugs] = useState([]);
  const [dbNavItems, setDbNavItems] = useState([]);

  const fixedNavItems = [
    { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { name: "Classes", icon: Home, href: "/admin/classes" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  const location = useLocation();

  const iconMap = {
    Dashboard: Home,
    Students: Users,
    Teachers: GraduationCap,
    Classes: BookOpen,
    Finances: CreditCard,
    Analytics: BarChart3,
    Settings: Settings,
    Fees: Wallet,
  };

  async function getSlugs() {
    const result = await axios.get("http://localhost:5000/api/user/getSlugs", {
      withCredentials: true,
    });

    if (result.status == 200) {
      const items = result.data.data.map((item) => ({
        name: item.name,
        href: "/" + item.slug,
        icon: iconMap[item.name],
      }));
      setDbNavItems(items);
    }
  }

  useEffect(() => {
    getSlugs();
  }, []);

  const navigationItems = [...dbNavItems, ...fixedNavItems];
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>

            <div className="flex-shrink-0 flex items-center ml-2 md:ml-0">
              <h1 className="text-xl font-bold text-black">SchoolCRM</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname.trim() === item.href.trim();
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block relative">
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  Admin
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden relative">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 fixed top-17 left-0 w-screen bg-white border-t border-gray-200">
            {/* Mobile Search */}

            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname.trim() === item.href.trim();
              console.log(location.pathname);
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Profile Section */}
            <div className="px-3 py-2 border-t border-gray-200 mt-4 relative ">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">admin@school.com</p>
                </div>
              </div>
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default AdminNavbar;
