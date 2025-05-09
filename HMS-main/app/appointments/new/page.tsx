"use client"

import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { AppointmentForm } from "@/components/appointments/appointment-form"

export default function NewAppointmentPage() {
  const router = useRouter()

  const handleCancel = () => {
    router.back()
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Schedule New Appointment</h1>
        </div>

        <AppointmentForm onCancel={handleCancel} />
      </div>
    </AppLayout>
  )
}