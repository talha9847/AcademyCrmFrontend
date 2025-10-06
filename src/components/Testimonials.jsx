"use client"

import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Patel",
      course: "Full Stack Development",
      image: "/professional-indian-woman-smiling.png",
      rating: 5,
      text: "The practical training and expert guidance helped me land my dream job as a web developer. The faculty is incredibly supportive!",
    },
    {
      name: "Rahul Shah",
      course: "Java Programming",
      image: "/professional-indian-man-smiling.png",
      rating: 5,
      text: "Best computer institute in Surat! The course content is up-to-date and the placement assistance is excellent.",
    },
    {
      name: "Anjali Desai",
      course: "IELTS Preparation",
      image: "/professional-indian-woman-student.jpg",
      rating: 5,
      text: "Achieved 7.5 band score in IELTS thanks to the structured coaching and mock tests. Highly recommended for study abroad aspirants!",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-4 text-balance">What Our Students Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of successful students who transformed their careers with us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
