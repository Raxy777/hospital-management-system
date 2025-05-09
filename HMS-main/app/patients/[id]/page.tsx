"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { PatientDetail } from "@/components/patients/patient-detail"
import type { PatientRecord } from "@/types/patients"
import { generateSamplePatients } from "@/lib/patients-data"
import { Skeleton } from "@/components/ui/skeleton"

export default function PatientDetailPage() {
  const params = useParams()
  const [patient, setPatient] = useState<PatientRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load patient data
  useEffect(() => {
    const fetchPatient = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        const patients = generateSamplePatients()
        const foundPatient = patients.find((p) => p.id === params.id)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        setPatient(foundPatient || null)
      } catch (error) {
        console.error("Error fetching patient:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatient()
  }, [params.id])

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-40" />
          </div>
          <Skeleton className="h-[200px] w-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!patient) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold text-red-500">Patient Not Found</h2>
          <p className="mt-2">The patient you're looking for doesn't exist or has been removed.</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <PatientDetail patient={patient} />
    </AppLayout>
  )
}