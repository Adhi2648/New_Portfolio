import {
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
  MessageSquare,
  Terminal,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Background3D from "./components/Background3D";
import ChatBot from "./components/ChatBot";
import CustomCursor from "./components/CustomCursor";
import SkillRadar from "./components/SkillRadar";
import {
  EDUCATION,
  EXPERIENCES,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
} from "./constants";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "skills",
        "experience",
        "projects",
        "education",
      ];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPos >= element.offsetTop &&
          scrollPos < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen text-slate-200 selection:bg-blue-500/30">
      <CustomCursor />
      <Background3D />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-[100] glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
              A
            </div>
            <span className="font-bold text-lg hidden sm:block tracking-tight"></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {["skills", "experience", "projects", "education"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`hover:text-blue-400 transition-all uppercase outline-none ${activeSection === sec ? "text-blue-400 scale-110" : ""}`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://${PERSONAL_INFO.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href={`https://${PERSONAL_INFO.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={(PERSONAL_INFO as any).resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
            >
              <FileText size={14} /> Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center relative pt-24 px-6"
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left - Photo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6 pt-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 rounded-3xl opacity-60 blur-lg group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-white/10">
                <img
                  src="/Adhi_pic.jpg"
                  alt="Adhi Narayanan Ramesh"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold tracking-tight text-slate-200">
                Hi, I'm <span className="gradient-text">Adhi</span> 👋
              </p>
              <p className="text-sm text-slate-400 mt-1 font-medium">
                AI Engineer & Software Developer
              </p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex-1 space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              New Grad May 2026 · Open to AI & SDE Roles
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
              Engineering <br />
              <span className="gradient-text">Neural</span> Systems.
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium">
              Building the infrastructure for the next generation of{" "}
              <span className="text-white">AI applications</span>. Specialized
              in RAG, Distributed Systems, and Microservices.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
              >
                Explore Projects <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
              >
                Ask the AI <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1 space-y-8">
              <div className="space-y-2">
                <h2 className="text-5xl font-black tracking-tighter">
                  Technical Arsenal
                </h2>
                <div className="w-20 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="text-slate-400 text-xl leading-relaxed">
                Expertise in architecting{" "}
                <span className="text-white">scalable backend systems</span> and
                high-performance data pipelines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SKILLS.map((group) => (
                  <div
                    key={group.category}
                    className="p-8 rounded-3xl glass hover:border-blue-500/30 transition-all group duration-500"
                  >
                    <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                      <Code2 size={16} /> {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-bold border border-white/5 group-hover:border-blue-500/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/5 flex justify-center scale-110">
              <SkillRadar />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl font-black tracking-tighter mb-20 text-center uppercase">
            Experience
          </h2>

          <div className="relative space-y-16">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-px"></div>

            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="absolute left-[-4px] md:left-1/2 top-0 w-2 h-2 bg-blue-500 rounded-full md:-translate-x-1 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

                <div className="md:w-1/2">
                  <div
                    className={`p-10 rounded-[2.5rem] glass transition-all duration-500 hover:scale-[1.01] border-white/5 ${idx % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}
                  >
                    <span className="text-blue-500 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
                      {exp.period}
                    </span>
                    <h3 className="text-3xl font-black tracking-tight mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-slate-400 mb-6 font-bold text-sm uppercase tracking-wider">
                      {exp.company} • {exp.location}
                    </p>
                    <ul className="space-y-4">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex gap-4 text-slate-400 text-sm leading-relaxed"
                        >
                          <span className="text-blue-500 mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl font-black tracking-tighter uppercase">
              Featured Work
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Production-grade AI systems and engineering experiments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="group relative flex flex-col p-10 rounded-[2.5rem] glass border-white/5 hover:border-blue-500/50 transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.25)]"
              >
                <div className="mb-10 flex justify-between items-start">
                  <div className="p-4 bg-blue-600/10 rounded-2xl text-blue-400 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-500">
                    {project.title.includes("AI") ||
                    project.title.includes("RAG") ? (
                      <Cpu size={32} />
                    ) : (
                      <Globe size={32} />
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-600 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-blue-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed font-medium">
                  {project.description[0]}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/5 rounded-lg text-slate-400 border border-white/5 group-hover:border-blue-500/20 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-black tracking-tighter mb-16 text-center uppercase">
            Education
          </h2>
          <div className="space-y-6">
            {EDUCATION.map((edu) => (
              <div
                key={edu.degree}
                className="p-10 rounded-[2.5rem] glass flex flex-col md:flex-row justify-between gap-8 transition-all duration-500 hover:border-blue-500/30"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 border border-white/5"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0 flex flex-col justify-center">
                  <span className="block text-slate-500 font-mono text-xs font-bold tracking-widest uppercase">
                    {edu.period}
                  </span>
                  {edu.gpa && (
                    <span className="block text-blue-400 font-black text-2xl mt-2 tracking-tighter">
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-10 mb-10">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-500 hover:text-white transition-all hover:scale-125"
            >
              <Mail size={24} />
            </a>
            <a
              href={`https://${PERSONAL_INFO.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-all hover:scale-125"
            >
              <Github size={24} />
            </a>
            <a
              href={`https://${PERSONAL_INFO.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-all hover:scale-125"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.3em]">
            &copy; 2024 Adhi Narayanan Ramesh • Engineered for Performance
          </p>
        </div>
      </footer>

      {/* Chat Bot Interface */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 hover:rotate-6 transition-all z-[100] active:scale-95"
        >
          <MessageSquare className="text-white" size={28} />
        </button>
      )}
    </div>
  );
};

export default App;
