import { DoctorDashboardComponent } from "@/app/(protected)/dashboard/components/doctor-dashboard";
import { stackServerApp } from "@/stack";
import Navbar from "@/components/navbar";
import { db } from "@/db";
import { UserRole } from "@prisma/client";
import DoctorOnboardingForm from "./components/doctor-onboarding-form";

export default async function DashboardPage() {
  const authUser = await stackServerApp.getUser({ or: "redirect" });

  // Check if the user already exists in the database and include the doctor profile
  let user = await db.user.findUnique({
    where: { id: authUser.id, AND: { email: authUser.primaryEmail! } },
    include: { doctor: true }
  });

  // If the user doesn't exist, create a new user
  let takeDoctorId:string;
  if (!user) {
    user = await db.user.create({
      data: {
        id: authUser.id,
        email: authUser.primaryEmail || `${authUser.displayName}@gmail.com`,
        password: `${authUser.id}@123`,
        role: UserRole.DOCTOR
      },
      include: { doctor: true }
    });
  }
  const doctorId = await db.doctor.findUnique({
    where: { userId: user.id },
    select:{id:true}
  });

  // If the user doesn't have a doctor profile, show the onboarding form
  if (!user.doctor && user.role === UserRole.DOCTOR || !doctorId) {
    return (
      <div>
        <DoctorOnboardingForm userId={user.id} />
      </div>
    );
  }

  // Fetch the doctor's patients

  return (
    <div>
      <Navbar />
      {/* {JSON.stringify(doctorId)} */}
      <DoctorDashboardComponent doctorId={doctorId.id} />
    </div>
  );
}
