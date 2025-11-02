import React, { useState } from "react";
import { ZoomIn, X } from "lucide-react"; // Using lucide-react for consistency

// Sample data (update paths to your actual images)
const galleryItems = [
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
];

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (item) => {
    setSelectedImage(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

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
      <p className="text-xl text-center text-gray-400 mb-16 max-w-3xl mx-auto">
        Witness the dynamic environment, cutting-edge facilities, and
        collaborative energy that fuels future leaders.
      </p>

      {/* Gallery Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item) => (
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

      {/* --- Lightbox/Modal Component (Styled to match Hero Buttons) --- */}
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
