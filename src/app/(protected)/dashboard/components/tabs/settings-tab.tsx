import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { db } from "@/db";
import { stackServerApp } from "@/stack";
import { useUser } from "@stackframe/stack";

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
    return <div>Loading...</div>; // Or handle the case when doctor details are not found
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Profile Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={doctorDetails.name} />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                defaultValue={doctorDetails.speciality}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
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
              <Switch id="appointment-reminders" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="severe-cases">Severe Cases Alerts</Label>
              <Switch id="severe-cases" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-appointments">
                New Appointment Notifications
              </Label>
              <Switch id="new-appointments" />
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
              <Input id="start-time" type="time" defaultValue="09:00" />
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input id="end-time" type="time" defaultValue="17:00" />
            </div>
          </div>
        </div>

        {/* <Button>Save Settings</Button> */}
      </div>
    </div>
  );
}
