"use server";

import { GoogleGenAI } from "@google/genai";
import { env } from "@/lib/env";

const ai = new GoogleGenAI({ apiKey: env.ai.geminiApiKey });

export async function generateText(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text ?? "";
}
