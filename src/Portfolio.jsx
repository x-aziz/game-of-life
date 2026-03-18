import React, { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as THREE from "three";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Briefcase,
  Award,
  ArrowRight,
  Download,
  X,
  TrendingUp,
  Send,
  User,
  MessageSquare,
  Calendar,
  GraduationCap,
  Zap,
  Target,
  Users,
  CheckCircle,
  Globe,
  Lightbulb,
  Trophy,
  BookOpen,
  Rocket,
} from "lucide-react";

import img1 from "./assets/ecommerce-test.png";
import img2 from "./assets/forver.png";
import img7 from "./assets/delfiv1.png";
import pirimiImg from "./assets/image.png";
import waladSalehImg from "./assets/walad-saleh.png";
import landingPage1 from "./assets/screencapture-ecommerce-test-2025-11-29-14_08_25.png";
import landingPage4 from "./assets/screencapture-127-0-0-1-5500-index18-html-2025-12-13-13_32_35.png";
import landingPage5 from "./assets/delfiv-company.png";
import landingPage3 from "./assets/screencapture-127-0-0-1-5500-indexs-html-2025-12-27-12_57_59.png";
import landingPage7 from "./assets/czn2dxiirs6ld3lqegmr.jpg";
import landingPage2 from "./assets/screencapture-localhost-5173-2025-12-28-11_18_01 (1).png";
import profileImage from "./assets/cropped_circle_image.png";
import waladSalehLanding from "./assets/walad-salah-landingpage.png";
import pirimiLanding from "./assets/primi-landingpage.png";
import lumatexLanding from "./assets/lumatex2000-dz.png";
import universityTrackingLanding from "./assets/abdelaziz-university-application1.png";
import greenloopLanding from "./assets/greenloopsvercel-app.png";

import universityApplicationTracker from "./assets/university-application-tracker.png";
import greenloop from "./assets/green-loop.png";
import aiTrackingJob from "./assets/AITracking.png";
import lumatex2000Site from "./assets/lumatex2000Site.png";
import healthcare from "./assets/healthCare.png";

