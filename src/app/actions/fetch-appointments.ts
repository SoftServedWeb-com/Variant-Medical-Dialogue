'use server'
import { db } from "@/db";

export async function fetchAppointments(doctorId: string) {
    const appointments = await db.appointment.findMany({
        where: {
            doctorId: doctorId,
        },
        include:{
            patient:true,
        }
    });
    return appointments;
}
