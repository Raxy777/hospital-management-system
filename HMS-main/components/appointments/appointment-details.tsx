"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, User, FileText, Stethoscope, Edit, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "checked-in"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "no-show"

export interface AppointmentDetailsProps {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  doctorDepartment: string
  date: Date
  time: string
  duration: string
  type: string
  typeName: string
  notes?: string
  status: AppointmentStatus
  onEdit: () => void
  onClose: () => void
}

export function AppointmentDetails({
  id,
  patientId,
  patientName,
  doctorId,
  doctorName,
  doctorDepartment,
  date,
  time,
  duration,
  type,
  typeName,
  notes,
  status,
  onEdit,
  onClose,
}: AppointmentDetailsProps) {
  const { toast } = useToast()
  const [currentStatus, setCurrentStatus] = useState<AppointmentStatus>(status)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Get status badge color and text
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "scheduled":
        return { color: "bg-blue-500", text: "Scheduled" }
      case "confirmed":
        return { color: "bg-[#4DB6AC]", text: "Confirmed" }
      case "checked-in":
        return { color: "bg-purple-500", text: "Checked In" }
      case "in-progress":
        return { color: "bg-[#FF8A65]", text: "In Progress" }
      case "completed":
        return { color: "bg-green-500", text: "Completed" }
      case "cancelled":
        return { color: "bg-red-500", text: "Cancelled" }
      case "no-show":
        return { color: "bg-gray-500", text: "No Show" }
      default:
        return { color: "bg-gray-500", text: "Unknown" }
    }
  }

  // Handle status update
  const updateStatus = async (newStatus: AppointmentStatus) => {
    setIsUpdatingStatus(true)

    try {
      // In a real app, this would be an API call to update the appointment status
      console.log(`Updating appointment ${id} status to ${newStatus}`)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCurrentStatus(newStatus)

      toast({
        title: "Status updated",
        description: `Appointment status has been updated to ${getStatusBadge(newStatus).text}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the appointment status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingStatus(false)
      setShowCancelDialog(false)
    }
  }

  // Handle appointment cancellation
  const cancelAppointment = () => {
    updateStatus("cancelled")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl">Appointment Details</CardTitle>
          <CardDescription>View and manage appointment information</CardDescription>
        </div>
        <Badge className={getStatusBadge(currentStatus).color}>{getStatusBadge(currentStatus).text}</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Patient Information</h3>
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{patientName}</p>
                <p className="text-sm text-muted-foreground">Patient ID: {patientId}</p>
              </div>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Doctor Information</h3>
            <div className="flex items-start space-x-3">
              <Stethoscope className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{doctorName}</p>
                <p className="text-sm text-muted-foreground">{doctorDepartment}</p>
              </div>
            </div>
          </div>

          {/* Appointment Date & Time */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Date & Time</h3>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <p>{format(date, "PPPP")}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <p>
                {time} ({duration} minutes)
              </p>
            </div>
          </div>

          {/* Appointment Type */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Appointment Type</h3>
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <p>{typeName}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Notes</h3>
              <p className="text-sm">{notes}</p>
            </div>
          </>
        )}

        {/* Status Update Section */}
        {currentStatus !== "cancelled" && currentStatus !== "completed" && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {currentStatus !== "checked-in" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus("checked-in")}
                    disabled={isUpdatingStatus}
                    className="bg-purple-100 hover:bg-purple-200"
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    Check In
                  </Button>
                )}

                {(currentStatus === "checked-in" || currentStatus === "scheduled" || currentStatus === "confirmed") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus("in-progress")}
                    disabled={isUpdatingStatus}
                    className="bg-[#FF8A65]/10 hover:bg-[#FF8A65]/20"
                  >
                    <Clock className="mr-2 h-4 w-4 text-[#FF8A65]" />
                    Start Appointment
                  </Button>
                )}

                {currentStatus === "in-progress" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus("completed")}
                    disabled={isUpdatingStatus}
                    className="bg-green-100 hover:bg-green-200"
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Complete
                  </Button>
                )}

                {(currentStatus === "scheduled" || currentStatus === "confirmed") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus("no-show")}
                    disabled={isUpdatingStatus}
                    className="bg-gray-100 hover:bg-gray-200"
                  >
                    <XCircle className="mr-2 h-4 w-4 text-gray-500" />
                    No Show
                  </Button>
                )}

                <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isUpdatingStatus}
                      className="bg-red-100 hover:bg-red-200"
                    >
                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                      Cancel Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Appointment</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel this appointment? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="flex items-center space-x-2 text-amber-500">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm font-medium">
                          This will notify the patient and doctor about the cancellation.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCancelDialog(false)} disabled={isUpdatingStatus}>
                        Keep Appointment
                      </Button>
                      <Button variant="destructive" onClick={cancelAppointment} disabled={isUpdatingStatus}>
                        {isUpdatingStatus ? "Cancelling..." : "Yes, Cancel Appointment"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="space-x-2">
          {currentStatus !== "cancelled" && currentStatus !== "completed" && (
            <Button variant="outline" onClick={onEdit} className="bg-[#4DB6AC]/10 hover:bg-[#4DB6AC]/20">
              <Edit className="mr-2 h-4 w-4 text-[#4DB6AC]" />
              Edit Appointment
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
