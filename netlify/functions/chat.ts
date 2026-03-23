import { GoogleGenAI } from "@google/genai";
import { Handler } from "@netlify/functions";
import {
  EDUCATION,
  EXPERIENCES,
  LEADERSHIP,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
} from "../../constants";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { messages, userMsg } = JSON.parse(event.body || "{}");

    // Securely use the API key from the server environment, NOT the client
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY, 
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
      - Leadership: ${JSON.stringify(LEADERSHIP)}
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
        (m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })
      ),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ text: response.text }),
    };
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Failed to generate response" }),
    };
  }
};
