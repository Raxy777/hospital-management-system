"use client"

import { AppLayout } from "@/components/app-layout"
import { PatientRecordsPage } from "@/components/patient-records-page"

export default function PatientsPage() {
  return (
    <AppLayout>
      <PatientRecordsPage />
    </AppLayout>
  )
}
