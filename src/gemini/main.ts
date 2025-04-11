"use server"
import { getDataForAI } from "@/actions/note";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function main(question: string) {
    const data = await getDataForAI();
    const jsonString = JSON.stringify(data);
    const today = new Date().toLocaleDateString("en-CA");
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are a web assistant for a journal app helping user's questions and try to give answers sufficiently and not too verbose, here is the question ${question} and here is user's previous records ${jsonString} and today is ${today}`,
    });
    return response.text;
}

export default main;