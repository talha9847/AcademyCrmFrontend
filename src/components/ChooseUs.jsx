"use client";

import { Award, Users, Briefcase, Clock, BookOpen, Trophy } from "lucide-react";

export default function ChooseUs() {
  const features = [
    {
      icon: Award,
      title: "ISO Certified",
      description:
        "ISO 9001:2015 certified institute ensuring quality education standards",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description:
        "50+ experienced trainers with industry expertise and teaching excellence",
    },
    {
      icon: Briefcase,
      title: "100% Job Assistance",
      description:
        "Dedicated placement cell with tie-ups with leading companies",
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description:
        "Morning, afternoon, and evening batches to suit your schedule",
    },
    {
      icon: BookOpen,
      title: "Practical Training",
      description:
        "Hands-on learning with real-world projects and live assignments",
    },
    {
      icon: Trophy,
      title: "Government Approved",
      description: "Authorized center for PMKVY and GULM government programs",
    },
  ];

  return (
   <section
      id="why-us"
      className="py-16 md:py-24 lg:py-32 bg-gray-50/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-indigo-600 font-extrabold text-sm sm:text-base uppercase tracking-widest bg-indigo-100 px-3 py-1 rounded-full shadow-md inline-block">
            Elevate Your Future
          </span>
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mt-4 mb-3 leading-tight">
            The Mehtab Advantage: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Why Students Choose Us</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            We blend rigorous academics with practical, career-focused training to ensure every student succeeds.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            // Determine icon and color classes dynamically
            const colorClass = ['text-blue-600', 'text-pink-600', 'text-teal-600', 'text-orange-600', 'text-purple-600', 'text-indigo-600'][index % 6];
            const bgClass = ['from-blue-100/70 to-indigo-100/70', 'from-pink-100/70 to-red-100/70', 'from-teal-100/70 to-cyan-100/70', 'from-orange-100/70 to-amber-100/70', 'from-purple-100/70 to-fuchsia-100/70', 'from-indigo-100/70 to-blue-100/70'][index % 6];
            const shadowClass = ['shadow-blue-200', 'shadow-pink-200', 'shadow-teal-200', 'shadow-orange-200', 'shadow-purple-200', 'shadow-indigo-200'][index % 6];

            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={`bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 
                  transition-all duration-300 ease-in-out transform 
                  hover:-translate-y-2 hover:shadow-2xl ${shadowClass} hover:ring-4 hover:ring-opacity-50 hover:ring-indigo-100 
                  shadow-lg`}
              >
                {/* Icon Container with subtle gradient and pop */}
                <div 
                  className={`bg-gradient-to-br ${bgClass} w-14 h-14 rounded-xl flex items-center justify-center mb-5 
                    transition-all duration-300 group-hover:scale-105`}
                >
                  <Icon className={`w-7 h-7 ${colorClass}`} strokeWidth={2.5} />
                </div>

                <h3 className="font-extrabold text-xl sm:text-2xl mb-3 text-gray-900 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
