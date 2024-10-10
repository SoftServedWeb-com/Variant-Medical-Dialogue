import { z } from "zod";



export const ICD10Schema =
z.object({
    overallSeverity: z.string().describe("The overall severity of the condition based on the conversation"),
    ICD10Codes: z.array(z.object({
        code: z.string().describe("The ICD10 code"),
        description: z.string().describe("The description of the ICD10 code"),
        severity: z.string().describe("The severity of the ICD10 code"),
    })).describe("Generate all ICD10 codes from the conversation")
})


export type ICD10 = z.infer<typeof ICD10Schema>;