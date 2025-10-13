import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await axios.post(
        "http://localhost:5000/api/front/sendUsMessage",
        data,
        { withCredentials: true }
      );
      if (result.status == 200) {
        reset();
        toast.success("Message sent successfully");
      } else {
        toast.error("Error in sending message");
      }
    } catch (error) {
      toast.error("Some error occured");
    }
  };
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Mehtab Computer Academy", "Surat, Gujarat, India"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 XXXXX XXXXX", "+91 XXXXX XXXXX"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@mehtabacademy.com", "admission@mehtabacademy.com"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9 AM - 7 PM", "Sunday: Closed"],
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50"
    >
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
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Contact Us
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mt-2 mb-3 sm:mb-4">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-2"
            >
              <div
                className={`bg-gradient-to-br ${info.color} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
              >
                <info.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">
                {info.title}
              </h3>
              {info.details.map((detail, i) => (
                <p
                  key={i}
                  className="text-gray-600 text-xs sm:text-sm leading-relaxed"
                >
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100">
            <div className="text-center mb-8 sm:mb-10">
              <h3 className="font-bold text-2xl sm:text-3xl text-gray-900 mb-2 sm:mb-3">
                Send Us a Message
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Fill out the form and we'll get back to you shortly
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      {...register("fname", {
                        required: "First Name is required",
                      })}
                      type="text"
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                      placeholder="Talha"
                    />
                    <p className="text-xs text-red-500">
                      {errors.fname?.message}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register("lname", {
                        required: "Last Name is required",
                      })}
                      type="text"
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                      placeholder="Malek"
                    />
                    <p className="text-xs text-red-500">
                      {errors.lname?.message}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                      })}
                      type="email"
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                      placeholder="mtmalek47@gmail.com"
                    />
                    <p className="text-xs text-red-500">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone", {
                        required: "Phone Number is required",
                      })}
                      type="tel"
                      className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base"
                      placeholder="+91 91067 04675"
                    />
                    <p className="text-xs text-red-500">
                      {errors.phone?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Course Interested In
                  </label>
                  <select
                    {...register("course", {
                      required: "Course is required",
                    })}
                    className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white text-sm sm:text-base"
                  >
                    <option value="">Select a course</option>
                    <option value="web">Web Development</option>
                    <option value="programming">Programming</option>
                    <option value="design">Graphic Design</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="other">Other</option>
                  </select>
                  <p className="text-xs text-red-500">
                    {errors.course?.message}
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm sm:text-base"
                    placeholder="Tell us about your requirements..."
                  />
                  <p className="text-xs text-red-500">
                    {errors.message?.message}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] text-sm sm:text-base"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
