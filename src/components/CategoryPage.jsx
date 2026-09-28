import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BadgeIndianRupee,
  MessageCircle,
  GraduationCap,
} from "lucide-react";
import { CATEGORIES, getCategory } from "../data/categories";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug);

  if (!category) {
    return (
      <section className="py-32 text-center px-6">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Category not found
        </h1>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-indigo-600 font-medium"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
      </section>
    );
  }

  const others = CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <img
          src={category.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-orange-500/30" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <nav className="text-sm text-white/70 flex items-center gap-2">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>Categories</span>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight">
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 leading-relaxed">
            {category.intro}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
            <GraduationCap size={16} /> {category.courses.length}{" "}
            {category.courses.length === 1 ? "course" : "courses"} available
          </span>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_300px] gap-10 items-start">
          {/* Course details */}
          <div className="grid sm:grid-cols-2 gap-6">
            {category.courses.map((course) => (
              <article
                key={course.name}
                className="card-modern flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                {course.code && (
                  <span className="self-start rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                    {course.code}
                  </span>
                )}
                <h2 className="mt-3 text-lg font-extrabold text-slate-900 leading-snug">
                  {course.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {course.desc}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={14} /> Duration
                    </dt>
                    <dd className="mt-1 font-bold text-slate-900">
                      {course.duration}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                      <BadgeIndianRupee size={14} /> Fees
                    </dt>
                    <dd className="mt-1 font-bold text-slate-900">
                      {course.fees}
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex gap-3 pt-6">
                  <Link
                    to="/enroll"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-slate-900 py-3 text-sm font-bold text-white"
                  >
                    Enroll Now <ArrowRight size={16} />
                  </Link>
                  <a
                    href={`https://wa.me/919727346487?text=${encodeURIComponent(`Hello! I'd like details about ${course.name}.`)}`}
                    aria-label={`Ask about ${course.name} on WhatsApp`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-white"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Other categories */}
          <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-28">
            <h3 className="font-extrabold text-slate-900">Other categories</h3>
            <ul className="mt-4 space-y-1">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/category/${c.slug}`}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {c.name} <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600"
            >
              <ArrowLeft size={14} /> Back to home
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
