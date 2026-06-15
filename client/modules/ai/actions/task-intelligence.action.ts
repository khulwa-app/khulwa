"use server";

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash";

// Both actions treat AI as optional: any failure (no key, 429, bad JSON)
// returns null and the caller silently keeps what it has — never an error
// toast in a calm app.

export async function estimateEta(body: string): Promise<number | null> {
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents:
        `Estimate how many minutes of focused work this task realistically takes in one sitting: "${body}". ` +
        "Round to a sensible 5-minute increment between 5 and 240.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { minutes: { type: Type.INTEGER } },
          required: ["minutes"],
        },
      },
    });
    const minutes = JSON.parse(response.text ?? "{}").minutes;
    return Number.isFinite(minutes) && minutes > 0 ? Math.min(240, Math.round(minutes)) : null;
  } catch (error) {
    console.warn("[ai] eta estimation failed", error);
    return null;
  }
}

export async function splitTask(body: string, eta: number): Promise<string[] | null> {
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents:
        `Split this task into 3 to 5 small, concrete, actionable steps, in the same language as the task: ` +
        `"${body}" (estimated ${eta} minutes total). Keep each step to a few words.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: { steps: { type: Type.ARRAY, items: { type: Type.STRING } } },
          required: ["steps"],
        },
      },
    });
    const steps = JSON.parse(response.text ?? "{}").steps;
    if (!Array.isArray(steps)) return null;
    const clean = steps
      .filter((step): step is string => typeof step === "string" && step.trim() !== "")
      .map((step) => step.trim())
      .slice(0, 5);
    return clean.length > 0 ? clean : null;
  } catch (error) {
    console.warn("[ai] task split failed", error);
    return null;
  }
}
