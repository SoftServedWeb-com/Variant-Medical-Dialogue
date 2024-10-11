import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { db } from "@/db";
import { stackServerApp } from "@/stack";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

export default async function SettingsTab() {
  const authUser = await stackServerApp.getUser({ or: "redirect" });

  const doctorDetails = await db.doctor.findUnique({
    where: { userId: authUser.id },
    select: {
      id: true,
      speciality: true,
      name: true,
      appointments: {
        select: { id: true, date: true, status: true, severity: true },
      },
    },
  });

  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    
    const name = formData.get('name') as string;
    const specialization = formData.get('specialization') as string;
    const email = formData.get('email') as string;
    const startTime = formData.get('start-time') as string;
    const endTime = formData.get('end-time') as string;

    try {
      await db.doctor.update({
        where: { id: doctorDetails?.id },
        data: {
          name,
          speciality: specialization,
          // Add other fields as necessary
        },
      });

      // Update user email if changed
      if (email !== authUser.primaryEmail) {
        // Implement email update logic here
        // This might require a separate API call or service
      }

      // Update availability settings
      // Implement availability update logic here
      // This might involve updating a separate table or field

      revalidatePath('/dashboard');
      toast.success("Your settings have been successfully updated.");
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error("There was an error updating your settings. Please try again.");
      };
    }
  

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <form action={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Profile Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={doctorDetails.name} />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                defaultValue={doctorDetails.speciality}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={authUser.primaryEmail || `no email found`}
              />
            </div>
            <div>
              <Label htmlFor="doctorId">Doctor ID</Label>
              <Input id="doctorId" defaultValue={doctorDetails.id} readOnly />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="appointment-reminders">
                Appointment Reminders
              </Label>
              <Switch id="appointment-reminders" name="appointment-reminders" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="severe-cases">Severe Cases Alerts</Label>
              <Switch id="severe-cases" name="severe-cases" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-appointments">
                New Appointment Notifications
              </Label>
              <Switch id="new-appointments" name="new-appointments" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Appointment Summary</h3>
          <div className="space-y-2">
            <p>Total Appointments: {doctorDetails.appointments.length}</p>
            <p>
              Pending Appointments:{" "}
              {
                doctorDetails.appointments.filter(
                  (app) => app.status === "PENDING"
                ).length
              }
            </p>
            <p>
              Severe Cases:{" "}
              {
                doctorDetails.appointments.filter(
                  (app) => app.severity === "SEVERE"
                ).length
              }
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 space-y-4">
            Availability Settings
          </h3>
          <DatePickerWithRange />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input id="start-time" name="start-time" type="time" defaultValue="09:00" />
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input id="end-time" name="end-time" type="time" defaultValue="17:00" />
            </div>
          </div>
        </div>

        {/* <Button type="submit">Save Settings</Button> */}
      </form>
    </div>
  );
}
