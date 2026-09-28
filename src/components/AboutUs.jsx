import {
  Heart,
  BookOpen,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Layers,
  Briefcase,
} from "lucide-react";

const FEATURES = [
  {
    icon: Heart,
    title: "Flexible Classes",
    desc: "Flexible classes are available in our computer courses to suit your schedule. Choose timings that fit around your work, school, or personal commitments and learn at your own pace without feeling rushed. It makes it easier for anyone to upgrade their computer skills conveniently.",
    tone: "bg-pink-50 text-pink-500",
  },
  {
    icon: BookOpen,
    title: "Learn From Anywhere",
    desc: "Study from home or any convenient location — all you need is a device and an internet connection to access lessons and practice materials. This flexibility helps you balance learning with your daily routine, making skill development easier, faster, and more comfortable.",
    tone: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: GraduationCap,
    title: "Experienced Teachers",
    desc: "Our classes are led by experienced teachers who bring practical knowledge and real-world skills to every session. They explain concepts clearly and provide personalized guidance, so you build confidence and improve your computer skills quickly.",
    tone: "bg-orange-50 text-orange-500",
  },
];

const FACTS = [
  { icon: ShieldCheck, value: "ISO 9001:2015", label: "Certified institute" },
  { icon: Layers, value: "14 Courses", label: "Computer category" },
  { icon: Briefcase, value: "100%", label: "Job assistance" },
];

export default function AboutUs() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-50" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-50 translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* Dancing image collage (stays in view while the long copy scrolls on desktop) */}
        <div className="lg:sticky lg:top-28">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none h-[460px] sm:h-[540px]">
            <style>{`
              @keyframes danceA { 0%,100% { transform: translate(0,0) rotate(-2deg); } 50% { transform: translate(8px,-18px) rotate(2deg); } }
              @keyframes danceB { 0%,100% { transform: translate(0,0) rotate(0deg) scale(1); } 33% { transform: translate(-14px,10px) rotate(12deg) scale(1.06); } 66% { transform: translate(10px,-12px) rotate(-10deg) scale(.96); } }
              @keyframes danceC { 0%,100% { transform: translate(0,0) rotate(2deg); } 50% { transform: translate(-10px,16px) rotate(-2deg); } }
              @keyframes danceD { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
              .dance-a { animation: danceA 5s ease-in-out infinite; }
              .dance-b { animation: danceB 4s ease-in-out infinite; }
              .dance-c { animation: danceC 6s ease-in-out infinite; }
              .dance-d { animation: danceD 3s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) { .dance-a,.dance-b,.dance-c,.dance-d { animation: none; } }
            `}</style>

            <img
              src="https://picsum.photos/id/1074/500/660"
              alt="About Ignite Institute of Computer Skills"
              className="dance-a absolute left-0 top-0 w-[46%] aspect-[3/4] object-cover rounded-2xl shadow-xl"
            />
            <img
              src="https://picsum.photos/id/1062/300/300"
              alt="About us community"
              className="dance-b absolute right-[6%] top-[10%] h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white shadow-xl"
            />
            <img
              src="https://picsum.photos/id/1076/500/660"
              alt="Who we are"
              className="dance-c absolute left-[24%] bottom-0 w-[50%] aspect-[3/4] object-cover rounded-2xl border-4 border-white shadow-2xl"
            />

            <div className="dance-d absolute right-0 bottom-8 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
              <span className="rounded-full bg-orange-500 text-white p-2.5">
                <ShieldCheck size={20} />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900 leading-none">
                  ISO 9001:2015
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Certified Institute
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <span className="inline-block bg-orange-50 text-orange-500 text-xs font-bold tracking-wider px-4 py-1.5 rounded-full ring-1 ring-black/5">
            KNOW ABOUT US
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Know About Histudy
            <br />
            <span className="text-orange-500">Learning Platform</span>
          </h2>

          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Our approach is to provide rigorous theoretical training while
              teaching our students extensive practical skills. We make every
              effort to prepare our students to face the challenges of today's
              rapidly evolving information technology marketplace. Our training
              manuals and exercise materials are very effective in enhancing
              students' knowledge and skills base.
            </p>
            <p>
              Students can take any of our courses separately or combine several
              of them to achieve higher levels of proficiency in information
              technology. Our instructors are not just experienced teachers,
              they are team leaders and senior technical developers who
              themselves mentor and coach new employees and consultants hired on
              their projects.
            </p>
            <p>
              We are committed to providing the best professional education to
              our students and to turn them into knowledgeable and successful
              information technology professionals. For that reason our company
              invests in new facilities, the latest software and newest
              hardware, and hires talented teachers and assistants.
            </p>
          </div>

          {/* Quick facts */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FACTS.map((f) => (
              <div
                key={f.value}
                className="rounded-2xl bg-slate-50 px-4 py-4 flex items-center gap-3"
              >
                <span className="shrink-0 rounded-xl bg-white shadow-sm text-orange-500 p-2.5">
                  <f.icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900 leading-none">
                    {f.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{f.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="mt-10 space-y-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`card-modern flex gap-5 rounded-3xl p-6 ${i === 0 ? "bg-white shadow-lg ring-1 ring-black/5" : "bg-white/70 ring-1 ring-black/5"}`}
              >
                <div
                  className={`shrink-0 h-14 w-14 rounded-full flex items-center justify-center ${f.tone}`}
                >
                  <f.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/about"
            className="mt-10 flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-orange-500 to-slate-900 text-white font-bold py-4 shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            More About Us <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
