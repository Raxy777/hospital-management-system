"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AppointmentStatus } from "./appointment-details"

export interface CalendarAppointment {
  id: string
  patientName: string
  doctorName: string
  time: string
  type: string
  status: AppointmentStatus
  date: Date
}

interface AppointmentCalendarProps {
  appointments: CalendarAppointment[]
  onSelectDate: (date: Date) => void
  onSelectAppointment: (appointmentId: string) => void
}

export function AppointmentCalendar({ appointments, onSelectDate, onSelectAppointment }: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  // Get days in current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Navigate to current month
  const goToToday = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
    onSelectDate(new Date())
  }

  // Handle date selection
  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
    onSelectDate(day)
  }

  // Get appointments for a specific day
  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter((appointment) => isSameDay(appointment.date, day))
  }

  // Get status color for appointment
  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500"
      case "confirmed":
        return "bg-[#4DB6AC]"
      case "checked-in":
        return "bg-purple-500"
      case "in-progress":
        return "bg-[#FF8A65]"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      case "no-show":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Appointment Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth} aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</div>
            <Button variant="outline" size="icon" onClick={nextMonth} aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday} className="ml-2">
              Today
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2 font-medium">
              {day}
            </div>
          ))}

          {/* Fill in empty days from previous month */}
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-start-${index}`} className="p-1 aspect-square" />
          ))}

          {/* Render days of current month */}
          {monthDays.map((day) => {
            const dayAppointments = getAppointmentsForDay(day)
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isToday = isSameDay(day, new Date())

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "p-1 aspect-square border rounded-md cursor-pointer hover:bg-gray-100 transition-colors",
                  isSelected ? "border-[#4DB6AC] bg-[#4DB6AC]/10" : "border-transparent",
                  isToday ? "font-bold" : "",
                )}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex flex-col h-full">
                  <div className="text-xs mb-1">{format(day, "d")}</div>
                  {dayAppointments.length > 0 && (
                    <div className="flex flex-col gap-1 overflow-hidden">
                      {dayAppointments.length <= 2 ? (
                        dayAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className={cn(
                              "text-[10px] rounded px-1 py-0.5 text-white truncate",
                              getStatusColor(appointment.status),
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectAppointment(appointment.id)
                            }}
                          >
                            {appointment.time}
                          </div>
                        ))
                      ) : (
                        <div
                          className="text-[10px] rounded px-1 py-0.5 bg-[#4DB6AC] text-white truncate"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectDate(day)
                          }}
                        >
                          {dayAppointments.length} appts
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Fill in empty days from next month */}
          {Array.from({ length: 6 * 7 - monthDays.length - monthStart.getDay() }).map((_, index) => (
            <div key={`empty-end-${index}`} className="p-1 aspect-square" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
