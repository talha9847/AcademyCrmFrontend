import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Clock, ChevronDown, ChevronUp } from "lucide-react";

// The first three (with codes and fees) are from your live site; the rest use the course
// names shown on your hero banner, with fees left as "Contact for fees" until you add them.
const ALL_COURSES = [
  {
    id: "dca",
    code: "M-DCA-5433",
    title: "Diploma In Computer Application",
    price: "₹25,000",
    duration: "1 Year",
    category: "COMPUTER COURSE",
    slug: "computer-course",
    reviews: 0,
  },
  {
    id: "dptt",
    code: "M-DPTT-6285",
    title: "Diploma In Primary Teacher Training",
    price: "₹25,000",
    duration: "1 Year",
    category: "COMPUTER COURSE",
    slug: "computer-course",
    reviews: 0,
  },
  {
    id: "doadp",
    code: "M-DOA&DP-6466",
    title: "Diploma In Office Automation & Desktop Publishing",
    price: "₹22,500",
    duration: "1 Year",
    category: "COMPUTER COURSE",
    slug: "office-automation",
    reviews: 0,
  },
  {
    id: "adca",
    title: "Advanced Diploma In Computer Application",
    price: null,
    duration: null,
    category: "COMPUTER COURSE",
    slug: "computer-course",
    reviews: 0,
  },
  {
    id: "msoffice",
    title: "MS-Office",
    price: null,
    duration: null,
    category: "COMPUTER COURSE",
    slug: "computer-course",
    reviews: 0,
  },
  {
    id: "web",
    title: "Web Designing",
    price: null,
    duration: null,
    category: "WEB DESIGNING",
    slug: "web-designing",
    reviews: 0,
  },
  {
    id: "dm",
    title: "Digital Marketing",
    price: null,
    duration: null,
    category: "DIGITAL MARKETING",
    slug: "digital-marketing",
    reviews: 0,
  },
  {
    id: "tally",
    title: "Tally",
    price: null,
    duration: null,
    category: "TALLY & ACCOUNTING",
    slug: "tally-accounting",
    reviews: 0,
  },
  {
    id: "typing",
    title: "Typing",
    price: null,
    duration: null,
    category: "TYPING",
    slug: "typing",
    reviews: 0,
  },
];

const STEP = 3;

function StarRow({ count = 0 }) {
  return (
    <div className="flex items-center gap-0.5 text-orange-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < count ? "currentColor" : "none"} />
      ))}
      <span className="ml-1.5 text-xs text-slate-400">
        {count === 0 ? "No reviews yet" : `(${count} Reviews)`}
      </span>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <article className="group card-modern flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img
          src={`https://picsum.photos/seed/${course.id}/700/420`}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        {course.duration && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
            <Clock size={13} /> {course.duration}
          </span>
        )}
        {course.code && (
          <span className="absolute bottom-3 left-4 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold text-white">
            {course.code}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <StarRow count={course.reviews} />
        <h3 className="mt-3 text-lg font-extrabold leading-snug text-slate-900 line-clamp-2">
          {course.title}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500">
          In{" "}
          <span className="font-semibold text-indigo-600">
            {course.category}
          </span>
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-dashed border-slate-200 pt-5">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Course fee
            </p>
            {course.price ? (
              <p className="text-2xl font-extrabold text-slate-900">
                {course.price}
              </p>
            ) : (
              <p className="text-sm font-semibold text-slate-500">
                Contact for fees
              </p>
            )}
          </div>
          <Link
            to={`/category/${course.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-orange-500"
          >
            Learn More
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CoursesSection() {
  const [visible, setVisible] = useState(STEP);
  const remaining = ALL_COURSES.length - visible;
  const allShown = remaining <= 0;

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wider px-4 py-1.5 rounded-full ring-1 ring-black/5">
          TOP POPULAR COURSE
        </span>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {ALL_COURSES.slice(0, visible).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>

        {ALL_COURSES.length > STEP && (
          <button
            onClick={() =>
              setVisible(
                allShown ? STEP : (v) => Math.min(v + STEP, ALL_COURSES.length),
              )
            }
            className="mt-12 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-slate-900 px-16 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl md:w-auto"
          >
            {allShown ? (
              <>
                Show Fewer Courses <ChevronUp size={18} />
              </>
            ) : (
              <>
                Load More Courses ({remaining} more) <ChevronDown size={18} />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
