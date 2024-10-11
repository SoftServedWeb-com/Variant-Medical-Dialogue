import { Appointment, AppointmentStatus, Patient, Severity } from "@prisma/client";

export const severityColor = (severity: Severity) => {
    switch (severity) {
      case Severity.LOW: return 'bg-gray-50 text-green-600'
      case Severity.MODERATE: return 'bg-gray-50 text-yellow-600'
      case Severity.SEVERE: return 'bg-red-100 text-red-600'
      case Severity.CRITICAL: return 'bg-purple-100 text-purple-600'
      default: return 'bg-gray-50 text-gray-600'
    }
  }

export const statusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING: return 'bg-blue-100 text-blue-600'
      case AppointmentStatus.CONFIRMED: return 'bg-green-100 text-green-600'
      case AppointmentStatus.RESCHEDULED: return 'bg-yellow-100 text-yellow-600'
      case AppointmentStatus.REJECTED: return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }


export enum UserRole {
    DOCTOR = "DOCTOR",
    ADMIN = "ADMIN"
}

export type User = {
    id: string
    email: string
    role: UserRole
}

export type Doctor = {
    id: string
    userId: string
    name: string
    specialty: string
    availability: DoctorAvailability[]
}

export type DoctorAvailability = {
    id: string
    doctorId: string
    dayOfWeek: number
    startTime: string
    endTime: string
}

// export interface Patient {
//     id: string
//     patientName: string
//     age: number
//     email: string
//     phone: string
//     dateOfBirth: Date
//     doctorId: string
 
//     lastVisitOn: Date
//     numberOfVisits: number
//     chronicCondition: string
//     nextVisitOn?: Date
// }

// export interface Appointment {
//     id: string;
//     patientId: string;
//     doctorId: string;
//     condition: string;
//     severity: Severity;
//     status: AppointmentStatus;
//     date: Date;
//     duration: number;
//     icd10Codes: any; // Replace 'any' with a more specific type if possible
//     createdAt: Date;
//     patient: {
//         name: string;
//         // Include other patient properties as needed
//     };
// }

export type Transcription = {
    id: string
    appointmentId: string
    content: string
    createdAt: Date
}

export type ICD10Code = {
    id: string
    code: string
    description: string
    severity: Severity
    appointmentId: string
}

export interface PatientHistory {
    id: string
    patientId: string
    lastVisitOn: Date
    severity: Severity
    numberOfVisits: number
    condition: string
    nextVisitOn: Date
}

export type AppointmentWithPatient = Omit<Appointment, 'patient'> & {
    patient: Patient;
};