const Profile3DScene = ({ imageUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 7;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // LIGHTS
    scene.add(new THREE.AmbientLight(0xffffff, 3));

    // const keyLight = new THREE.DirectionalLight(0x60a5fa, 1.4);
    // keyLight.position.set(5, 5, 5);
    // scene.add(keyLight);

    // const rimLight = new THREE.DirectionalLight(0xec4899, 0.6);
    // rimLight.position.set(0, 0, -5);
    // scene.add(rimLight);

    // TEXTURE
    const texture = new THREE.TextureLoader().load(imageUrl);
    texture.colorSpace = THREE.SRGBColorSpace;
    // 3D CARD
    const geometry = new THREE.BoxGeometry(3.9, 4.3, 1.25);
    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 0.6,
      clearcoatRoughness: 0.9,
    });

    const card = new THREE.Mesh(geometry, material);
    card.position.y = 0.8;
    scene.add(card);

    // ANIMATION
    let t = 0;
    const animate = () => {
      t += 0.01;
      card.rotation.y = Math.sin(t * 0.6) * 0.2;
      card.rotation.x = Math.cos(t * 0.4) * 0.1;
      card.position.y = 0.8 + Math.sin(t) * 0.08;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // RESIZE
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [imageUrl]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[420px] md:h-[500px] rounded-3xl overflow-hidden"
    />
  );
};
const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [state, handleSubmit] = useForm("xdaodwzg");
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  const goToSlide = (index) => setCurrentSlide(index);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  // Auto-play slider (optional)
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("said.abd.el.aziz.cs@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("said.abd.el.aziz.cs@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          const sections = [
            "hero",
            "about",
            "experience",
            "projects",
            "education",
            "skills",
            "achievements",
            "contact",
          ];
          const current = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });

          if (current) setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "DELFIV",
      duration: "December 2025 – Present · 4 months",
      type: "Full-time · On-site",
      location: "Algiers, Algeria",
      description:
        "Promoted from IT Service Desk to Full-Stack Developer after 2 months. Building production systems including an e-learning platform and marketplace.",
      responsibilities: [
        "Developing full-stack applications using MERN stack and Laravel",
        "Contributing to e-learning platform (course management, user systems)",
        "Building marketplace platform for product and vendor management",
        "Updated and optimized the company's official website",
        "Collaborating cross-functionally to ship production-ready features",
      ],
      achievements: [
        "Promoted to Full-Stack Developer after only 2 months",
        "Promoted from IT Service Desk based on technical performance",
      ],
      skills: [
        "React",
        "Node.js",
        "Laravel",
        "MongoDB",
        "Technical Support",
        "Team Collaboration",
      ],
      gradient: "from-blue-500 to-cyan-600",
      icon: Briefcase,
    },
    {
      title: "Team Lead — Sales & Commercial Operations",
      company: "LUMATEX2000",
      duration: "February 2020 – November 2025 · 5 years 10 months",
      type: "Part-time · On-site",
      location: "Algiers, Ouargla, Hassi Massoud",
      description:
        "Started as a 15-month commercial intern at age 17, promoted to Sales Representative, then to Team Lead managing 5-person team across 3 cities while completing my Computer Science degree.",
      responsibilities: [
        "Led 5-person sales team across 2 locations simultaneously",
        "Managed supplier negotiations and strategic pricing decisions",
        "Oversaw inventory planning and daily financial workflows",
        "Maintained customer relationships across Algiers, Ouargla, Hassi Massoud",
        "Supported digital presence by building the company's official website",
      ],
      achievements: [
        "Promoted from intern to Team Lead within 3 years",
        "Managed commercial operations across 3 Algerian cities",
        "Built LUMATEX2000 official website — first digital presence",
        "Maintained operations while completing full-time university degree",
      ],
      skills: [
        "Team Leadership",
        "Commercial Negotiation",
        "Inventory Management",
        "Supplier Relations",
        "Strategic Pricing",
        "Financial Operations",
      ],
      gradient: "from-amber-500 to-orange-600",
      icon: Briefcase,
    },
    {
      title: "Co-leader of IT Department",
      company: "No Limit Club (NLC)",
      duration: "December 2023 - Present · 2 years 1 month",
      type: "Part-time · Student Organization",
      location: "Algiers, Algeria",
      description:
        "Leading IT initiatives for 100+ student members, organizing tech workshops, hackathons, and coordinating major events including AiQuest'25.",
      responsibilities: [
        "Led IT initiatives for 100+ student members",
        "Organized tech workshops and hackathons (AiQuest'25, SolveX1.0)",
        "Coordinated 36-hour hackathon on AI & cybersecurity",
        "Facilitated networking with industry professionals",
        "Managed event logistics, mentorship programs, and participant engagement",
      ],
      achievements: [
        "Successfully organized 8+ major tech events",
        "Coordinated AiQuest'25 with 20+ teams",
        "Managed multiple graduation ceremonies",
        "Built partnerships with industry leaders",
      ],
      skills: [
        "Leadership",
        "Event Management",
        "Team Coordination",
        "Public Speaking",
        "Community Building",
      ],
      gradient: "from-purple-500 to-pink-600",
      icon: Users,
    },
    {
      title: "Full-Stack Web Developer",
      company: "Freelance",
      duration: "March 2023 - October 2024 · 1 year 8 months",
      type: "Self-Employed · Remote",
      location: "Algiers, Algeria",
      description:
        "Developed responsive web applications, e-commerce platforms, and custom admin dashboards for diverse clients.",
      responsibilities: [
        "Developed responsive web applications using MERN stack and Laravel",
        "Built e-commerce platforms with payment gateway integrations",
        "Created custom admin dashboards with analytics and data visualization",
        "Implemented secure authentication systems (JWT, sessions)",
        "Optimized database queries and API performance",
      ],
      achievements: [
        "Delivered 6+ production-ready applications",
        "Achieved 40% faster checkout process in e-commerce projects",
        "Reduced vendor onboarding time by 70%",
        "Maintained 99.9% authentication success rate",
      ],
      skills: [
        "MERN Stack",
        "Laravel",
        "REST APIs",
        "Git",
        "Responsive Design",
        "Client Communication",
      ],
      gradient: "from-green-500 to-emerald-600",
      icon: Code,
    },
  ];

  const projects = [
    {
      title: "Multi-Vendor E-Commerce Platform",
      description:
        "Comprehensive marketplace enabling multiple vendors to manage products, track sales, and access analytics dashboards",
      longDescription:
        "A comprehensive multi-vendor marketplace bringing multiple specialized shops into one unified platform designed for scalability and high performance. This graduation project demonstrates advanced full-stack development capabilities.",
      tech: ["Laravel 10", "MySQL", "Bootstrap", "AJAX", "PHP", "Banking API"],
      image: img1,
      landingPage: landingPage1,
      metrics:
        "500+ Products Managed • 3 Vendor Categories • Real-time Analytics",
      gradient: "from-blue-500 to-purple-600",
      problem:
        "Small businesses needed an affordable way to sell online without building individual platforms",
      solution:
        "Built a centralized marketplace where vendors get instant access to storefront, inventory management, and customer analytics",
      impact:
        "500+ products managed • Reduced vendor onboarding time by 70% • Unified shopping experience",
      features: [
        "Vendor management system with individual dashboards",
        "Product inventory management with real-time updates",
        "Sales analytics and reporting for vendors",
        "Unified shopping cart across multiple vendors",
        "Secure payment gateway integration",
        "Role-based access control (Admin, Vendor, Customer)",
        "Order tracking and management system",
      ],
      categories: [
        "Electrical & Electronic Tools",
        "Construction & Home Improvement",
        "Heating & Cooling Spare Parts",
      ],
      featured: true,
      year: "2024",
      role: "Full-Stack Developer",
    },
    {
      title: "Forever – MERN E-Commerce",
      description:
        "Full-stack shopping platform with secure authentication, cart management, and payment integration",
      longDescription:
        "Fully functional e-commerce platform featuring product catalog, shopping cart, and checkout system with seamless user experience and modern architecture.",
      tech: ["React", "Node.js", "MongoDB", "Express", "JWT", "Stripe"],
      image: img2,
      landingPage: landingPage2,
      metrics: "JWT Auth • RESTful API • 40% Faster Checkout",
      gradient: "from-green-500 to-teal-600",
      problem:
        "Modern e-commerce needed seamless checkout experience with secure user management",
      solution:
        "Developed full MERN stack application with JWT authentication and optimized cart flow",
      impact:
        "40% faster checkout process • 99.9% authentication success rate • Scalable architecture",
      features: [
        "Dynamic product catalog with search and filtering",
        "Real-time shopping cart updates",
        "User authentication and profile management",
        "Secure checkout process with Stripe",
        "Order history and tracking",
        "Responsive UI with modern design",
        "RESTful API architecture",
      ],
      featured: true,
      year: "2024",
      role: "Full-Stack Developer",
    },
    {
      title: "DELFIV Company Website",
      description:
        "Enterprise software solutions landing page featuring a dark-themed UI, specialized service modules, and multi-regional contact management.",
      tech: ["React", "Tailwind CSS", "Responsive Design"],
      image: img7,
      landingPage: landingPage5,
      metrics: "30+ Years Experience • 500+ Clients • 24/7 Support",
      gradient: "from-blue-600 to-purple-600",
      problem:
        "A long-standing software firm needed a modern, high-tech digital identity to better represent their integrated management solutions.",
      solution:
        "Developed a sleek, dark-mode landing page with categorized service cards, real-time statistics, and a location-specific contact interface.",
      impact:
        "Modernized brand authority • Streamlined client support access • Clear service hierarchy",
      featured: false,
      year: "2026",
      role: "Front-End Developer",
    },
    {
      title: "Fondation El Weld Esalih",
      description:
        "Bilingual non-profit platform showcasing youth development programs, educational workshops, and community initiatives with an immersive Arabic-first experience.",
      tech: ["React", "Tailwind CSS", "Vite", "React Router", "Lucide Icons"],
      image: waladSalehImg,
      landingPage: waladSalehLanding,
      metrics: "10+ Years Impact • 1000+ Youth Served • 50+ Programs Annually",
      gradient: "from-green-600 to-orange-500",
      problem:
        "A transformative youth foundation needed a digital presence to amplify their impact, showcase their programs, and connect with families in both Arabic and French.",
      solution:
        "Built a fully responsive, RTL-optimized website featuring an interactive news section with modal popups, bilingual navigation, program showcases, and cultural design elements reflecting their mission.",
      impact:
        "Enhanced community reach • Digitized 9 years of programs • Improved parent engagement • Mobile-first accessibility",
      featured: true,
      year: "2025",
      role: "Full-Stack Developer & Designer",
      category: "Non-Profit",
      liveUrl: "https://waled-ssalih.netlify.app",
      githubUrl: "https://github.com/x-aziz/waled-ssalih",
      personalNote:
        "Built as a tribute to the organization that shaped my journey since 2016—9 years of gratitude, coded into reality.",
    },
    {
      title: "PIRIMI — Social Impact Platform",
      description:
        "A localized digital solution designed to reduce food waste in Algeria by connecting stores, consumers, and charities.",
      longDescription:
        "PIRIMI is a mission-driven platform tailored for the Algerian market. It solves the gap between near-expiry food surplus and food insecurity, accounting for local constraints like cash payments and limited logistics to ensure maximum social impact.",
      tech: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Impact Analytics"],
      image: pirimiImg, // Make sure to import the thumbnail generated
      landingPage: pirimiLanding,
      metrics: "Pilot Ready • 0% Delivery Complexity • 100% Cash-Friendly",
      gradient: "from-emerald-500 to-teal-700",
      problem:
        "High food waste in stores while purchasing power drops; existing global apps fail in Algeria due to digital maturity and payment barriers.",
      solution:
        "A simplified, trust-based marketplace where stores sell or donate near-expiry food for in-store pickup, supporting a cash-based economy.",
      impact:
        "Structured food donations • Reduced financial losses for local shops • Access to affordable food for families • Environmental waste reduction",
      downloadUrl: "/PirimiProjectOverview.pdf",

      features: [
        "Store dashboard for near-expiry inventory management",
        "Consumer reservation system with cash-on-pickup flow",
        "Verified Association portal for food donation claims",
        "Manual partner verification for high trust/safety",
        "Localized UX for low-digital maturity users",
        "Impact tracking (Kg of food saved / DA saved)",
      ],
      categories: ["Social Impact", "FoodTech", "Sustainability"],
      featured: true,
      year: "2026",
      role: "Founder & Full-Stack Developer",
      personalNote:
        "Designed not by copying foreign models, but by adapting tech to the unique social and economic pulse of Algeria.",
    },
    {
      title: "Kothban — Algerian Sahara Tourism Platform",
      description:
        "Digital platform revitalizing domestic tourism by connecting northern Algerians with licensed southern travel agencies, certified guides, and traditional artisans.",
      longDescription:
        "Foreign tourists visit South Algeria more than Algerians themselves. Kothban (كثبان) was built as an ideathon MVP to fix this — creating trust, discovery, and safe access to Algeria's Sahara for domestic visitors and the diaspora.",
      tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
      image: img1,
      metrics: "Multilingual AR/FR/EN • DA-Based Pricing • SOS Safety Features",
      gradient: "from-amber-500 to-orange-600",
      problem:
        "Algeria's Sahara is one of the world's most spectacular destinations, yet most Algerians have never visited due to fragmented information, lack of trust, and no digital access to southern service providers.",
      solution:
        "A trust-based marketplace connecting visitors with licensed agencies, certified guides, and verified artisans — with social discovery, secure booking, and SOS safety features adapted for desert travel.",
      impact:
        "Promotes domestic tourism • Empowers southern local economy • Makes Algerian Sahara accessible to Algerians",
      features: [
        "Social discovery through real Sahara traveller stories",
        "Secure booking of tours and certified local guides",
        "Artisan marketplace for traditional southern crafts",
        "Direct messaging and verified community reviews",
        "SOS and safety features designed for desert travel",
        "Multilingual support (AR / FR / EN) with DA-based pricing",
      ],
      featured: true,
      year: "2024",
      role: "Founder & Full-Stack Developer",
      personalNote:
        "Built because I grew up in Ghardaia. The Sahara is not a tourist attraction — it is home. It deserves to be seen by Algerians first.",
    },
    {
      title: "AI-Powered Job Application Tracker",
      description:
        "SaaS tool that tracks every job application, analyzes resumes with Claude AI, detects skill gaps, generates cover letters, and preps for interviews.",
      longDescription:
        "Job hunting in 2026 requires strategy, not just effort. This tracker combines smart dashboard management with Claude AI to help applicants understand how well their profile matches each role, then act on that insight immediately.",
      tech: ["React", "Tailwind CSS", "Claude AI", "Node.js"],
      image: aiTrackingJob,
      metrics:
        "AI Resume Analysis • ATS Optimization • Cover Letter Generation",
      gradient: "from-violet-500 to-purple-700",
      problem:
        "Job applicants send CVs blindly with no feedback on fit, no interview preparation, and no salary negotiation guidance — resulting in low response rates and missed opportunities.",
      solution:
        "An intelligent tracker powered by Claude AI that analyzes resume-job fit, identifies skill gaps, generates tailored cover letters, prepares interview questions, and provides salary negotiation insights.",
      impact:
        "Transforms passive job hunting into data-driven strategy • Reduces application-to-interview gap • Designed for future SaaS expansion",
      features: [
        "Smart dashboard tracking every application, interview, and offer",
        "AI resume analysis powered by Claude AI",
        "Skill gap detection and ATS optimization",
        "AI-generated customizable cover letters",
        "Interview prep with AI-generated role-specific questions",
        "Salary insights and negotiation tips",
      ],
      featured: true,
      year: "2026",
      role: "Founder & Full-Stack Developer",
    },
    {
      title: "Minasa Academy — Online Course Platform",
      description:
        "Educational platform facilitating access to computer science courses with student enrollment management and responsive admin panel.",
      longDescription:
        "Minasa Academy was built to make computer science education more accessible. The platform manages course catalogs, student enrollments, and admin operations with a clean, mobile-friendly interface.",
      tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      image: img1,
      metrics: "Student Enrollment System • Admin Panel • Responsive Design",
      gradient: "from-blue-500 to-indigo-600",
      problem:
        "Students needed a centralized, easy-to-navigate platform to discover and enroll in computer science courses without technical barriers.",
      solution:
        "Built a full-stack educational platform with course catalog, enrollment management, admin dashboard, and mobile-first responsive design.",
      impact:
        "Improved accessibility to CS education • Streamlined registration process • Clean UX for non-technical users",
      features: [
        "Course catalog with detailed descriptions",
        "Student enrollment management system",
        "Admin panel for course and user management",
        "Responsive design for mobile learning",
        "PHP backend with MySQL database",
      ],
      featured: false,
      year: "2024",
      role: "Full-Stack Developer",
    },
    {
      title: "Chronic Patient Medical Records Platform",
      description:
        "Healthcare web platform for managing medical records and services for chronic patients. Built as a team project with appointment scheduling and secure data storage.",
      longDescription:
        "A team-built healthcare platform designed to address the real challenge of managing chronic patient data in Algeria — improving accessibility, coordination, and privacy of medical records.",
      tech: ["Full-Stack Web", "MySQL", "PHP", "Secure Authentication"],
      image: healthcare,
      metrics: "EMR System • Appointment Scheduling • Role-Based Access",
      gradient: "from-red-500 to-pink-600",
      problem:
        "Chronic patients and healthcare providers in Algeria lack a unified digital system for tracking medical history, scheduling appointments, and coordinating care.",
      solution:
        "Built a secure web platform with electronic medical records, appointment scheduling, role-based provider access, and privacy-compliant data storage.",
      impact:
        "Improved patient data accessibility • Better care coordination for chronic diseases • Secure, role-based healthcare data management",
      features: [
        "Electronic medical records (EMR) system",
        "Patient data management and history tracking",
        "Appointment scheduling system",
        "Healthcare provider access controls",
        "Secure data storage with privacy compliance",
      ],
      featured: false,
      year: "2024",
      role: "Team Developer",
    },
    {
      title: "LUMATEX2000 — Business Website",
      description:
        "Official website for electrical components distribution business. First digital presence for a company operating across Algiers, Ouargla, and Hassi Massoud.",
      longDescription:
        "LUMATEX2000 had operated for years across three Algerian cities with no online presence. I built their official website to showcase products, establish brand identity, and lay the foundation for future e-commerce integration.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      image: lumatex2000Site,
      metrics: "Product Showcase • Brand Identity • Foundation for E-Commerce",
      gradient: "from-orange-500 to-amber-600",
      problem:
        "A well-established electrical components distributor had no digital presence despite serving clients across multiple Algerian cities for years.",
      solution:
        "Designed and built an official company website showcasing product categories, brand identity, and commercial activity — serving as foundation for future e-commerce and online sales.",
      impact:
        "First digital presence for the business • Professional brand authority • Ready for future e-commerce expansion",
      features: [
        "Product category showcase",
        "Company identity and brand presentation",
        "Contact and location information",
        "Responsive design for all devices",
        "Foundation for future e-commerce integration",
      ],
      featured: false,
      year: "2023",
      role: "Full-Stack Developer",
      personalNote:
        "This was personal. I grew up in this business. Building their website was my way of giving back to what built me.",
    },
    {
      title: "GREEN LOOP — 1st Place Hackathon Winner",
      description:
        "Circular economy platform connecting restaurants, drivers, and farms to transform organic waste into premium fertilizer. Won 1st place against 38 teams.",
      longDescription:
        "Built in 38 hours at the national Eco Hackathon 2026. GREEN LOOP is a circular economy platform with multi-role dashboards for restaurants, drivers, farms, and admins. The judges chose us not for our code quality — but because our business model was the only one in the room that made financial sense.",
      tech: ["React.js", "JavaScript", "Context API", "Responsive Design"],
      image: greenloop, // replace with your GREEN LOOP image when you have it
      metrics: "🏆 1st Place • 38 Teams Defeated • Built in 38 Hours",
      gradient: "from-green-500 to-emerald-600",
      problem:
        "Restaurants pay to dispose of organic waste while farms pay high prices for chemical fertilizers. Two industries bleeding money with no connection between them.",
      solution:
        "A three-sided marketplace connecting restaurants (waste supply), drivers (logistics), and farms (demand) with automated conversion tracking and a gamified Green Points reward system.",
      impact:
        "1st place nationally • Simulates 30% waste-to-fertilizer conversion • Creates economic incentives for sustainable waste management",
      features: [
        "Multi-role dashboard system (Restaurant, Driver, Farm, Admin)",
        "Real-time pickup tracking (Uber-style logistics)",
        "Automated Green Points reward engine for restaurants",
        "Transparent nutrient profiles (NPK breakdown) for farms",
        "Complete circular flow visualization",
        "Built and deployed in 38 hours",
      ],
      featured: true,
      year: "2026",
      role: "Lead Frontend Developer & Product Architect",
    },
    // {
    //   title: "University Application Tracker",
    //   description:
    //     "AI-powered platform to manage UK university applications — deadlines, deposits, visa timelines, offer statuses, all in one place. Built for my own MSc application process.",
    //   longDescription:
    //     "Built out of necessity. Managing visa deadlines, deposit timings, university offers, and IELTS results simultaneously required a system. So I built one — powered by Claude AI for document analysis and application guidance.",
    //   tech: ["React", "Tailwind CSS", "Claude AI", "Vercel"],
    //   image: universityApplicationTracker,
    //   metrics: "Live • Used Daily • Impressed UK Students",
    //   gradient: "from-purple-500 to-blue-600",
    //   problem:
    //     "UK postgraduate applications involve simultaneous tracking of visa timelines, bank deposits, IELTS deadlines, university offers, and CAS letters — impossible to manage on paper.",
    //   solution:
    //     "Built a personal SaaS-style tracker with AI integration to analyze documents, track deadlines, and guide through each step of the UK student visa process.",
    //   impact:
    //     "Used daily for real application management • Shared with UK-based Algerian student who responded 'WAWWWW — Ure on the right path'",
    //   features: [
    //     "University offer status tracking",
    //     "Visa timeline and deadline management",
    //     "Bank deposit countdown (28-day requirement)",
    //     "IELTS result tracking",
    //     "AI-powered document analysis",
    //     "Clean dashboard with all application stages",
    //   ],
    //   featured: true,
    //   year: "2026",
    //   role: "Founder & Full-Stack Developer",
    // },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      field: "Information Systems",
      institution: "HIS | Higher Institute of Sciences",
      duration: "October 2022 - July 2025",
      status: "Graduated",
      location: "Algiers, Algeria",
      description:
        "Focused on practical application and innovation in information systems, with final year project on multi-vendor e-commerce platform.",
      highlights: [
        "Final year project: Multi-vendor e-commerce platform (Laravel 10)",
        "Active member of academic excellence programs",
        "Participated in mobility programs",
        "Graduation ceremony: December 2025",
      ],
      skills: [
        "Problem Solving",
        "Database Design",
        "System Analysis",
        "Software Engineering",
        "Project Management",
      ],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      degree: "Full-Stack JavaScript Bootcamp",
      field: "Web Development",
      institution: "Code213 - Tech School",
      duration: "March 2024 - September 2024",
      status: "Completed with 98.5/100",
      location: "Algeria",
      description:
        "Intensive 6-month bootcamp covering modern web development with MERN stack, achieving exceptional performance as top student.",
      highlights: [
        "Scored 98.5/100 (Top performer)",
        "Hands-on workshops after each chapter",
        "Mini hackathon with industry professionals",
        "Startup & employability training",
        "Career development support",
      ],
      curriculum: [
        "HTML5, CSS3, JavaScript ES6+",
        "React.js (Hooks, Context API, State Management)",
        "Node.js & Express.js",
        "MongoDB & Database Design",
        "RESTful API Development",
        "Git/GitHub Version Control",
        "Responsive Design (Bootstrap, Tailwind CSS)",
      ],
      gradient: "from-green-500 to-teal-600",
    },
    {
      degree: "Entrepreneurship 101 Bootcamp",
      field: "Business & Innovation",
      institution: "HIS | Higher Institute of Sciences",
      duration: "March 2023 - April 2023",
      status: "Certified",
      location: "Algiers, Algeria",
      description:
        "16-hour intensive bootcamp covering entrepreneurship fundamentals, innovation, and business model development.",
      highlights: [
        "Design Thinking & Innovation",
        "Business Model Canvas (BMC)",
        "Market Research & Analysis",
        "Pitching & Presentation Skills",
        "No-Code Application Prototype Development",
      ],
      gradient: "from-orange-500 to-pink-600",
    },
    {
      degree: "Project Management 101 Bootcamp",
      field: "Management",
      institution: "HIS | Higher Institute of Sciences",
      duration: "March 23-25, 2024",
      status: "Certified",
      location: "Algiers, Algeria",
      description:
        "16-hour intensive bootcamp on project management fundamentals, team leadership, and event organization.",
      highlights: [
        "Project Management Building Blocks",
        "Event Organization & Coordination",
        "Communication Skills in Teams",
        "Emotional Intelligence in Leadership",
        "Risk Management & Problem Solving",
      ],
      gradient: "from-purple-500 to-indigo-600",
    },
  ];

  const skills = [
    { name: "React.js", level: 90, category: "frontend" },
    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "Tailwind CSS", level: 92, category: "frontend" },
    { name: "HTML5", level: 92, category: "frontend" },
    { name: "CSS3", level: 92, category: "frontend" },
    { name: "Node.js", level: 85, category: "backend" },
    { name: "Express.js", level: 85, category: "backend" },
    { name: "Laravel", level: 88, category: "backend" },
    { name: "PHP", level: 85, category: "backend" },
    { name: "MongoDB", level: 82, category: "database" },
    { name: "MySQL", level: 80, category: "database" },
  ];

  const achievements = [
    {
      title: "1st Place — National Eco Hackathon 2026",
      description:
        "Won Algeria's national entrepreneurship hackathon with GREEN LOOP, defeating 38 competing teams in 38 hours",
      icon: Trophy,
      gradient: "from-yellow-500 to-orange-600",
      year: "2026",
    },
    {
      title: "Top Performer — Code213 Bootcamp",
      description:
        "Scored 98.5/100 in intensive 6-month Full-Stack JavaScript bootcamp highest in cohort",
      icon: Award,
      gradient: "from-blue-500 to-purple-600",
      year: "2024",
    },
    {
      title: "Promoted to Full-Stack Developer",
      description:
        "Promoted from IT Service Desk to Full-Stack Developer at DELFIV after only 2 months",
      icon: Rocket,
      gradient: "from-cyan-500 to-blue-600",
      year: "2026",
    },
    {
      title: "Team Lead at 21",
      description:
        "Promoted to manage a 5-person sales team across 3 Algerian cities while completing university degree",
      icon: Users,
      gradient: "from-amber-500 to-orange-600",
      year: "2022",
    },
    {
      title: "BSc Computer Science",
      description:
        "Graduated with Bachelor's Degree in Information Systems from HIS University",
      icon: GraduationCap,
      gradient: "from-green-500 to-teal-600",
      year: "2025",
    },
    {
      title: "+3,301 LinkedIn Followers",
      description:
        "Built authentic professional brand from zero 6,804 impressions on single post",
      icon: Globe,
      gradient: "from-cyan-500 to-blue-600",
      year: "2026",
    },
    {
      title: "8+ Tech Events Organized",
      description:
        "Co-led IT Department at No Limit Club, organizing AiQuest'25 (36-hour hackathon) and 7+ other events",
      icon: Calendar,
      gradient: "from-purple-500 to-indigo-600",
      year: "2024-2025",
    },
    {
      title: "Met Professors : Riyadh Baghdadi",
      description:
        "Algeria → Sorbonne → MIT AI researcher. His words: Success is about empowering others.",
      icon: BookOpen,
      gradient: "from-pink-500 to-rose-600",
      year: "2026",
    },
  ];

  const stats = [
    { label: "Years Experience", value: "5+", icon: Calendar },
    { label: "Projects Completed", value: "8+", icon: CheckCircle },
    { label: "Technologies", value: "30+", icon: Code },
    { label: "Events Organized", value: "8+", icon: Users },
    { label: "LinkedIn Followers", value: "3,301", icon: Globe },
    { label: "Hackathon Winner", value: "1st", icon: Trophy },
  ];

  const ExperienceModal = ({ experience, onClose }) => {
    if (!experience) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-black/50 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center z-10">
            <div>
              <h3 className="text-2xl font-bold">{experience.title}</h3>
              <p className="text-gray-400">{experience.company}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {experience.duration}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                {experience.location}
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full">
                {experience.type}
              </span>
            </div>

            <p className="text-gray-300 text-lg">{experience.description}</p>

            {experience.responsibilities && (
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-400">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {experience.responsibilities.map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <CheckCircle
                        size={20}
                        className="text-green-400 flex-shrink-0 mt-0.5"
                      />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {experience.achievements && (
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-400">
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <Trophy
                        size={20}
                        className="text-yellow-400 flex-shrink-0 mt-0.5"
                      />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold mb-3">Skills Used</h4>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-black/50 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center z-10">
            <div>
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-gray-400">
                {project.role} • {project.year}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {project.downloadUrl && (
              <a
                href={project.downloadUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-full transition-all duration-300 border border-emerald-500/20 font-medium"
              >
                <Download size={20} />
                Download Project Overview
              </a>
            )}
            <div>
              {project.landingPage ? (
                <img
                  src={project.landingPage}
                  className="w-auto h-auto rounded-xl"
                  alt={project.title}
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              )}
            </div>

            <p className="text-gray-300 text-lg">{project.longDescription}</p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  Problem
                </h4>
                <p className="text-gray-300">{project.problem}</p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Solution
                </h4>
                <p className="text-gray-300">{project.solution}</p>
              </div>

              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-400" />
                  Impact
                </h4>
                <p className="text-gray-300">{project.impact}</p>
              </div>
            </div>

            {project.features && (
              <div>
                <h4 className="text-lg font-semibold mb-4">Key Features</h4>
                <ul className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <CheckCircle
                        size={20}
                        className="text-green-400 flex-shrink-0 mt-0.5"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}

      <div
        className="fixed inset-0 opacity-30 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3), transparent 50%)`,
        }}
      />

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl max-w-[90vw] overflow-x-auto">
        <div className="flex gap-4 items-center whitespace-nowrap">
          {[
            "hero",
            "about",
            "experience",
            "projects",
            "education",
            "skills",
            "achievements",
            "contact",
          ].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize transition-all duration-300 text-sm md:text-base ${
                activeSection === section
                  ? "text-blue-400 scale-110"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </nav>

      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative px-6"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            transform: `translate(${scrollY * 0.5}px, ${scrollY * 0.3}px)`,
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 mt-5 gap-2  justify-center items-center flex-wrap flex">
            <span className=" px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm border border-blue-500/30">
              Available for Opportunities
            </span>
            <span className="px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-400 text-sm border border-yellow-500/30">
              🏆 1st Place · National Hackathon 2026
            </span>
          </div>

          <Profile3DScene imageUrl={profileImage} />
          <h1 className="text-6xl md:text-9xl font-bold mb-6 ">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent -mt-8">
              Said Abdelaziz
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-400 mb-4">
            Full-Stack Developer & Future Entrepreneur · 🏆 National Hackathon
            Winner
          </p>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-4">
            I help businesses build fast, scalable web applications that convert
            users into customers. Specialized in MERN stack, Laravel, and
            conversion-optimized interfaces.
          </p>

          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-400 mb-12">
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              Algiers, Algeria (GMT+1)
            </span>
            <span className="flex items-center gap-2">
              <Globe size={16} />
              Arabic • French • English
            </span>
            <span className="flex items-center gap-2">
              <Trophy size={16} />
              98.5/100 Bootcamp Score
            </span>
          </div>

          <div className="flex flex-wrap gap-6 justify-center mb-12">
            <a
              href="#contact"
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            >
              Hire Me
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20"
            >
              View Work
            </a>
            <a
              href="https://abdelaziz-business-card.vercel.app/"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20"
            >
              View Business Card
            </a>
            <a
              href="/Said_Abdelaziz_Resume_2026.pdf"
              download
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20 flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <stat.icon className="mx-auto mb-2 text-blue-400" size={24} />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/x-aziz"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/said-abdelaziz-238986302"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://wa.me/213669085027"
              className="text-gray-400 hover:text-green-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/said_abdelazize"
              className="text-gray-400 hover:text-pink-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/aziz.said.923519"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/said_abdelaziz"
              className="text-gray-400 hover:text-sky-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="X / Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://t.me/said_abdelaziz"
              className="text-gray-400 hover:text-sky-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <a
              href="https://discord.com/users/aziz0272"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="Discord"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.104.12 18.15.15 18.18a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <button
              onClick={copyEmail}
              className="text-gray-400 hover:text-white transition-colors relative"
              title="Copy email"
            >
              <Mail size={24} />
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="min-h-screen flex items-center px-6 py-20 relative"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Hi, I'm{" "}
                <span className="text-white font-semibold">Said Abdelaziz</span>{" "}
                a 22-year-old Full-Stack Developer and entrepreneur from
                Algeria. I won 1st place at the 2026 national Eco Hackathon
                beating 38 teams. I managed a 5-person sales team across 3
                cities at 21. I build systems that solve real problems.
              </p>
              <p className="text-xl text-gray-400 leading-relaxed">
                I specialize in{" "}
                <span className="text-white font-semibold">
                  MERN stack and Laravel
                </span>
                , helping small businesses, startups, and independent sellers
                turn their ideas into reliable products from e-commerce
                platforms to custom dashboards and secure back-end systems.
              </p>

              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">
                  Why Work With Me?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I don't just write code I focus on{" "}
                  <span className="text-white">clean architecture</span>,{" "}
                  <span className="text-white">performance optimization</span>,
                  and <span className="text-white">business goals</span>. As a
                  recent graduate with top academic performance (98.5/100 in
                  Code213 bootcamp), I bring fresh knowledge of the latest
                  technologies combined with real-world project experience.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <Code className="text-blue-400 mb-3" size={32} />
                  <h3 className="text-2xl font-bold mb-2">10+</h3>
                  <p className="text-gray-400">Completed Projects</p>
                </div>

                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <Briefcase className="text-purple-400 mb-3" size={32} />
                  <h3 className="text-2xl font-bold mb-2">5+</h3>
                  <p className="text-gray-400">Years Experience</p>
                </div>

                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <Users className="text-green-400 mb-3" size={32} />
                  <h3 className="text-2xl font-bold mb-2">8+</h3>
                  <p className="text-gray-400">Events Organized</p>
                </div>

                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <Globe className="text-pink-400 mb-3" size={32} />
                  <h3 className="text-2xl font-bold mb-2">+3,301</h3>
                  <p className="text-gray-400">LinkedIn Followers</p>
                </div>
              </div>
            </div>

            <div className="relative space-y-6">
              <div className="p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/10">
                <div className="text-center space-y-4">
                  <Award className="mx-auto text-blue-400" size={64} />
                  <div>
                    <p className="text-4xl font-bold">98.5 / 100</p>
                    <p className="text-gray-400">Code213 Full-Stack Bootcamp</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-500/20 rounded-full text-yellow-400 text-sm border border-yellow-500/30">
                      Top Performer
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl backdrop-blur-sm border border-white/10">
                <div className="text-center space-y-4">
                  <GraduationCap className="mx-auto text-green-400" size={64} />
                  <div>
                    <p className="text-2xl font-bold">BSc Computer Science</p>
                    <p className="text-gray-400">Information Systems</p>
                    <p className="text-sm text-gray-500 mt-2">
                      HIS University • July 2025
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
                Spoken Languages
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                  <Globe size={24} className="mx-auto mb-2 text-blue-400" />
                  <p className="text-xs text-gray-400">Arabic</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                  <Globe size={24} className="mx-auto mb-2 text-purple-400" />
                  <p className="text-xs text-gray-400">French</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                  <Globe size={24} className="mx-auto mb-2 text-pink-400" />
                  <p className="text-xs text-gray-400">English</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-center text-gray-400 text-xl mb-16 max-w-2xl mx-auto">
            Professional journey spanning IT support, leadership, and full-stack
            development
          </p>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                onClick={() => setSelectedExperience(exp)}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer p-8"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`p-4 bg-gradient-to-br ${exp.gradient} rounded-2xl`}
                  >
                    <exp.icon size={32} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                        <p className="text-gray-400 text-lg">{exp.company}</p>
                      </div>
                      <ExternalLink
                        className="text-gray-400 group-hover:text-white transition-colors"
                        size={20}
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        {exp.location}
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full">
                        {exp.type}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {exp.skills.length > 4 && (
                        <span className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20">
                          +{exp.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="min-h-screen px-6 py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
          <p className="text-center text-gray-400 text-xl mb-16 max-w-2xl mx-auto">
            Real projects solving real problems.{" "}
            <span className="text-blue-400">Swipe</span> or click arrows to
            explore.
          </p>

          {/* Slider Container */}
          <div className="relative">
            <div
              className="overflow-hidden rounded-3xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="min-w-full px-2">
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                    >
                      {project.featured && (
                        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6 p-8">
                        {/* Image */}
                        <div className="aspect-video overflow-hidden rounded-2xl relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br opacity-60 mix-blend-multiply" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-3xl font-bold">
                              {project.title}
                            </h3>
                            <ExternalLink
                              className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0"
                              size={24}
                            />
                          </div>
                          <p className="text-gray-400 text-lg">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-blue-400 pt-2 flex items-center gap-2">
                            <TrendingUp size={16} />
                            {project.metrics}
                          </p>
                          {project.downloadUrl && (
                            <div className="pt-2">
                              <a
                                href={project.downloadUrl}
                                download="/PirimiProjectOverview.pdf"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm border border-white/10 transition-colors"
                              >
                                <Download size={16} /> PDF Overview
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all hover:scale-110 z-10"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all hover:scale-110 z-10"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-600"
                      : "w-3 h-3 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Optional: Project Grid Below Slider */}
          {/* <div className="mt-16">
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-400">All Projects</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedProject(project);
              goToSlide(index);
            }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold mb-2">{project.title}</h4>
              <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div> */}
        </div>
      </section>
      {/* <section id="projects" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
          <p className="text-center text-gray-400 text-xl mb-16 max-w-2xl mx-auto">
            Real projects solving real problems. Click any project to see the full case study.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}

                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br opacity-60 mix-blend-multiply" />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <ExternalLink
                      className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0"
                      size={20}
                    />
                  </div>
                  <p className="text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-blue-400 pt-2">
                    {project.metrics}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section id="education" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education & Certifications
            </span>
          </h2>
          <p className="text-center text-gray-400 text-xl mb-16 max-w-2xl mx-auto">
            Continuous learning through academic excellence and professional
            development
          </p>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8"
              >
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${edu.gradient} opacity-10 blur-3xl`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                      <p className="text-xl text-gray-400">{edu.field}</p>
                    </div>
                    <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm border border-green-500/30">
                      {edu.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      {edu.institution}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {edu.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {edu.location}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">{edu.description}</p>

                  {edu.highlights && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-blue-400">
                        Highlights
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {edu.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <CheckCircle
                              size={18}
                              className="text-green-400 flex-shrink-0 mt-0.5"
                            />
                            <span className="text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {edu.curriculum && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-purple-400">
                        Curriculum
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.curriculum.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.skills && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3">
                        Skills Developed
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <div className="space-y-8 mb-16">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-xl font-semibold">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Frontend</h3>
              <p className="text-gray-400 mb-4">
                React, Tailwind CSS, Bootstrap, jQuery, Responsive Design, Figma
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">
                  HTML5
                </span>
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">
                  CSS3
                </span>
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs">
                  JavaScript
                </span>
              </div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-purple-400">
                Backend
              </h3>
              <p className="text-gray-400 mb-4">
                Node.js, Express, Laravel, PHP, RESTful APIs, JWT Authentication
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">
                  API Design
                </span>
                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">
                  Security
                </span>
                <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">
                  Performance
                </span>
              </div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-pink-400">
                Database & Tools
              </h3>
              <p className="text-gray-400 mb-4">
                MongoDB, MySQL, Database Design, Git/GitHub, VS Code, Postman
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-pink-500/20 rounded text-xs">
                  SQL
                </span>
                <span className="px-2 py-1 bg-pink-500/20 rounded text-xs">
                  NoSQL
                </span>
                <span className="px-2 py-1 bg-pink-500/20 rounded text-xs">
                  Version Control
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Achievements & Recognition
            </span>
          </h2>
          <p className="text-center text-gray-400 text-xl mb-16 max-w-2xl mx-auto">
            Milestones and accomplishments throughout my journey
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] p-8"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.gradient} opacity-20 blur-2xl`}
                />

                <div className="relative">
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br ${achievement.gradient} rounded-2xl mb-4`}
                  >
                    <achievement.icon size={32} />
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {achievement.description}
                  </p>
                  <span className="text-sm text-gray-500">
                    {achievement.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center px-6 py-20 relative"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
              Let's talk about everything!
            </p>
            <p className="text-gray-500 mt-2">
              Don't like forms? Send me an{" "}
              <a
                href="mailto:said.abd.el.aziz.cs@gmail.com"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                email
              </a>
              . 👋
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="order-2 md:order-1">
              {state.succeeded ? (
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Send size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thanks for reaching out! I'll get back to you as soon as
                    possible. 🚀
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:scale-105 transition-transform"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold mb-2 text-gray-300"
                    >
                      Your Message
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-4 top-6 text-gray-400"
                        size={20}
                      />
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        rows="6"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      state.submitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/50"
                    }`}
                  >
                    {state.submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <button
                onClick={handleEmailClick}
                className="block w-full text-left p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105 group"
              >
                <Mail
                  className="mb-4 text-blue-400 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <p className="text-sm text-gray-400 mb-2">Email</p>
                <p className="font-semibold text-lg">
                  said.abd.el.aziz.cs@gmail.com
                </p>
                {emailCopied && (
                  <p className="text-sm text-green-400 mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Email copied to clipboard!
                  </p>
                )}
              </button>

              <a
                href="tel:+213669085027"
                className="block p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:scale-105 group"
              >
                <Phone
                  className="mb-4 text-purple-400 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <p className="text-sm text-gray-400 mb-2">Phone</p>
                <p className="font-semibold text-lg">+213 669 085 027</p>
                <p className="font-semibold text-lg">+213 553 643 785</p>
              </a>

              <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <MapPin className="mb-4 text-pink-400" size={32} />
                <p className="text-sm text-gray-400 mb-2">Location</p>
                <p className="font-semibold text-lg">
                  Bab Ezzouar, Algiers, Algeria
                </p>
                <p className="text-sm text-gray-500 mt-2">GMT+1 Timezone</p>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://github.com/x-aziz"
                  className="flex-1 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 transition-all hover:scale-105 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-sm">GitHub</p>
                </a>
                <a
                  href="https://www.linkedin.com/in/said-abdelaziz-238986302"
                  className="flex-1 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 transition-all hover:scale-105 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mx-auto mb-2 text-blue-400" size={24} />
                  <p className="text-sm">LinkedIn</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        <p>© 2026 Said Abdelaziz. Built with React & Tailwind CSS.</p>
        <p className="text-sm text-gray-500 mt-2">
          Full-Stack Developer · Future Entrepreneur · 🏆 National Hackathon
          Winner · Algeria
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
