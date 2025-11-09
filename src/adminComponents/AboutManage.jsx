import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import SidebarManage from "./SidebarManage";
import { Plus, Save, Loader2 } from "lucide-react"; // Added Save and Loader2 icons for the button
import axios from "axios";
import { toast } from "react-toastify";
import IconPicker from "./IconPicker";
import AboutCoreMission from "./AboutCoreMission";
import AboutCoreVision from "./AboutCoreVision";

// Helper components for improved form structure and style
const FormField = ({ label, name, value, onChange, type = "text", rows }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 3}
        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y bg-white text-gray-800"
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out bg-white text-gray-800"
      />
    )}
  </div>
);

const AboutManage = () => {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false); // Using 'updating' from the original button comment for style
  const [data, setData] = useState({
    heading1: "",
    description1: "",
    heading2: "",
    description2: "",
    description3: "",
    state_val: "",
    heading3: "",
    description4: "",
    id: 0,
  });

  const getAboutPageSection = async () => {
    try {
      setLoading(true); // Set loading to true before the fetch
      const result = await axios.get(
        "http://localhost:5000/api/front/getAboutPageSection",
        { withCredentials: true }
      );
      if (result.status == 200) {
        const data = result.data.data;
        setData({
          heading1: data.heading1,
          description1: data.description1,
          heading2: data.heading2,
          description2: data.description2,
          heading3: data.heading3,
          description3: data.description3,
          state_val: data.state_val,
          description4: data.description4,
          id: 0,
        });
      }
    } catch (error) {
      // Handle error (e.g., show a toast/notification)
    } finally {
      setLoading(false); // Set loading to false after the fetch
    }
  };
  useEffect(() => {
    getAboutPageSection();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setUpdating(true);
    const updatedData = { ...data, id: 1 };

    try {
      const result = await axios.post(
        "http://localhost:5000/api/front/updateAboutSection",
        updatedData,
        { withCredentials: true }
      );
      if (result.status == 200) {
        setUpdating(false);
        setLoading(false);
        toast.success("Data updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    } finally {
      setLoading(false);
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1">
        <SidebarManage />
        {/* Adjusted padding for responsiveness and a cleaner look */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all duration-300">
          <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-indigo-600 p-6 sm:p-8">
              <h1 className="text-3xl font-extrabold text-white flex items-center">
                {/* Plus icon is replaced with a more relevant icon for management */}
                <Save className="w-8 h-8 mr-3" />
                Manage About Page Content
              </h1>
              <p className="text-indigo-200 mt-1">
                Edit and update the key sections of your 'About Us' page.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                  <p className="ml-3 text-lg text-gray-600">
                    Loading content...
                  </p>
                </div>
              ) : (
                <form className="space-y-8">
                  {/* Grid layout for better organization on large screens, still stacks on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Section 1 */}
                    <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
                      <h2 className="text-lg font-bold text-indigo-700 mb-4 border-b pb-2 border-indigo-100">
                        Section 1: Main Introduction
                      </h2>
                      <div className="space-y-5">
                        <FormField
                          label="Heading 1"
                          name="heading1"
                          value={data.heading1}
                          onChange={handleChange}
                        />
                        <FormField
                          label="Description 1"
                          name="description1"
                          value={data.description1}
                          onChange={handleChange}
                          type="textarea"
                          rows="4"
                        />
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
                      <h2 className="text-lg font-bold text-indigo-700 mb-4 border-b pb-2 border-indigo-100">
                        Section 2: Core Narrative
                      </h2>
                      <div className="space-y-5">
                        <FormField
                          label="Heading 2"
                          name="heading2"
                          value={data.heading2}
                          onChange={handleChange}
                        />
                        <FormField
                          label="Description 2"
                          name="description2"
                          value={data.description2}
                          onChange={handleChange}
                          type="textarea"
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3 (Full Width) */}
                  <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
                    <h2 className="text-lg font-bold text-indigo-700 mb-4 border-b pb-2 border-indigo-100">
                      Section 3: Additional Content
                    </h2>
                    <div className="space-y-5">
                      <FormField
                        label="Description 3"
                        name="description3"
                        value={data.description3}
                        onChange={handleChange}
                        type="textarea"
                        rows="4"
                      />
                      <FormField
                        label="State Value (e.g., Key Metric)"
                        name="state_val"
                        value={data.state_val}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Section 4 (Full Width) */}
                  <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-inner">
                    <h2 className="text-lg font-bold text-indigo-700 mb-4 border-b pb-2 border-indigo-100">
                      Section 4: Concluding Statement
                    </h2>
                    <div className="space-y-5">
                      <FormField
                        label="Heading 3"
                        name="heading3"
                        value={data.heading3}
                        onChange={handleChange}
                      />
                      <FormField
                        label="Description 4"
                        name="description4"
                        value={data.description4}
                        onChange={handleChange}
                        type="textarea"
                        rows="4"
                      />
                    </div>
                  </div>

                  {/* Update Button */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      disabled={updating}
                      className={`
                        flex items-center justify-center space-x-2
                        px-8 py-3 rounded-full text-lg font-bold shadow-lg transition duration-200 ease-in-out
                        ${
                          updating
                            ? "bg-indigo-400 text-indigo-100 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-[1.02]"
                        }
                      `}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>Update Content</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
      <AboutCoreMission />
      <AboutCoreVision />
    </div>
  );
};

export default AboutManage;
