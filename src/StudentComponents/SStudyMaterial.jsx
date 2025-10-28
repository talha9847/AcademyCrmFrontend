import React from "react";
import SNavbar from "./SNavbar";
import {
  BookOpen,
  Download,
  FileText,
  Video,
  ExternalLink,
  Book,
  FileCheck,
  ChevronRight,
  Link, // Better icon for external links
} from "lucide-react";

// --- Static Data for Study Material ---
const STUDY_MATERIAL_DATA = [
  {
    id: 101,
    title: "Module 1: HTML & CSS Fundamentals Guide",
    description: "Structure, selectors, and Flexbox/Grid layout principles.",
    type: "Document",
    format: "PDF",
    link: "/materials/module1_guide.pdf", 
    size: "5.2 MB",
  },
  {
    id: 102,
    title: "Advanced JavaScript ES6+ Features",
    description: "Deep dive into Async/Await, Promises, and modern array methods.",
    type: "Document",
    format: "DOCX",
    link: "/materials/js_advanced.docx",
    size: "0.8 MB",
  },
  {
    id: 103,
    title: "Webinar Recording: React Hooks Mastery",
    description: "Mastering useEffect and custom hooks for scalable applications.",
    type: "Video",
    format: "MP4/Link",
    link: "https://youtube.com/react-hooks-mastery", 
    size: "55 minutes",
  },
  {
    id: 104,
    title: "Official Documentation: Tailwind CSS",
    description: "Direct link to the external official documentation portal.",
    type: "Resource Link",
    format: "Web Link",
    link: "https://tailwindcss.com/docs",
    size: "External",
  },
  {
    id: 105,
    title: "E-Book: Full Stack Development with Node.js",
    description: "Comprehensive guide for server-side architecture and APIs.",
    type: "E-Book",
    format: "EPUB",
    link: "/materials/nodejs_ebook.epub",
    size: "12 MB",
  },
];

// Helper function to map type to visual styles (color, icon, action text)
const materialStyles = {
  Document: {
    icon: FileText,
    iconColor: "text-indigo-600",
    actionColor: "bg-indigo-600 hover:bg-indigo-700",
    actionText: "Download File",
    actionIcon: Download,
  },
  Video: {
    icon: Video,
    iconColor: "text-red-600",
    actionColor: "bg-red-600 hover:bg-red-700",
    actionText: "View Video",
    actionIcon: ExternalLink,
  },
  "Resource Link": {
    icon: Link,
    iconColor: "text-blue-600",
    actionColor: "bg-blue-600 hover:bg-blue-700",
    actionText: "Open Resource",
    actionIcon: ExternalLink,
  },
  "E-Book": {
    icon: Book,
    iconColor: "text-green-600",
    actionColor: "bg-green-600 hover:bg-green-700",
    actionText: "Download E-Book",
    actionIcon: Download,
  },
};

// Action handler (placeholder)
const handleAction = (link, type) => {
  if (type === "Resource Link" || type === "Video") {
    // For external links, simulate opening a new tab
    window.open(link, "_blank");
    console.log(`Opening external link: ${link}`);
  } else {
    // For documents/files, simulate download
    console.log(`Initiating download for file from: ${link}`);
  }
  // Optional: Provide visual feedback
  alert(`Action initiated for: ${link}`);
};

const SStudyMaterial = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SNavbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 pb-3 border-b-4 border-indigo-100">
          <BookOpen className="w-8 h-8 inline-block mr-2 text-indigo-600" />
          Course Study Materials & Resources
        </h1>

        {/* --- Materials Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STUDY_MATERIAL_DATA.map((material) => {
            const styles = materialStyles[material.type] || materialStyles.Document;
            const IconComponent = styles.icon;
            const ActionIcon = styles.actionIcon;

            return (
              <div
                key={material.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden transform hover:scale-[1.02] transition duration-300"
              >
                {/* Header Section */}
                <div className={`p-5 flex items-center space-x-3 border-b-2 ${styles.iconColor.replace('text-', 'border-')}`}>
                  <IconComponent className={`w-8 h-8 ${styles.iconColor} flex-shrink-0`} />
                  <div>
                    <span className="text-xs font-semibold uppercase text-gray-500 block">
                      {material.type}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{material.format}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-grow">
                  <h2 className="text-lg font-extrabold text-gray-900 mb-2">
                    {material.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {material.description}
                  </p>
                </div>
                
                {/* Metadata and Action */}
                <div className="p-5 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4 text-xs font-medium text-gray-500">
                        <span className="flex items-center space-x-1">
                           <FileCheck className="w-4 h-4" />
                           <span>Metadata: {material.size}</span>
                        </span>
                        <span className="uppercase">{material.format}</span>
                    </div>

                    <button
                    onClick={() => handleAction(material.link, material.type)}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold text-white transition duration-200 shadow-md ${styles.actionColor}`}
                    >
                        <ActionIcon className="w-5 h-5" />
                        <span>{styles.actionText}</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
              </div>
            );
          })}

          {STUDY_MATERIAL_DATA.length === 0 && (
            <p className="col-span-full py-10 text-center text-gray-500 text-xl">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              No study materials have been uploaded for your course yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SStudyMaterial;