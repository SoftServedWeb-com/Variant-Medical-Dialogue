import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, generateText, streamText } from "ai";
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request

const { messages, patientMedicalHistory, transcription } = await req.json();

// const response = await generateText({
//     model: openai("gpt-4o-mini"),
//     system: `You are a doctor's assistant that can answer questions and help with tasks.
//     You are given a patient's medical history and a transcription of a medical report summarized from 
//     the conversation between the doctor and the patient.
//     You will also be given the ICD-10 code for the patient's condition.
//     Use this information to answer the questions.

//     Patient's Medical History: ${patientMedicalHistory}
//     Transcription: ${transcription}
//     `,
//     prompt: `The doctor asks the following questions: ${messages}` ,
// })
console.log("in route :: ", messages, patientMedicalHistory, transcription);

const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: `You are a doctor's assistant that can answer questions and help with tasks.
    You are given a patient's medical history and a transcription of a medical report summarized from 
    the conversation between the doctor and the patient.
    You will also be given the ICD-10 code for the patient's condition.
    Use this information to answer the questions.

    Patient's Medical History: ${patientMedicalHistory}
    Transcription: ${transcription}
    `,
    prompt: `The doctor asks the following questions: ${messages}` ,
    messages: convertToCoreMessages(messages),
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // implement your own logic here, e.g. for storing messages
      console.log(text);
      // or recording token usage
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();



}