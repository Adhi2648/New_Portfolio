import { GoogleGenAI } from "@google/genai";
import { Bot, Loader2, Send, Sparkles, User, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  EDUCATION,
  EXPERIENCES,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
} from "../constants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const renderMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code class="bg-slate-700 px-1 rounded text-xs">$1</code>',
    )
    .replace(/\n/g, "<br />");
};

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Adhi's digital assistant. Ask me anything about his projects, experience, or skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (userMsg: string) => {
    try {
      setLoading(true);
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });

      const systemInstruction = `
        You are an AI recruiter assistant for Adhi Narayanan Ramesh. 
        Your goal is to answer questions about Adhi's professional background, technical skills, and projects based on the provided resume data.
        
        DATA ABOUT ADHI:
        - Name: ${PERSONAL_INFO.name}
        - Role: ${PERSONAL_INFO.title}
        - Experience: ${JSON.stringify(EXPERIENCES)}
        - Projects: ${JSON.stringify(PROJECTS)}
        - Skills: ${JSON.stringify(SKILLS)}
        - Education: ${JSON.stringify(EDUCATION)}
        - Summary: ${PERSONAL_INFO.summary}

        RULES:
        - Be professional, helpful, and enthusiastic about Adhi's skills.
        - If a question is not about Adhi, politely redirect back to his portfolio.
        - Keep answers concise but informative.
        - Use Markdown for bullet points or emphasis.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: "user", content: userMsg }].map(
          (m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          }),
        ),
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const aiText =
        response.text ||
        "I'm sorry, I couldn't process that. Try asking about Adhi's RAG system!";
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting to my brain. Please try again later!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    generateResponse(userMsg);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-[100]">
      {/* Header */}
      <div className="p-4 bg-blue-600 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">
              Adhi's Digital Twin
            </h3>
            <span className="text-[10px] opacity-75">AI Assistant</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 p-1 rounded-md transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-950/50"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-blue-600" : "bg-slate-800 border border-slate-700"}`}
            >
              {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none"}`}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
            />
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <Bot size={14} />
            </div>
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl flex items-center gap-2">
              <Loader2 className="animate-spin text-blue-500" size={16} />
              <span className="text-sm text-slate-400">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-slate-900 border-t border-slate-800"
      >
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my projects..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-800 rounded-lg transition-colors"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
