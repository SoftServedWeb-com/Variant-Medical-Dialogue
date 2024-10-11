"use client";

import { Badge } from "@/components/ui/badge";
import { Severity, AppointmentStatus } from "@prisma/client";
import { AppointmentWithPatient, PatientData } from "@/lib/types"; // Import the new type
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Sparkle, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { PatientProfileDialog } from "./patient-dialog-box";
import { severityColor, statusColor } from "@/lib/types";

// Change the type here to AppointmentWithPatient
export const appointmentColumns: ColumnDef<AppointmentWithPatient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">
        {JSON.stringify(row.index)}
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "patientName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">
        {row.original.patient.name}
      </div>
    ),
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">{row.getValue("condition")}</div>
    ),
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as Severity;
      return (
        <Badge className={cn(severityColor(severity))}>
          {/*   <Badge className={cn(`bg-blue-100 text-blue-600`)}> */}
          {/* {console.log(severity)} */}
          {/* {severityColor(severity)} */}
          {severity}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as AppointmentStatus;
      return <Badge className={cn(statusColor(status))}>{status}</Badge>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      return (
        <div className="text-sm text-gray-500 ">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(appointment.id.toString())
              }
            >
              Copy appointment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View patient</DropdownMenuItem>
            <DropdownMenuItem>View appointment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export const patientColumns: ColumnDef<PatientData>[] = [
  {
    accessorKey: "name",
    header: "Patient Name",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => {
      const dob = new Date(row.original.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return <div className="text-sm text-gray-500">{age}</div>;
    },
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit",
    cell: ({ row }) => (
      <div className="text-sm text-gray-500">{row.original.history.lastVisitOn}</div>
    ),
  },
  {
    id: "actions",
    accessorKey: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex space-x-2">
          <PatientProfileDialog patientData={patient} />
          {/* {JSON.stringify(patient)} */}
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Report
          </Button>
          <Button variant="outline" size="sm"> 
            <Sparkle className="h-4 w-4 mr-2" />  
             Chat</Button>
        </div>
      );
    },
  },
];
