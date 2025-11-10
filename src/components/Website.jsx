import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import CtaSection from "./CtaSection";
import Contact from "./Contact";
import Blog from "./Blog";
import ChooseUs from "./ChooseUs";
import Stats from "./Stats";
import FeaturedCourses from "./FeaturedCourses";
import AboutPage from "./AboutPage";
import Journey from "./Journey";
import FNavbar from "./FNavbar";
import Gallery from "./Gallery";

const Website = () => {
  return (
    <div className="overflow-x-hidden px-2">
      <FNavbar />
      <Hero />
      <Stats />
      <AboutPage />
      <FeaturedCourses />
      <Journey />
      <ChooseUs />
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
