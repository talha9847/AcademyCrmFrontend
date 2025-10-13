import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import SidebarManage from "./SidebarManage";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageHero = () => {
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
      const result = await axios.get(
        "http://localhost:5000/api/front/getHeroData",
        { withCredentials: true }
      );
      if (result.status == 200) {
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
        "http://localhost:5000/api/front/updateHeroData",
        data,
        { withCredentials: true }
      );

      // Only toast success if response is truly OK
      if (result?.status === 200) {
        toast.success("Data updated successfully.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      // Log the error to debug
      console.error("Update error:", error);

      // Avoid duplicate toasts
      const errorMsg = error.response?.data?.message || "Internal server error";
      toast.error(errorMsg);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <SidebarManage />

      <ToastContainer
        position="top-right" // ✅ You can change this
        autoClose={3000} // closes after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // "light", "dark", "colored"
      />

      <div className="ml-68 mt-4 p-6 max-w-4xl space-y-6">
        <h2 className="text-3xl font-bold mb-6">Manage Hero Section</h2>
        <form onSubmit={handleSubmit(handleSave)}>
          {/* Badge Text */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="badgeText">
              Badge Text
            </label>
            <input
              {...register("badgeText")}
              id="badgeText"
              name="badgeText"
              placeholder="ISO Certified Institute Since 2003"
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          {/* Headings */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="heading1">
              Heading Part 1
            </label>
            <input
              {...register("heading1")}
              id="heading1"
              name="heading1"
              placeholder="Shape Your Future with"
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="heading2">
              Heading Part 2
            </label>
            <input
              {...register("heading2")}
              id="heading2"
              name="heading2"
              placeholder="Quality Education"
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              {...register("description")}
              id="description"
              name="description"
              rows={4}
              placeholder="Join Surat's leading computer education institute with 20+ years..."
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="stat1Value">
                Stat 1 Value
              </label>
              <input
                {...register("stat1Value")}
                id="stat1Value"
                name="stat1Value"
                placeholder="20+"
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="stat2Value">
                Stat 2 Value
              </label>
              <input
                {...register("stat2Value")}
                id="stat2Value"
                name="stat2Value"
                placeholder="50+"
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="stat3Value">
                Stat 3 Value
              </label>
              <input
                {...register("stat3Value")}
                id="stat3Value"
                name="stat3Value"
                placeholder="10k+"
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold mb-1" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              placeholder="/api/placeholder/600/600"
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          {/* Floating Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                className="block font-semibold mb-1"
                htmlFor="floatingCard1Title"
              >
                Floating Card 1 Title
              </label>
              <input
                {...register("floatingCard1Title")}
                id="floatingCard1Title"
                name="floatingCard1Title"
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-1"
                htmlFor="floatingCard1Subtitle"
              >
                Floating Card 1 Subtitle
              </label>
              <input
                {...register("floatingCard1Subtitle")}
                id="floatingCard1Subtitle"
                name="floatingCard1Subtitle"
                placeholder="Job Assist"
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                className="block font-semibold mb-1"
                htmlFor="floatingCard2Title"
              >
                Floating Card 2 Title
              </label>
              <input
                {...register("floatingCard2Title")}
                id="floatingCard2Title"
                name="floatingCard2Title"
                placeholder="40+"
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div>
              <label
                className="block font-semibold mb-1"
                htmlFor="floatingCard2Subtitle"
              >
                Floating Card 2 Subtitle
              </label>
              <input
                {...register("floatingCard2Subtitle")}
                id="floatingCard2Subtitle"
                name="floatingCard2Subtitle"
                placeholder="Courses"
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>
          </div>

          {/* Save Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageHero;
