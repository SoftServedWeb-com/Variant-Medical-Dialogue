'use client'

import React, { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
  // import {
  //   Appointment,
  //   AppointmentStatus,
  //   Severity,
  //   severityColor,
  //   statusColor,
  // } from "@/lib/types";

import { DataTable } from "../data-table";
import { appointmentColumns } from "../columns";
import { AppointmentWithPatient } from "@/lib/types"; // Import the new type
import { AppointmentStatus, Severity } from "@prisma/client";

export default function AppointmentTab({
  appointments,
  setAppointments,
}: {
  appointments: AppointmentWithPatient[];
  setAppointments?: (appointments: AppointmentWithPatient[]) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">(
    "all"
  );
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  //TODO: Implement appointment actions, FUTURE
  // const handleAppointmentAction = (
  //   id: string,
  //   action: "Confirm" | "Reschedule" | "Reject"
  // ) => {
  //   setAppointments(
  //     appointments.map((appointment) =>
  //       appointment.id === id
  //         ? {
  //             ...appointment,
  //             status:
  //               action === "Confirm"
  //                 ? AppointmentStatus.CONFIRMED
  //                 : action === "Reschedule"
  //                 ? AppointmentStatus.RESCHEDULED
  //                 : AppointmentStatus.REJECTED,
  //           }
  //         : appointment
  //     )
  //   );
  // };


console.log(appointments)

  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter !== "all" && appointment.status !== statusFilter)
      return false;
    if (severityFilter !== "all" && appointment.severity !== severityFilter)
      return false;
    if (
      dateFilter &&
      appointment.date.toDateString() !== dateFilter.toDateString()
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Appointments</h2>

      <DataTable
        columns={appointmentColumns}
        data={filteredAppointments}
        tab={"appointments"}
        filterControls={
          <div className="flex flex-row space-x-2">
            <DatePicker selected={dateFilter} onSelect={setDateFilter} />
            <Select
              onValueChange={(value) =>
                setStatusFilter(value as AppointmentStatus | "all")
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value={AppointmentStatus.CONFIRMED}>
                  Confirmed
                </SelectItem>
                <SelectItem value={AppointmentStatus.PENDING}>
                  Pending
                </SelectItem>
                <SelectItem value={AppointmentStatus.RESCHEDULED}>
                  Rescheduled
                </SelectItem>
                <SelectItem value={AppointmentStatus.REJECTED}>
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) =>
                setSeverityFilter(value as Severity | "all")
              }
            >
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
  );
}
