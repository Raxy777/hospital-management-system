"use client"

import { Button } from "@/components/ui/button"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { AppointmentCheckIn } from "@/components/appointments/appointment-check-in"
import type { CalendarAppointment } from "@/components/appointments/appointment-calendar"
import { Skeleton } from "@/components/ui/skeleton"

// Sample appointment data (in a real app, this would come from an API)
const sampleAppointment: CalendarAppointment = {
  id: "appt-1",
  patientName: "John Smith",
  doctorName: "Dr. Sarah Johnson",
  time: "10:30 AM",
  type: "Check-up",
  status: "scheduled",
  date: new Date(),
}

export default function CheckInPage() {
  const router = useRouter()
  const params = useParams()
  const [appointment, setAppointment] = useState<CalendarAppointment | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch appointment data
  useEffect(() => {
    const fetchAppointment = async () => {
      setIsLoading(true)

      try {
        // In a real app, this would be an API call to fetch the appointment
        // For now, we'll use the sample data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

        // Set the appointment ID from the route params
        const appointmentWithId = {
          ...sampleAppointment,
          id: params.id as string,
        }

        setAppointment(appointmentWithId)
      } catch (error) {
        console.error("Error fetching appointment:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointment()
  }, [params.id])

  // Handle check-in completion
  const handleCheckInComplete = (appointmentId: string) => {
    // In a real app, this would update the appointment status in the database
    console.log(`Check-in completed for appointment ${appointmentId}`)

    // Redirect back to appointments page
    router.push("/appointments")
  }

  // Handle cancellation
  const handleCancel = () => {
    router.back()
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Patient Check-In</h1>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : appointment ? (
          <AppointmentCheckIn appointment={appointment} onComplete={handleCheckInComplete} onCancel={handleCancel} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h2 className="text-2xl font-bold text-red-500">Appointment Not Found</h2>
            <p className="mt-2">The appointment you're looking for doesn't exist or has been removed.</p>
            <Button variant="outline" onClick={() => router.push("/appointments")} className="mt-4">
              Return to Appointments
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}