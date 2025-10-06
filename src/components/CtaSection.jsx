"use client";

import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6 text-balance">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8 text-pretty leading-relaxed">
            Join Mehtab Computer Academy today and take the first step towards a
            successful career. Get expert training, industry certifications, and
            100% job assistance.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Enroll Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+919825123456"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-medium transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">
              Visit our campus or contact us for more information
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div>
                <span className="text-white/60">Address:</span> Surat, Gujarat,
                India
              </div>
              <div>
                <span className="text-white/60">Phone:</span> +91 98251 23456
              </div>
              <div>
                <span className="text-white/60">Email:</span>{" "}
                info@mehtabacademy.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
