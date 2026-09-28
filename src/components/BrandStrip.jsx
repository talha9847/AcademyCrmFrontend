export default function BrandStrip() {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 gap-4">
      <img
        src="/logo.png"
        alt="Ignite Institute of Computer Skills"
        className="h-12 sm:h-16 w-auto shrink-0"
      />
      <div className="text-center flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-slate-900">
          An ISO 9001:2015 Certified
        </p>
        <h1 className="text-lg sm:text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight truncate sm:whitespace-normal">
          IGNITE INSTITUTE OF COMPUTER SKILLS
        </h1>
      </div>
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className="hidden sm:block h-12 sm:h-16 w-auto shrink-0"
      />
    </div>
  );
}
