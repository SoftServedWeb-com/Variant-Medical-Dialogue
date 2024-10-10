import { db } from "@/db";
import { createPatientValidator } from "@/lib/validators/db-patient-validator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { patientId, patientName, patientEmail, patientPhone, DOB, doctorId,doctorPrefered } = createPatientValidator.parse(body);

        let patient;
        if(doctorPrefered){

        patient = await db.patient.create({
            data:{
                id:patientId,
                name:patientName,
                email:patientEmail,
                phone:patientPhone,
                dateOfBirth: new Date(DOB),
                doctorId:doctorId,
            },
            select:{
                id:true,
            }
        })
    }
    else{
        patient = await db.patient.create({
            data:{
                id:patientId,
                name:patientName,
                email:patientEmail,
                phone:patientPhone,
                dateOfBirth: new Date(),
            },
            select:{
                id:true,
            }
        })
    }

        return NextResponse.json({ patient }, { status: 200 });
    } catch (error) {
        console.error('Error creating patient:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
