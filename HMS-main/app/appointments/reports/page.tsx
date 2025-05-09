"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { AppointmentReports } from "@/components/appointments/appointment-reports"
import type { CalendarAppointment } from "@/components/appointments/appointment-calendar"
import { generateSampleAppointments } from "@/lib/sample-data"

export default function AppointmentReportsPage() {
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([])

  // Load sample appointments
  useEffect(() => {
    setAppointments(generateSampleAppointments())
  }, [])

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Appointment Reports</h1>
        </div>

        <AppointmentReports appointments={appointments} />
      </div>
    </AppLayout>
  )
}