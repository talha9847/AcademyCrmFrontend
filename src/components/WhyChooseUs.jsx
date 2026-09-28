import { Heart, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Heart,
    title: "Flexible Classes",
    desc: "Choose timings that fit around your work, school, or personal commitments and learn at your own pace.",
    tone: "bg-pink-50 text-pink-500",
  },
  {
    icon: BookOpen,
    title: "Learn From Anywhere",
    desc: "Study from home or any convenient location — all you need is a device and an internet connection.",
    tone: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: GraduationCap,
    title: "Experienced Teachers",
    desc: "Practical knowledge and real-world skills in every session, with personalized guidance for every student.",
    tone: "bg-orange-50 text-orange-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image side with overlapping stat card */}
        <div className="relative mx-auto max-w-md lg:max-w-none">
          <img
            src="https://picsum.photos/id/180/700/560"
            alt="Your digital career starts here"
            className="w-full h-[380px] sm:h-[440px] object-cover rounded-[2rem] shadow-xl"
          />
          <div className="absolute -bottom-6 -left-6 sm:-left-10 bg-slate-900 text-white rounded-2xl shadow-xl px-6 py-5 max-w-[220px]">
            <p className="text-2xl font-extrabold text-orange-400">10+ Years</p>
            <p className="text-xs text-white/70 mt-1">
              Building industry-ready skills
            </p>
          </div>
        </div>

        {/* Copy side */}
        <div>
          <span className="inline-block bg-orange-50 text-orange-500 text-xs font-bold px-4 py-1.5 rounded-full">
            WHY CHOOSE US
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
            Creating A Community Of
            <br />
            Life Long Learners.
          </h2>

          <div className="mt-8 space-y-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className={`shrink-0 rounded-full p-3 ${f.tone}`}>
                  <f.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/about"
            className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-slate-900 text-white font-bold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            More About Us <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
