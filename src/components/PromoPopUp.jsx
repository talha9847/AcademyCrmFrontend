import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const POPUP_DELAY_MS = 30000; // 30 seconds
// Dummy placeholder — swap for your real "Admission Open" creative.
const PROMO_IMAGE = "https://picsum.photos/id/1025/700/500";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  // While open: Esc closes, page behind doesn't scroll, focus lands on the close button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="promo-backdrop fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Admission open promotion"
      onClick={() => setOpen(false)}
    >
      <style>{`
        @keyframes promoFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes promoPop { from { opacity: 0; transform: translateY(20px) scale(.95); } to { opacity: 1; transform: none; } }
        .promo-backdrop { animation: promoFade .3s ease both; }
        .promo-card { animation: promoPop .4s cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .promo-backdrop, .promo-card { animation: none; } }
      `}</style>

      <div
        className="promo-card relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 hover:bg-orange-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
        <img
          src={PROMO_IMAGE}
          alt="Admission open — enroll now"
          className="w-full h-auto object-cover"
        />
        <div className="p-6 text-center">
          <p className="text-xl font-extrabold text-slate-900">
            Admission Open — Limited Seats!
          </p>
          <a
            href="/enroll"
            className="mt-4 inline-block bg-gradient-to-r from-orange-500 to-slate-900 shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 hover:shadow-xl transition-all text-white font-bold px-8 py-3 rounded-xl"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
}
