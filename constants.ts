import { Education, Experience, Leadership, Project, SkillGroup } from "./types";

export const PERSONAL_INFO = {
  name: "Adhi Narayanan Ramesh",
  title: "AI Engineer & SDE",
  email: "adhinarayanan619@gmail.com",
  phone: "562-615-1022",
  linkedin: "www.linkedin.com/in/adhinr/",
  github: "github.com/Adhi2648",
  resumeUrl: "/Adhi_SDE_Resume.pdf",
  summary:
    "Software developer graduating May 2026 with experience in full-stack systems, backend engineering, microservices, and cloud deployment. Skilled in JavaScript, Python, React, Node.js, and AWS, with strong problem solving skills and a history of shipping reliable, high-performance software.",
};

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C++",
      "C#",
      "Go",
      "R",
      "SQL",
      "Kotlin",
    ],
  },
  {
    category: "Frameworks & AI",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Flask",
      "Django",
      "Spring Boot",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Hugging Face",
      "LangChain",
      "LangGraph",
      "OpenAI API",
      "RAG",
      "Fine-tuning",
      "Prompt Engineering",
    ],
  },
  {
    category: "Databases & Cloud",
    items: [
      "AWS (EC2, S3, Lambda)",
      "Google Cloud Platform",
      "Vertex AI",
      "Docker",
      "Kubernetes",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "DynamoDB",
      "Pinecone",
      "FAISS",
      "Feature Store",
    ],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "CI/CD",
      "Jira",
      "Postman",
      "WebSockets",
      "gRPC",
      "Spark",
      "Splunk",
      "Grafana",
      "Prometheus",
      "D3.js",
      "PyTest"
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "AI Engineer Intern",
    company: "Helton Law",
    location: "Costa Mesa, CA",
    period: "May 2025 – Present",
    bullets: [
      "Developed React.js/Node.js document upload interface processing 500+ weekly documents, reducing errors by 40%.",
      "Built 8 Express.js/PostgreSQL REST API endpoints improving data retrieval speed by 25%.",
      "Automated document processing workflows with Python, reducing manual entry from 30 to 5 minutes per case.",
      "Collaborated with legal team to gather requirements and deliver case tracking tools achieving 90%+ user satisfaction.",
    ],
  },
  {
    role: "Software Developer",
    company: "CSULB",
    location: "Long Beach, CA",
    period: "Dec 2024 – May 2025",
    bullets: [
      "Managed 10,000+ student records with Python data validation pipelines, reducing processing errors by 40%.",
      "Built 5+ Salesforce workflow automations and backend scripts optimizing the enrollment pipeline.",
      "Resolved 30+ critical bugs in a ReactJS enrollment dashboard, improving page load speed by 40%.",
      "Built a ReactJS admin dashboard with Graylog, Grafana, and Prometheus alerts to monitor document status.",
    ],
  },
  {
    role: "Software engineer",
    company: "Ernst & Young",
    location: "Bangalore, India",
    period: "Aug 2023 – Aug 2024",
    bullets: [
      "Architected InfoSec dashboard serving 200+ analysts, processing 10M+ daily events and reducing threat analysis time by 67%.",
      "Integrated 5+ security APIs (Tenable, Splunk, QRadar, OWASP, Grype) into microservices architecture.",
      "Implemented Redis caching strategies for frequently accessed threat data, reducing database load by 45%.",
      "Engineered automated testing suites using Jest and Mocha achieving 90% code coverage.",
    ],
  },
  {
    role: "Software Engineer",
    company: "TEN: AI Labs",
    location: "Remote",
    period: "Feb 2022 – July 2022",
    bullets: [
      "Developed Java backend services for a high-throughput platform, reducing API latency by 30% by implementing optimized data structures and refining service-to-service communication protocols within a distributed environment.",
      "Integrated AWS S3 and Lambda functions to automate media processing workflows, achieving a 20% reduction in operational costs while maintaining strict performance benchmarks for external client integrations.",
      "Collaborated in an Agile environment to deliver 5+ core feature modules, improving code quality through peer reviews and implementing comprehensive unit tests to ensure production reliability.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "CodeSense AI Code Review Platform",
    link: "https://github.com/Adhi2648/CodeSense-CodeReviewer",
    stack: [
      "Node.js",
      "TypeScript",
      "React",
      "Redis",
      "BullMQ",
      "Tree-sitter",
      "pgvector",
      "Gemini"
    ],
    description: [
      "Architected a production-style code review platform with React, TypeScript, Monaco Editor, GitHub OAuth, and webhook-driven PR analysis, streaming multi-step review feedback in real time across typed services.",
      "Optimized Tree-sitter parsing, BullMQ orchestration, Redis rate limiting, and pgvector retrieval for 10K+ chunks, reducing redundant AI review calls by 60% and keeping Algorithms responsive under concurrent load.",
    ],
  },
  {
    title: "Intelligent Document Q&A System with RAG",
    stack: [
      "Python",
      "LangChain",
      "FAISS",
      "OpenAI API",
      "Docker",
      "Kubernetes",
    ],
    description: [
      "Built production-ready RAG pipeline enabling semantic search across 50,000+ PDF documents with 92% accuracy.",
      "Fine-tuned LLaMA-2 model on custom dataset using LoRA, reducing inference time by 40%.",
    ],
  },
  {
    title: "Axon: AI-Powered Healthcare Assistant",
    stack: ["React Native", "Node.js", "Express", "MongoDB", "Firebase", "AWS"],
    description: [
      "Developed comprehensive healthcare platform for dementia patient care, improving accessibility by 30%.",
      "Implemented cognitive engagement algorithms that improved memory recall metrics by 25%.",
    ],
  },
  {
    title: "Multimodal AI Research Platform",
    stack: [
      "Python",
      "PyTorch",
      "Hugging Face",
      "LangChain",
      "FAISS",
      "PostgreSQL",
      "Redis",
      "FastAPI",
      "React",
      "Docker",
      "Kubernetes",
      "Ray",
    ],
    description: [
      "Designed and implemented a scalable multimodal RAG system combining text and image embeddings to answer domain-specific queries with high relevance.",
      "Built distributed training and inference pipelines using Ray and Hugging Face transformers, deployed via Docker/Kubernetes and monitored with Prometheus and Grafana.",
    ],
  },
];

export const LEADERSHIP: Leadership[] = [
  {
    role: "Team Lead (Winning Team)",
    organization: "Alteryx & CSUF Datathon",
    bullets: [
      "Analyzed transportation data using Alteryx and Tableau to identify optimization opportunities for Orange County Transportation Authority, developing recommendations for improved resource allocation and operational efficiency.",
    ],
  },
  {
    role: "Founder",
    organization: "The Odin Club @ Dayananda Sagar University",
    bullets: [
      "Founded and led a web development-focused coding club, mentoring 20 students, 15 of whom secured internships.",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "Master of Science in Information Systems",
    institution: "California State University, Long Beach",
    period: "Aug 2024 – May 2026",
    gpa: "3.7",
    coursework: [
      "Machine Learning",
      "Database Systems",
      "Cloud Computing (AWS)",
      "Software Engineering",
      "Web Development",
    ],
  },
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Dayananda Sagar University",
    period: "Aug 2019 – May 2023",
    coursework: [
      "Data Structures and Algorithms",
      "Object Oriented Programming",
      "Operating Systems",
      "DBMS",
    ],
  },
];
