import { useState } from "react";
import {
  MessageCircle,
  Phone,
  MessageSquare,
  Star,
  Mail,
  ArrowUp,
  Minus,
} from "lucide-react";

const CONTACT_ACTIONS = [
  {
    icon: Phone,
    label: "Call",
    href: "tel:+919727346487",
    tone: "bg-green-100 text-green-600",
  },
  {
    icon: MessageSquare,
    label: "Text Message",
    href: "sms:+919727346487",
    tone: "bg-blue-100 text-blue-600",
  },
  {
    icon: Star,
    label: "Review",
    href: "#",
    tone: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:infomehtabsir@gmail.com",
    tone: "bg-pink-100 text-pink-600",
  },
];

export default function FloatingWidgets() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Scoped keyframes for the attention-grabbing color blink on the two floating buttons */}
      <style>{`
        @keyframes blinkGreen {
          0%, 100% { background-color: #22c55e; box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          50% { background-color: #15803d; box-shadow: 0 0 0 10px rgba(34,197,94,0); }
        }
        @keyframes blinkPurple {
          0%, 100% { background-color: #6366f1; box-shadow: 0 0 0 0 rgba(147,51,234,0.6); }
          50% { background-color: #9333ea; box-shadow: 0 0 0 10px rgba(147,51,234,0); }
        }
        .chat-blink { animation: blinkGreen 1.6s ease-in-out infinite; }
        .toggle-blink { animation: blinkPurple 1.6s ease-in-out infinite; }
      `}</style>

      {/* Contact popup */}
      {contactOpen && (
        <div className="bg-white rounded-full shadow-xl flex items-center gap-4 px-6 py-4">
          {CONTACT_ACTIONS.map((a) => (
            <a
              key={a.label}
              href={a.href}
              className="flex flex-col items-center gap-1 text-xs text-slate-600"
            >
              <span className={`rounded-full p-3 ${a.tone}`}>
                <a.icon size={18} />
              </span>
              {a.label}
            </a>
          ))}
          <button
            aria-label="Close contact options"
            onClick={() => setContactOpen(false)}
            className="rounded-full bg-slate-200 p-2 ml-2"
          >
            <Minus size={16} />
          </button>
        </div>
      )}

      {/* WhatsApp chat button — bounces up/down and blinks green so it's hard to miss */}
      <a
        href="https://wa.me/919727346487?text=Hello!%20I%27m%20interested%20in%20your%20courses."
        className="chat-blink animate-bounce flex items-center gap-2 text-white font-bold rounded-full pl-3 pr-5 py-3 shadow-lg"
      >
        <MessageCircle size={20} />
        CHAT
      </a>

      {/* Scroll to top / quick actions toggle — same bounce + blink treatment */}
      <button
        aria-label="Contact options / scroll to top"
        onClick={() => setContactOpen((o) => !o)}
        className="toggle-blink animate-bounce h-14 w-14 rounded-full text-white shadow-lg flex items-center justify-center"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
