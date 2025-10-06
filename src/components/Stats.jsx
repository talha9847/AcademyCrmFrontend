"use client";

import { Award, Users, BookOpen, Trophy } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Award,
      value: "ISO 9001:2015",
      label: "Certified Institute",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Students Trained",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: BookOpen,
      value: "40+",
      label: "Courses Offered",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Trophy,
      value: "20+",
      label: "Years Excellence",
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex p-4 rounded-xl ${stat.bg} mb-4`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="font-serif font-bold text-3xl mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
