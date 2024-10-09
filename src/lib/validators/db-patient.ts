import {z} from 'zod';

export const createPatientValidator = z.object({
    patientId: z.string(),
    patientName: z.string(),
    patientEmail: z.string(),
    patientPhone: z.string(),
    patientAge: z.number(),
    doctorPrefered: z.boolean(),
    doctorId: z.string(),

}); 


export const checkPatientValidator = z.object({
    patientId: z.string(),
    doctorId: z.string(),
    doctorPrefered: z.boolean(),
}); 
