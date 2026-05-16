import { Bot, Loader2, Send, Sparkles, User, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
      
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, userMsg }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const aiText =
        data.text ||
        "I'm sorry, I couldn't process that. Try asking about Adhi's RAG system!";
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      console.error("Chat API Error:", err);
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
    <div className="fixed bottom-8 right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-brand-900 border border-brand-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[100] font-sans">
      {/* Header */}
      <div className="p-4 bg-brand-800 flex items-center justify-between text-brand-50 border-b border-brand-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
            <Sparkles size={16} className="text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">
              Adhi's AI
            </h3>
            <span className="text-[10px] text-brand-400">Assistant</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-brand-700 p-1 rounded-md transition-colors text-brand-400 hover:text-brand-50"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-grow p-4 space-y-4 overflow-y-auto bg-brand-900"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-brand-100 text-brand-900" : "bg-brand-800 border border-brand-700 text-brand-300"}`}
            >
              {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user" ? "bg-brand-100 text-brand-900 rounded-tr-none" : "bg-brand-800 text-brand-200 border border-brand-700 rounded-tl-none"}`}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
            />
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-800 border border-brand-700 flex items-center justify-center shrink-0 text-brand-300">
              <Bot size={14} />
            </div>
            <div className="bg-brand-800 border border-brand-700 p-3 rounded-2xl flex items-center gap-2">
              <Loader2 className="animate-spin text-accent" size={16} />
              <span className="text-sm text-brand-400">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-brand-900 border-t border-brand-800"
      >
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my projects..."
            className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-sm text-brand-50 focus:outline-none focus:border-accent transition-all pr-12 placeholder:text-brand-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 p-1.5 bg-brand-100 hover:bg-white disabled:opacity-50 disabled:bg-brand-800 rounded-lg transition-colors"
          >
            <Send size={18} className="text-brand-900" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
