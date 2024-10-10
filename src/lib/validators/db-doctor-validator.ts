import { z } from "zod";

export const createDoctorValidator=z.object({
    doctorId: z.string(),
    doctorName: z.string(),
    doctorSpeciality: z.string(),
    doctorAvailability: z.object({
        dayOfWeek: z.number(),
        startTime: z.string(),
        endTime: z.string(),
    }),
   
});



export const updateDoctorAvailabilityValidator=z.object({
    doctorId: z.string(),
    doctorAvailability: z.object({
        dayOfWeek: z.number(),
        startTime: z.string(),
        endTime: z.string(),
    }),
});
