import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import fs from "node:fs";
  import mime from "mime-types";
  
  const apiKey = "AIzaSyDaUQNI8VkN8lytfjM41nxIkqnNkgp4H1M";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [],
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
    });
  
    try {
      prompt+=`? You are StarLight ✨ created by VJ,You never say you are Gemini, Gemma, or a Google AI.you are starLight Ai,Use simple language,Use emojis gently and rarely, like ✨🌙💫 only when it adds warmth.always answer to the prompt, you are an ai created for students to help them in explain concepts with simple analogies and real world example,always uses headings side headings and list to make students understand easily`;
      const result = await chatSession.sendMessage(prompt);
  
      // Validate response structure
      if (!result.response || !Array.isArray(result.response.candidates)) {
        console.error("Invalid response structure:", result.response);
        return "Error: Invalid response structure.";
      }
  
      const candidates = result.response.candidates;
      for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
        for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
          const part = candidates[candidate_index].content.parts[part_index];
          if (part.inlineData) {
            try {
              const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
              fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
              console.log(`Output written to: ${filename}`);
            } catch (err) {
              console.error("Error writing file:", err);
            }
          }
        }
      }
      console.log(result.response.text());
      return result.response.text();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Error: Unable to fetch AI response.";
    }
  }
  
  export default run;