import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { PatientHistory } from "@/lib/types";
import { saveAs } from 'file-saver';


export const generateReport = (item: PatientHistory) => {
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

export function DownloadHistoryBtn({item}:{item:PatientHistory}){
    return (

        <>
        
        <Button variant="outline" size="sm" onClick={() => generateReport(item)}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
        </>
    )

}