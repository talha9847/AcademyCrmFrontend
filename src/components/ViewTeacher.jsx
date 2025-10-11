import React from "react";
import AdminNavbar from "../adminComponents/AdminNavbar";
import {
  ArrowLeft,
  Download,
  Edit2,
  MoveVertical,
  Printer,
} from "lucide-react";

const ViewTeacher = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Actions */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Teacher Details
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  View and manage teacher information
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button className="px-3 sm:px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="px-3 sm:px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <Printer className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button className="px-3 sm:px-4 py-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors flex items-center">
                <Edit2 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Edit Student</span>
                <span className="sm:hidden">Edit</span>
              </button>
              <button className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MoveVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacher;
