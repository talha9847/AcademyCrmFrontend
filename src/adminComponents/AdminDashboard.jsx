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
} from "lucide-react";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const mainStats = [
    { title: "Total Students", value: 1248, change: "+12%", icon: Users },
    { title: "Active Teachers", value: 84, change: "+3%", icon: GraduationCap },
    {
      title: "Pending Fees",
      value: "$18,200",
      change: "-15%",
      icon: AlertTriangle,
    },
  ];

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    const isPositive = stat.change.startsWith("+");
    const isNeutral = stat.change === "0%";

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-black">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-2xl font-bold text-black mt-2">{stat.value}</p>
            <p
              className={`text-sm mt-1 ${
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
          <div className="p-3 bg-black rounded-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminNavbar />
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, manage your school efficiently
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
