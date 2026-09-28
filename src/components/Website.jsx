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
import PromoPopup from "./PromoPopUp";
import UpcomingEvents from "./UpcomingEvents";
import FAQSection from "./FaqSection";
import PopularPosts from "./PopularPost";

const Website = () => {
  return (
    <div className="overflow-x-hidden px-2">
      <FloatingWidgets />
      <BrandStrip />
      <FNavbar />
      <TopBanner />
      <Hero />
      <CategoriesSection />
      <CoursesSection />
      <AboutUs />
      <WhyChooseUs />
      <UpcomingEvents />
      <FAQSection />
      <PopularPosts />
      <Testimonials />
      <Footer />
      <Stats />
      <FeaturedCourses />
      <Journey />
      <Blog />
      <Gallery />
      <Contact />
      <CtaSection />
      <PromoPopup />
    </div>
  );
};

export default Website;
