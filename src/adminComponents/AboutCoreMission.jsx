import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import SidebarManage from "./SidebarManage";
import * as LucideIcons from "lucide-react";
import IconPicker from "./IconPicker"; // ✅ Reusable picker
import axios from "axios";
import {
  Feather,
  PlusCircle,
  Save,
  X,
  Settings,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import { time } from "framer-motion";

const AboutCoreMission = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  // ✅ Normalize Lucide import and access specific utility icons
  const Lucide = LucideIcons.default || LucideIcons;
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [featureToEdit, setFeatureToEdit] = useState({
    title: "",
    icon: "",
    description: "",
    show: "",
    id: 0,
  }); // State to hold the data currently being edited

  const getAboutCoreMission = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/front/getAboutCoreMission`,
        { withCredentials: true }
      );
      if (result.status === 200) {
        console.log(result.data.data);
        setData(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAboutCoreMission();
  }, []);

  const handleEditClick = (feature) => {
    setModal(true);
    setEditing(true);
    setFeatureToEdit({ ...feature });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFeatureToEdit((prev) => ({ ...prev, [name]: value }));
  };

  // The 'Save' and 'Cancel' functions are placeholders for the original buttons' intended actions.
  const handleSave = async () => {
    try {
      if (editing) {
        const result = await axios.post(
          `${BASE_URL}/api/front/updateAboutCoreMission`,
          featureToEdit,
          { withCredentials: true }
        );
        if (result.status == 200) {
          getAboutCoreMission();
          setModal(false);
          toast.success("Update Done");
        }
      } else {
        const result = await axios.post(
          `${BASE_URL}/api/front/addAboutCoreMission`,
          featureToEdit,
          { withCredentials: true }
        );
        if (result.status == 200) {
          toast.success("Added");
          setModal(false);
          getAboutCoreMission();
          setFeatureToEdit({
            title: "",
            description: "",
            show: "",
            icon: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setModal();
    setFeatureToEdit(null);
  };
  // -----------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header and Add Button */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-indigo-600" />
                Manage Core Mission Features
              </h1>
              {/* Placeholder for Add New Feature button */}
              <button
                onClick={() => {
                  setEditing(false);
                  setModal(true);
                  setFeatureToEdit({
                    title: "",
                    description: "",
                    show: "",
                    icon: "",
                  });
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add New Feature</span>
              </button>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((feature) => {
                const Icon = Lucide[feature.icon] || HelpCircle;

                // 💡 Enhanced Feature Card UI

                return (
                  <div
                    key={feature.id}
                    className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-lg border border-gray-200 hover:shadow-xl transition relative group"
                  >
                    {/* Icon container */}
                    <div className="w-14 h-14 flex items-center justify-center bg-indigo-50 border-4 border-indigo-200 rounded-2xl mb-4 transform group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7 text-indigo-700" />
                    </div>

                    {/* Title and description */}
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {feature.description}
                    </p>

                    {/* Buttons area */}
                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        onClick={() => handleEditClick(feature)}
                        className="p-2 text-indigo-500 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 transition"
                      >
                        <Feather className="w-4 h-4" />
                      </button>

                      {/* Show/Hide toggle */}
                      <button
                        onClick={() => handleToggleVisibility(feature.id)}
                        className={`p-2 rounded-full transition ${
                          feature.show
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                        title={feature.show ? "Visible on site" : "Hidden"}
                      >
                        {feature.show ? (
                          <Lucide.Eye className="w-4 h-4" />
                        ) : (
                          <Lucide.EyeOff className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 💡 Edit Feature Modal/Form (using modal state) */}
          {modal && (
            <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-indigo-50 rounded-t-xl">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    {editing ? "Edit Mission" : "Add Mission"}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-900 transition p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                  {/* Title Field */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Feature Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={featureToEdit.title}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  {/* Description Field */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={featureToEdit.description}
                      onChange={handleFormChange}
                      rows="3"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition resize-y"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-3">
                      Icon Name
                    </h3>

                    <div className="flex items-center space-x-4 mb-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md">
                        <span className="text-sm text-gray-400">Icon</span>
                      </div>

                      <input
                        type="text"
                        name="icon"
                        placeholder="e.g., activity, users, star"
                        value={featureToEdit.icon || ""}
                        onChange={handleFormChange}
                        className="font-mono text-sm text-gray-800 p-2 rounded border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
                      />
                    </div>

                    {/* 💡 Instruction for the user */}
                    <p className="text-xs text-gray-500 mb-4 px-1">
                      **Tip:** Enter the name (e.g., `activity`) directly from
                      the{" "}
                      <a
                        href="https://lucide.dev/icons/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline font-semibold"
                      >
                        Lucide Icons website
                      </a>
                      , or select one below.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <h3 className="text-base font-semibold text-gray-700 mb-3">
                      Visibility Settings
                    </h3>

                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-300 shadow-sm">
                      {/* 💡 SIMPLE CHECKBOX */}
                      <input
                        type="checkbox"
                        id="showOnFront"
                        name="show"
                        checked={featureToEdit.show || false} // current true/false state
                        onChange={() => {
                          // Toggle the value manually
                          setFeatureToEdit({
                            ...featureToEdit,
                            show: !featureToEdit.show,
                          });
                        }}
                        className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                      />

                      <label
                        htmlFor="showOnFront"
                        className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Show on Front Page (True/False)
                      </label>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 px-1">
                      Control whether this feature appears in the mission
                      section of the public front page.
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-1 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave} // Placeholder for your original update function
                    className="flex items-center space-x-1 px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Helper component to render the Icon dynamically (required for the form)

export default AboutCoreMission;
