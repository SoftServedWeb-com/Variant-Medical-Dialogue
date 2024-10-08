import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Search } from "lucide-react"
import { PatientHistory } from "@/lib/types";

export default function Historytab({history}:{history:PatientHistory[]}){
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
    )
}