import {
  Award,
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
  LEADERSHIP,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
} from "./constants";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Developer", "AI Engineer", "Data Analyst"];

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "skills",
        "experience",
        "projects",
        "leadership",
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
            className="flex items-center group cursor-pointer py-2"
          >
            <div className="font-black text-2xl tracking-tighter flex items-center">
              <span className="text-slate-200 group-hover:text-white transition-colors duration-300">
                Adhi
              </span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 ml-[2px]"
                style={{ textShadow: '0 0 15px rgba(56, 189, 248, 0.5)' }}
              >
                .Dev
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {["skills", "experience", "projects", "leadership", "education"].map((sec) => (
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
        className="min-h-screen flex items-center justify-center relative pt-12 pb-12 px-6"
      >
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center gap-6 relative z-10 text-center">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-[0.2em] shadow-2xl -mb-3 hover:-translate-y-0.5 transition-transform cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            MS Info Systems · Open to SDE & AI Roles
          </div>

          {/* Main Headline */}
          <div className="space-y-6 flex flex-col items-center relative w-full pt-0">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tighter text-slate-100 text-center">
              Software Developer <br className="hidden md:block" />
              <span className="text-slate-500 font-light mx-2 hidden md:inline"></span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400" style={{ textShadow: '0 0 40px rgba(56,189,248,0.3)' }}>
                AI Engineer.
              </span>
            </h1>

            <h2 className="text-xl md:text-3xl font-medium tracking-tight text-slate-300 max-w-3xl">
              Specializing in <span className="text-cyan-400 font-bold">Microservices</span>, <span className="text-indigo-400 font-bold">Cloud Infra</span>, & <span className="text-purple-400 font-bold">RAG Pipelines</span>.
            </h2>
          </div>

          {/* Quick Tech Stack Row */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {['TypeScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker'].map(tech => (
              <div key={tech} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold backdrop-blur-sm hover:bg-white/10 transition-colors shadow-lg cursor-default">
                {tech}
              </div>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <button
              onClick={() => scrollToSection("projects")}
              className="group relative px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2 transition-colors duration-300">
                Explore Work <ChevronRight size={18} />
              </span>
            </button>

            <button
              onClick={() => setIsChatOpen(true)}
              className="group px-8 py-4 bg-slate-900/40 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all hover:scale-105 hover:border-blue-500/50 active:scale-95 shadow-lg shadow-black/50"
            >
              Ask My AI <Terminal size={18} className="group-hover:text-blue-400 transition-colors" />
            </button>
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

      {/* Leadership Section */}
      <section id="leadership" className="py-32 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-black tracking-tighter mb-16 text-center uppercase">
            Leadership
          </h2>
          <div className="space-y-6">
            {LEADERSHIP.map((item, i) => (
              <div
                key={i}
                className="p-10 rounded-[2.5rem] glass flex flex-col justify-between gap-8 transition-all duration-500 hover:border-blue-500/30 group"
              >
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all shrink-0">
                      <Award size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {item.role}
                      </h3>
                      <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mt-1">
                        {item.organization}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {item.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="text-slate-400 text-sm md:text-base leading-relaxed flex items-start gap-3"
                      >
                        <ChevronRight
                          size={16}
                          className="mt-1 shrink-0 text-blue-500"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
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
            &copy; 2026 Adhi Narayanan Ramesh • Engineered for Performance
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
