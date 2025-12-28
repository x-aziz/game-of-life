import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from '@formspree/react';
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
} from "lucide-react";
import img1 from "./assets/Copilot_20251227_171929.png";
import img2 from "./assets/Copilot_20251227_165348.png";
import img6 from "./assets/Copilot_20251227_165955.png";
import img4 from "./assets/Copilot_20251227_165955.png";
import img5 from "./assets/Copilot_20251227_170309.png";
import img3 from "./assets/Copilot_20251228_103349.png";
import landingPage1 from "./assets/screencapture-ecommerce-test-2025-11-29-14_08_25.png";
import landingPage4 from "./assets/screencapture-127-0-0-1-5500-index18-html-2025-12-13-13_32_35.png";
import landingPage5 from "./assets/screencapture-127-0-0-1-5500-FitLife-html-2025-12-24-17_28_10.png";
import landingPage3 from "./assets/screencapture-127-0-0-1-5500-indexs-html-2025-12-27-12_57_59.png";
import landingPage7 from "./assets/czn2dxiirs6ld3lqegmr.jpg";
import landingPage2 from "./assets/screencapture-localhost-5173-2025-12-28-11_18_01 (1).png";

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  
  // Formspree hook - replace "xdaodwzg" with your actual form ID
  const [state, handleSubmit] = useForm("xdaodwzg");
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

