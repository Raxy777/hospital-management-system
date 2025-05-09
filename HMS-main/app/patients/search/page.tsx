"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { PatientSearch } from "@/components/patients/patient-search"
import type { PatientRecord } from "@/types/patients"
import { generateSamplePatients } from "@/lib/patients-data"

export default function PatientSearchPage() {
  const [patients, setPatients] = useState<PatientRecord[]>([])
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  // Load sample patients
  useEffect(() => {
    setPatients(generateSamplePatients())
  }, [])

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Patient Search</h1>
        </div>

        <PatientSearch patients={patients} />
      </div>
    </AppLayout>
  )
  }