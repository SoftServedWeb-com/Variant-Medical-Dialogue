import { DoctorDashboardComponent } from "@/app/(protected)/dashboard/components/doctor-dashboard";
import { stackServerApp } from "@/stack";
import Navbar from "@/components/navbar";
import { db } from "@/db";
import { UserRole } from "@prisma/client";
import DoctorOnboardingForm from "./components/doctor-onboarding-form";

export default async function DashboardPage() {
  const authUser = await stackServerApp.getUser({ or: "redirect" });

  // Check if the user already exists in the database and include the doctor profile
  // TODO check the stack-auth webhooks section to solve this issue.

  let isUser = await db.user.findUnique({
    where: { id: authUser.id,AND:{email:authUser.primaryEmail!}},
    include:{doctor:true}
  });

  // If the user doesn't exist, create a new user
  let newUser;
  if (!isUser) {
    newUser = await db.user.create({
      data: {
        id: authUser.id,
        email: authUser.primaryEmail || `${authUser.displayName}@gmail.com`,
        password: `${authUser.id}@123`,
        role: UserRole.DOCTOR
      },
      include: { doctor: true }
    });
  }
  console.log(authUser.id)

  // If the user doesn't have a doctor profile, show the onboarding form
  if (!newUser?.doctor && newUser?.role == UserRole.DOCTOR || !isUser?.doctor) {
    return (
      <div>
        <DoctorOnboardingForm userId={authUser.id} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <DoctorDashboardComponent />
    </div>
  );
}
