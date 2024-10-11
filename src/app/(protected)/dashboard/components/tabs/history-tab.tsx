import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Search } from "lucide-react"
import { PatientHistory } from "@/lib/types";
import { saveAs } from 'file-saver';

export default function Historytab({history}:{history:PatientHistory[]}){

  

  const generateReport = (item: PatientHistory) => {
    const report = `
Patient History Report

Patient ID: ${item.patientId}
Condition: ${item.condition}
Severity: ${item.severity}
Last Visit: ${new Date(item.lastVisitOn).toLocaleDateString()}
Number of Visits: ${item.numberOfVisits}
Next Visit: ${new Date(item.nextVisitOn).toLocaleDateString()}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `patient_${item.patientId}_history_report.txt`);
  };

  return (
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
        {history.length === 0 && <p className="text-center text-gray-500">No history found</p>}
        {history.map((item, index) => (
          <div key={index} className={`flex items-center justify-between p-4 ${
            item.severity === 'SEVERE' ? 'bg-red-50' :
            item.severity === 'MODERATE' ? 'bg-yellow-50' :
            'bg-gray-50'
          } rounded-lg`}>
            <div>
              <h3 className={`font-semibold ${
                item.severity === 'SEVERE' ? 'text-red-800' :
                item.severity === 'MODERATE' ? 'text-yellow-800' :
                ''
              }`}>
                {item.severity === 'SEVERE' ? 'Severe Case: ' :
                 item.severity === 'MODERATE' ? 'Moderate Case: ' :
                 'Appointment: '}
              </h3>
              <p className={`text-sm ${
                item.severity === 'SEVERE' ? 'text-red-600' :
                item.severity === 'MODERATE' ? 'text-yellow-600' :
                'text-gray-600'
              }`}>
                {item.condition} - {new Date(item.lastVisitOn).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Patient ID: {item.patientId} | Visits: {item.numberOfVisits} | Next Visit: {new Date(item.nextVisitOn).toLocaleDateString()}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => generateReport(item)}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}