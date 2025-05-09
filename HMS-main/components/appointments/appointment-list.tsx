"use client"

import { useState } from "react"
import { format, isSameDay } from "date-fns"
import { Calendar, Clock, User, Stethoscope, Search, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { CalendarAppointment } from "./appointment-calendar"
import type { AppointmentStatus } from "./appointment-details"

interface AppointmentListProps {
  appointments: CalendarAppointment[]
  selectedDate: Date | null
  onSelectAppointment: (appointmentId: string) => void
}

export function AppointmentList({ appointments, selectedDate, onSelectAppointment }: AppointmentListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus[]>([])

  // Filter appointments by selected date, search query, and status
  const filteredAppointments = appointments
    .filter((appointment) => !selectedDate || isSameDay(appointment.date, selectedDate))
    .filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((appointment) => statusFilter.length === 0 || statusFilter.includes(appointment.status))
    .sort((a, b) => {
      // Sort by time
      const timeA = a.time.replace(/[^\d:]/g, "")
      const timeB = b.time.replace(/[^\d:]/g, "")
      return timeA.localeCompare(timeB)
    })

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

  // Toggle status filter
  const toggleStatusFilter = (status: AppointmentStatus) => {
    setStatusFilter((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter([])
  }

  // All possible statuses for filter
  const allStatuses: AppointmentStatus[] = [
    "scheduled",
    "confirmed",
    "checked-in",
    "in-progress",
    "completed",
    "cancelled",
    "no-show",
  ]

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>
            {selectedDate ? `Appointments for ${format(selectedDate, "MMMM d, yyyy")}` : "All Appointments"}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              disabled={searchQuery === "" && statusFilter.length === 0}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Search and filter */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search appointments..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Status Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {allStatuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={() => toggleStatusFilter(status)}
                  >
                    <Badge className={`${getStatusBadge(status).color} mr-2`}>&nbsp;</Badge>
                    {getStatusBadge(status).text}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Appointment list */}
          {filteredAppointments.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-350px)] min-h-[300px]">
              <div className="space-y-3">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => onSelectAppointment(appointment.id)}
                  >
                    <div className="flex flex-col items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="h-full w-[1px] bg-muted my-1"></div>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <p className="font-medium">{appointment.patientName}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Stethoscope className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{appointment.doctorName}</p>
                          </div>
                        </div>
                        <Badge className={getStatusBadge(appointment.status).color}>
                          {getStatusBadge(appointment.status).text}
                        </Badge>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-sm">
                          {!selectedDate && format(appointment.date, "MMM d, yyyy")} • {appointment.time}
                        </p>
                        <p className="text-sm">{appointment.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <p className="text-muted-foreground">No appointments found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or select a different date
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
