"use client";

import OurMission from "../components/OurMisson";
import {
  Award,
  Users,
  Target,
  Heart,
  Shield,
  CheckCircle,
  Lightbulb,
  TrendingUp
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Vision",
      description:
        "To be the leading computer education institute in Gujarat, empowering students with cutting-edge skills for the digital age.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      title: "Quality Education",
      description:
        "ISO certified training programs with industry-recognized certifications and hands-on practical experience.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description:
        "Experienced instructors with real-world industry knowledge and a passion for teaching.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Heart,
      title: "Student Success",
      description:
        "Dedicated to student placement and career growth with 100% job assistance and ongoing support.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="about" className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl top-0 left-1/4"></div>
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl bottom-0 right-1/4"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
              About Mehtab Computer Academy
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed px-4">
              With over 20 years of excellence in computer education, we've been
              shaping careers and transforming lives in Surat since our
              inception.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6">
              <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Our Journey
              </span>
              <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-900">
                Two Decades of Excellence
              </h3>
              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                <p>
                  Mehtab Computer Academy was founded with a simple yet powerful
                  vision: to make quality computer education accessible to
                  everyone in Surat. What started as a small training center has
                  grown into one of the most trusted names in computer
                  education.
                </p>
                <p>
                  Over the past two decades, we've trained thousands of
                  students, helping them build successful careers in IT, design,
                  programming, and various other fields.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                {[
                  { icon: Shield, text: "ISO Certified" },
                  { icon: Award, text: "PMKVY Partner" },
                  { icon: CheckCircle, text: "Gov. Approved" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-md"
                  >
                    <badge.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-4 sm:ring-8 ring-white">
                <img
                  src="/api/placeholder/800/600"
                  alt="Classroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl">
                <div className="text-3xl sm:text-5xl font-bold mb-1">20+</div>
                <div className="text-xs sm:text-sm font-medium">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto">
              Transforming lives through quality education and skill development
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: "Empower Through Education",
                description:
                  "Provide accessible, high-quality computer education that empowers individuals to achieve their career goals.",
              },
              {
                icon: Lightbulb,
                title: "Foster Innovation",
                description:
                  "Cultivate a learning environment that encourages creativity, critical thinking, and problem-solving skills.",
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description:
                  "Bridge the gap between education and employment with industry-relevant skills and 100% placement assistance.",
              },
              {
                icon: Shield,
                title: "Maintain Excellence",
                description:
                  "Uphold the highest standards of education quality, infrastructure, and student support services.",
              },
            ].map((mission, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <mission.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                  {mission.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-900 mt-2 sm:mt-3 mb-3 sm:mb-4">
              Our Core Values
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity`}
                ></div>
                <div
                  className={`bg-gradient-to-br ${value.color} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform`}
                >
                  <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3">
                  {value.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
