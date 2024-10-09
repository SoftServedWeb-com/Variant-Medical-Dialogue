// to create a new patient in the DB, if patient doesn't exist.
// if doctor preferred, then get doctor details.
// if doctor not preferred, then get doctors list, related
// then create an appointment.
// return patient details.

import { db } from "@/db";
import { createPatientValidator } from "@/lib/validators/db-patient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { patientId, patientName, patientEmail, patientPhone, patientAge, doctorPrefered, doctorId } = createPatientValidator.parse(body);
        
        let patient = await db.patient.findUnique({
            where: { id: patientId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                lastVisitOn: true,
            }
        });

        if (!patient) {
            patient = await db.patient.create({
                data: {
                    id: patientId,
                    name: patientName,
                    email: patientEmail,
                    phone: patientPhone,
                    age: patientAge,
                    dateOfBirth: new Date(),
                    doctorId: doctorPrefered ? doctorId : '',
                }
            });
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
            doctorAvailability = null;
        }

        // TODO: Implement logic to create an appointment

        return NextResponse.json({ patient, availability: doctorAvailability }, { status: 200 });
    } catch (error) {
        console.error('Error creating patient:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
