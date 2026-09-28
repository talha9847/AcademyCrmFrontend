import { CalendarDays, Clock, MapPin } from "lucide-react";

const TEACHERS = [
  { name: "Teacher One", role: "Computer Application Trainer" },
  { name: "Teacher Two", role: "Digital Marketing Trainer" },
];

// SAMPLE events — replace with your real schedule.
const EVENTS = [
  {
    day: "05",
    month: "OCT",
    title: "Free Demo Class: Computer Basics",
    time: "10:00 AM",
    place: "Ignite Institute, Kosamba",
  },
  {
    day: "12",
    month: "OCT",
    title: "Career Guidance Session",
    time: "11:00 AM",
    place: "Ignite Institute, Kosamba",
  },
  {
    day: "20",
    month: "OCT",
    title: "Web Designing Workshop",
    time: "2:00 PM",
    place: "Ignite Institute, Kosamba",
  },
];

export default function UpcomingEvents() {
  return (
    <section>
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 py-20 text-center text-white">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

        <div className="relative px-6">
          <span className="inline-block bg-white/20 text-xs font-bold tracking-wide px-4 py-1.5 rounded-full uppercase">
            Stimulated To Take Part In?
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight">
            Upcoming Events
          </h2>

          <div className="mt-12 mx-auto max-w-5xl grid gap-5 md:grid-cols-3 text-left">
            {EVENTS.map((e) => (
              <article
                key={e.title}
                className="card-modern flex gap-4 rounded-3xl bg-white/10 p-5 ring-1 ring-white/25 backdrop-blur"
              >
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white text-slate-900">
                  <span className="text-xl font-extrabold leading-none">
                    {e.day}
                  </span>
                  <span className="mt-1 text-[11px] font-bold text-orange-500">
                    {e.month}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold leading-snug">{e.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
                    <Clock size={13} /> {e.time}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
                    <MapPin size={13} /> {e.place}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-white/70">
            <CalendarDays size={14} /> Sample events shown — replace with your
            schedule
          </p>
        </div>
      </div>

      <div className="bg-white py-20 text-center">
        <span className="inline-block bg-orange-50 text-orange-500 text-xs font-bold tracking-wider px-4 py-1.5 rounded-full ring-1 ring-black/5">
          OUR TEACHERS
        </span>

        <div className="mt-12 max-w-5xl mx-auto grid sm:grid-cols-2 gap-8 px-6">
          {TEACHERS.map((t) => (
            <div
              key={t.name}
              className="group card-modern rounded-3xl border border-gray-100 shadow-sm p-6 bg-white"
            >
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src={`https://picsum.photos/seed/${encodeURIComponent(t.name)}/500/320`}
                  alt={t.name}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-slate-900">{t.name}</h3>
              <p className="text-sm text-slate-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
