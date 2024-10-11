"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Clock, Download, Edit, FileText, Phone, PlusCircle, Info } from 'lucide-react'
import { PatientData } from '@/lib/types'
import { saveAs } from 'file-saver'

export function PatientProfileDialog({patientData}: {patientData?: PatientData}) {
  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState("")

  const severityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'severe': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!patientData) {
    return null; // Or render a placeholder/error message
  }

  const generateReport = () => {
    if (!patientData) return;

                const report = `
            Patient Report

            Name: ${patientData.name}
            ID: ${patientData.id}
            Date of Birth: ${patientData.dateOfBirth}

            ICD-10 Codes:
            ${patientData.icd10Codes.map(code => `- ${code.code}: ${code.description} (Severity: ${code.severity})`).join('\n')}

            Patient History:
            Last Visit: ${patientData.history.lastVisitOn || 'N/A'}
            Severity: ${patientData.history.severity || 'N/A'}
            Number of Visits: ${patientData.history.numberOfVisits}
            Condition: ${patientData.history.condition || 'N/A'}
            Next Visit: ${patientData.history.nextVisitOn || 'N/A'}

            Medical Report:
            ${patientData.medicalReport || 'No medical report available.'}

            Additional Notes:
            ${notes}

            Appointments:
            ${patientData.appointments.map(app => `- ${app.type} on ${app.date} at ${app.time}`).join('\n')}
                `.trim();

                const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
                saveAs(blob, `${patientData.name.replace(/\s+/g, '_')}_report.txt`);
              };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Patient Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Patient Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="space-y-6 p-6">
            {/* Header Section */}
            <div className="flex items-center space-x-2">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{patientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-semibold">{patientData.name}</h2>
                <p className="text-xs text-gray-500">{patientData.id} | {patientData.dateOfBirth}</p>
              </div>
            </div>

            {/* ICD-10 Codes Section */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="icd10-codes">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    ICD-10 Codes
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Primary diagnostic codes for this patient</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <ul className="space-y-4 pr-4">
                          {patientData.icd10Codes.map((code, index) => (
                            <li key={index} className="bg-muted p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-lg font-bold">{code.code}</span>
                                <Badge className={severityColor(code.severity)}>{code.severity}</Badge>
                              </div>
                              <p className="text-sm mb-2">{code.description}</p>
                              {code.details && <p className="text-xs text-gray-600">{code.details}</p>}
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Patient History Section */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="history">
                <AccordionTrigger>Patient History</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Last Visit</Label>
                      <p>{patientData.history.lastVisitOn || 'N/A'}</p>
                    </div>
                    <div>
                      <Label>Severity</Label>
                      <Badge className={severityColor(patientData.history.severity || '')}>{patientData.history.severity || 'N/A'}</Badge>
                    </div>
                    <div>
                      <Label>Number of Visits</Label>
                      <p>{patientData.history.numberOfVisits}</p>
                    </div>
                    <div>
                      <Label>Condition</Label>
                      <p>{patientData.history.condition || 'N/A'}</p>
                    </div>
                    <div>
                      <Label>Next Visit</Label>
                      <p>{patientData.history.nextVisitOn || 'N/A'}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Medical Report Section */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="medical-report">
                <AccordionTrigger>Medical Report</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">{patientData.medicalReport || 'No medical report available.'}</p>
                  <Textarea
                    placeholder="Add additional notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Appointment Details Section */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="appointments">
                <AccordionTrigger>Appointments</AccordionTrigger>
                <AccordionContent>
                  <Tabs defaultValue="upcoming">
                    <TabsList>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="past">Past</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                      {patientData.appointments.filter(a => new Date(a.date) >= new Date()).map((appointment, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-semibold">{appointment.type}</p>
                            <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm" className="mr-2">Reschedule</Button>
                            <Button variant="outline" size="sm">Cancel</Button>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="past">
                      {patientData.appointments.filter(a => new Date(a.date) < new Date()).map((appointment, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-semibold">{appointment.type}</p>
                            <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <Button variant="outline" className="w-full sm:w-auto">
            <Edit className="w-4 h-4 mr-2" />
            Edit Patient Details
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={generateReport}>
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button variant="default" className="w-full sm:w-auto">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}