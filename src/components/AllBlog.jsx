import { Calendar, ArrowRight, Search, ListFilter } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Re-use and extend the static data for a full view
const ALL_BLOG_POSTS = [
  {
    title: "New Batch Starting: Full Stack Web Development",
    excerpt:
      "Join our comprehensive full stack development course starting next month. Limited seats available!",
    date: "October 1, 2025",
    category: "Announcements",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    slug: "full-stack-batch-start",
  },
  {
    title: "Success Story: From Student to Software Engineer",
    excerpt:
      "Read how our student Rahul landed his dream job at a top IT company after completing our training program.",
    date: "September 25, 2025",
    category: "Success Stories",
    image:
      "https://res.cloudinary.com/dk02a9iu6/image/upload/v1708944461/website-images/bacexnbe7gbmhjkkwog3.png",
    slug: "rahul-success-story",
  },
  {
    title: "The PMKVY Certification Program is Now Open",
    excerpt:
      "Government-approved skill development program with free training and certification. Apply now for funded courses!",
    date: "September 15, 2025",
    category: "Programs",
    image:
      "https://algocademy.com/blog/wp-content/uploads/2024/09/51df8d23thumbnail.jpeg",
    slug: "pmkvy-program-open",
  },
  {
    title: "Top 5 JavaScript Frameworks to Learn in 2026",
    excerpt:
      "A breakdown of the most in-demand front-end and back-end frameworks like React, Vue, Next.js, and Node.",
    date: "September 1, 2025",
    category: "Tech Guides",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    slug: "top-5-javascript-frameworks",
  },
  {
    title: "Mastering Data Structures and Algorithms",
    excerpt:
      "Tips and resources for acing your technical interviews by strengthening your DSA knowledge.",
    date: "August 20, 2025",
    category: "Career Tips",
    image:
      "https://i.pinimg.com/736x/50/dc/61/50dc6172cca59b64bd488234ec53b54d.jpg",
    slug: "mastering-dsa",
  },
  {
    title: "Upcoming Webinar: Acing Your First Job Interview",
    excerpt:
      "Register for our free session on crafting the perfect resume and confidently answering behavioral questions.",
    date: "August 5, 2025",
    category: "Announcements",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHXlhDJlJbJBXcEfmdVvi6_Ki85as2k9vdfA&s",
    slug: "webinar-job-interview",
  },
];

const CATEGORIES = [
  "All",
  "Announcements",
  "Success Stories",
  "Programs",
  "Tech Guides",
  "Career Tips",
];

export function AllBlogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [data, setData] = useState([]);

  const getAllBlogs = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/front/getAllBlogs",
        { withCredentials: true }
      );
      if (result.status == 200) {
        setData(result.data.data);
        console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const filteredPosts = data
    .filter(
      (post) => activeCategory === "All" || post.category === activeCategory
    )
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Full Blog Header */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
              The Blog Archive
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            Your complete source for all course updates, student journeys, and
            tech insights from our community.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-sm transition duration-200"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-lg font-medium text-gray-700 border-b pb-4">
          Showing {filteredPosts.length}{" "}
          {filteredPosts.length === 1 ? "article" : "articles"} in{" "}
          {activeCategory}
        </div>

        {/* Blog Posts Grid - Two-Column Layout for Full Page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {filteredPosts.map((post, index) => (
            <article
              key={index}
              className="flex flex-col md:flex-row gap-6 p-4 rounded-xl transition-all duration-300 hover:bg-slate-50 border border-transparent hover:border-indigo-100 group"
            >
              {/* Image Container */}
              <Link
                to={`/blog/${post.slug}`}
                className="block w-full md:w-2/5 flex-shrink-0"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="w-full md:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm mb-2">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-medium text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-extrabold text-2xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold transition-all group-hover:gap-3 group-hover:text-purple-700 mt-auto"
                >
                  Continue Reading
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <div className="lg:col-span-2 text-center py-10">
              <p className="text-2xl text-gray-500">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination Placeholder (In a real app, this would be functional) */}
        {filteredPosts.length > 5 && (
          <div className="flex justify-center mt-16">
            <div className="flex gap-2">{/* ... Pagination Buttons ... */}</div>
          </div>
        )}
      </div>
    </section>
  );
}

// export default AllBlogs; // Use this line if you want to export it as default
