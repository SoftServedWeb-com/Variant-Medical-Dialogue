import { db } from "@/db";

export async function fetchPatients(doctorId:string){

    try{
        const patients = await db.patient.findMany({

            where:{
                doctorId:doctorId
            },
            select:{
                id:true,
                name:true,
                phone:true,
                dateOfBirth:true,
                lastVisitOn:true,
                numberOfVisits:true,
                appointments:true,
            }
        })

        return patients;
    }catch(error){
        console.log("Error fetching patients :: ",error);
        return [];
    }

}