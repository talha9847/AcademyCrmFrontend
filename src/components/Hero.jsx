import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Two full-screen banner slides — each image already contains its own
// headline/course/contact graphics (like the site's real banner creative),
// so this component just handles the slideshow mechanics: autoplay, manual
// prev/next, and dot indicators. Swap these URLs for your real banner images.
const SLIDES = [
  {
    image: "https://picsum.photos/id/1005/1920/900",
    alt: "Skill development courses — learn today, lead tomorrow",
  },
  {
    image: "https://picsum.photos/id/180/1920/900",
    alt: "Career-ready training — 100% job assistance",
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  return (
    <section className="relative overflow-hidden w-full">
      {/* Stacked full-width banner images, cross-faded between slides */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
        {SLIDES.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt={s.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Prev / next controls */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-white/90 shadow flex items-center justify-center text-slate-700 hover:bg-white"
      >
        <ChevronLeft />
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-white/90 shadow flex items-center justify-center text-slate-700 hover:bg-white"
      >
        <ChevronRight />
      </button>

      {/* Slide indicator dots */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-orange-500" : "w-2 bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
