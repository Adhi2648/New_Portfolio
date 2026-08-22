import {
  ExternalLink,
  Mail,
  MessageSquare,
  Briefcase,
  Code2,
  GraduationCap,
  Terminal,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChatBot from "./components/ChatBot";
import AnimatedText from "./components/AnimatedText";
import ScrollReveal from "./components/ScrollReveal";
import { Particles } from "./components/Particles";
import { Marquee } from "./components/Marquee";
import { BorderBeam } from "./components/BorderBeam";
import { CustomCursor } from "./components/CustomCursor";
import {
  EDUCATION,
  EXPERIENCES,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const graphicRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const sections = ["hero", "skills", "experience", "projects", "education"];
    // Cache DOM references to avoid querying document.getElementById on every scroll frame
    const elements = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let currentSection = "hero";
          const threshold = 180; // trigger highlighting when section top is within 180px of viewport top

          for (const el of elements) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              currentSection = el.id;
            }
          }
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Store callback reference so we can properly remove it on cleanup
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen text-brand-50 bg-brand-900 overflow-hidden font-sans">
      <CustomCursor />
      
      {/* Blended Logo Overlay */}
      <div className="fixed top-0 left-0 w-full z-[60] px-6 py-6 pointer-events-none mix-blend-difference">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-bold text-xl tracking-tighter pointer-events-auto text-white"
          >
            Adhi.dev
          </button>
        </div>
      </div>
      
      {/* Minimal Navbar (Links) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-transform duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-end pointer-events-auto">
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              {["skills", "experience", "projects", "education"].map((sec) => {
                const isActive = activeSection === sec;
                return (
                  <button
                    key={sec}
                    onClick={() => scrollToSection(sec)}
                    className={`capitalize transition-colors relative py-1 ${
                      isActive ? "text-accent font-semibold" : "text-brand-300 hover:text-white"
                    }`}
                  >
                    {sec}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Bottom Nav for Mobile & Tablet */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-[360px] md:hidden select-none">
        <div className="flex items-center justify-around px-2 py-2 rounded-full border border-brand-800 bg-brand-950/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {[
            { id: "skills", label: "Skills", icon: Code2 },
            { id: "experience", label: "Exp", icon: Briefcase },
            { id: "projects", label: "Projects", icon: Terminal },
            { id: "education", label: "Edu", icon: GraduationCap },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all relative ${
                  isActive ? "text-accent scale-105" : "text-brand-300 hover:text-white"
                }`}
              >
                <Icon size={20} className={isActive ? "drop-shadow-[0_0_8px_var(--color-accent)]" : ""} />
                <span className="text-[10px] font-semibold mt-1 capitalize tracking-wide">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_var(--color-accent)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center relative px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Particles
            className="absolute inset-0"
            quantity={70}
            ease={80}
            color="#10b981"
            staticity={50}
          />
        </div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Text content */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <p className="text-brand-400 font-mono text-sm tracking-widest uppercase">
              {PERSONAL_INFO.title}
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] font-bold leading-[1.1] tracking-tighter max-w-5xl">
              <AnimatedText text="Hi," /> <br />
              <AnimatedText text="I'm" delay={0.2} />{" "}
              <AnimatedText 
                text="Adhi" 
                delay={0.3} 
                className="text-hollow" 
              />
            </h1>
            <div className="mt-4 max-w-2xl">
              <ScrollReveal delay={0.6} direction="up" distance={20}>
                <p className="text-xl md:text-2xl text-brand-300 font-medium leading-relaxed">
                  Specializing in microservices, cloud infrastructure, and RAG pipelines.
                  Building systems that scale.
                </p>
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={0.8} direction="up" distance={20} className="mt-4">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="bg-brand-50 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-white transition-colors"
                >
                  View Work
                </button>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="border border-brand-700 bg-brand-900/50 hover:bg-brand-800 text-brand-50 px-8 py-4 rounded-full font-bold transition-colors flex items-center gap-2"
                >
                  Ask My AI
                </button>
              </div>
            </ScrollReveal>

            {/* Social links */}
            <ScrollReveal delay={1.0} direction="up" distance={20}>
              <div className="flex items-center gap-5 mt-4">
                <a href={`https://${PERSONAL_INFO.github}`} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-50 transition-colors duration-200">
                  <FaGithub size={24} />
                </a>
                <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-50 transition-colors duration-200">
                  <FaLinkedin size={24} />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-brand-400 hover:text-brand-50 transition-colors duration-200">
                  <Mail size={24} />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Abstract Space Graphic */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 z-0">
            <ScrollReveal delay={0.3} direction="right" distance={40}>
              <div className="relative mt-6 lg:mt-0 flex justify-center items-center">
                <div className="relative animate-[float_10s_ease-in-out_infinite] will-change-transform">
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(16,185,129,0.15) 0%, transparent 60%)" }} />
                  <img 
                    ref={graphicRef}
                    src="/hero-graphic.png" 
                    alt="Abstract Space Singularity" 
                    decoding="async"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-[360px] md:w-[500px] lg:w-[650px] object-contain opacity-[0.85] scale-110 md:scale-125 lg:scale-150 transition-transform duration-700 hover:scale-[1.55] select-none"
                    style={{
                      WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
                      maskImage: "radial-gradient(circle at center, black 30%, transparent 70%)"
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">
              Skills & Stack
            </h2>
          </ScrollReveal>
          
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {SKILLS.flatMap((g) => g.items).map((skill) => (
                <div
                  key={skill}
                  className="flex items-center justify-center px-6 py-3 rounded-xl border border-brand-800 bg-brand-900/50 shadow-sm"
                >
                  <span className="text-brand-100 font-medium text-lg">{skill}</span>
                </div>
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:25s] mt-4">
              {SKILLS.flatMap((g) => g.items).reverse().map((skill) => (
                <div
                  key={skill}
                  className="flex items-center justify-center px-6 py-3 rounded-xl border border-brand-800 bg-brand-900/50 shadow-sm"
                >
                  <span className="text-brand-100 font-medium text-lg">{skill}</span>
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-brand-900"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand-900"></div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-brand-800/30">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-20">
              Experience
            </h2>
          </ScrollReveal>

          <div className="space-y-16">
            {EXPERIENCES.map((exp, idx) => (
              <ScrollReveal key={idx} direction="up" distance={30}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 group">
                  <div>
                    <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">
                      {exp.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                      {exp.role}
                    </h3>
                    {(exp.company || exp.location) && (
                      <p className="text-accent font-medium mb-6">
                        {[exp.company, exp.location].filter(Boolean).join(" • ")}
                      </p>
                    )}
                    <ul className="space-y-4">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-brand-300 leading-relaxed max-w-2xl text-lg flex items-start gap-4">
                          <span className="text-brand-600 mt-2">—</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-20">
              Selected Work
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-16 md:gap-32">
            {PROJECTS.map((project, idx) => (
              <ScrollReveal key={project.title} direction="up" distance={40}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative p-8 rounded-2xl bg-brand-800/20 border border-brand-800/50 group-hover:bg-brand-800/30 transition-colors overflow-hidden">
                  <BorderBeam size={250} duration={12} delay={idx * 2} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="md:col-span-5 md:sticky md:top-32">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map((s) => (
                        <span key={s} className="px-3 py-1 bg-brand-800 text-brand-300 text-sm font-mono rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-50 border-b border-brand-500 pb-1 hover:border-brand-50 transition-colors"
                      >
                        View Source {project.link.includes('github.com') ? <FaGithub size={16} /> : <ExternalLink size={16} />}
                      </a>
                    )}
                  </div>
                  <div className="md:col-span-7 flex flex-col gap-6">
                    {project.description.map((desc, dIdx) => (
                      <p key={dIdx} className="text-xl text-brand-300 leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-6 bg-brand-800/30">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-20">
              Education
            </h2>
          </ScrollReveal>

          <div className="space-y-16">
            {EDUCATION.map((edu, idx) => (
              <ScrollReveal key={idx} direction="up">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8">
                  <div>
                    <span className="text-brand-400 font-mono text-sm tracking-wider uppercase block mb-2">
                      {edu.period}
                    </span>
                    {edu.gpa && (
                      <span className="text-brand-300 text-sm">
                        GPA: <strong className="text-brand-50">{edu.gpa}</strong>
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-accent font-medium mb-6">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span key={course} className="text-brand-400 text-sm border border-brand-700 px-3 py-1 rounded-full">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-800 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-brand-400 text-sm font-mono uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Adhi Narayanan Ramesh
          </p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-brand-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
            <a href={`https://${PERSONAL_INFO.github}`} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
            <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* Chat Bot Interface */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-brand-50 text-brand-900 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-50"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default App;
