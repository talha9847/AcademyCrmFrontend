import { useState } from "react";
import { Plus, MessageCircle } from "lucide-react";

const FAQS = [
  {
    q: "What courses do you offer?",
    a: "We offer diplomas in Computer Application, Teacher Training, Office Automation, Tally, Web Designing and Digital Marketing.",
  },
  {
    q: "Do you provide job assistance?",
    a: "Yes, all our diploma courses include placement guidance and job assistance.",
  },
  {
    q: "Can I learn from home?",
    a: "Yes, our courses are flexible and can be taken online from anywhere with an internet connection.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-50 py-20">
      <style>{`
        @keyframes faqFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .faq-float-a { animation: faqFloat 5s ease-in-out infinite; }
        .faq-float-b { animation: faqFloat 6s ease-in-out infinite reverse; }
        @media (prefers-reduced-motion: reduce) { .faq-float-a, .faq-float-b { animation: none; } }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-pink-50 text-pink-500 text-xs font-bold tracking-wider px-4 py-1.5 rounded-full ring-1 ring-black/5">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug">
            Got a question?
            <br />
            We're here to help
          </h2>

          <div className="mt-10 space-y-3">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl bg-white ring-1 transition-shadow ${isOpen ? "shadow-md ring-orange-200" : "shadow-sm ring-black/5 hover:shadow-md"}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900"
                  >
                    {item.q}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-orange-500 text-white" : "bg-slate-100 text-slate-600"}`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="https://wa.me/919727346487?text=Hello!%20I%20have%20a%20question%20about%20your%20courses."
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all hover:-translate-y-0.5"
          >
            <MessageCircle size={18} /> Still have questions? Chat with us
          </a>
        </div>

        <div className="relative hidden lg:block h-[520px]">
          <img
            src="https://picsum.photos/id/338/300/300"
            alt="Students"
            className="faq-float-a absolute top-0 right-0 w-64 aspect-square object-cover rounded-3xl shadow-lg"
          />
          <img
            src="https://picsum.photos/id/342/500/600"
            alt="Man smiling"
            className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-[420px] object-cover rounded-3xl shadow-2xl ring-4 ring-white"
          />
          <img
            src="https://picsum.photos/id/1027/300/300"
            alt="Student"
            className="faq-float-b absolute bottom-0 left-0 w-52 aspect-square object-cover rounded-3xl shadow-lg ring-4 ring-white"
          />
        </div>
      </div>
    </section>
  );
}
