export const severityColor = (severity: Severity) => {
    switch (severity) {
      case Severity.LOW: return 'bg-green-100 text-green-800'
      case Severity.MODERATE: return 'bg-yellow-100 text-yellow-800'
      case Severity.SEVERE: return 'bg-red-100 text-red-800'
      case Severity.CRITICAL: return 'bg-purple-100 text-purple-800'
    }
  }

export const statusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.PENDING: return 'bg-blue-100 text-blue-800'
      case AppointmentStatus.CONFIRMED: return 'bg-green-100 text-green-800'
      case AppointmentStatus.RESCHEDULED: return 'bg-yellow-100 text-yellow-800'
      case AppointmentStatus.REJECTED: return 'bg-red-100 text-red-800'
    }
  }

export enum Severity {
    LOW,
    MODERATE,
    SEVERE,
    CRITICAL
}

export enum AppointmentStatus {
    PENDING,
    CONFIRMED,
    RESCHEDULED,
    REJECTED
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
