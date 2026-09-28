// Course names/descriptions/prices marked REAL come from the live site screenshots.
// Everything else is sample data — replace with your own or load from an API.
export const CATEGORIES = [
  {
    slug: "computer-course",
    name: "COMPUTER COURSE",
    image: "https://picsum.photos/id/1/900/600",
    intro:
      "Diploma and certificate programs that take you from computer fundamentals to job-ready office and application skills.",
    courses: [
      {
        name: "Diploma In Computer Application",
        code: "M-DCA-5433",
        duration: "1 Year",
        fees: "₹25,000",
        desc: "Complete foundation in computer applications with practical lab sessions.",
      }, // REAL
      {
        name: "Diploma In Primary Teacher Training",
        code: "M-DPTT-6285",
        duration: "1 Year",
        fees: "₹25,000",
        desc: "Teacher-training diploma with a technology-friendly classroom approach.",
      }, // REAL
      {
        name: "Diploma In Office Automation & Desktop Publishing",
        code: "M-DOA&DP-6466",
        duration: "1 Year",
        fees: "₹22,500",
        desc: "Office tools and desktop publishing for professional documents and layouts.",
      }, // REAL
      {
        name: "Advanced Diploma In Computer Application (ADCA)",
        duration: "Contact us",
        fees: "Contact for fees",
        desc: "Advanced diploma covering deeper application and programming basics.",
      },
      {
        name: "MS-Office",
        duration: "Contact us",
        fees: "Contact for fees",
        desc: "Word, Excel, PowerPoint, Outlook & More.",
      },
      {
        name: "Basic To Advanced Computer",
        duration: "Contact us",
        fees: "Contact for fees",
        desc: "Fundamentals to Expert Level.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    name: "DIGITAL MARKETING",
    image: "https://picsum.photos/id/20/900/600",
    intro:
      "Learn to grow brands online with search, social media and paid advertising.",
    courses: [
      {
        name: "Digital Marketing",
        duration: "Contact us",
        fees: "Contact for fees",
        desc: "SEO, Social Media, Google Ads & More.",
      },
    ],
  },
  {
    slug: "web-designing",
    name: "WEB DESIGNING",
    image: "https://picsum.photos/id/48/900/600",
    intro: "Build modern, responsive websites from the ground up.",
    courses: [
      {
        name: "Web Designing",
        duration: "Contact us",
        fees: "Contact for fees",
        desc: "HTML, CSS, JavaScript & Responsive Design.",
      },
    ],
  },
  {
    slug: "tally-accounting",
    name: "TALLY & ACCOUNTING",
    image: "https://picsum.photos/id/60/900/600",
    intro: "Accounting and GST skills used in everyday business.",
    courses: [
      {
        name: "Tally",
        duration: "Contact us",
        fees: "Contact for fees",
        desc: "GST, Accounting & Financial Management.",
      },
    ],
  },
  {
    slug: "office-automation",
    name: "OFFICE AUTOMATION",
    image: "https://picsum.photos/id/96/900/600",
    intro: "Everyday office productivity tools, taught hands-on.",
    courses: [
      {
        name: "Diploma In Office Automation & Desktop Publishing",
        code: "M-DOA&DP-6466",
        duration: "1 Year",
        fees: "₹22,500",
        desc: "Office tools and desktop publishing for professional documents and layouts.",
      },
      {
        name: "MS-Office",
        duration: "Contact us",
        fees: "Contact for fees",
        desc: "Word, Excel, PowerPoint, Outlook & More.",
      },
    ],
  },
  {
    slug: "typing",
    name: "TYPING",
    image: "https://picsum.photos/id/119/900/600",
    intro: "Build speed and accuracy in typing.",
    courses: [
      {
        name: "Typing",
        duration: "Contact us",
        fees: "Contact for fees",
        desc: "English & Gujarati Typing.",
      },
    ],
  },
];

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
