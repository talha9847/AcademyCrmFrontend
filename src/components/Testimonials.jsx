"use client";

import axios from "axios";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [data, setData] = useState([]);
  const getTestimonials = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/front/getTestimonials`,
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTestimonials();
  }, []);
 

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-3 sm:mb-4 mt-2">
            What Our Students Say
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Join thousands of successful students who transformed their careers
            with us
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:border-blue-100 transition-all relative group hover:-translate-y-1"
            >
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Star className="w-5 h-5 fill-white" />
              </div>

              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 font-bold text-lg sm:text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-base sm:text-lg text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {testimonial.course}
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>

              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
