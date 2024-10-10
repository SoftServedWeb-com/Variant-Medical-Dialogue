'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Appointment, AppointmentStatus, Patient, PatientHistory, Severity } from '@/lib/types'
import AppointmentTab from './tabs/appointment-tab'
import PatientsTab from './tabs/patients-tab'
import Historytab from './tabs/history-tab'
import SettingsTab from './tabs/settings-tab'
import UpcomingTab from './tabs/upcoming-tab'


export function DoctorDashboardComponent() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientId: "patient1",
      patientName: "John Doe", // Add patient name
      doctorId: "doctor1",
      condition: "Acute Myocardial Infarction",
      severity: Severity.SEVERE,
      status: AppointmentStatus.PENDING,
      date: new Date("2024-10-10"),
      duration: 60,
      icd10Codes: [
        { id: "icd1", code: "I21.0", description: "Acute transmural myocardial infarction of anterior wall", severity: Severity.SEVERE, appointmentId: "1" }
      ]
    },
    {
      id: "2",
      patientId: "patient2",
      patientName: "Jane Smith", // Add patient name
      doctorId: "doctor1",
      condition: "Pneumonia",
      severity: Severity.MODERATE,
      status: AppointmentStatus.CONFIRMED,
      date: new Date("2024-10-11"),
      duration: 45,
      icd10Codes: [
        { id: "icd2", code: "J15.9", description: "Unspecified bacterial pneumonia", severity: Severity.MODERATE, appointmentId: "2" }
      ]
    },
    {
      id: "3",
      patientId: "patient3",
      patientName: "Bob Johnson", // Add patient name
      doctorId: "doctor1",
      condition: "Fractured Wrist",
      severity: Severity.LOW,
      status: AppointmentStatus.RESCHEDULED,
      date: new Date("2024-10-12"),
      duration: 30,
      icd10Codes: [
        { id: "icd3", code: "S52.5", description: "Fracture of lower end of radius", severity: Severity.LOW, appointmentId: "3" }
      ]
    },
  ])

  const [patients, setPatients] = useState<Patient[]>([
    { id: "patient1",age: 40, patientName: "John Doe", email: "john@example.com", phone: "123-456-7890", dateOfBirth: new Date("1979-05-15"), doctorId: "doctor1", lastVisitOn: new Date("2024-09-15"), numberOfVisits: 3, chronicCondition: "Acute Myocardial Infarction", nextVisitOn: new Date("2024-10-10") },
    { id: "patient2", age: 28, patientName: "Jane Smith", email: "jane@example.com", phone: "234-567-8901", dateOfBirth: new Date("1992-08-20"), doctorId: "doctor1", lastVisitOn: new Date("2024-09-20"), numberOfVisits: 2, chronicCondition: "Pneumonia", nextVisitOn: new Date("2024-10-20") },
    { id: "patient3", age: 55, patientName: "Bob Johnson", email: "bob@example.com", phone: "345-678-9012", dateOfBirth: new Date("1966-03-10"), doctorId: "doctor1", lastVisitOn: new Date("2024-09-25"), numberOfVisits: 1, chronicCondition: "Fractured Wrist", nextVisitOn: new Date("2024-10-25") },
  ])

  const [patientHistory, setPatientHistory] = useState<PatientHistory[]>([
    { id: "history1", patientId: "patient1", lastVisitOn: new Date("2024-09-15"), severity: Severity.SEVERE, numberOfVisits: 3, condition: "Acute Myocardial Infarction", nextVisitOn: new Date("2024-10-10") },
    { id: "history2", patientId: "patient2", lastVisitOn: new Date("2024-09-20"), severity: Severity.MODERATE, numberOfVisits: 2, condition: "Pneumonia", nextVisitOn: new Date("2024-10-20") },
    { id: "history3", patientId: "patient3", lastVisitOn: new Date("2024-09-25"), severity: Severity.LOW, numberOfVisits: 1, condition: "Fractured Wrist", nextVisitOn: new Date("2024-10-25") },
  ])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }



  return (
    <div className="flex h-screen bg-gray-100">



      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
 
        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <Tabs defaultValue="appointments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Appointments Section */}
              <TabsContent value="appointments">
                <AppointmentTab appointments={appointments} setAppointments={setAppointments} />
              </TabsContent>

              <TabsContent value="upcoming">
                <UpcomingTab appointments={appointments} />
              </TabsContent>

              {/* Patients Section */}
              <TabsContent value="patients">
                <PatientsTab patients={patients} />
              </TabsContent>

              {/* History Section */}
              <TabsContent value="history">
                <Historytab history={patientHistory}/>
              </TabsContent>

              {/* Settings Section */}
              <TabsContent value="settings">
                <SettingsTab/>
              </TabsContent>
            </Tabs>

            {/* Upcoming Appointments Section */}

          </div>
        </main>
      </div>
    </div>
  )
}