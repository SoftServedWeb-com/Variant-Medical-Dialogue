import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentWithPatient } from '@/lib/types';
import { AppointmentStatus, Severity } from '@prisma/client';
import AppointmentTab from './tabs/appointment-tab'
import PatientsTab from './tabs/patients-tab'
import Historytab from './tabs/history-tab'
import SettingsTab from './tabs/settings-tab'
import UpcomingTab from './tabs/upcoming-tab'
import { fetchAppointments } from '@/app/actions/fetch-appointments'

export async function DoctorDashboardComponent({userId}:{userId:string}) {
	const appointments = await fetchAppointments(userId) as AppointmentWithPatient[];

	// console.log("appointments :: ",appointments)


	// Extract unique patients from appointments
	const patients = Array.from(new Set(appointments.map(app => app.patient))).map(patient => ({
		...patient,
		age: calculateAge(patient.dateOfBirth),
		patientName: patient.name // Add patientName property
	}));

	// Create patient history from appointments
	const patientHistory = appointments.map(app => ({
		id: app.id,
		patientId: app.patientId,
		lastVisitOn: app.date,
		severity: app.severity as Severity,
		numberOfVisits: app.patient.numberOfVisits,
		condition: app.condition,
		nextVisitOn: app.patient.nextVisitOn || new Date() // Provide a default value if null
	}));

	return (
		<div className="flex h-screen bg-gray-100">
			<div className="flex-1 flex flex-col overflow-hidden">
				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
					<div className="container mx-auto px-6 py-8">
						<Tabs defaultValue="appointments" className="space-y-4">
							<TabsList>
								<TabsTrigger value="appointments">Appointments</TabsTrigger>
								<TabsTrigger value="upcoming">Upcoming</TabsTrigger>
								<TabsTrigger value="patients">Patients</TabsTrigger>
								<TabsTrigger value="history">History</TabsTrigger>
								<TabsTrigger value="settings">Settings</TabsTrigger>
							</TabsList>
							<TabsContent value="appointments">
								<AppointmentTab appointments={appointments} />
							</TabsContent>
							<TabsContent value="upcoming">
								<UpcomingTab appointments={appointments} />
							</TabsContent>
							<TabsContent value="patients">
								{/* <PatientsTab patients={patients} /> */}
							</TabsContent>
							<TabsContent value="history">
								<Historytab history={patientHistory}/>
							</TabsContent>
							<TabsContent value="settings">
								<SettingsTab/>
							</TabsContent>
						</Tabs>
					</div>
				</main>
			</div>
		</div>
	)
}

function calculateAge(dateOfBirth: Date): number {
	const today = new Date();
	const birthDate = new Date(dateOfBirth);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}