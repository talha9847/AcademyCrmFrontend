import { ArrowRight, CalendarDays } from "lucide-react";

// SAMPLE posts — replace with your real blog entries.
const POSTS = [
  { title: "5 Tips To Master Computer Skills Fast", date: "Sep 12, 2026" },
  {
    title: "Why Digital Marketing Is A Great Career Choice",
    date: "Sep 5, 2026",
  },
  {
    title: "How To Prepare For Your Tally Certification",
    date: "Aug 28, 2026",
  },
];

export default function PopularPosts() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="inline-block bg-pink-50 text-pink-500 text-xs font-bold tracking-wider px-4 py-1.5 rounded-full ring-1 ring-black/5">
              POSTS
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Popular Post.
            </h2>
          </div>
          <a
            href="/blog"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-slate-900 shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 hover:shadow-xl transition-all text-white font-bold px-6 py-3"
          >
            See All Posts <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <a
              key={post.title}
              href="/blog"
              className="group card-modern block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${encodeURIComponent(post.title)}/600/400`}
                  alt={post.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CalendarDays size={13} /> {post.date}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-orange-500">
                  {post.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
                  Read more{" "}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
