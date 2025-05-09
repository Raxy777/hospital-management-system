"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Bell, X, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { CalendarAppointment } from "./appointment-calendar"

interface AppointmentNotificationProps {
  appointment: CalendarAppointment
  onDismiss: (id: string) => void
  onView: (id: string) => void
}

export function AppointmentNotification({ appointment, onDismiss, onView }: AppointmentNotificationProps) {
  return (
    <Card className="w-full max-w-md mx-auto border-l-4 border-l-[#4DB6AC] shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Bell className="h-5 w-5 text-[#4DB6AC] mt-0.5" />
            <div>
              <h4 className="font-medium">Upcoming Appointment</h4>
              <p className="text-sm text-muted-foreground">
                {appointment.patientName} with {appointment.doctorName}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{format(appointment.date, "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{appointment.time}</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onDismiss(appointment.id)} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-end mt-3">
          <Button variant="outline" size="sm" onClick={() => onView(appointment.id)} className="text-[#4DB6AC]">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface AppointmentNotificationsProps {
  appointments: CalendarAppointment[]
  onView: (id: string) => void
}

export function AppointmentNotifications({ appointments, onView }: AppointmentNotificationsProps) {
  const [notifications, setNotifications] = useState<string[]>([])

  // Initialize with upcoming appointments
  useEffect(() => {
    const upcomingAppointments = appointments
      .filter((appointment) => appointment.status === "scheduled" || appointment.status === "confirmed")
      .slice(0, 3)
      .map((appointment) => appointment.id)

    setNotifications(upcomingAppointments)
  }, [appointments])

  // Dismiss notification
  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((notificationId) => notificationId !== id))
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50 max-w-md">
      {notifications.map((notificationId) => {
        const appointment = appointments.find((a) => a.id === notificationId)
        if (!appointment) return null

        return (
          <AppointmentNotification
            key={notificationId}
            appointment={appointment}
            onDismiss={handleDismiss}
            onView={onView}
          />
        )
      })}
    </div>
  )
}
