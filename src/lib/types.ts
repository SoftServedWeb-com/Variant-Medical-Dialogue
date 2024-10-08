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

export enum Severity {
    LOW = "LOW",
    MODERATE = "MODERATE",
    SEVERE = "SEVERE",
    CRITICAL = "CRITICAL"
}

export enum AppointmentStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    RESCHEDULED = "RESCHEDULED",
    REJECTED = "REJECTED"
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

export type Patient = {
    id: string
    name: string
    age: number
    email: string
    phone: string
    address: string
    dateOfBirth: Date
    doctorId: string
}

export type Appointment = {
    id: string
    patientId: string
    patientName: string // Add this line
    doctorId: string
    condition: string
    severity: Severity
    status: AppointmentStatus
    date: Date
    duration: number
    transcription?: Transcription
    icd10Codes: ICD10Code[]
}

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

export type PatientHistory = {
    id: string
    patientId: string
    lastVisitOn: Date
    severity: Severity
    numberOfVisits: number
    condition: string
    nextVisitOn: Date
}



