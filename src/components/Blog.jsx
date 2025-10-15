import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// --- Updated Static Data with Online Images ---
const BLOG_POSTS = [
  {
    title: "New Batch Starting: Full Stack Web Development",
    excerpt: "Join our comprehensive full stack development course starting next month. Limited seats available!",
    date: "October 1, 2025",
    category: "Announcements",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop", // Coding on screen
    slug: "full-stack-batch-start",
  },
  {
    title: "Success Story: From Student to Software Engineer",
    excerpt: "Read how our student Rahul landed his dream job at a top IT company after completing our training program.",
    date: "September 25, 2025",
    category: "Success Stories",
    image: "https://images.unsplash.com/photo-1596495578051-61695b282772?q=80&w=2070&auto=format&fit=crop", // Professional shaking hands
    slug: "rahul-success-story",
  },
  {
    title: "The PMKVY Certification Program is Now Open",
    excerpt: "Government-approved skill development program with free training and certification. Apply now for funded courses!",
    date: "September 15, 2025",
    category: "Programs",
    image: "https://images.unsplash.com/photo-1543269865-cbe425979929?q=80&w=2070&auto=format&fit=crop", // Certificate ceremony/graduation
    slug: "pmkvy-program-open",
  },
];
// ------------------------------------

export default function Blog() {
  const posts = BLOG_POSTS;

  return (
    // Section with a clean, slightly textured background
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section - Modern Typography */}
        <div className="text-center mb-14 md:mb-20">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold tracking-widest uppercase rounded-full text-blue-700 bg-blue-100 mb-3 shadow-sm">
            Insights & Updates
          </span>
          <h2 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">Latest Buzz</span> 📰
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the newest course launches, student achievements, and industry news.
          </p>
        </div>
        
        {/* Blog Posts Grid - Enhanced Gap and Responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <article
              key={index}
              // Card Styling: Elevated, clean white background, strong hover effect
              className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
            >
              <Link to={`/blog/${post.slug}`}>
                {/* Image Container - Aspect ratio for consistent height */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    // Image Hover Effect
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle gradient overlay for better text contrast if text were on image */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </div>
              </Link>

              {/* Content Area - Generous Padding */}
              <div className="p-6 md:p-8">
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  {/* Category Badge - Professional and Distinct */}
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  
                  {/* Date */}
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-2xl text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 mb-5 line-clamp-3">{post.excerpt}</p>
                
                {/* Read More Link */}
                <Link
                  to={`/blog/${post.slug}`}
                  // Link Hover Effect - Animated arrow
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold transition-all group-hover:gap-3.5 group-hover:text-indigo-700"
                >
                  Discover More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {/* View All Button (Optional but good practice) */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:bg-gray-700 border border-gray-900 hover:border-indigo-600"
          >
            View All Posts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}