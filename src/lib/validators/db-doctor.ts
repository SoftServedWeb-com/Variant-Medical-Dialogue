import { z } from "zod";

export const createDoctorValidator=z.object({
    doctorId: z.string(),
    doctorName: z.string(),
    doctorSpeciality: z.string(),
    
   
});