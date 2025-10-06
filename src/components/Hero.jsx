"use client";

import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, BookOpen } from "lucide-react";
import FNavbar from "./FNavbar";
import Stats from "./Stats";
import FeaturedCourses from "./FeaturedCourses";
import ChooseUs from "./ChooseUs";
import Testimonials from "./Testimonials";
import CtaSection from "./CtaSection";
import Footer from "./Footer";
import AboutPage from "./AboutPage";
import Blog from "./Blog";
import Journey from "./Journey";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      <FNavbar />
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Award className="w-4 h-4" />
              ISO Certified Institute Since 2003
            </div>

            <h1 className="font-serif font-bold text-5xl lg:text-6xl text-balance leading-tight">
              Shape Your Future with{" "}
              <span className="text-primary">Quality Education</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Join Surat's leading computer education institute with 20+ years
              of excellence. Master in-demand skills in programming, design, and
              languages with expert guidance and government-approved
              certifications.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-medium transition-colors"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="font-serif font-bold text-3xl text-primary">
                  20+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="font-serif font-bold text-3xl text-primary">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">
                  Expert Trainers
                </div>
              </div>
              <div>
                <div className="font-serif font-bold text-3xl text-primary">
                  10k+
                </div>
                <div className="text-sm text-muted-foreground">
                  Students Trained
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src="/talha.webp"
                alt="Students learning at Mehtab Computer Academy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-xl">100%</div>
                  <div className="text-sm text-muted-foreground">
                    Job Assistance
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-xl">40+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Stats />
      <AboutPage />
      <Journey />
      <div id="featured-courses">
        <FeaturedCourses />
      </div>
      <ChooseUs />
      <Blog />
      <CtaSection />
      <Testimonials />
      <Footer />
    </section>
  );
}
