import { NextRequest } from "next/server";
import {generateObject, generateText} from 'ai'
import {openai } from "@ai-sdk/openai"
import { ICD10Schema } from "@/lib/schema/ICD10-schema";
import { AIMLAPI, openAPI } from "@/lib/providers/openai";


export async function POST(req:NextRequest){
    const {transcription} : {transcription:string} = await req.json();
    // console.log(transcription)

    // const ICD10Code = await generateObject({
    //     system:`You are a medical expert. You are given a transcription of a patient's conversation with a doctor. 
    //     You need to extract the ICD-10 codes from the conversation.
    //     The conversation is in the language of the patient.
    //     !!! DONNOT EVER PROVIDE ANY FALSE INFORMATION.!!!
    //     `,
    //     model:AIMLAPI('gpt-4o'),
    //     schema: ICD10Schema,
    //     prompt: `Here is the transcription: ${transcription}`,
        

    // }).catch((e)=>{
    //     console.log(e)
    //     return new Response(JSON.stringify({error:e.message}), {status:500})
    // })
    const ICD10Code = await generateText({
        system:`You are a medical expert. You are given a transcription of a patient's conversation with a doctor. 
        You need to extract the ICD-10 codes from the conversation.
        YOU ARE PROVIDING THE ICD10  Codes for the Doctor!!.
        !!! DONNOT EVER PROVIDE ANY FALSE INFORMATION.!!!
        PROVIDE ALL THE CODE IF MULTIPLE ARE FOUND.
        GENERATE A JSON ARRAY OF OBJECTS WITH THE FOLLOWING STRUCTURE:
        [
            {
                "code": "CODE",
                "description": "DESCRIPTION",
                "severity": "SEVERITY"
            }
        ]
        `,
        model:AIMLAPI('gpt-4o-mini'),
        // schema: ICD10Schema,
        prompt: `Here is the transcription: ${transcription}`,
        

    }).catch((e)=>{
        console.log(e)
        return new Response(JSON.stringify({error:e.message}), {status:500})
    })


  
    console.log("ICD10Code:", JSON.stringify(ICD10Code.text, null, 2));
    console.log("ICD10Code:", ICD10Code.text);




    return new Response(JSON.stringify({responses:ICD10Code.text}), {status:200})



}   