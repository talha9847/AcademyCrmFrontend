"use client"

import { Award, Users, Briefcase, Clock, BookOpen, Trophy } from "lucide-react"

export default function ChooseUs() {
  const features = [
    {
      icon: Award,
      title: "ISO Certified",
      description: "ISO 9001:2015 certified institute ensuring quality education standards",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "50+ experienced trainers with industry expertise and teaching excellence",
    },
    {
      icon: Briefcase,
      title: "100% Job Assistance",
      description: "Dedicated placement cell with tie-ups with leading companies",
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description: "Morning, afternoon, and evening batches to suit your schedule",
    },
    {
      icon: BookOpen,
      title: "Practical Training",
      description: "Hands-on learning with real-world projects and live assignments",
    },
    {
      icon: Trophy,
      title: "Government Approved",
      description: "Authorized center for PMKVY and GULM government programs",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-4 text-balance">
            Why Choose Mehtab Computer Academy?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience excellence in education with our proven track record and student-first approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
