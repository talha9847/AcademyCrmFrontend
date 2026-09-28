import { ShieldCheck, Phone } from "lucide-react";

const LOGO_FALLBACK = "https://placehold.co/160x60/1e293b/ffffff?text=IICS";

export default function BrandStrip() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* Soft background glows */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-orange-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-56 w-72 rounded-full bg-indigo-100/70 blur-3xl" />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5">
        {/* Logo in a soft card */}
        <a
          href="/"
          className="shrink-0 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
        >
          <img
            src="/logo.png"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = LOGO_FALLBACK;
            }}
            alt="Ignite Institute of Computer Skills"
            className="h-10 sm:h-14 w-auto"
          />
        </a>

        {/* Title block */}
        <div className="flex-1 min-w-0 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-wide text-orange-600 ring-1 ring-orange-200">
            <ShieldCheck size={14} />
            An ISO 9001:2015 Certified
          </span>

          <h1 className="mt-2 text-lg sm:text-2xl md:text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-orange-500 bg-clip-text text-transparent [text-wrap:balance]">
            IGNITE INSTITUTE OF COMPUTER SKILLS
          </h1>

          <p className="mt-1 hidden sm:block text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
            Learn · Practice · Ignite · Succeed
          </p>
        </div>

        {/* Quick call card (replaces the duplicate logo) */}
        <a
          href="tel:+919727346487"
          className="hidden md:flex shrink-0 items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
            <Phone size={18} />
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] text-slate-500">Call us</span>
            <span className="block text-sm font-bold text-slate-900">
              +91 97273 46487
            </span>
          </span>
        </a>
      </div>

      {/* Accent line */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-indigo-500 to-slate-900" />
    </header>
  );
}
