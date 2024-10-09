import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import { Patient } from "@/lib/types";
import { PatientProfileDialog } from "../patient-dialog-box";

export default function PatientsTab({patients}:{patients:Patient[]}){
    return (

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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      {/* <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button> */}
                      <PatientProfileDialog patientData={patient} />
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

    )
}