import axios from "axios";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Blog() {
  const [data, setData] = useState([]);
  const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const getBlogs = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/front/getBlogs`, {
        withCredentials: true,
      });
      if (result.status == 200) {
        setData(result.data.data);
        console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full text-indigo-700 bg-indigo-100 mb-2 shadow-sm">
            Knowledge Hub
          </span>
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-3">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
              Latest Reads
            </span>{" "}
            <BookOpen className="inline w-10 h-10 align-middle text-indigo-500" />
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Deep dives, success stories, and essential updates to power your
            career journey.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col"
            >
              <Link to={`/blog/${post.slug}`}>
                {/* CHANGE 3: Changed aspect-[16/10] to aspect-[4/3] for smaller image height */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-15 transition-opacity"></div>
                </div>
              </Link>

              {/* Content Area - Uses Flexbox for bottom alignment of link */}
              {/* CHANGE 4: Reduced padding from p-6 md:p-8 to p-5 md:p-6 */}
              <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                {/* Top Content Group */}
                <div className="flex-grow">
                  {/* Meta Info - Reduced category padding slightly */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-500 text-sm">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Title - Reduced text size from text-2xl to text-xl */}
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="font-extrabold text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt - Reduced mb from mb-5 to mb-4 */}
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More Link (Pushed to the bottom) */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-indigo-600 text-sm font-semibold transition-all group-hover:gap-3 group-hover:text-purple-700 mt-auto"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 rounded-full font-bold text-base text-white transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 transform hover:scale-[1.02]"
          >
            Explore All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
