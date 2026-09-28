import { Phone, Mail, MapPin } from "lucide-react";

const ITEMS = [
  { icon: Phone, label: "Phone:", value: "+91 9727346487" },
  { icon: Mail, label: "E-mail:", value: "infomehtabsir@gmail.com" },
  {
    icon: MapPin,
    label: "Location:",
    value:
      "SN FF 25-28 SIGNATURE SQUARE MALL MOTA MANDIR ROAD TARSADI KOSAMBA MANGROL SURAT",
  },
];

export default function ContactInfoBar() {
  return (
    <div className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 grid sm:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span className="shrink-0 rounded-lg bg-orange-500 p-2.5">
              <item.icon size={18} />
            </span>
            <p className="text-sm">
              <span className="block text-slate-300">{item.label}</span>
              <span className="font-bold leading-snug">{item.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
