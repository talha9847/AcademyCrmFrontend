import { ArrowRight, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const LOGO_FALLBACK = "https://placehold.co/160x60/1e293b/ffffff?text=IICS";

const USEFUL_LINKS = [
  "Study Materials",
  "Certificates",
  "Our Affiliations",
  "Authorized Centers",
  "Important Links",
  "Payment Details",
];

const COMPANY_LINKS = ["Contact Us", "Blog", "Jobs", "Franchise Details"];

const linkCls =
  "inline-block text-sm text-slate-500 transition-all hover:translate-x-1 hover:text-orange-500";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-slate-50 border-t border-gray-100">
      <div className="h-1 bg-gradient-to-r from-orange-500 via-indigo-500 to-slate-900" />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr] gap-10">
          {/* Brand column */}
          <div>
            <img
              src="/logo.png"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = LOGO_FALLBACK;
              }}
              alt="Ignite Institute of Computer Skills"
              className="h-12 w-auto mb-6"
            />
            <a
              href="/contact"
              className="group flex items-center justify-between rounded-full border-2 border-indigo-500 px-6 py-3 max-w-xs font-semibold text-slate-900 transition-colors hover:bg-indigo-500 hover:text-white"
            >
              Contact With Us{" "}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <div className="flex gap-3 mt-5">
              <a href="#">
                <img
                  src="https://placehold.co/135x40/000000/ffffff?text=Google+Play"
                  alt="Get it on Google Play"
                  className="h-11 rounded-lg"
                />
              </a>
              <a href="#">
                <img
                  src="https://placehold.co/135x40/000000/ffffff?text=App+Store"
                  alt="Download on the App Store"
                  className="h-11 rounded-lg"
                />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 mb-5">Useful Links</h4>
            <ul className="space-y-3">
              {USEFUL_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className={linkCls}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 mb-5">Our Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className={linkCls}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 mb-5">Get Contact</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <Phone size={16} />
                </span>
                <a
                  href="tel:+919727346487"
                  className="self-center hover:text-orange-500"
                >
                  <span className="font-bold">Phone:</span> +91 9727346487
                </a>
              </li>
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <Mail size={16} />
                </span>
                <a
                  href="mailto:infomehtabsir@gmail.com"
                  className="self-center break-all hover:text-orange-500"
                >
                  <span className="font-bold">E-mail:</span>{" "}
                  infomehtabsir@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <MapPin size={16} />
                </span>
                <p>
                  <span className="font-bold">Location:</span> SN FF 25-28
                  SIGNATURE SQUARE MALL MOTA MANDIR ROAD TARSADI KOSAMBA MANGROL
                  SURAT
                </p>
              </li>
            </ul>
            <a
              href="https://wa.me/919727346487"
              aria-label="Chat on WhatsApp"
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            Copyright © 2026{" "}
            <span className="font-semibold text-slate-800">DITRP INDIA.</span>{" "}
            All Rights Reserved
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy-policy" className="hover:text-orange-500">
              Privacy policy
            </a>
            <a href="/terms" className="hover:text-orange-500">
              Term and conditions
            </a>
            <a href="/refund-policy" className="hover:text-orange-500">
              Refund policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
