import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// SAMPLE testimonials — replace with real student feedback.
const TESTIMONIALS = [
  {
    quote:
      "The trainers explained every concept clearly and the practical sessions helped me land my first job.",
    name: "Aarav Patel",
    role: "DCA Graduate",
    img: "https://picsum.photos/id/64/120/120",
  },
  {
    quote:
      "Flexible timings let me learn alongside my job, and the trainers were always ready to help.",
    name: "Riya Shah",
    role: "Web Designing Student",
    img: "https://picsum.photos/id/65/120/120",
  },
  {
    quote:
      "The hands-on Tally sessions made accounting practical and easy to follow.",
    name: "Karan Mehta",
    role: "Tally Student",
    img: "https://picsum.photos/id/91/120/120",
  },
];

const PARTNERS = [
  "Partner One",
  "Partner Two",
  "Partner Three",
  "Partner Four",
  "Partner Five",
];
const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];
  const go = (dir) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Re-armed after every change, so a manual click restarts the countdown.
  useEffect(() => {
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <section className="relative bg-white py-20">
      <style>{`
        @keyframes tFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .t-fade { animation: tFade .6s ease both; }
        @media (prefers-reduced-motion: reduce) { .t-fade { animation: none; } }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="inline-block bg-orange-50 text-orange-500 text-xs font-bold tracking-wider px-4 py-1.5 rounded-full ring-1 ring-black/5">
          EDUCATION FOR EVERYONE
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug">
          People like histudy education.
          <br />
          No joking – here's the proof!
        </h2>

        <button
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="hidden md:flex absolute left-4 top-[48%] -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-md ring-1 ring-black/5 items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="hidden md:flex absolute right-4 top-[48%] -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-md ring-1 ring-black/5 items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
        >
          <ChevronRight />
        </button>

        <figure
          key={index}
          className="t-fade relative mt-14 mx-auto max-w-2xl rounded-3xl bg-slate-50 p-8 sm:p-10 shadow-sm ring-1 ring-black/5"
        >
          <Quote className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-orange-500 p-2.5 text-white shadow-lg" />
          <blockquote className="text-lg text-slate-600 leading-relaxed">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <img
              src={t.img}
              alt={t.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow"
            />
            <span className="text-left text-sm font-bold text-slate-900">
              {t.name}
              <span className="block font-normal text-slate-500">{t.role}</span>
            </span>
          </figcaption>
        </figure>

        {/* Prev / dots / next (arrows here are the mobile controls) */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="md:hidden rounded-full bg-slate-100 p-2"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-orange-500" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="md:hidden rounded-full bg-slate-100 p-2"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-16 flex items-center gap-6">
          <hr className="hidden sm:block flex-1 border-slate-200" />
          <p className="flex-1 sm:flex-none text-base sm:text-lg font-medium text-slate-800">
            Trusted by <span className="text-orange-500">industry leaders</span>{" "}
            and <span className="text-orange-500">valued partners</span>{" "}
            worldwide
          </p>
          <hr className="hidden sm:block flex-1 border-slate-200" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {PARTNERS.map((p) => (
            <img
              key={p}
              src={`https://placehold.co/140x48/e2e8f0/64748b?text=${encodeURIComponent(p)}`}
              alt={p}
              className="h-10 w-auto rounded-lg opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
