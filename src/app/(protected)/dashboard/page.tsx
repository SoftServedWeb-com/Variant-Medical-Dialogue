import { DoctorDashboardComponent } from "@/app/(protected)/dashboard/components/doctor-dashboard";
import { Calendar, Clock, Link, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <div>
              {/* Sidebar */}
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-lg font-bold">Doctor Dashboard</h1>
            <button className="md:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>
      </div>
      <DoctorDashboardComponent />
    </div>
  );
}
