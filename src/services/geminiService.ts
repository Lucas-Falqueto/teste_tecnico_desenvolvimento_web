import { model } from "../config/client-gemini";

export const getMeasurementFromImage = async (base64Image: string) => {
  try {
    const imageBuffer = Buffer.from(base64Image.split(",")[1], "base64");
    const prompt = `Extract the numerical reading from this image and return only the number:`;
    const response = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: "image/png",
        },
      },
    ]);

    const extractedText = response.response.text();

    return extractedText.match(/\b\d{7}\b/g);
  } catch (error) {
    console.error("Error when trying to extract the reading number:", error);
    return null;
  }
};
