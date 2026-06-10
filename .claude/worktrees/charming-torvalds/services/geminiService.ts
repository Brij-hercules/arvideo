import { GoogleGenAI, Type } from "@google/genai";
import { SERVICE_CATEGORIES } from "../constants";

// Ideally, this should be behind a backend proxy, but for this demo we use it directly.
// The user will need to provide the key or it will be picked up from env if available in a build environment.
const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const analyzeCarIssue = async (userDescription: string, carModel: string) => {
  if (!ai) {
    console.warn("Gemini API Key not found");
    return {
      analysis: "系統未能連接 AI 服務，請稍後再試或直接聯絡師傅。",
      suggestedCategory: "repair",
      estimatedCostRange: "待報價"
    };
  }

  const categoryNames = SERVICE_CATEGORIES.map(c => c.name).join(', ');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User is describing a car problem. Car: ${carModel}. Description: "${userDescription}". 
      You are a Hong Kong car mechanic expert. 
      1. Provide a brief analysis of potential issues (in Traditional Chinese, HK colloquialism allowed).
      2. Suggest the most relevant service category from this list: [${categoryNames}].
      3. Give a very rough price estimate range in HKD (e.g. $500 - $1500) just for reference, be conservative.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING, description: "Brief diagnosis of the problem" },
            suggestedCategory: { type: Type.STRING, description: "The best matching category name" },
            estimatedCostRange: { type: Type.STRING, description: "Estimated cost range in HKD" }
          },
          required: ["analysis", "suggestedCategory", "estimatedCostRange"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      analysis: "AI 分析暫時無法使用，建議您直接提交報價請求讓師傅判斷。",
      suggestedCategory: "repair",
      estimatedCostRange: "待報價"
    };
  }
  
  return null;
};

export const chatWithMechanicAI = async (history: {role: string, parts: {text: string}[]}[], newMessage: string) => {
    if (!ai) return "請設置 API Key 以使用智能助手。";

    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: "你是一位經驗豐富的香港汽車維修顧問。你會用廣東話（書面語或口語皆可）回答用戶關於汽車保養、維修的問題。你的目標是幫助用戶了解問題嚴重性，並引導他們在平台上尋找合適的服務。請保持友善、專業。"
            }
        });

        const result = await chat.sendMessage({ message: newMessage });
        return result.text;
    } catch (e) {
        console.error(e);
        return "對不起，我現在有點忙，請稍後再試。";
    }
}