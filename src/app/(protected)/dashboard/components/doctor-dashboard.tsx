'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Calendar, Users, Clock, Settings, Eye, Check, X, Clock as ClockIcon, Search, Upload, Download, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { DatePicker } from '@/components/ui/date-picker'
import { Appointment, AppointmentStatus, Patient, PatientHistory, Severity, severityColor } from '@/lib/types'
import AppointmentTab from './tabs/appointment-tab'
import PatientsTab from './tabs/patients-tab'
import Historytab from './tabs/history-tab'
import SettingsTab from './tabs/settings-tab'
import UpcomingTab from './tabs/upcoming-tab'


export function DoctorDashboardComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: "John Doe", condition: "Acute Myocardial Infarction", severity: Severity.SEVERE, status: AppointmentStatus.PENDING, date: new Date("2024-10-10") },
    { id: 2, patientName: "Jane Smith", condition: "Pneumonia", severity: Severity.MODERATE, status: AppointmentStatus.CONFIRMED, date: new Date("2024-10-11") },
    { id: 3, patientName: "Bob Johnson", condition: "Fractured Wrist", severity: Severity.LOW, status: AppointmentStatus.RESCHEDULED, date: new Date("2024-10-12") },
  ])
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "John Doe", age: 45, lastVisit: new Date("2024-09-15") },
    { id: 2, name: "Jane Smith", age: 32, lastVisit: new Date("2024-09-20") },
    { id: 3, name: "Bob Johnson", age: 58, lastVisit: new Date("2024-09-25") },
  ])

  const [patientHistory, setPatientHistory] = useState<PatientHistory[]>([
    { id: 1, lastVisitOn: new Date("2024-09-15"), severity: Severity.SEVERE, condition: "Acute Myocardial Infarction", nextVisit: new Date("2024-10-10") },
    { id: 2, lastVisitOn: new Date("2024-09-20"), severity: Severity.MODERATE, condition: "Pneumonia", nextVisit: new Date("2024-10-20") },
    { id: 3, lastVisitOn: new Date("2024-09-25"), severity: Severity.LOW, condition: "Fractured Wrist", nextVisit: new Date("2024-10-25") },
  ])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleAppointmentAction = (id: number, action: 'Confirm' | 'Reschedule' | 'Reject') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: action === 'Confirm' ? AppointmentStatus.CONFIRMED : action === 'Reschedule' ? AppointmentStatus.RESCHEDULED : AppointmentStatus.REJECTED } : appointment
    ))
  }



  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}


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
                <AppointmentTab appointments={appointments} />
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