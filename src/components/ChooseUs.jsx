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
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Why Us
          </span>
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-3 sm:mb-4 mt-2">
            Why Choose Mehtab Computer Academy?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Experience excellence in education with our proven track record
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all hover:-translate-y-1 shadow-md"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog Section
const Blog = () => {
  const posts = [
    {
      title: "New Batch Starting: Full Stack Web Development",
      excerpt:
        "Join our comprehensive full stack development course starting next month. Limited seats available!",
      date: "March 15, 2024",
      category: "Announcements",
    },
    {
      title: "Success Story: From Student to Software Engineer",
      excerpt:
        "Read how our student Rahul landed his dream job at a top IT company after completing our training program.",
      date: "March 10, 2024",
      category: "Success Stories",
    },
    {
      title: "PMKVY Certification Program Now Open",
      excerpt:
        "Government-approved skill development program with free training and certification. Apply now!",
      date: "March 5, 2024",
      category: "Programs",
    },
  ];

  return (
    <section id="blog" className="py-12 sm:py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            News & Updates
          </span>
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-3 sm:mb-4 mt-2">
            Latest News & Updates
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Stay updated with our latest announcements and success stories
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group hover:-translate-y-1"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600/20" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
                  <span className="bg-blue-100 text-blue-600 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{post.date}</span>
                  </div>
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <button className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all text-sm sm:text-base">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
