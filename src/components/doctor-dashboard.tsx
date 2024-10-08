'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Calendar, Users, Clock, Settings, Eye, Check, X, Clock as ClockIcon, Search, Upload, Download, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { DatePicker } from './ui/date-picker'

type Appointment = {
  id: number
  patientName: string
  condition: string
  severity: 'Low' | 'Moderate' | 'Severe'
  status: 'Pending' | 'Confirmed' | 'Rescheduled' | 'Rejected'
  date: string
}

type Patient = {
  id: number
  name: string
  age: number
  lastVisit: string
}

export function DoctorDashboardComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: "John Doe", condition: "Acute Myocardial Infarction", severity: "Severe", status: "Pending", date: "2024-10-10" },
    { id: 2, patientName: "Jane Smith", condition: "Pneumonia", severity: "Moderate", status: "Confirmed", date: "2024-10-11" },
    { id: 3, patientName: "Bob Johnson", condition: "Fractured Wrist", severity: "Low", status: "Rescheduled", date: "2024-10-12" },
  ])
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "John Doe", age: 45, lastVisit: "2024-09-15" },
    { id: 2, name: "Jane Smith", age: 32, lastVisit: "2024-09-20" },
    { id: 3, name: "Bob Johnson", age: 58, lastVisit: "2024-09-25" },
  ])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleAppointmentAction = (id: number, action: 'Confirm' | 'Reschedule' | 'Reject') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: action === 'Confirm' ? 'Confirmed' : action === 'Reschedule' ? 'Rescheduled' : 'Rejected' } : appointment
    ))
  }

  const severityColor = (severity: 'Low' | 'Moderate' | 'Severe') => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Moderate': return 'bg-yellow-100 text-yellow-800'
      case 'Severe': return 'bg-red-100 text-red-800'
    }
  }

  const statusColor = (status: 'Pending' | 'Confirmed' | 'Rescheduled' | 'Rejected') => {
    switch (status) {
      case 'Pending': return 'bg-blue-100 text-blue-800'
      case 'Confirmed': return 'bg-green-100 text-green-800'
      case 'Rescheduled': return 'bg-yellow-100 text-yellow-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <button onClick={toggleSidebar} className="md:hidden">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <Tabs defaultValue="appointments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Appointments Section */}
              <TabsContent value="appointments">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Appointments</h2>
                    <div className="flex space-x-2">
                      {/* <Input type="date" className="w-40" /> */}
                      <DatePicker />
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rescheduled">Rescheduled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Checkbox id="select-all" />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                          <tr key={appointment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Checkbox id={`appointment-${appointment.id}`} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{appointment.condition}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={severityColor(appointment.severity)}>
                                {appointment.severity}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={statusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {appointment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Contact
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline">
                      <Check className="h-4 w-4 mr-2" />
                      Confirm Selected
                    </Button>
                    <Button variant="outline">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      Reschedule Selected
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Patients Section */}
              <TabsContent value="patients">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Patients</h2>
                    <div className="flex space-x-2">
                      <Input type="text" placeholder="Search patients..." className="w-64" />
                      <Button>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {patients.map((patient) => (
                          <tr key={patient.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{patient.age}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Upload  className="h-4 w-4 mr-2" />
                                  Upload Report
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* History Section */}
              <TabsContent value="history">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">History</h2>
                    <div className="flex space-x-2">
                      <Input type="text" placeholder="Search history..." className="w-64" />
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="appointments">Appointments</SelectItem>
                          <SelectItem value="interactions">Interactions</SelectItem>
                          <SelectItem value="severe-cases">Severe Cases</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-red-800">Severe Case: John Doe</h3>
                        <p className="text-sm text-red-600">Acute Myocardial Infarction - 2024-09-15</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">Appointment: Jane Smith</h3>
                        <p className="text-sm text-gray-600">Follow-up Consultation - 2024-09-20</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Transcription
                      </Button>
                    </div>
                    {/* Add more history items here */}
                  </div>
                </div>
              </TabsContent>

              {/* Settings Section */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Settings</h2>
                  
                  <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Dr. Jane Doe" />
                        </div>
                        <div>
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input id="specialization" defaultValue="Cardiology" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                          <Switch id="appointment-reminders" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="severe-cases">Severe Cases Alerts</Label>
                          <Switch id="severe-cases" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-appointments">New Appointment Notifications</Label>
                          <Switch id="new-appointments" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Availability Settings</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-time">Start Time</Label>
                          <Input id="start-time" type="time" defaultValue="09:00" />
                        </div>
                        <div>
                          <Label htmlFor="end-time">End Time</Label>
                          <Input id="end-time" type="time" defaultValue="17:00" />
                        </div>
                      </div>
                    </div>

                    <Button>Save Settings</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Upcoming Appointments Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.filter(a => a.status === 'Confirmed').map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{appointment.condition}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={severityColor(appointment.severity)}>
                            {appointment.severity}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}