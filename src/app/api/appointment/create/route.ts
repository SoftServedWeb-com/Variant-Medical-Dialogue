// create an appointment 
// if patient already exists, then get patient details.
// if patient doesn't exist, then create patient.
// if doctor preferred, then get doctor details.
// if doctor not preferred, then get doctor with least appointments.
// then create an appointment.
// if appointment time is not available, then return an error.


export async function POST(req: Request) {
    const { patientId, doctorId, appointmentTime } = await req.json();

    // Check if the appointment time is available
    // const isAvailable = await checkAppointmentAvailability(appointmentTime);
    // if (!isAvailable) {
        return new Response(JSON.stringify({ error: "Appointment time is not available" }), { status: 400 });
}

