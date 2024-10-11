import { db } from "@/db";
import { openAPI } from "@/lib/providers/openai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    patientId,
    diagnosis,
    transcript,
  }: { patientId: string; diagnosis: string; transcript: string } =
    await req.json();

  const patient = await db.patient.findUnique({
    where: {
      id: patientId,
    },
  });

  if (!patient) {
    return new Response(JSON.stringify({ error: "Patient not found" }), {
      status: 404,
    });
  }
  try {
    // console.log(diagnosis);
 
    const result = await openAPI.chat.completions.create({
      model: "o1-mini",
      messages: [
        {
          role: "user",
          content: `You are an expert in medical diagnosis. You are given a diagnosis and a transcription of the patient along with ICD-10 codes. 
                            You need to generate a summary of the diagnosis and the transcription.
                            YOU ARE PROVIDING THE DIAGNOSIS for the Doctor !!!.
                            !!! DO NOT EVER PROVIDE ANY FALSE INFORMATION.!!!
                      
                            Here is the transcription: ${transcript}
                            Here is the diagnosis: ${diagnosis}
                            `,
        },
      ],
      max_tokens: 65000,
    });

    const message = result;
    console.log(`Assistant: ${message.choices[0].message.content}`);

    return new Response(JSON.stringify({ responses: message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing transcription:", error);
    return new Response(JSON.stringify({ error: "o1 Response error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
