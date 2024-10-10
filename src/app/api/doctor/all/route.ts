// return all the doctors in the database

import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const doctors = await db.doctor.findMany({
            select: {
                id: true,
                name: true,
                speciality: true,
            }
        });
        
        console.log("Doctors fetched:", doctors.length);
        
        return NextResponse.json({ doctors }, { status: 200 });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
