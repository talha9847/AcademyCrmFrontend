import React, { useState, useEffect } from "react";
import { Edit2, X, Check, Eye, Trash2 } from "lucide-react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import SidebarManage from "./SidebarManage";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageFCourses = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This course will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      console.log("Nice try buddy" + id);

      try {
        const result = await axios.post(
          `${BASE_URL}/api/front/deleteCourse`,
          { id: id },
          { withCredentials: true }
        );
        if (result.status == 200) {
          toast.error("Deleted successfully");
          getCourses();
        }
      } catch (error) {}
      // 👉 Here you can call your delete API:
      // await deleteCourse(id);
      // setCourses(courses.filter((c) => c.id !== id));
      // Swal.fire("Deleted!", "Course deleted successfully.", "success");
    }
  };

  const getCourses = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/front/getAllCourses`, {
        withCredentials: true,
      });
      if (result.status === 200) {
        console.log(result.data.data);
        setCourses(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourse = async (data) => {
    try {
      console.log(data);
      if (edit) {
        const result = await axios.post(
          `${BASE_URL}/api/front/updateCourse`,
          data,
          { withCredentials: true }
        );
        if (result.status == 200) {
          setIsEditOpen(false);
          console.log("kklj;lk ");
          toast.success("Course updated successfully");
        } else {
          toast.error("Internal server error");
        }
      } else {
        const newData = {
          category: data.category,
          title: data.title,
          description: data.description,
          price: data.price,
          duration: data.duration,
          level: data.level,
          image: data.image,
          featured: data.featured,
        };
        const result = await axios.post(
          `${BASE_URL}/api/front/addCourse`,
          newData,
          { withCredentials: true }
        );
        if (result.status == 200) {
          setIsEditOpen(false);
          getCourses();
          toast.success("New course added successfully");
          reset({
            title: "",
            category: "",
            price: "",
            description: "",
            duration: "",
            level: "",
            image: "",
            featured: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleEditClick = (course) => {
    reset({
      id: course.id,
      title: course.title,
      category: course.category,
      price: course.price,
      description: course.description,
      duration: course.duration,
      level: course.level,
      image: course.image,
      featured: course.featured,
    });
    setIsEditOpen(true);
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
      <div className="flex justify-end items-center mt-4 mr-5 md:mr-5 px-4 md:px-0">
        <button
          onClick={() => {
            setEdit(false);
            reset({
              title: "",
              category: "",
              price: "",
              description: "",
              duration: "",
              level: "",
              image: "",
              featured: "",
            });
            setIsEditOpen(true);
          }}
          className="border-2 border-black text-white bg-black px-2 rounded-xl"
        >
          Add Course
        </button>
      </div>
      <div className="md:ml-68 p-4 space-y-2">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col h-full"
            >
              <div className="relative h-40 overflow-hidden bg-gray-200">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <button
                  onClick={() => handleFeaturedToggle(course)}
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    course.featured
                      ? "bg-yellow-400 text-yellow-900"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {course.featured ? "⭐ Featured" : "Add to Featured"}
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {course.category}
                </span>
                <h3 className="font-bold text-lg mt-2 text-gray-900 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {course.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                  <span className="font-bold text-blue-600">
                    ${course.price}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  ⏱️ {course.duration}
                </div>

                <div className="mt-auto flex space-x-2">
                  {/* View Button */}
                  <button
                    onClick={() => {
                      navigate("/admin/manage/coursedetail", {
                        state: { courseId: course.id },
                      });
                    }}
                    className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      handleEditClick(course);
                    }}
                    className="w-1/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="w-1/3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm md:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="flex justify-between items-center p-8 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-3xl font-bold text-gray-900">
                {edit ? "Edit Course" : "Add New Course"}
              </h2>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 p-2 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <form onSubmit={handleSubmit(addCourse)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      {...register("title")}
                      type="text"
                      name="title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      {...register("category")}
                      type="text"
                      name="category"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      {...register("price")}
                      type="text"
                      name="price"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <input
                      {...register("level")}
                      type="text"
                      name="level"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      {...register("duration")}
                      type="text"
                      name="duration"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      {...register("image")}
                      type="text"
                      name="image"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    name="description"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <input
                    {...register("featured", {
                      setValueAs: (v) => !!v, // ensures it becomes true/false
                    })}
                    type="checkbox"
                    id="featured"
                    name="featured"
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Add to Featured Courses
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setIsEditOpen(false)}
                    className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFCourses;
