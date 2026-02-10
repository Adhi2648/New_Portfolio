
export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface Project {
  title: string;
  stack: string[];
  description: string[];
  link?: string;
  image?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  coursework: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}