const handleEmailClick = (e) => {
  e.preventDefault();
  navigator.clipboard.writeText('said.abd.el.aziz.cs@gmail.com');
  setEmailCopied(true);
  setTimeout(() => setEmailCopied(false), 2000);
};
const copyEmail = (e) => {
  e.preventDefault();
  navigator.clipboard.writeText('said.abd.el.aziz.cs@gmail.com');
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
          const sections = ["hero", "about", "projects", "skills", "contact"];
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

  const projects = [
    {
      title: "Multi-Vendor E-Commerce Platform",
      description:
        "Complete marketplace enabling multiple vendors to manage products, track sales, and access analytics dashboards",
      tech: ["Laravel 10", "MySQL", "Bootstrap", "AJAX", "PHP"],
      image: img1,
      landingPage: landingPage1,
      metrics: "3 Vendor Categories • Real-time Analytics Dashboard",
      gradient: "from-blue-500 to-purple-600",
      problem:
        "Small businesses needed an affordable way to sell online without building individual platforms",
      solution:
        "Built a centralized marketplace where vendors get instant access to storefront, inventory management, and customer analytics",
      impact: "500+ products managed • Reduced vendor onboarding time by 70%",
      featured: true,
    },
    {
      title: "Forever – MERN E-Commerce",
      description:
        "Full-stack shopping platform with secure authentication, cart management, and payment integration",
      tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      image: img2,
      landingPage: landingPage2,
      metrics: "JWT Auth • RESTful API • Stripe Integration",
      gradient: "from-green-500 to-teal-600",
      problem:
        "Modern e-commerce needed seamless checkout experience with secure user management",
      solution:
        "Developed full MERN stack application with JWT authentication and optimized cart flow",
      impact: "40% faster checkout process • 99.9% authentication success rate",
      featured: true,
    },
    {
      title: "High-Converting Minimalist Landing Page",
      description:
        "Conversion-optimized landing page built with CRO principles, strategic whitespace, and mobile-first design",
      tech: ["HTML5", "Tailwind CSS", "JavaScript", "CRO"],
      image: img3,
      landingPage: landingPage3,
      metrics: "Single-Goal Architecture • Progressive Disclosure",
      gradient: "from-orange-500 to-pink-600",
      problem:
        "Client needed clean, distraction-free landing page that prioritizes conversions over visual complexity",
      solution:
        "Designed minimalist layout using proven CRO principles with strategic CTAs and social proof placement",
      impact:
        "Clean conversion-focused design • Mobile-optimized • 4-field friction-reduced form",
      featured: true,
    },
    {
      title: "Bookmark – Landing Page UI",
      description:
        "Modern landing page for bookmark manager with clean interface and feature showcase",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive"],
      image: img4,
      landingPage: landingPage7,
      metrics: "Feature Tabs • FAQ Accordion • Email Validation",
      gradient: "from-blue-400 to-cyan-600",
      problem:
        "Needed engaging landing page to showcase bookmark management features",
      solution:
        "Created interactive UI with tabbed features section and smooth animations",
      impact: "Interactive feature display • Mobile-responsive design",
      featured: false,
    },
    {
      title: "Manage – Project Management UI",
      description:
        "Landing page for project management platform with testimonial carousel and feature highlights",
      tech: ["HTML5", "CSS3", "JavaScript", "Swiper.js"],
      image: img5,
      landingPage: landingPage4,
      metrics: "Testimonial Carousel • Responsive Grid",
      gradient: "from-orange-500 to-red-600",
      problem:
        "Project management tool needed modern landing page to showcase team collaboration features",
      solution:
        "Built responsive landing with animated testimonials and clear value propositions",
      impact: "Engaging testimonial carousel • Clear feature communication",
      featured: false,
    },
    {
      title: "FitLife Landing Page",
      description:
        "Modern fitness coaching landing page with hero section, service cards, and contact form",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive"],
      image: img6,
      landingPage: landingPage5,
      metrics: "Service Cards • Contact Form • Mobile-First",
      gradient: "from-green-400 to-emerald-600",
      problem:
        "Fitness coach needed professional online presence to attract new clients",
      solution:
        "Designed clean landing page highlighting coaching services with integrated contact form",
      impact: "Professional service presentation • Lead capture form",
      featured: false,
    },
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Laravel", level: 88 },
    { name: "MongoDB", level: 82 },
    { name: "Tailwind CSS", level: 92 },
    { name: "JavaScript", level: 90 },
    { name: "PHP", level: 85 },
    { name: "MySQL", level: 80 },
  ];

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-black/50 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center z-10">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-8">
            <div>
              {project.landingPage ? (
                <img
                  src={project.landingPage}
                  className="w-auto h-auto"
                  alt={project.title}
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

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

            <div className="pt-6 border-t border-white/10">
              <p className="text-gray-400">{project.description}</p>
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

      <div
        className="fixed inset-0 opacity-30 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3), transparent 50%)`,
        }}
      />

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
        <div className="flex gap-6 items-center">
          {["hero", "about", "projects", "skills", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize transition-all duration-300 ${
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
          <div className="mb-8">
            <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm border border-blue-500/30">
              Available for Opportunities
            </span>
          </div>

          <h1 className="text-7xl md:text-9xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Said Abdelaziz
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-400 mb-4">
            Full-Stack Developer
          </p>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
            I help businesses build fast, scalable web applications that convert
            users into customers. Specialized in MERN stack, Laravel, and
            conversion-optimized interfaces.
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
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
              href="/Said Abdelaziz - Resume-1.pdf"
              download
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20 flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </a>
          </div>

          <div className="flex gap-6 justify-center mt-12">
            <a
              href="https://github.com/x-aziz"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/said-abdelaziz-238986302"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:said.abd.el.aziz.cs@gmail.com"
  className="text-gray-400 hover:text-white transition-colors"
  onClick={(e) => {
    // Optional: Add analytics or feedback
    console.log('Email link clicked');
  }}
>
              <button
  onClick={copyEmail}
  className="text-gray-400 hover:text-white transition-colors relative"
  title="Copy email address"
>
  <Mail size={24} />
  {copied && (
    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
      Copied!
    </span>
  )}
</button>
            </a>
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
                Hi, I'm <span className="text-white font-semibold">Said</span> —
                a full-stack web developer specializing in building fast,
                scalable, and user-friendly web applications using
                <span className="text-white font-semibold">
                  {" "}
                  React, MERN stack, and Laravel
                </span>
                .
              </p>
              <p className="text-xl text-gray-400 leading-relaxed">
                I help{" "}
                <span className="text-white">
                  small businesses, startups, and independent sellers{" "}
                </span>
                turn their ideas into real, reliable products — from e-commerce
                platforms to custom dashboards and secure back-end systems.
              </p>

              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">
                  Why Work With Me?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I don't just write code — I focus on{" "}
                  <span className="text-white">clean architecture</span>,
                  <span className="text-white"> performance optimization</span>,
                  and
                  <span className="text-white"> business goals</span>. Clear
                  communication and on-time delivery are part of every project.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <Code className="text-blue-400 mb-3" size={32} />
                  <h3 className="text-2xl font-bold mb-2">6+</h3>
                  <p className="text-gray-400">Completed Projects</p>
                </div>

                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <Briefcase className="text-purple-400 mb-3" size={32} />
                  <h3 className="text-2xl font-bold mb-2">2+</h3>
                  <p className="text-gray-400">Years Experience</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/10 p-8">
                <div className="h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <Award className="mx-auto text-blue-400" size={64} />
                    <div>
                      <p className="text-3xl font-bold">98.5 / 100</p>
                      <p className="text-gray-400">
                        Code213 Full-Stack Program
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">BSc</p>
                      <p className="text-gray-400">Computer Science</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
          <p className="text-center text-gray-400 text-xl mb-16 max-w-2xl mx-auto">
            Real projects solving real problems. Click any project to see the
            full case study.
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
      </section>

      <section id="skills" className="min-h-screen px-6 py-20 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <div className="space-y-8">
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

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Frontend</h3>
              <p className="text-gray-400">
                React, Tailwind CSS, Bootstrap, jQuery, Responsive Design
              </p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-purple-400">
                Backend
              </h3>
              <p className="text-gray-400">
                Node.js, Express, Laravel, PHP, RESTful APIs
              </p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-pink-400">Database</h3>
              <p className="text-gray-400">
                MongoDB, MySQL, Database Design, Query Optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UPDATED CONTACT SECTION WITH FORM */}
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
            {/* CONTACT FORM */}
            <div className="order-2 md:order-1">
              {state.succeeded ? (
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Send size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-400">
                    Thanks for reaching out! I'll get back to you as soon as possible. 🚀
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
                  {/* Name Input */}
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
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Email Input */}
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
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Message Textarea */}
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
                    <ValidationError 
                      prefix="Message" 
                      field="message"
                      errors={state.errors}
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* General Errors */}
                  {state.errors && state.errors.length > 0 && !state.errors.some(e => e.field) && (
                    <div className="p-4 rounded-xl border bg-red-500/10 border-red-500/30 text-red-400">
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  {/* Submit Button */}
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

            {/* CONTACT INFO CARDS */}
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
                <p className="font-semibold text-lg">Algiers, Algeria</p>
                <p className="text-sm text-gray-500 mt-2">GMT+1 Timezone</p>
              </div>

              {/* Social Links */}
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
                  href="https://linkedin.com/in/said-abd-el-aziz"
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
        <p>© 2025 Said Abdelaziz. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default Portfolio;