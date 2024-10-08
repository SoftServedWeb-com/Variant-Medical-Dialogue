import Container from "@/components/max-container";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Container className="space-y-8">
        <h2 className="text-lg font-bold">Medical Companion</h2>
        <div className="space-y-4">
          <p>
            Streamlined patient care with AI-powered IVR and real-time
            transcription.
          </p>
          <p>Intelligent appointment management and severity classification.</p>
          <p>
            Sophisticated medical report generation using ICD10 codes and
            patient history.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold pt-4">Our Process:</h3>
          <ul className="list-decimal list-inside space-y-2">
            <li>Patient calls our companion, providing basic details.</li>
            <li>
              AI-powered IVR collects information and generates transcription.
            </li>
            <li>
              Initial analysis classifies severity and processes appointments.
            </li>
            <li>
              Generate ICD10 codes and create comprehensive medical reports.
            </li>
            <li>
              Mail the Dr. the patient details, and ICD10 codes, prompt the Dr.
              to open our App, confirmation of the appointment.
            </li>
            <li>
              On appointment time, open the patient's medical report on
              Discharge Dialogue.
            </li>
          </ul>
        </div>
        <div className="space-y-4 pt-4">
          <p>Empowering healthcare through cutting-edge AI technology.</p>
          <p>
            Enhancing doctor-patient communication with real-time audio
            capabilities.
          </p>
          <p>Revolutionizing medical report access and analysis.</p>
          <p>
            Seamless integration with EHRs through FHIR-compatible data storage.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-block text-black underline italic font-bold pt-4"
        >
          Enter Doctor Dashboard
        </Link>

        <div>
          <span className="pt-4">
            Developed by {" "}
            <Link
              href="https://softservedweb.com"
              target="_blank"
              className="inline-block text-purple-400 underline italic font-bold pt-4"
            >
               Soft Served Web
            </Link>
          </span>
        </div>
      </Container>
    </main>
  );
}
