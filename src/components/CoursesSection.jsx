import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const ALL_COURSES = [
  {
    id: "bca-ai-ml",
    title: "BCA (AI-ML)",
    category: "DEGREE PROGRAMMES",
    duration: "3/4 Years",
    eligibility: "12th Pass",
    slug: "degree-programmes",
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "bca-data-science",
    title: "BCA (Data Science)",
    category: "DEGREE PROGRAMMES",
    duration: "3/4 Years",
    eligibility: "12th Pass",
    slug: "degree-programmes",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "bca-full-stack",
    title: "BCA (Full Stack Development)",
    category: "DEGREE PROGRAMMES",
    duration: "3/4 Years",
    eligibility: "12th Pass",
    slug: "degree-programmes",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "diploma-ai-ml",
    title: "Diploma in AI-ML",
    category: "DIPLOMA / P.G DIPLOMA",
    duration: "12 Months",
    eligibility: "12th Pass",
    slug: "diploma-programmes",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "diploma-data-science",
    title: "Diploma in Data Science",
    category: "DIPLOMA / P.G DIPLOMA",
    duration: "12 Months",
    eligibility: "12th Pass",
    slug: "diploma-programmes",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "diploma-web-development",
    title: "Diploma in Web Development",
    category: "DIPLOMA / P.G DIPLOMA",
    duration: "12 Months",
    eligibility: "12th Pass",
    slug: "diploma-programmes",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "diploma-cyber-security",
    title: "Diploma in Cyber Security",
    category: "DIPLOMA / P.G DIPLOMA",
    duration: "12 Months",
    eligibility: "12th Pass",
    slug: "diploma-programmes",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "certificate-data-science",
    title: "Certificate in Data Science",
    category: "CERTIFICATE PROGRAMMES",
    duration: "6 Months",
    eligibility: "10th Pass",
    slug: "certificate-programmes",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "certificate-full-stack",
    title: "Certificate in Full Stack Development",
    category: "CERTIFICATE PROGRAMMES",
    duration: "6 Months",
    eligibility: "10th Pass",
    slug: "certificate-programmes",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "ethical-hacker",
    title: "Certified Ethical Hacker",
    category: "SHORT-TERM CERTIFICATE COURSE",
    duration: "3 Months",
    eligibility: "10th Pass",
    slug: "short-term-courses",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "python",
    title: "Programming With Python",
    category: "SHORT-TERM CERTIFICATE COURSE",
    duration: "2 Months",
    eligibility: "10th Pass",
    slug: "short-term-courses",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },

  {
    id: "junior-software-developer",
    title: "Junior Software Developer",
    category: "SHORT-TERM CERTIFICATE COURSE",
    duration: "3 Months",
    eligibility: "10th Pass",
    slug: "short-term-courses",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    reviews: 0,
  },
];

const STEP = 6;

function StarRow({ count = 0 }) {
  return (
    <div className="flex items-center text-orange-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < count ? "currentColor" : "none"} />
      ))}

      <span className="ml-1.5 text-xs text-slate-400">
        {count === 0 ? "No reviews yet" : `(${count} Reviews)`}
      </span>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/1200x700/e2e8f0/475569?text=Course+Image";
          }}
          className="
            h-full w-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        <div
          className="
          absolute inset-0
          bg-gradient-to-t
          from-slate-900/70
          via-slate-900/10
          to-transparent
        "
        />

        {/* Course type */}
        <span
          className="
          absolute left-4 top-4
          rounded-full
          bg-white/95
          px-3 py-1.5
          text-xs font-bold
          text-slate-900
          shadow-lg
        "
        >
          {course.duration}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <StarRow count={course.reviews} />

        <h3
          className="
          mt-3
          line-clamp-2
          text-lg font-extrabold
          leading-snug
          text-slate-900
          transition-colors duration-300
          group-hover:text-orange-500
        "
        >
          {course.title}
        </h3>

        <p className="mt-2 text-xs text-slate-500">{course.category}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Duration
            </p>
            <p className="mt-1 text-sm font-bold text-slate-800">
              {course.duration}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Eligibility
            </p>
            <p className="mt-1 text-sm font-bold text-slate-800">
              {course.eligibility}
            </p>
          </div>
        </div>

        <div
          className="
          mt-auto
          flex items-center justify-between
          border-t border-dashed border-slate-200
          pt-5
          mt-5
        "
        >
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">
              Course Fee
            </p>

            <p className="text-lg font-extrabold text-slate-900">Contact us</p>
          </div>

          <Link
            to={`/category/${course.slug}`}
            className="
              inline-flex items-center gap-2
              rounded-full
              bg-slate-900
              px-4 py-2.5
              text-sm font-semibold text-white
              transition-all duration-300
              group-hover:bg-orange-500
            "
          >
            View Course
            <ArrowRight
              size={14}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CoursesSection() {
  const [visible, setVisible] = useState(STEP);

  const remaining = ALL_COURSES.length - visible;
  const allShown = remaining <= 0;

  const handleLoadMore = () => {
    if (allShown) {
      setVisible(STEP);
    } else {
      setVisible((value) => Math.min(value + STEP, ALL_COURSES.length));
    }
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Section label */}
        <span
          className="
          inline-block
          rounded-full
          bg-orange-50
          px-4 py-1.5
          text-xs font-bold
          tracking-wider
          text-orange-600
          ring-1 ring-orange-100
        "
        >
          TOP COURSES
        </span>

        <h2
          className="
          mt-4
          text-3xl font-extrabold
          tracking-tight text-slate-900
          md:text-4xl
        "
        >
          Explore Our Future Skills Courses
        </h2>

        <p
          className="
          mx-auto mt-4
          max-w-2xl
          text-slate-500
        "
        >
          Build industry-relevant skills through degree, diploma, certificate
          and short-term programmes.
        </p>

        {/* Course Grid */}
        <div
          className="
          mt-12
          grid gap-6
          text-left
          sm:grid-cols-2
          lg:grid-cols-3
        "
        >
          {ALL_COURSES.slice(0, visible).map((course, index) => (
            <div
              key={course.id}
              className="animate-[fadeInUp_0.6s_ease-out_both]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Load More */}
        {ALL_COURSES.length > STEP && (
          <button
            type="button"
            onClick={handleLoadMore}
            className="
              mt-12
              inline-flex w-full
              items-center justify-center gap-2
              rounded-xl
              bg-gradient-to-r
              from-orange-500
              to-slate-900
              px-16 py-4
              font-bold text-white
              shadow-lg shadow-orange-500/20
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              md:w-auto
            "
          >
            {allShown ? (
              <>
                Show Fewer Courses
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                Load More Courses ({remaining} more)
                <ChevronDown size={18} />
              </>
            )}
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
