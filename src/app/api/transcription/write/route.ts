import { NextRequest } from "next/server";
import { db } from "@/db";

export async function POST(req: NextRequest) {
    try {
        const { appointmentId, transcriptionContent }: { appointmentId: string, transcriptionContent: string } = await req.json();

        const appointment = await db.appointment.findUnique({
            where: {
                id: appointmentId
            }
        });

        if (!appointment) {
            return new Response(JSON.stringify({ error: "Appointment not found" }), { status: 404 });
        }

        const transcription = await db.transcription.create({
            data: {
                appointmentId: appointmentId,
                content: transcriptionContent
            }
        });

        if (!transcription) {
            return new Response(JSON.stringify({ error: "Failed to create transcription" }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, transcription }), { status: 200 });
    } catch (error) {
        console.error("Error in POST writing transcription:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}