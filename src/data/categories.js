// src/data/categories.js

export const CATEGORIES = [
  // =====================================================
  // DEGREE PROGRAMMES
  // =====================================================
  {
    slug: "degree-programmes",
    name: "DEGREE PROGRAMMES",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    intro:
      "Future-focused degree programmes in AI-ML, Data Science, Full Stack Development and Cyber Security.",
    courses: [
      {
        name: "BCA (AI-ML)",
        duration: "3/4 Years",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "BCA (Data Science)",
        duration: "3/4 Years",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "BCA (Full Stack Development)",
        duration: "3/4 Years",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "BCA (Cyber Security)",
        duration: "3/4 Years",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "M.Sc (AI-ML)",
        duration: "2 Years",
        eligibility: "Graduation",
        fees: "₹45,000 / Semester",
      },
      {
        name: "M.Sc (Data Science)",
        duration: "2 Years",
        eligibility: "Graduation",
        fees: "₹45,000 / Semester",
      },
      {
        name: "M.Sc (Full Stack Development)",
        duration: "2 Years",
        eligibility: "Graduation",
        fees: "₹45,000 / Semester",
      },
      {
        name: "M.Sc (Cyber Security)",
        duration: "2 Years",
        eligibility: "Graduation",
        fees: "₹45,000 / Semester",
      },
    ],
  },

  // =====================================================
  // DIPLOMA / P.G DIPLOMA PROGRAMMES
  // =====================================================
  {
    slug: "diploma-programmes",
    name: "DIPLOMA / P.G DIPLOMA",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    intro:
      "Job-relevant diploma programmes covering AI, Data Science, Big Data, Programming, IoT, Web Development, Cyber Security and Digital Marketing.",
    courses: [
      {
        name: "Diploma in AI-ML",
        duration: "12 Months",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Diploma in Data Science",
        duration: "12 Months",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Diploma in Big Data Technology",
        duration: "12 Months",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Diploma in Computer Programming",
        duration: "12 Months",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Diploma in IOT using AI-ML",
        duration: "12 Months",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Diploma in Web Development",
        duration: "12 Months",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Diploma in Cyber Security",
        duration: "12 Months",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Diploma in Digital Marketing",
        duration: "12 Months",
        eligibility: "12th Pass",
        fees: "₹40,000 / Semester",
      },
    ],
  },

  // =====================================================
  // CERTIFICATE PROGRAMMES
  // =====================================================
  {
    slug: "certificate-programmes",
    name: "CERTIFICATE PROGRAMMES",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    intro:
      "Six-month certificate programmes designed to build practical skills in technology and digital fields.",
    courses: [
      {
        name: "Certificate in Data Science",
        duration: "6 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Certificate in Computer Programming",
        duration: "6 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Certificate in Full Stack Development",
        duration: "6 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Certificate in IOT",
        duration: "6 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Certificate in Data Analytics Using Excel & Power BI",
        duration: "6 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Certificate in Big Data",
        duration: "6 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Certificate in Cyber Security",
        duration: "6 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Certificate in Digital Marketing",
        duration: "6 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
    ],
  },

  // =====================================================
  // SHORT-TERM CERTIFICATE COURSES
  // =====================================================
  {
    slug: "short-term-courses",
    name: "SHORT-TERM CERTIFICATE COURSES",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    intro:
      "Short-term courses for quickly developing practical technology and cybersecurity skills.",
    courses: [
      {
        name: "Certified Ethical Hacker",
        duration: "3 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Programming With Python",
        duration: "2 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
      {
        name: "Junior Software Developer",
        duration: "3 Months",
        eligibility: "10th Pass",
        fees: "₹40,000 / Semester",
      },
    ],
  },
];

// =====================================================
// GET CATEGORY BY SLUG
// =====================================================

export const getCategory = (slug) =>
  CATEGORIES.find((category) => category.slug === slug);
