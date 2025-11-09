// FullGallery.jsx

import React, { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FNavbar from "./FNavbar";
import axios from "axios";

// Extended Sample data for the full gallery
const fullGalleryItems = [
  {
    id: 1,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea3d706319d.jpg",
    alt: "Students collaborating in a modern classroom",
    caption: "Interactive Learning Session",
  },
  {
    id: 2,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea3d8f0db2c.jpg",
    alt: "Professor lecturing in a large hall",
    caption: "Main Lecture Hall Facility",
  },
  {
    id: 3,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea3dd42b66e.jpg",
    alt: "Students cheering during graduation",
    caption: "Celebrating Success: Graduation",
  },
  {
    id: 4,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea433e19b12.jpg",
    alt: "Practical workshop in a computer lab",
    caption: "Hands-on Lab Training",
  },
  {
    id: 5,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea448e156a5.jpeg",
    alt: "Students relaxing in the campus courtyard",
    caption: "Vibrant Campus Life",
  },
  {
    id: 6,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea47584273e.jpg",
    alt: "A bright, quiet academy library",
    caption: "Quiet Study Zone",
  },
  {
    id: 7,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea3df1ed54d.jpg",
    alt: "Students working on group project",
    caption: "Collaborative Study Hub",
  },
  {
    id: 8,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea3e09c52fb.jpg",
    alt: "Sports field with students playing soccer",
    caption: "Outdoor Recreation",
  },
  {
    id: 9,
    src: "https://partner.digitalclassworld.com/storage/homepage/gallary/68ea448e156a5.jpeg",
    alt: "Dining hall during lunch time",
    caption: "Modern Dining Facilities",
  },
];

const FullGallery = () => {
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

  // ⚠️ IMPORTANT: In a real app, this would use router navigation to go back
  const handleBack = () => {
    navigate(-1);
    // Example: navigate('/');
  };

  const getAllGallery = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/front/getAllGallery",
        { withCredentials: true }
      );
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGallery();
  });

  return (
    <section
      id="full-gallery"
      className="min-h-screen py-16 px-4 bg-gray-900 transition duration-500"
    >
      <FNavbar />
      <div className="max-w-7xl mx-auto mt-10">
        {/* Header and Back Button */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Complete Gallery
            </span>
          </h2>
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-5 py-2 text-md font-semibold text-gray-200 border border-gray-700 rounded-full hover:bg-gray-800 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        <p className="text-xl text-gray-400 mb-16 max-w-3xl">
          Explore every corner of our campus and facilities. Click any image for
          a closer look.
        </p>

        {/* Full Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg transition duration-300 transform hover:scale-[1.05] hover:shadow-purple-400/30"
              onClick={() => openModal(item)}
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-56 object-cover transition duration-300 group-hover:brightness-75"
                loading="lazy"
              />

              {/* Caption Overlay */}
              <div className="absolute inset-0 flex items-end bg-black/40 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-lg font-medium text-white">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox/Modal Component */}
      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="relative bg-gray-900 rounded-xl shadow-2xl shadow-purple-500/50 max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
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

export default FullGallery;
