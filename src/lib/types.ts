import { ColumnDef } from "@tanstack/react-table"

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

export type Appointment = {
    id: number
    patientName: string
    condition: string
    severity: Severity
    status: AppointmentStatus
    date: Date
}

export type Patient = {
    id: number
    name: string
    age: number
    lastVisit: Date
}


export type PatientHistory = {
    id: number
    lastVisitOn: Date
    severity: Severity
    condition: string,
    nextVisit: Date
}



