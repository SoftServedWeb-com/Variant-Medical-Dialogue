import { NextRequest } from "next/server";
import { generateObject, generateText } from 'ai';
import { AIMLAPI, openAPI } from "@/lib/providers/openai";
import { ICD10Schema } from "@/lib/schema/ICD10-schema";
import { db } from "@/db";

// export async function POST(req: NextRequest) {
//     const { patientId, transcription }: { patientId: string, transcription: string } = await req.json();

//     const patient = await db.patient.findUnique({
//         where: {
//             id: patientId
//         }
//     });

//     if (!patient) {
//         return new Response(JSON.stringify({ error: "Patient not found" }), { status: 404 });
//     }

//     try {
//         const ICD10Code = await generateText({
//             system: `You are a medical expert. You are given a transcription of a patient's conversation with a doctor. 
//             You need to extract the ICD-10 codes from the conversation.
//             YOU ARE PROVIDING THE ICD10 Codes for the Doctor!!.
//             !!! DO NOT EVER PROVIDE ANY FALSE INFORMATION.!!!
//             PROVIDE ALL THE CODES IF MULTIPLE ARE FOUND.
//             GENERATE A JSON ARRAY OF OBJECTS WITH THE FOLLOWING STRUCTURE:
//             {
//                 "overallSeverity": "OVERALL_SEVERITY",
//                 "ICD10Codes": [
//                     {
//                         "code": "CODE",
//                         "description": "DESCRIPTION",
//                         "severity": "SEVERITY"
//                     }
//                 ]
//             }`,


//             model: AIMLAPI('gpt-4o-mini'),
//             prompt: `Here is the transcription: ${transcription}`,
//         });

//         // console.log("ICD10Code:", JSON.stringify(ICD10Code.text, null, 2));
//         console.log("ICD10Code:", ICD10Code.text);

    

//         return new Response(JSON.stringify({ responses: ICD10Code.text }), { 
//             status: 200,
//             headers: { 'Content-Type': 'application/json' }
//         });
//     } catch (error) {
//         console.error("Error processing transcription:", error);
//         return new Response(JSON.stringify({ error: "API Response error" }), { 
//             status: 500,
//             headers: { 'Content-Type': 'application/json' }
//         });
//     }
// }

export async function POST(req: NextRequest) {
    const { patientId, transcription }: { patientId: string, transcription: string } = await req.json();

    const patient = await db.patient.findUnique({
            where: {
                id: patientId
            }
        });
    
        if (!patient) {
            return new Response(JSON.stringify({ error: "Patient not found" }), { status: 404 });
        }
    try{
    const result = await openAPI.chat.completions.create({
        model: 'o1-mini',
        messages: [
            {
                role: 'user',
                content: `You are a medical expert. You are given a transcription of a patient's conversation with a doctor. 
                            You need to extract the ICD-10 codes from the conversation.
                            YOU ARE PROVIDING THE ICD10 Codes for the Doctor!!.
                            !!! DO NOT EVER PROVIDE ANY FALSE INFORMATION.!!!
                            PROVIDE ALL THE CODES IF MULTIPLE ARE FOUND.
                            GENERATE A JSON ARRAY OF OBJECTS WITH THE FOLLOWING STRUCTURE:
                            {
                                "overallSeverity": "OVERALL_SEVERITY",
                                "ICD10Codes": [
                                    {
                                        "code": "CODE",
                                        "description": "DESCRIPTION",
                                        "severity": "SEVERITY"
                                    }
                                ]
                            }
                            Here is the transcription: ${transcription}
                            ` ,
            }
        ],
        max_tokens:65000,
      })
      

      const message = result;
      console.log(`Assistant: ${message.choices[0].message.content}`);

      return new Response(JSON.stringify({ responses: message }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error processing transcription:", error);
        return new Response(JSON.stringify({ error: "o1 Response error" }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


