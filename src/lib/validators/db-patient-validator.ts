import {z} from 'zod';

export const createPatientValidator = z.object({
    patientId: z.string(),
    patientName: z.string(),
    patientEmail: z.string(),
    patientPhone: z.string(),
    DOB: z.string(),
    doctorPrefered: z.boolean().optional().default(false),
    doctorId: z.string().nullable(),

}); 


export const checkPatientValidator = z.object({
    patientId: z.string(),
    doctorId: z.string(),
    doctorPrefered: z.boolean(),
}); 
