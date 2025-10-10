"use client";

import { Award, Users, BookOpen, Trophy } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Award,
      value: "ISO 9001:2015",
      label: "Certified Institute",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Students Trained",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: BookOpen,
      value: "40+",
      label: "Courses Offered",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Trophy,
      value: "20+",
      label: "Years Excellence",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform"
              >
                <div
                  className={`inline-flex p-3 sm:p-4 rounded-xl ${stat.bg} mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                </div>
                <div className="font-bold text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 px-2">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
