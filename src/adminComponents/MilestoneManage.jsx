import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import SidebarManage from "./SidebarManage";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MilestoneManage = () => {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    icon: "",
    color: "",
    id: 0,
  });

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // ✅ Perform delete logic here
        const result = await axios.post(
          "http://localhost:5000/api/front/deleteMilestone",
          { id },
          { withCredentials: true }
        );
        if (result.status == 200) {
          await getMilestones();
          Swal.fire("Deleted!", "The item has been deleted.", "success");
        } else {
          Swal.fire("Error", "Something went wrong while deleting.", "error");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while deleting.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (editing) {
        console.log(formData);
        const result = await axios.put(
          "http://localhost:5000/api/front/updateMilestone",
          formData,
          { withCredentials: true }
        );
        if (result.status == 200) {
          getMilestones();
          setModal(false);
          setEditing(false);
          toast.success("Update Successfull");
        }
      } else {
        const result = await axios.post(
          "http://localhost:5000/api/front/addMilestone",
          formData,
          { withCredentials: true }
        );
        if (result.status == 200) {
          await getMilestones();
          setModal(false);
          toast.success("Added successfully");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };

  const getMilestones = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/front/getMilestones",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLucideIcon = (iconName) => {
    if (!iconName) return null;

    // Capitalize the first letter to match Lucide's exported component names
    const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);

    const IconComponent = LucideIcons[formattedName];
    return IconComponent ? (
      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
    ) : null; // fallback if the icon doesn't exist
  };

  useEffect(() => {
    getMilestones();
  }, []);

  // --- Start of UI/UX Improvements ---
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Lighter background */}
      <AdminNavbar />
      <div className="flex flex-1">
        <SidebarManage />
        {/* Adjusted padding for responsiveness and a cleaner look */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 lg:ml-64 transition-all duration-300">
          
          {/* Header and Add Button Section */}
          <div className="flex justify-between items-center mb-8 sm:mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900">
              🚀 Manage Milestones
            </h1>
            <button
              onClick={() => {
                setModal(true);
                setFormData({
                  title: "",
                  year: "",
                  description: "",
                  color: "",
                  icon: "",
                  id: 0,
                });
                setEditing(false);
              }}
              className="flex items-center space-x-2 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95"
            >
              <LucideIcons.Plus className="w-5 h-5" />
              <span>Add New Milestone</span>
            </button>
          </div>
          
          {/* Milestone Timeline/List Container */}
          <div className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-100">
            
            {data.length === 0 ? (
              <div className="text-center p-12 text-gray-500">
                <LucideIcons.CalendarOff className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-medium">No milestones found.</p>
                <p>Click 'Add New Milestone' to start building your timeline.</p>
              </div>
            ) : (
              data.map((milestone, index) => (
                <div
                  key={milestone.year} // Using ID is generally safer if available, but year is kept for consistency with original
                  className="relative mb-16 sm:mb-24 last:mb-0"
                >
                  {/* Timeline line (Desktop) */}
                  {index !== data.length - 1 && (
                    <div className="absolute left-1/2 top-0 bottom-[-4rem] w-0.5 bg-gray-200 -translate-x-1/2 hidden lg:block rounded-full" />
                  )}
                  {/* Timeline line (Mobile) */}
                  {index !== data.length - 1 && (
                    <div className="absolute left-0 sm:left-4 top-0 bottom-[-4rem] w-0.5 bg-gray-200 block lg:hidden rounded-full" />
                  )}

                  <div
                    className={`flex flex-col lg:flex-row items-stretch lg:gap-12 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    
                    {/* Spacer for alignment on alternating sides (Desktop) */}
                    <div className="flex-1 hidden lg:block lg:max-w-[45%]" />

                    {/* Icon Circle (Desktop) */}
                    <div className="relative z-20 hidden lg:flex w-[10%] justify-center items-start pt-1">
                      <div
                        style={{ backgroundColor: milestone.color || '#4f46e5' }} // Fallback color added
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl ring-8 ring-white transition-all duration-300 transform hover:scale-105`}
                      >
                        {getLucideIcon(milestone.icon)}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`flex-1 lg:max-w-[45%] transition-all duration-300 ${
                        index % 2 === 0
                          ? "lg:text-right lg:ml-0 ml-12 sm:ml-16"
                          : "lg:text-left lg:mr-0 ml-12 sm:ml-16"
                      }`}
                    >
                      <div
                        className={`bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 ring-2 ring-transparent hover:ring-indigo-100 transition-all duration-300 relative`}
                      >
                        {/* Mobile Icon Marker (Left aligned) */}
                        <div className="relative z-20 flex lg:hidden -translate-x-[3.3rem] sm:-translate-x-[4.3rem] absolute left-0 top-0 mt-1">
                            <div
                                style={{ backgroundColor: milestone.color || '#4f46e5' }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white transition-all duration-300`}
                            >
                                {/* The original logic for Mobile icon was using milestone.icon as a component, which is risky.
                                    Reverting to use the safer `getLucideIcon` function for consistency and robustness. */}
                                {getLucideIcon(milestone.icon)} 
                            </div>
                        </div>

                        {/* Year and Action Buttons Container */}
                        <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                          <div
                            style={{ backgroundColor: milestone.color || '#4f46e5' }}
                            className={`inline-block px-4 py-1.5 rounded-full text-white font-bold text-sm tracking-wide shadow-md`}
                          >
                            {milestone.year}
                          </div>
                          <div className="flex space-x-3">
                            {/* Edit Button */}
                            <button
                              onClick={() => {
                                setModal(true);
                                setEditing(true);
                                setFormData({
                                  title: milestone.title,
                                  description: milestone.description,
                                  year: milestone.year,
                                  color: milestone.color,
                                  icon: milestone.icon,
                                  id: milestone.id,
                                });
                              }}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                              title="Edit"
                            >
                              <LucideIcons.Pencil className="w-4 h-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            {/* Delete Button */}
                            <button
                              onClick={() => {
                                handleDelete(milestone.id);
                              }}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                              title="Delete"
                            >
                              <LucideIcons.Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </div>

                        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-base">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      
      {/* Modal / Dialog */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-40 backdrop-blur-sm transition-opacity duration-300">
          
          <div className="flex flex-col w-full max-w-lg bg-white rounded-2xl shadow-2xl transition-all duration-300 transform scale-100 opacity-100 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <LucideIcons.Target className="w-6 h-6 text-indigo-600" />
                <span>{editing ? "Edit Milestone" : "Add New Milestone"}</span>
              </h2>
            </div>
            
            {/* Modal Body / Form Inputs */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[80vh]">
              
              {/* Title Input */}
              <div className="space-y-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter milestone title"
                />
              </div>

              {/* Year Input */}
              <div className="space-y-1">
                <label
                  htmlFor="year"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Year
                </label>
                <input
                  id="year"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g., 2024"
                />
              </div>

              {/* Description Textarea */}
              <div className="space-y-1">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-y shadow-sm"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the milestone details"
                ></textarea>
              </div>

              {/* Icon Input */}
              <div className="space-y-1">
                <label
                  htmlFor="icon"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Icon (Lucide Name)
                </label>
                <input
                  id="icon"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="e.g., activity, check-circle"
                />
                <p className="text-xs text-gray-500 px-1 mt-1">
                  Enter the name (e.g., `activity`) directly from the{" "}
                  <a
                    href="https://lucide.dev/icons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Lucide Icons website
                  </a>
                  .
                </p>
              </div>

              {/* Color Picker Input */}
              <div className="space-y-1">
                <label
                  htmlFor="color"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Theme Color (HEX)
                </label>

                <div className="flex items-center gap-4">
                  {/* Color Picker */}
                  <input
                    id="color"
                    type="color"
                    name="color"
                    value={formData.color || "#4f46e5"} 
                    onChange={handleChange}
                    className="w-14 h-14 p-1 border-2 border-gray-300 rounded-lg cursor-pointer transition-colors hover:border-indigo-500"
                  />

                  {/* Text Field for HEX value */}
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                    placeholder="#4f46e5"
                  />
                </div>
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="flex justify-end gap-3 p-5 sm:p-6 border-t bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="px-4 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
              >
                Cancel
              </button>

              {/* Save/Update Button */}
              <button
                onClick={() => {
                  handleSave();
                  console.log("Milestone updated:", formData);
                }}
                className="flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 transition-colors transform hover:scale-[1.01] active:scale-95"
              >
                <LucideIcons.Save className="w-4 h-4" />
                <span>{editing ? "Update Milestone" : "Add Milestone"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilestoneManage;