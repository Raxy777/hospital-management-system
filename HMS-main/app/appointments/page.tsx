"use client"

import { AppLayout } from "@/components/app-layout"
import { AppointmentManagementPage } from "@/components/appointment-management-page"

export default function AppointmentsPage() {
  return (
    <AppLayout>
      <AppointmentManagementPage />
    </AppLayout>
  )
}
