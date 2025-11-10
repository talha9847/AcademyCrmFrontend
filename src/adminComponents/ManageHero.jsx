import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import SidebarManage from "./SidebarManage";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageHero = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      badgeText: "",
      heading1: "",
      heading2: "",
      description: "",
      button1Text: "",
      button1Link: "",
      button2Text: "",
      button2Link: "",
      stat1Value: "",
      stat2Value: "",
      stat3Value: "",
      imageUrl: "",
      floatingCard1Title: "",
      floatingCard1Subtitle: "",
      floatingCard2Title: "",
      floatingCard2Subtitle: "",
    },
  });

  const getHeroData = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/front/getHeroData`, {
        withCredentials: true,
      });
      if (result.status === 200) {
        const data = result.data.data;

        reset({
          badgeText: data.badge_text || "",
          heading1: data.heading1 || "",
          heading2: data.heading2 || "",
          description: data.description || "",
          button1Text: data.button1_text || "",
          button1Link: data.button1_link || "",
          button2Text: data.button2_text || "",
          button2Link: data.button2_link || "",
          stat1Value: data.stat1_value || "",
          stat2Value: data.stat2_value || "",
          stat3Value: data.stat3_value || "",
          imageUrl: data.image_url || "",
          floatingCard1Title: data.floating_card1_title || "",
          floatingCard1Subtitle: data.floating_card1_subtitle || "",
          floatingCard2Title: data.floating_card2_title || "",
          floatingCard2Subtitle: data.floating_card2_subtitle || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeroData();
  }, []);

  const handleSave = async (data) => {
    try {
      const result = await axios.post(
        `${BASE_URL}/api/front/updateHeroData`,
        data,
        { withCredentials: true }
      );

      if (result?.status === 200) {
        toast.success("Data updated successfully.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Update error:", error);
      const errorMsg = error.response?.data?.message || "Internal server error";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <SidebarManage />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Main Content Area: Adjusted for responsiveness */}
      <main className="md:pl-64 pt-16 p-4">
        <div className="max-w-4xl mx-auto md:mx-0 space-y-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Manage Hero Section
          </h2>
          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            {/* Badge Text */}
            <div>
              <label
                className="block font-semibold mb-1 text-gray-700"
                htmlFor="badgeText"
              >
                Badge Text
              </label>
              <input
                {...register("badgeText")}
                id="badgeText"
                name="badgeText"
                placeholder="ISO Certified Institute Since 2003"
                className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Headings */}
            <div>
              <label
                className="block font-semibold mb-1 text-gray-700"
                htmlFor="heading1"
              >
                Heading Part 1
              </label>
              <input
                {...register("heading1")}
                id="heading1"
                name="heading1"
                placeholder="Shape Your Future with"
                className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-1 text-gray-700"
                htmlFor="heading2"
              >
                Heading Part 2
              </label>
              <input
                {...register("heading2")}
                id="heading2"
                name="heading2"
                placeholder="Quality Education"
                className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label
                className="block font-semibold mb-1 text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                name="description"
                rows={4}
                placeholder="Join Surat's leading computer education institute with 20+ years..."
                className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Stats */}
            <h3 className="text-lg font-bold pt-4 text-gray-800">Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="stat1Value"
                >
                  Stat 1 Value
                </label>
                <input
                  {...register("stat1Value")}
                  id="stat1Value"
                  name="stat1Value"
                  placeholder="20+"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="stat2Value"
                >
                  Stat 2 Value
                </label>
                <input
                  {...register("stat2Value")}
                  id="stat2Value"
                  name="stat2Value"
                  placeholder="50+"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="stat3Value"
                >
                  Stat 3 Value
                </label>
                <input
                  {...register("stat3Value")}
                  id="stat3Value"
                  name="stat3Value"
                  placeholder="10k+"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Image URL */}
            <h3 className="text-lg font-bold pt-4 text-gray-800">Media</h3>
            <div>
              <label
                className="block font-semibold mb-1 text-gray-700"
                htmlFor="imageUrl"
              >
                Image URL
              </label>
              <input
                {...register("imageUrl")}
                id="imageUrl"
                name="imageUrl"
                placeholder="/api/placeholder/600/600"
                className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Floating Cards */}
            <h3 className="text-lg font-bold pt-4 text-gray-800">
              Floating Cards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 Title */}
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="floatingCard1Title"
                >
                  Floating Card 1 Title
                </label>
                <input
                  {...register("floatingCard1Title")}
                  id="floatingCard1Title"
                  name="floatingCard1Title"
                  placeholder="e.g., 5000+"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Card 1 Subtitle */}
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="floatingCard1Subtitle"
                >
                  Floating Card 1 Subtitle
                </label>
                <input
                  {...register("floatingCard1Subtitle")}
                  id="floatingCard1Subtitle"
                  name="floatingCard1Subtitle"
                  placeholder="Job Assist"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 2 Title */}
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="floatingCard2Title"
                >
                  Floating Card 2 Title
                </label>
                <input
                  {...register("floatingCard2Title")}
                  id="floatingCard2Title"
                  name="floatingCard2Title"
                  placeholder="e.g., 40+"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Card 2 Subtitle */}
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="floatingCard2Subtitle"
                >
                  Floating Card 2 Subtitle
                </label>
                <input
                  {...register("floatingCard2Subtitle")}
                  id="floatingCard2Subtitle"
                  name="floatingCard2Subtitle"
                  placeholder="Courses"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Action Buttons - Moved here to separate from cards and avoid confusion */}
            <h3 className="text-lg font-bold pt-4 text-gray-800">
              Action Buttons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Button 1 Text */}
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="button1Text"
                >
                  Button 1 Text
                </label>
                <input
                  {...register("button1Text")}
                  id="button1Text"
                  name="button1Text"
                  placeholder="Get Started"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Button 1 Link */}
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="button1Link"
                >
                  Button 1 Link
                </label>
                <input
                  {...register("button1Link")}
                  id="button1Link"
                  name="button1Link"
                  placeholder="/courses"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Button 2 Text */}
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="button2Text"
                >
                  Button 2 Text
                </label>
                <input
                  {...register("button2Text")}
                  id="button2Text"
                  name="button2Text"
                  placeholder="Contact Us"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Button 2 Link */}
              <div>
                <label
                  className="block font-semibold mb-1 text-gray-700"
                  htmlFor="button2Link"
                >
                  Button 2 Link
                </label>
                <input
                  {...register("button2Link")}
                  id="button2Link"
                  name="button2Link"
                  placeholder="/contact"
                  className="w-full rounded border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ManageHero;
