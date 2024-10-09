// return all the doctors in the database

import { db } from "@/db";
import { NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const doctors = await db.doctor.findMany();
    console.log("doctors", doctors)
    return new Response(JSON.stringify({ doctors }), { status: 200 });
}
