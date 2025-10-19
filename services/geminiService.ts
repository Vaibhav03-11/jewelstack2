
import { GoogleGenAI, Type } from "@google/genai";

// FIX: Initialize ai only if API_KEY is available to prevent constructor errors.
const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

if (!ai) {
  console.warn("API_KEY not found. Please set the environment variable. Gemini services will be unavailable.");
}

export const predictDiamondPrice = async (carat: number, cut: string): Promise<string> => {
  // FIX: Return a valid JSON string on error to match caller's expectation.
  if (!ai) return JSON.stringify({ predictionText: "Error", explanation: "API Key not configured." });
  try {
    const prompt = `As a jewelry expert, predict the percentage price increase for a diamond with the following characteristics. Provide a short, one-sentence explanation.
      - Carat Weight: ${carat}
      - Cut Quality: ${cut}
      
      Return the result as a JSON object with two keys: "predictionText" (e.g., "+18%") and "explanation".`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictionText: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          // FIX: Added required fields to improve schema reliability.
          required: ["predictionText", "explanation"],
        },
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error predicting diamond price:", error);
    return JSON.stringify({ predictionText: "Error", explanation: "Could not fetch prediction." });
  }
};

export const getGoldRecommendation = async (ornament: string, purity: string): Promise<string> => {
  if (!ai) return "API Key not configured.";
  try {
    const prompt = `As a jewelry advisor, give a concise recommendation for a customer interested in a ${purity} ${ornament}. Mention its key benefit (e.g., durability, value).`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error getting gold recommendation:", error);
    return "Could not fetch recommendation.";
  }
};

export const generateStockingReport = async (): Promise<string> => {
  if (!ai) return "API Key not configured.";
  try {
    const prompt = `Based on current market trends, generate a smart stocking report for a jewelry store. Provide three actionable bullet points. For example: "- Focus on 22K gold for upcoming festival season due to high demand."`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating stocking report:", error);
    return "Could not generate report.";
  }
};
