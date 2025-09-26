import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Clock,
  UserCheck,
  FileText,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Menu,
  X,
  Home,
  BarChart3,
  CreditCard,
  UserPlus,
  LogOut,
} from "lucide-react";
import AdminNavbar from "../adminComponents/AdminNavbar";


// Main AdminDashboard Component
const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const mainStats = [
    { title: "Total Students", value: 1248, change: "+12%", icon: Users },
    { title: "Active Teachers", value: 84, change: "+3%", icon: GraduationCap },
    { title: "Total Classes", value: 42, change: "0%", icon: BookOpen },
    {
      title: "Monthly Revenue",
      value: "$124,500",
      change: "+8%",
      icon: DollarSign,
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      change: "+2.1%",
      icon: UserCheck,
    },
    {
      title: "Pending Fees",
      value: "$18,200",
      change: "-15%",
      icon: AlertTriangle,
    },
  ];

  const revenueData = [
    { month: "Jan", tuition: 45000, fees: 8000, other: 2000 },
    { month: "Feb", tuition: 48000, fees: 7500, other: 2500 },
    { month: "Mar", tuition: 52000, fees: 9000, other: 1800 },
    { month: "Apr", tuition: 49000, fees: 8200, other: 2200 },
    { month: "May", tuition: 51000, fees: 8800, other: 2000 },
    { month: "Jun", tuition: 53000, fees: 9200, other: 2400 },
  ];

  const studentData = [
    { grade: "K-2", boys: 120, girls: 108 },
    { grade: "3-5", boys: 145, girls: 132 },
    { grade: "6-8", boys: 138, girls: 125 },
    { grade: "9-12", boys: 156, girls: 144 },
  ];

  const attendanceData = [
    { month: "Jan", percentage: 92.5 },
    { month: "Feb", percentage: 89.2 },
    { month: "Mar", percentage: 94.8 },
    { month: "Apr", percentage: 91.3 },
    { month: "May", percentage: 93.7 },
    { month: "Jun", percentage: 95.1 },
  ];

  const performanceDistribution = [
    { name: "Excellent (90-100%)", value: 285, color: "#000000" },
    { name: "Good (80-89%)", value: 456, color: "#404040" },
    { name: "Average (70-79%)", value: 324, color: "#808080" },
    { name: "Below Average (<70%)", value: 183, color: "#C0C0C0" },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      message: "25 new student applications received",
      time: "2 hours ago",
      status: "new",
    },
    {
      id: 2,
      type: "payment",
      message: "Fee payment of $2,400 processed",
      time: "3 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "staff",
      message: "New teacher Sarah Johnson onboarded",
      time: "5 hours ago",
      status: "completed",
    },
    {
      id: 4,
      type: "alert",
      message: "Server maintenance scheduled for tonight",
      time: "6 hours ago",
      status: "pending",
    },
    {
      id: 5,
      type: "exam",
      message: "Mid-term exam results published",
      time: "1 day ago",
      status: "completed",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      date: "Oct 15, 2024",
      time: "9:00 AM",
    },
    { id: 2, title: "Science Fair", date: "Oct 22, 2024", time: "10:00 AM" },
    {
      id: 3,
      title: "Monthly Staff Meeting",
      date: "Oct 25, 2024",
      time: "2:00 PM",
    },
    {
      id: 4,
      title: "Halloween Celebration",
      date: "Oct 31, 2024",
      time: "1:00 PM",
    },
  ];

  const quickActions = [
    { title: "Add Student", icon: Plus, action: "add-student" },
    { title: "Generate Report", icon: FileText, action: "generate-report" },
    { title: "Send Notification", icon: Bell, action: "send-notification" },
    { title: "Schedule Event", icon: Calendar, action: "schedule-event" },
    { title: "Manage Fees", icon: DollarSign, action: "manage-fees" },
    { title: "View Analytics", icon: TrendingUp, action: "view-analytics" },
  ];

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    const isPositive = stat.change.startsWith("+");
    const isNeutral = stat.change === "0%";

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:border-black">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
              {stat.title}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-black mt-1 sm:mt-2">
              {stat.value}
            </p>
            <p
              className={`text-xs sm:text-sm mt-1 ${
                isNeutral
                  ? "text-gray-500"
                  : isPositive
                  ? "text-gray-700"
                  : "text-gray-800"
              }`}
            >
              {stat.change} from last month
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-black rounded-lg ml-2">
            <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Responsive Navbar */}
      <AdminNavbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-black">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Welcome back, manage your school efficiently
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Scrollable on mobile */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
          {["overview", "students", "staff", "finances", "analytics"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mainStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Charts Row - Stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Revenue Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-black">
                Revenue Overview
              </h3>
              <Filter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-black" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tuition"
                  stackId="1"
                  stroke="#000000"
                  fill="#000000"
                />
                <Area
                  type="monotone"
                  dataKey="fees"
                  stackId="1"
                  stroke="#404040"
                  fill="#404040"
                />
                <Area
                  type="monotone"
                  dataKey="other"
                  stackId="1"
                  stroke="#808080"
                  fill="#808080"
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Student Distribution */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-black mb-4">
              Student Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="grade" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Bar dataKey="boys" fill="#000000" radius={[4, 4, 0, 0]} />
                <Bar dataKey="girls" fill="#808080" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second Row Charts - Stack on tablet and mobile */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Attendance Trend */}
          <div className="xl:col-span-2 bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-black mb-4">
              Attendance Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#000000" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Distribution */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-black mb-4">
              Performance Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {performanceDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs sm:text-sm text-gray-600 truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium ml-2">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-black">
                Recent Activities
              </h3>
              <button className="text-xs sm:text-sm text-gray-500 hover:text-black">
                View All
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center min-w-0 flex-1">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${
                        activity.status === "new"
                          ? "bg-black"
                          : activity.status === "completed"
                          ? "bg-gray-600"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-black truncate">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    <Eye className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" />
                    <Edit className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Events */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="p-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-200 text-center"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">
                        {action.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-2 hover:bg-gray-50 rounded"
                  >
                    <Calendar className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-black truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
