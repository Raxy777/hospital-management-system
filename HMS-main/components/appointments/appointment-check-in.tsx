"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { User, Stethoscope, Calendar, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import type { CalendarAppointment } from "./appointment-calendar"

interface AppointmentCheckInProps {
  appointment: CalendarAppointment
  onComplete: (appointmentId: string) => void
  onCancel: () => void
}

export function AppointmentCheckIn({ appointment, onComplete, onCancel }: AppointmentCheckInProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vitals, setVitals] = useState({
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
  })
  const [confirmations, setConfirmations] = useState({
    insuranceVerified: false,
    identityVerified: false,
    formsCompleted: false,
    consentSigned: false,
  })

  // Handle vitals change
  const handleVitalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setVitals((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle confirmation change
  const handleConfirmationChange = (name: string, checked: boolean) => {
    setConfirmations((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  // Check if all required fields are filled
  const isFormComplete = () => {
    return (
      vitals.temperature.trim() !== "" &&
      vitals.bloodPressure.trim() !== "" &&
      vitals.heartRate.trim() !== "" &&
      confirmations.insuranceVerified &&
      confirmations.identityVerified
    )
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormComplete()) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields and confirm the required items.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to update the appointment
      console.log("Check-in data:", { appointment, vitals, confirmations })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Check-in complete",
        description: `${appointment.patientName} has been successfully checked in.`,
      })

      onComplete(appointment.id)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error checking in the patient. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Patient Check-In</CardTitle>
        <CardDescription>Complete the check-in process for the patient's appointment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Appointment Information */}
          <div className="bg-muted/50 p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-3">Appointment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-sm text-muted-foreground">Patient</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Stethoscope className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{appointment.doctorName}</p>
                  <p className="text-sm text-muted-foreground">Doctor</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <p>{format(appointment.date, "PPPP")}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <p>{appointment.time}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Vital Signs */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Vital Signs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°F) *</Label>
                  <Input
                    id="temperature"
                    name="temperature"
                    placeholder="98.6"
                    value={vitals.temperature}
                    onChange={handleVitalsChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure (mmHg) *</Label>
                  <Input
                    id="bloodPressure"
                    name="bloodPressure"
                    placeholder="120/80"
                    value={vitals.bloodPressure}
                    onChange={handleVitalsChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (bpm) *</Label>
                  <Input
                    id="heartRate"
                    name="heartRate"
                    placeholder="72"
                    value={vitals.heartRate}
                    onChange={handleVitalsChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
                  <Input
                    id="respiratoryRate"
                    name="respiratoryRate"
                    placeholder="16"
                    value={vitals.respiratoryRate}
                    onChange={handleVitalsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
                  <Input
                    id="oxygenSaturation"
                    name="oxygenSaturation"
                    placeholder="98"
                    value={vitals.oxygenSaturation}
                    onChange={handleVitalsChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Check-in Confirmations */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Check-in Confirmations</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="insuranceVerified"
                    checked={confirmations.insuranceVerified}
                    onCheckedChange={(checked) => handleConfirmationChange("insuranceVerified", checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="insuranceVerified"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Insurance information verified *
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Confirm that the patient's insurance information is current and verified
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="identityVerified"
                    checked={confirmations.identityVerified}
                    onCheckedChange={(checked) => handleConfirmationChange("identityVerified", checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="identityVerified"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Patient identity verified *
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Confirm that the patient's identity has been verified with photo ID
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="formsCompleted"
                    checked={confirmations.formsCompleted}
                    onCheckedChange={(checked) => handleConfirmationChange("formsCompleted", checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="formsCompleted"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Required forms completed
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Confirm that the patient has completed all required forms
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consentSigned"
                    checked={confirmations.consentSigned}
                    onCheckedChange={(checked) => handleConfirmationChange("consentSigned", checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="consentSigned"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Consent forms signed
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Confirm that the patient has signed all necessary consent forms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormComplete()}
          className="bg-[#4DB6AC] hover:bg-[#3da69c]"
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" /> Complete Check-In
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
