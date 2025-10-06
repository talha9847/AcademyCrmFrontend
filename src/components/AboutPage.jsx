"use client";

import OurMission from "../components/OurMisson";
import { Award, Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Vision",
      description:
        "To be the leading computer education institute in Gujarat, empowering students with cutting-edge skills for the digital age.",
    },
    {
      icon: Award,
      title: "Quality Education",
      description:
        "ISO certified training programs with industry-recognized certifications and hands-on practical experience.",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description:
        "Experienced instructors with real-world industry knowledge and a passion for teaching.",
    },
    {
      icon: Heart,
      title: "Student Success",
      description:
        "Dedicated to student placement and career growth with 100% job assistance and ongoing support.",
    },
  ];

  return (
    <section id="about" className="scroll-mt-20">
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-6 text-balance">
              About Mehtab Computer Academy
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              With over 20 years of excellence in computer education, we've been
              shaping careers and transforming lives in Surat since our
              inception.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-6">
                Our Story
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                  programming, and various other fields. Our commitment to
                  excellence has earned us ISO certification and recognition as
                  an authorized training partner for government programs like
                  PMKVY and GULM.
                </p>
                <p>
                  Today, we continue to evolve with the latest technologies and
                  industry trends, ensuring our students receive education
                  that's not just current, but future-ready.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden">
                <img
                  src="/modern-computer-training-classroom-with-students.jpg"
                  alt="Mehtab Computer Academy classroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold">20+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <OurMission />

      {/* Values */}
      <div className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">
              Our Core Values
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-xl text-foreground mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-4">
              Certifications & Recognitions
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted and certified by leading organizations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              "ISO Certified",
              "PMKVY Partner",
              "GULM Authorized",
              "Government Approved",
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-border text-center"
              >
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <div className="font-semibold text-foreground">{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
