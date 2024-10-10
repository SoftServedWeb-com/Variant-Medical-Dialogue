import { AppointmentStatus, Severity } from '@prisma/client';
import {z} from 'zod'

export const dbAppointmentValidator = z.object({
    patientId: z.string(),
    doctorId: z.string(),
    appointmentDate: z.string(),
    condition: z.string(),
    status: z.nativeEnum(AppointmentStatus).default(AppointmentStatus.PENDING),
    severity: z.nativeEnum(Severity).default(Severity.LOW),
    ICD10Codes: z.array(z.object({
        code: z.string(),
        description: z.string(),
        severity: z.string()
    }))
})

// Example dummy data
const dummyAppointmentData = {
    patientId: "PAT123",
    doctorId: "DOC456",
    appointmentTime: "2023-06-15T10:30:00Z",
    condition: "Routine checkup",
    status: AppointmentStatus.PENDING,
    severity: Severity.LOW,
    ICD10Codes: [
        {
            code: "Z00.00",
            description: "Encounter for general adult medical examination without abnormal findings",
            severity: "Low"
        },
        {
            code: "Z71.89",
            description: "Other specified counseling",
            severity: "Low"
        }
    ]
}

export type dbAppointmentValidator = z.infer<typeof dbAppointmentValidator>;