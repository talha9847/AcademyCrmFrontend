import { Calendar, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
export default function Blog() {
  const posts = [
    {
      title: "New Batch Starting: Full Stack Web Development",
      excerpt: "Join our comprehensive full stack development course starting next month. Limited seats available!",
      date: "March 15, 2024",
      category: "Announcements",
      image: "/web-development-coding.png",
    },
    {
      title: "Success Story: From Student to Software Engineer",
      excerpt:
        "Read how our student Rahul landed his dream job at a top IT company after completing our training program.",
      date: "March 10, 2024",
      category: "Success Stories",
      image: "/successful-professional-at-computer.jpg",
    },
    {
      title: "PMKVY Certification Program Now Open",
      excerpt: "Government-approved skill development program with free training and certification. Apply now!",
      date: "March 5, 2024",
      category: "Programs",
      image: "/certificate-award-ceremony.jpg",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">Latest News & Updates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest announcements, success stories, and educational insights
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
