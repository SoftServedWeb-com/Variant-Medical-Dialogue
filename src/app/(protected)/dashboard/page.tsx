import { DoctorDashboardComponent } from "@/app/(protected)/dashboard/components/doctor-dashboard";
import { Calendar, Clock, Link, Users } from "lucide-react";
import { stackServerApp } from "@/stack";
import Navbar from "@/components/navbar";
import { db } from "@/db";
import { UserRole } from "@prisma/client";
import DoctorOnboardingForm from "./components/doctor-onboarding-form";

export default async function DashboardPage() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  // const createUser = await db.user.create({
  //   data:{
  //     id:user.id,
  //     email:user.primaryEmail || `${user.displayName}@gmail.com`,
  //     password:"123456",
  //     role:UserRole.DOCTOR
  //   }
  // })

  // a check if the user has the doctor field active or not.
  // The doctor ID is based on EHR(which is unique for each doctor.)


  const firstLoginCheck = await db.user.findUnique({
    where:{
      id:user.id,
      role:UserRole.DOCTOR
    },
    select:{
      doctor:true
    }
  })
  console.log("check for doctor",firstLoginCheck);
  console.log(user.hasPassword);


  // if this is null, then prompt the doctor to fill the form, which collects the doctor's name, speciality, and availability.
  // !TODO : need admin approval in future, with a checkin in the EHR.
  if(!firstLoginCheck?.doctor){
    return (
      <div className="">
        <DoctorOnboardingForm userId={user.id}/>
      </div>
    )
  }

 
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {/* {user.hasPassword?<DoctorDashboardComponent />:"prompt for password"} */}
      <DoctorDashboardComponent />
    </div>
  );
}
