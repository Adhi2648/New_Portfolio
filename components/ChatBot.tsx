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
  return (
    text
      // Replace ### Headings
      .replace(
        /###\s*(.+?)(?:\n|$)/g,
        '<strong class="block mt-4 mb-1 text-accent text-base">$1</strong>\n',
      )
      // Replace **bold**
      .replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-brand-50 font-bold">$1</strong>',
      )
      // Replace *italic*
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Replace `code`
      .replace(
        /`(.+?)`/g,
        '<code class="bg-brand-700/50 text-accent px-1.5 py-0.5 rounded text-xs border border-brand-700">$1</code>',
      )
      // Replace line breaks
      .replace(/\n/g, "<br />")
  );
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
  const [messageCount, setMessageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const MAX_MESSAGES_PER_DAY = 3;

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedData = localStorage.getItem("chat_limit_data");

    if (storedData) {
      try {
        const { date, count } = JSON.parse(storedData);
        if (date === today) {
          setMessageCount(count);
        } else {
          localStorage.setItem(
            "chat_limit_data",
            JSON.stringify({ date: today, count: 0 }),
          );
        }
      } catch (e) {
        localStorage.setItem(
          "chat_limit_data",
          JSON.stringify({ date: today, count: 0 }),
        );
      }
    } else {
      localStorage.setItem(
        "chat_limit_data",
        JSON.stringify({ date: today, count: 0 }),
      );
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (userMsg: string) => {
    try {
      setLoading(true);

      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, userMsg }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
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
    if (!input.trim() || loading || messageCount >= MAX_MESSAGES_PER_DAY)
      return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    const newCount = messageCount + 1;
    setMessageCount(newCount);
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(
      "chat_limit_data",
      JSON.stringify({ date: today, count: newCount }),
    );

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
            <h3 className="font-bold text-sm leading-none">Adhi's AI</h3>
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
        data-lenis-prevent="true"
        className="flex-grow p-4 space-y-4 overflow-y-auto bg-brand-900 custom-scrollbar"
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
      <div className="p-4 bg-brand-900 border-t border-brand-800">
        {messageCount >= MAX_MESSAGES_PER_DAY && (
          <div className="text-xs text-brand-400 text-center mb-3 bg-brand-800 py-2 rounded-lg border border-brand-700">
            You've reached the limit of {MAX_MESSAGES_PER_DAY} messages for
            today.
          </div>
        )}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              messageCount >= MAX_MESSAGES_PER_DAY
                ? "Daily limit reached"
                : "Ask about my projects..."
            }
            disabled={messageCount >= MAX_MESSAGES_PER_DAY}
            className="w-full bg-brand-800 border border-brand-700 rounded-xl px-4 py-3 text-sm text-brand-50 focus:outline-none focus:border-accent transition-all pr-12 placeholder:text-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={
              !input.trim() || loading || messageCount >= MAX_MESSAGES_PER_DAY
            }
            className="absolute right-2 top-2 p-1.5 bg-brand-100 hover:bg-white disabled:opacity-50 disabled:bg-brand-800 rounded-lg transition-colors"
          >
            <Send size={18} className="text-brand-900" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
