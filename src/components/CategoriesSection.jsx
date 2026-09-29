import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "../data/categories";

export default function CategoriesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Label */}
        <span
          className="
          inline-block
          rounded-full
          bg-indigo-50
          px-4 py-1.5
          text-xs font-bold
          tracking-wider
          text-indigo-600
          ring-1 ring-black/5
        "
        >
          PROGRAMMES
        </span>

        {/* Heading */}
        <h2
          className="
          mt-4
          text-3xl font-extrabold
          tracking-tight text-slate-900
          md:text-4xl
        "
        >
          Explore Our Courses
          <br />
          For Future Skills
        </h2>

        <p
          className="
          mx-auto mt-4
          max-w-2xl
          text-slate-500
        "
        >
          Choose from degree, diploma, certificate and short-term programmes
          designed around modern technology skills.
        </p>

        {/* Categories */}
        <div
          className="
          mt-14
          grid grid-cols-1
          gap-6
          text-left
          sm:grid-cols-2
        "
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="
                group
                relative block
                h-72
                overflow-hidden
                rounded-3xl
                shadow-sm
                ring-1 ring-slate-200
              "
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="
                  absolute inset-0
                  h-full w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              {/* Overlay */}
              <div
                className="
                absolute inset-0
                bg-gradient-to-t
                from-slate-950/95
                via-slate-900/45
                to-transparent
              "
              />

              {/* Course count */}
              <span
                className="
                absolute left-4 top-4
                rounded-full
                bg-white/95
                px-3 py-1
                text-xs font-bold
                text-slate-900
              "
              >
                {cat.courses.length}{" "}
                {cat.courses.length === 1 ? "Course" : "Courses"}
              </span>

              {/* Arrow */}
              <span
                className="
                absolute right-4 top-4
                flex h-10 w-10
                translate-y-[-4px]
                items-center justify-center
                rounded-full
                bg-orange-500
                text-white
                opacity-0
                transition-all
                duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
              "
              >
                <ArrowUpRight size={18} />
              </span>

              {/* Content */}
              <div
                className="
                absolute bottom-0
                left-0 right-0
                p-6
              "
              >
                <h3
                  className="
                  text-2xl
                  font-extrabold
                  text-white
                "
                >
                  {cat.name}
                </h3>

                <p
                  className="
                  mt-2
                  line-clamp-2
                  text-sm
                  leading-relaxed
                  text-white/75
                "
                >
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
