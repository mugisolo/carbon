
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert financial and environmental consultant for Green Ventures Uganda. 
Your goal is to explain the "Uganda Carbon-Ed Bond" based on the pre-feasibility study.

Detailed Context:
- Bond Structure: 20-year term, 20 MtCO2e target, $100M total issue.
- National Forest Context: Uganda currently has approx. 12.4% forest cover.
- Revenue Waterfall: Operating Costs -> Education Escrow -> Investor Coupon -> Community Dividend.
- Education Logic: $9,000/acre escrow for full educational lifecycle of a child.

Tools available:
- googleSearch: For real-time carbon market data, Ugandan regulatory updates, or global environmental news.
- googleMaps: For specific geography or location queries in Uganda (e.g., coordinates of forest reserves).

Thinking Mode:
- For complex financial calculations (NPV, IRR, Monte Carlo) or complex ecological modelling, use your reasoning capability.
`;

export async function askAdvisor(prompt: string, mode: 'search' | 'thinking' | 'maps' = 'search') {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const config: any = {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: mode === 'thinking' ? 1 : 0.7,
  };

  let model = 'gemini-3-flash-preview';

  if (mode === 'search') {
    config.tools = [{ googleSearch: {} }];
  } else if (mode === 'maps') {
    model = 'gemini-2.5-flash';
    config.tools = [{ googleMaps: {} }];
    // Optional: add toolConfig for location if available
  } else if (mode === 'thinking') {
    model = 'gemini-3-pro-preview';
    config.thinkingConfig = { thinkingBudget: 32768 };
    // maxOutputTokens is omitted as per guidelines
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: config,
    });

    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini Advisor Error:", error);
    return { text: "I apologize, but I'm having trouble processing that request.", grounding: [] };
  }
}
