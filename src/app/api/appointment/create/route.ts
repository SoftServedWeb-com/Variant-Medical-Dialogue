import { db } from "@/db";
import { dbAppointmentValidator } from "@/lib/validators/db-appointment-validator";
import { AppointmentStatus, Severity } from "@prisma/client";

export async function POST(req: Request) {
    const body = await req.json();
    const { patientId, doctorId, appointmentDate, ICD10Codes, condition, severity, status } = dbAppointmentValidator.parse(body);

    // Parse the appointmentDate string to a valid Date object
    const [day, month, year] = appointmentDate.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
        return new Response(JSON.stringify({ error: "Invalid appointment date" }), { status: 400 });
    }

    // check the appointmentStatus and severity  

    const appointment = await db.appointment.create({
        data: {
            patientId: patientId,
            doctorId: doctorId,
            icd10Codes: ICD10Codes,
            date: parsedDate, // Use the parsed date
            status: status as AppointmentStatus,
            condition: condition,
            severity: severity as Severity,
        },
        select: {
            id: true,
            date:true,
            status:true,
            severity:true,

        }   
    })

    if (!appointment) {
        return new Response(JSON.stringify({ error: "Failed to create appointment" }), { status: 500 });
    }

    return new Response(JSON.stringify({ appointment }), { status: 200 });
}

