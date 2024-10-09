// Check if the patient exists in the DB and handle doctor preferences

import { db } from "@/db";
import { checkPatientValidator } from "@/lib/validators/db-patient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { patientId, doctorId, doctorPrefered } = checkPatientValidator.parse(body);

        const patient = await db.patient.findUnique({
            where: {
                id: patientId
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                lastVisitOn: true,
                doctor: true,
            }
        });

        if (!patient) {
            return NextResponse.json({ error: "Patient not found" }, { status: 404 });
        }

        let doctorAvailability;
        if (doctorPrefered) {
            const doctor = await db.doctor.findUnique({
                where: { id: doctorId },
                select: { availability: true }
            });
            doctorAvailability = doctor?.availability;
        } else {
            // TODO: Implement logic to get a list of related doctors
            // For now, we'll just return null
            doctorAvailability = null;
        }

        // TODO: Implement logic to create an appointment
        // This would typically go in a separate API endpoint

        return NextResponse.json({ patient, availability: doctorAvailability }, { status: 200 });
    } catch (error) {
        console.error('Error checking patient:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
