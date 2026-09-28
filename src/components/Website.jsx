import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import CtaSection from "./CtaSection";
import Contact from "./Contact";
import Blog from "./Blog";
import Stats from "./Stats";
import FeaturedCourses from "./FeaturedCourses";
import Journey from "./Journey";
import FNavbar from "./FNavbar";
import Gallery from "./Gallery";
import TopBanner from "./TopBanner";
import BrandStrip from "./BrandStrip";
import ContactInfoBar from "./ContactInfoBar";
import CategoriesSection from "./CategoriesSection";
import CoursesSection from "./CoursesSection";
import AboutUs from "./AboutUs";
import WhyChooseUs from "./WhyChooseUs";
import FloatingWidgets from "./FloatingWidgets";

const Website = () => {
  return (
    <div className="overflow-x-hidden px-2">
      <FloatingWidgets />
      <BrandStrip />
      <FNavbar />
      <TopBanner />
      <Hero />
      {/* <ContactInfoBar /> */}
      <CategoriesSection />
      <CoursesSection />
      <AboutUs />
      <WhyChooseUs />
      <Stats />

      <FeaturedCourses />
      <Journey />
      <Blog />
      <Gallery />
      <Testimonials />
      <Contact />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Website;
