import { db } from "@/db";
import { createDoctorValidator } from "@/lib/validators/db-doctor-validator";
import { NextRequest } from "next/server";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // console.log(body);
        const {doctorId, doctorName, doctorSpeciality, doctorAvailability,userId } = createDoctorValidator.parse(body);

        const checkDoctor = await db.doctor.findUnique({
            where: {
                id: doctorId
            }
        });

        if(checkDoctor){
            return new Response(JSON.stringify({ error: "Doctor ID already exists" }), { status: 400 });
        }

        // add a check, if user already exists, then update the doctor details, else create a new user and doctor
        const docCreate = await db.doctor.create({
            data: {
                id: doctorId,
                name: doctorName,
                speciality: doctorSpeciality,
                userId:userId,
                availability: {
                    create: {
                        dayOfWeek: doctorAvailability.dayOfWeek,
                        startTime: doctorAvailability.startTime,
                        endTime: doctorAvailability.endTime
                    }
                }
            },
            select:{
                id: true,
                name: true,
                speciality: true,
                availability: true,
                user:true
            }
        });

        console.log(docCreate);

        // Dummy data field

        return new Response(JSON.stringify({ doctor: docCreate }), { status: 201 });
    } catch (error) {
        console.error("Error creating doctor:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}



