import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsTab(){
    return(

        <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Settings</h2>
        
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Profile Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Dr. Jane Doe" />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" defaultValue="Cardiology" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jane.doe@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
                <Switch id="appointment-reminders" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="severe-cases">Severe Cases Alerts</Label>
                <Switch id="severe-cases" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="new-appointments">New Appointment Notifications</Label>
                <Switch id="new-appointments" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Availability Settings</h3>
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

          <Button>Save Settings</Button>
        </div>
      </div>
    )
}