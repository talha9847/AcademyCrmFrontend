import { Target, Lightbulb, TrendingUp, Shield } from "lucide-react"

export default function OurMission() {
  const missions = [
    {
      icon: Target,
      title: "Empower Through Education",
      description:
        "Provide accessible, high-quality computer education that empowers individuals to achieve their career goals and dreams.",
    },
    {
      icon: Lightbulb,
      title: "Foster Innovation",
      description:
        "Cultivate a learning environment that encourages creativity, critical thinking, and innovative problem-solving skills.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Bridge the gap between education and employment by offering industry-relevant skills and 100% placement assistance.",
    },
    {
      icon: Shield,
      title: "Maintain Excellence",
      description: "Uphold the highest standards of education quality, infrastructure, and student support services.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Our Mission</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Transforming lives through quality education and skill development
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <mission.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">{mission.title}</h3>
              <p className="text-white/80 leading-relaxed">{mission.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
