import { db } from "@/db";
import { dbAppointmentValidator } from "@/lib/validators/db-appointment-validator";
import { AppointmentStatus, Severity } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { patientId, doctorId, appointmentDate, ICD10Codes, condition, severity, status } = dbAppointmentValidator.parse(body);

        // // Parse the appointmentDate string to a valid Date object
        // const parsedDate = new Date(appointmentDate);

        // // Check if the parsed date is valid
        // if (isNaN(parsedDate.getTime())) {
        //     return new Response(JSON.stringify({ error: "Invalid appointment date" }), { status: 400 });
        // }

        const appointment = await db.appointment.create({
            data: {
                patientId: patientId,
                doctorId: doctorId,
                icd10Codes: ICD10Codes,
                date: new Date(appointmentDate), // Convert to ISO string for Prisma
                status: status as AppointmentStatus,
                condition: condition,
                severity: severity as Severity,
            },
            select: {
                id: true,
                date: true,
                status: true,
                severity: true,
            }   
        });

        return new Response(JSON.stringify({ appointmentBooked:appointment }), { status: 200 });
    } catch (error) {
        console.error('Error creating appointment:', error);
        return new Response(JSON.stringify({ error: 'Error creating appointment', details: error }), { status: 500 });
    }
}

