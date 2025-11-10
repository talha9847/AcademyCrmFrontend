import React, { useEffect, useState } from "react";
import { ZoomIn, X, ArrowRight } from "lucide-react"; // Import ArrowRight for the button
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const openModal = (item) => {
    setSelectedImage(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const getGallery = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/front/getGallery`,
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <section
      id="gallery"
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 transition duration-500"
    >
      {/* Title with the signature gradient from the Hero section */}
      <h2 className="text-5xl font-extrabold text-center text-white mb-4 tracking-tight">
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Campus Gallery
        </span>
      </h2>
      <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">
        Witness the dynamic environment, cutting-edge facilities, and
        collaborative energy that fuels future leaders.
      </p>

      {/* Gallery Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* We only display a subset here if there were many, but for this example, we show all 6 */}
        {data.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-2xl transition duration-500 transform hover:scale-[1.03] hover:shadow-purple-500/50"
            onClick={() => openModal(item)}
          >
            {/* Image */}
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-72 object-cover transition duration-500 group-hover:opacity-60"
              loading="lazy"
            />

            {/* Caption (Frosted Glass Effect - aligned with Hero badge) */}
            <div className="absolute inset-x-0 bottom-0 bg-white/10 backdrop-blur-md p-4 transition duration-300 translate-y-full group-hover:translate-y-0">
              <p className="text-lg font-semibold text-white truncate">
                {item.caption}
              </p>
            </div>

            {/* View Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl hover:scale-110 transition">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- View All Images Button --- */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => {
            navigate("/gallery");
          }}
          className="flex items-center space-x-2 px-8 py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl shadow-purple-500/50 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 ring-2 ring-transparent hover:ring-white/50"
        >
          <span>View All Images</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
      </div>

      {/* --- Lightbox/Modal Component (UNCHANGED) --- */}
      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="relative bg-gray-900 rounded-xl shadow-2xl shadow-purple-500/50 max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Styled like the primary CTA button */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              onClick={closeModal}
              aria-label="Close image view"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-t-xl"
            />

            <div className="p-4 bg-gray-800 rounded-b-xl">
              <p className="text-center text-2xl font-bold text-gray-200">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
