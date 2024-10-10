import { NextRequest } from "next/server";
import { generateText } from 'ai';
import { AIMLAPI } from "@/lib/providers/openai";
import { transcription } from "@/lib/misc/dummy-data";

export async function POST(req: NextRequest) {
    const {  model }: {  model: string } = await req.json();

    try {
        const startTime = Date.now();
        const ICD10Code = await generateText({
            system: `You are a medical expert. You are given a transcription of a patient's conversation with a doctor. 
            You need to extract the ICD-10 codes from the conversation.
            YOU ARE PROVIDING THE ICD10 Codes for the Doctor!!.
            !!! DO NOT EVER PROVIDE ANY FALSE INFORMATION.!!!
            PROVIDE ALL THE CODES IF MULTIPLE ARE FOUND.
            GENERATE A JSON ARRAY OF OBJECTS WITH THE FOLLOWING STRUCTURE:
            [
                {
                    "code": "CODE",
                    "description": "DESCRIPTION",
                    "severity": "SEVERITY"
                }
            ]
            `,
            model: AIMLAPI(model),
            prompt: `Here is the transcription: ${transcription}`,
        });
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000; // Convert to seconds

        console.log("ICD10Code:", ICD10Code.text);

        return new Response(JSON.stringify({ responses: ICD10Code.text, timeTaken }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(`Error processing transcription with model ${model}:`, error);
        return new Response(JSON.stringify({ 
            error: `Error processing with model ${model}:${error}`, 
            timeTaken: 0 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}