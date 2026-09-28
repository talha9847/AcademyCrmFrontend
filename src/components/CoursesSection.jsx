import { useState } from "react";
import { Star, ArrowRight } from "lucide-react";

const ALL_COURSES = [
  {
    code: "M-DCA-5433",
    title: "Diploma In Computer Application",
    price: "₹25,000",
    duration: "1 YEAR",
    category: "COMPUTER COURSE",
    reviews: 0,
  },
  {
    code: "M-DPTT-6285",
    title: "Diploma In Primary Teacher Training",
    price: "₹25,000",
    duration: "1 YEAR",
    category: "COMPUTER COURSE",
    reviews: 0,
  },
  {
    code: "M-DOA&DP-6466",
    title: "Diploma In Office Automation & Desktop Publishing",
    price: "₹22,500",
    duration: "1 YEAR",
    category: "COMPUTER COURSE",
    reviews: 0,
  },
];

function StarRow({ count = 0 }) {
  return (
    <div className="flex items-center gap-1 text-orange-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < count ? "currentColor" : "none"} />
      ))}
      <span className="text-xs text-slate-400 ml-1">({count} Reviews)</span>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-br from-slate-900 to-orange-500 h-44 flex items-center justify-center">
        <span className="bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-full">
          {course.duration}
        </span>
      </div>
      <div className="p-5">
        <StarRow count={course.reviews} />
        <h3 className="mt-2 font-extrabold text-slate-900 uppercase leading-snug">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          In <span className="font-medium">{course.category}</span>
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-800">
            {course.price}
          </span>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-slate-800"
          >
            Learn More <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CoursesSection() {
  const [visible, setVisible] = useState(3);

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full">
          TOP POPULAR COURSE
        </span>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
          {ALL_COURSES.slice(0, visible).map((c) => (
            <CourseCard key={c.code} course={c} />
          ))}
        </div>

        {visible < ALL_COURSES.length && (
          <button
            onClick={() => setVisible((v) => v + 3)}
            className="mt-10 w-full md:w-auto md:px-16 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-slate-900 text-white font-bold"
          >
            Load More Courses →
          </button>
        )}
      </div>
    </section>
  );
}
