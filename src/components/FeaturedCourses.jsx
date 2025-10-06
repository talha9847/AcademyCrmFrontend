"use client"

import { Link } from "react-router-dom"
import { Code, Palette, Globe, Languages, ArrowRight } from "lucide-react"

export default function FeaturedCourses() {
  const courses = [
    {
      icon: Code,
      title: "Programming & Development",
      description: "Master C, C++, Java, Python, and modern web development technologies.",
      courses: ["C & C++", "Java", "Python", "Full Stack Development"],
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Build modern websites and applications with latest frameworks.",
      courses: ["HTML/CSS", "JavaScript", "React", "Node.js"],
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: Palette,
      title: "Design & Multimedia",
      description: "Create stunning visuals with industry-standard design tools.",
      courses: ["Photoshop", "CorelDRAW", "Video Editing", "3D Animation"],
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Languages,
      title: "Language Training",
      description: "Achieve your study abroad dreams with expert IELTS & PTE coaching.",
      courses: ["IELTS", "PTE", "Spoken English", "Business English"],
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-4 text-balance">Popular Course Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose from our wide range of industry-relevant courses designed to boost your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {courses.map((course, index) => {
            const Icon = course.icon
            return (
              <div
                key={index}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-lg ${course.bg} mb-4`}>
                  <Icon className={`w-6 h-6 ${course.color}`} />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3">{course.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{course.description}</p>
                <ul className="space-y-2 mb-4">
                  {course.courses.map((item, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            View All Courses
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
