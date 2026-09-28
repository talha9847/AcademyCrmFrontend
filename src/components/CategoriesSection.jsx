import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "../data/categories";

export default function CategoriesSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wider px-4 py-1.5 rounded-full ring-1 ring-black/5">
          CATEGORIES
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Explore Top Courses Categories
          <br />
          That Change Yourself
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group card-modern relative block h-64 overflow-hidden rounded-3xl shadow-sm"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                {cat.courses.length}{" "}
                {cat.courses.length === 1 ? "Course" : "Courses"}
              </span>
              <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white opacity-0 -translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                <ArrowUpRight size={18} />
              </span>

              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-extrabold text-white">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-white/75 line-clamp-2">
                  {cat.intro}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
