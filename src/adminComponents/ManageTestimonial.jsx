"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Star, Edit, Trash2, Plus, Globe, X, Loader2 } from "lucide-react";

// Assuming you have these components
import AdminNavbar from "./AdminNavbar";
import SidebarManage from "./SidebarManage";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Component for displaying the rating stars
const RatingDisplay = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

// --- Main Admin Component ---

export default function ManageTestimonial() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);

  // --- Modal & Form State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentTestimonialId, setCurrentTestimonialId] = useState(null); // Track which item is being edited
  const [modalError, setModalError] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    rating: 0,
    text: "",
    show: false, // Using 'show' based on your table implementation
  });

  // Function to fetch testimonials
  const getTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get(
        "http://localhost:5000/api/front/getAllTestimonials", // Adjusted endpoint
        { withCredentials: true }
      );
      if (result.status === 200) {
        setData(result.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      setError("Failed to load testimonials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  const openEditModal = (testimonial) => {
    // Populate formData with existing testimonial data
    setFormData({
      name: testimonial.name,
      course: testimonial.course,
      rating: testimonial.rating,
      text: testimonial.text,
      show: testimonial.show,
    });
    setCurrentTestimonialId(testimonial.id);
    setModalError(null);
    setModalSuccess(false);
    setIsModalOpen(true);
    setEdit(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTestimonialId(null);
    setFormData({ name: "", course: "", rating: 0, text: "", show: false });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (newRating) => {
    setFormData((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  const handleModalSubmit = async (e) => {
    console.log(formData);
    console.log("I am here");

    setIsSaving(true);
    setModalError(null);
    setModalSuccess(false);

    try {
      // NOTE: Use PUT request to update the testimonial by its ID
      if (edit) {
        if (!currentTestimonialId) return;
        const result = await axios.post(
          `http://localhost:5000/api/front/updateTestimonials`,
          {
            name: formData.name,
            course: formData.course,
            title: formData.title,
            rating: formData.rating,
            show: formData.show,
            id: currentTestimonialId,
            text: formData.text,
          },
          { withCredentials: true }
        );

        if (result.status === 200) {
          setModalSuccess(true);
          getTestimonials();
          toast.success("Testimonial updated successfully");
          setTimeout(closeModal, 1500);
        }
      } else {
        const result = await axios.post(
          "http://localhost:5000/api/front/addTestimonial",
          formData,
          { withCredentials: true }
        );
        if (result.status == 200) {
          setModalSuccess(true);
          getTestimonials();
          toast.success("Testimonial updated successfully");
          setTimeout(closeModal, 1500);
        }
      }
    } catch (err) {
      console.error("Failed to update testimonial:", err);
      setModalError("Failed to update testimonial. Check server connection.");
    } finally {
      setIsSaving(false);
      setIsModalOpen(false);
    }
  };

  // --- Other CRUD Handlers ---

  const handleCreate = async () => {
    // Logic for creating a new testimonial (could open a similar modal)
    setFormData({ name: "", course: "", rating: 0, text: "", show: false });
    setCurrentTestimonialId(null); // Ensure ID is null for creation
    setModalError(null);
    setModalSuccess(false);
    setIsModalOpen(true);
    setEdit(false);
  };

  const handleDelete = async (testimonialId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `http://localhost:5000/api/front/deleteTestimonial`,
            { id: testimonialId },
            { withCredentials: true }
          );
          if (response.status == 200) {
            getTestimonials();
            Swal.fire(
              "Deleted!",
              "The testimonial has been deleted.",
              "success"
            );
          }
        } catch (err) {
          console.error("Deletion failed:", err);
          Swal.fire("Error!", "Failed to delete testimonial.", "error");
        }
      }
    });
  };

  const handleTogglePublish = async (show, testimonialId) => {
    const newStatus = !show; // Using 'show' property
    try {
      const result = await axios.post(
        `http://localhost:5000/api/front/updateTestimonialToggle`,
        { show: newStatus, id: testimonialId }, // Send the new status
        { withCredentials: true }
      );
      if (result.status == 200) {
        getTestimonials();
        toast.success("Toggle done");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update testimonial status.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 mr-2 animate-spin text-blue-600" />
        <span className="text-lg text-gray-700">Loading Testimonials...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        {/* Sidebar visibility controlled by SidebarManage logic */}
        <SidebarManage />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 lg:ml-64 transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              Manage Testimonials
            </h1>
            <button
              onClick={handleCreate}
              className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Testimonial
            </button>
          </div>

          {/* Table Container - Essential for Responsiveness */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
            <div className="overflow-x-auto">
              {" "}
              {/* Makes the table scrollable horizontally */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[120px]">
                      Name
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">
                      Course
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">
                      Rating
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">
                      Published
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[200px]">
                      Description Snippet
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No testimonials found.
                      </td>
                    </tr>
                  ) : (
                    data.map((testimonial) => (
                      <tr
                        key={testimonial.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {testimonial.name}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {testimonial.course}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                          <RatingDisplay rating={testimonial.rating} />
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() =>
                              handleTogglePublish(
                                testimonial.show,
                                testimonial.id
                              )
                            }
                            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors shadow-sm ${
                              testimonial.show
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }`}
                            title={
                              testimonial.show
                                ? "Unpublish from website"
                                : "Publish to website"
                            }
                          >
                            <Globe className="w-3 h-3 mr-1" />
                            {testimonial.show ? "Yes" : "No"}
                          </button>
                        </td>
                        {/* Truncated Description */}
                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                          {testimonial.text}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openEditModal(testimonial)}
                              className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(testimonial.id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-opacity-70 p-4 transition-opacity duration-300">
            {/* Modal Content Container - Responsive sizing */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 relative max-h-[95vh] overflow-y-auto transform scale-100 transition-transform duration-300">
              <button
                onClick={closeModal}
                className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full"
                disabled={isSaving}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                {currentTestimonialId
                  ? "Edit Testimonial"
                  : "Create New Testimonial"}
              </h2>

              <form className="space-y-4">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name || ""}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-base focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Course Field */}
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Course / Title
                  </label>
                  <input
                    type="text"
                    name="course"
                    id="course"
                    value={formData.course || ""}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-base focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Rating Field - Use icon selection for better UX */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1 items-center">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <Star
                        key={starValue}
                        className={`w-6 h-6 cursor-pointer transition-colors ${
                          starValue <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300 hover:fill-yellow-200"
                        }`}
                        onClick={() => handleRatingChange(starValue)}
                      />
                    ))}
                    <span className="ml-3 text-sm font-semibold text-gray-700">
                      {formData.rating} / 5
                    </span>
                  </div>
                </div>

                {/* Text/Description Field */}
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Testimonial Text
                  </label>
                  <textarea
                    name="text"
                    id="text"
                    rows="4"
                    value={formData.text || ""}
                    onChange={handleFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-base focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center pt-2">
                  <input
                    type="checkbox"
                    name="show"
                    id="show"
                    checked={!!formData.show}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        show: e.target.checked,
                      });
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="show"
                    className="ml-2 text-sm font-medium text-gray-700 select-none"
                  >
                    Show on Website (Published)
                  </label>
                </div>

                {/* Error & Success Messages */}
                {modalError && (
                  <p className="text-sm text-red-600 pt-2">{modalError}</p>
                )}
                {modalSuccess && (
                  <p className="text-sm text-green-600 font-medium pt-2">
                    Testimonial saved successfully! 🎉
                  </p>
                )}

                {/* Submit Button */}
                <button
                  onClick={() => {
                    handleModalSubmit();
                  }}
                  type="button"
                  disabled={isSaving}
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSaving
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  } transition-colors mt-6`}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
        {/* ------------------------------------------------------------------ */}
      </div>
    </div>
  );
}
