import { NextRequest } from "next/server";
import { db } from "@/db";
import { updateDoctorAvailabilityValidator } from "@/lib/validators/db-doctor";

export async function POST(req: NextRequest) {
    try {
        const { doctorId, doctorAvailability } = updateDoctorAvailabilityValidator.parse(await req.json());

        // Check if the doctor exists
        const existingDoctor = await db.doctor.findUnique({
            where: { id: doctorId },
        });

        if (!existingDoctor) {
            return new Response(JSON.stringify({ error: 'Doctor not found' }), { 
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Check if the availability exists
        const existingAvailability = await db.doctorAvailability.findFirst({
            where: { 
                doctorId: doctorId,
                dayOfWeek: doctorAvailability.dayOfWeek
            },
        });

        let updatedDoctor;

        if (existingAvailability) {
            // Update existing availability
            updatedDoctor = await db.doctorAvailability.update({
                where: {
                    id: existingAvailability.id
                },
                data: {
                    startTime: doctorAvailability.startTime,
                    endTime: doctorAvailability.endTime
                },
                select: {
                    id: true,
                }
            });
        } else {
            // Add new availability
            updatedDoctor = await db.doctorAvailability.create({
                data: {
                    doctorId: doctorId,
                    dayOfWeek: doctorAvailability.dayOfWeek,
                    startTime: doctorAvailability.startTime,
                    endTime: doctorAvailability.endTime
                },
                select: {
                    id: true,
                }
            });
        }

        return new Response(JSON.stringify({ doctor: updatedDoctor }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error updating doctor availability:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}