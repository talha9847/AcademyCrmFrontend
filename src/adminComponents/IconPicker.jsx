import React, { useState, useMemo } from "react";
// 💡 FIX: Explicitly import the 'icons' map for reliable dynamic access.
import { icons as LucideIcons, Search, X, ChevronLeft, ChevronRight, Frown } from "lucide-react";

const IconPicker = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // 1. Use the pre-imported and stable LucideIcons map
  const iconsObject = LucideIcons;

  // 2. The filtered list is memoized and correctly sourced from LucideIcons
  const allIcons = useMemo(
    () =>
      Object.entries(iconsObject).filter(
        // The check remains valid: ensure it's a function (the React component)
        ([name, Icon]) => typeof Icon === "function" && /^[A-Z]/.test(name)
      ),
    [iconsObject]
  );

  const filteredIcons = useMemo(() => {
    // Reset page logic should be outside this memo's dependencies for search/letter
    const results = allIcons.filter(([name]) => {
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesLetter = selectedLetter
        ? name.startsWith(selectedLetter)
        : true;
      return matchesSearch && matchesLetter;
    });
    return results;
  }, [search, selectedLetter, allIcons]);

  // Pagination logic: automatically reset to page 1 if filters change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  // Custom effect to reset page when filters change (using a count of filtered icons)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredIcons.length]);


  const iconsPerPage = 60;
  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);
  const startIndex = (currentPage - 1) * iconsPerPage;
  const pagedIcons = filteredIcons.slice(startIndex, startIndex + iconsPerPage);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter === selectedLetter ? null : letter);
  };

  // Helper component to render the Icon dynamically
  const DynamicIcon = ({ name, ...props }) => {
      const Icon = iconsObject[name];
      return Icon ? <Icon {...props} /> : null;
  };

  return (
    <div className="mt-3 p-4 border border-gray-300 rounded-xl bg-white shadow-xl max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="flex items-center mb-4 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 transition duration-150">
        <Search className="w-5 h-5 ml-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 bg-transparent focus:outline-none placeholder-gray-500"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="p-2 text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Alphabet Filter */}
      <div className="flex flex-wrap gap-1 justify-center p-2 rounded-lg bg-gray-50 mb-4 border-b">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`
              px-2 py-1 text-xs rounded-md font-medium transition duration-150 ease-in-out
              ${selectedLetter === letter
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }
            `}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Icons Grid */}
      {pagedIcons.length === 0 ? (
        <p className="text-base text-gray-500 text-center py-12">
          <Frown className="w-6 h-6 inline-block mr-2" />
          No icons found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-9 gap-2 p-2 bg-gray-50 rounded-lg">
          {pagedIcons.map(([iconName]) => (
            <button
              key={iconName}
              onClick={() => onSelect(iconName)}
              title={iconName}
              className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition duration-150 ease-in-out border border-transparent hover:border-indigo-300 cursor-pointer"
            >
              {/* Use the DynamicIcon helper */}
              <DynamicIcon name={iconName} className="w-6 h-6 text-indigo-600 mb-1" />
              <span className="text-[11px] text-gray-700 truncate w-full text-center mt-1">
                {iconName}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 p-2 border-t pt-3">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex items-center px-4 py-2 text-sm bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </button>
          
          <span className="text-sm font-bold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex items-center px-4 py-2 text-sm bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default IconPicker;