
import { GoogleGenAI } from "@google/genai";
import { ImageData } from "../types";

export const transformToy = async (
  imageData: ImageData,
  customPrompt: string
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure it is configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Construct a prompt that emphasizes the "bringing to life" and "cool bad guy" aspect
  const systemContext = `Bring this toy to life. Transform the character in the photo into a highly detailed, realistic, cinematic 'bad guy' villain. 
  Keep the core identity and colors of the toy recognizable but translate them into a professional movie-quality character design. 
  Give him a cool, epic, and atmospheric background that matches his villainous persona. 
  Use professional lighting, high resolution, and cinematic textures.`;

  const prompt = `${systemContext}\n\nUser Request: ${customPrompt}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData.base64.split(',')[1], // Strip metadata if present
              mimeType: imageData.mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    let generatedImageUrl = '';

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!generatedImageUrl) {
      throw new Error("The model did not return an edited image.");
    }

    return generatedImageUrl;
  } catch (error) {
    console.error("Transformation Error:", error);
    throw error;
  }
};
