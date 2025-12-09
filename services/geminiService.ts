import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisData, GrammarType, Message } from "../types";

// Helper to clean JSON string if Markdown code blocks are present
const cleanJsonString = (str: string): string => {
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '');
  }
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '');
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.replace(/```$/, '');
  }
  return cleaned.trim();
};

// Shortened schema to save tokens
const grammarResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    zh: {
      type: Type.STRING,
      description: "Chinese translation."
    },
    s: {
      type: Type.ARRAY,
      description: "Grammar segments.",
      items: {
        type: Type.OBJECT,
        properties: {
          t: { type: Type.STRING, description: "Segment text." },
          ty: { 
            type: Type.STRING, 
            enum: Object.values(GrammarType),
            description: "Sentence Component Type (sbj=Subject, pred=Predicate, obj=Object, attr=Attribute/定语, adv=Adverbial/状语, cmp=Complement/补语, oth=Appositive/同位语)."
          },
          lbl: { type: Type.STRING, description: "Component label in Chinese (e.g. 主语, 谓语, 宾语, 定语, 状语, 补语, 同位语)." },
          pos: { type: Type.STRING, description: "Part of speech in Chinese (e.g. 名词, 动词)." },
          zh: { type: Type.STRING, description: "Chinese translation of segment." }
        },
        required: ["t", "ty", "lbl", "pos", "zh"]
      }
    }
  },
  required: ["zh", "s"]
};

export const translateTextToEnglish = async (text: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: `Translate to natural English. Return ONLY the English text. Text: "${text}"`,
  });

  return response.text?.trim() || text;
};

// Independent analysis request (No History)
export const analyzeText = async (text: string): Promise<AnalysisData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: `Analyze this English sentence structure. Break it down into Sentence Components (Subject, Predicate, Object, Attribute, Adverbial, Complement, Appositive). 
    Return JSON with:
    - zh: Full Chinese translation.
    - s: Array of segments.
    For each segment:
    - t: The text snippet.
    - ty: Component Type (sbj, pred, obj, attr, adv, cmp, oth).
    - lbl: Chinese Component Name (主语, 谓语, 宾语, 定语, 状语, 补语, 同位语).
    - pos: Part of Speech in Chinese (名词, 动词, 形容词...).
    - zh: Segment translation.
    
    Text: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: grammarResponseSchema,
      temperature: 0.1, 
    }
  });

  const jsonText = cleanJsonString(response.text || "{}");
  try {
    return JSON.parse(jsonText) as AnalysisData;
  } catch (e) {
    console.error("Failed to parse analysis response", e);
    // Fallback if parsing fails
    return {
      zh: "Translation unavailable",
      s: [{ t: text, ty: GrammarType.OTHER, lbl: "Text", pos: "Unknown", zh: "" }]
    };
  }
};

// Pure Chat Request (With History, Returns String)
export const generateChatResponse = async (
  history: Message[], 
  userInput: string, 
  systemInstruction: string
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });

  // Map history to simple text turns
  const contents = history
    .filter(msg => msg.type !== 'divider') // Filter out dividers from actual API payload if needed, or handle logical break before calling
    .map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

  contents.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    }
  });

  return response.text?.trim() || "I'm sorry, I couldn't generate a response.";
};