import React, { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Appointment, AppointmentStatus, Severity, severityColor, statusColor } from "@/lib/types"
import { Check, ClockIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "../data-table"
import { appointmentColumns } from "../columns"

export default function AppointmentTab({ appointments, setAppointments }: { appointments: Appointment[], setAppointments: (appointments: Appointment[]) => void }){
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
    const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
    const [dateFilter, setDateFilter] = useState<Date | null>(null);

    const handleAppointmentAction = (id: number, action: 'Confirm' | 'Reschedule' | 'Reject') => {
        setAppointments(appointments.map(appointment => 
          appointment.id === id ? { ...appointment, status: action === 'Confirm' ? AppointmentStatus.CONFIRMED : action === 'Reschedule' ? AppointmentStatus.RESCHEDULED : AppointmentStatus.REJECTED } : appointment
        ))
    }

    const filteredAppointments = appointments.filter(appointment => {
        if (statusFilter !== 'all' && appointment.status !== statusFilter) return false;
        if (severityFilter !== 'all' && appointment.severity !== severityFilter) return false;
        if (dateFilter && appointment.date.toDateString() !== dateFilter.toDateString()) return false;
        return true;
    });

    return (
        <div className="space-y-4">
        <DataTable 
            columns={appointmentColumns} 
            data={filteredAppointments}
            filterControls={
                <div className="flex space-x-2">
                    <DatePicker 
                        selected={dateFilter}
                        onSelect={setDateFilter}
                    />
                    <Select onValueChange={(value) => setStatusFilter(value as AppointmentStatus | 'all')}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value={AppointmentStatus.CONFIRMED}>Confirmed</SelectItem>
                            <SelectItem value={AppointmentStatus.PENDING}>Pending</SelectItem>
                            <SelectItem value={AppointmentStatus.RESCHEDULED}>Rescheduled</SelectItem>
                            <SelectItem value={AppointmentStatus.REJECTED}>Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setSeverityFilter(value as Severity | 'all')}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value={Severity.LOW}>Low</SelectItem>
                            <SelectItem value={Severity.MODERATE}>Moderate</SelectItem>
                            <SelectItem value={Severity.SEVERE}>Severe</SelectItem>
                            <SelectItem value={Severity.CRITICAL}>Critical</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            }
        />
      </div>
    )
}