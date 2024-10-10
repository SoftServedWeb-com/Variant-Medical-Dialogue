import { db } from "@/db";
import { createDoctorValidator } from "@/lib/validators/db-doctor-validator";
import { NextRequest } from "next/server";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // console.log(body);
        const {doctorId, doctorName, doctorSpeciality, doctorAvailability } = createDoctorValidator.parse(body);

        const docCreate = await db.doctor.create({
            data: {
                id: doctorId,
                name: doctorName,
                speciality: doctorSpeciality,
                user: {
                    create: {
                        email: `${doctorName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                        password: "password123", // This should be hashed in production
                        role: UserRole.DOCTOR,
                    }
                },
                availability: {
                    create: {
                        dayOfWeek: doctorAvailability.dayOfWeek,
                        startTime: doctorAvailability.startTime,
                        endTime: doctorAvailability.endTime
                    }
                }
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
