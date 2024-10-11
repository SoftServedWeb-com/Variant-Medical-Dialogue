// "use client"
import { DataTable } from "../data-table";
import { patientColumns } from "../columns";
import { Patient } from "@prisma/client";
import { PatientProfileDialog } from "../patient-dialog-box";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { calculateAge } from "@/lib/misc/calculateAge";
import { PatientData } from "@/lib/types";

export default function PatientsTab({ patients }: { patients: PatientData[] }) {
  return (
    <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Patients</h2>

        {/* {JSON.stringify(patients)} */}
        <DataTable columns={patientColumns} data={patients} tab={"patients"} />

    </div>
  );
}
