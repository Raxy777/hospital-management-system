"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { AppointmentCalendar, type CalendarAppointment } from "./appointments/appointment-calendar"
import { AppointmentList } from "./appointments/appointment-list"
import { AppointmentDetails } from "./appointments/appointment-details"
import { AppointmentForm } from "./appointments/appointment-form"
import { AppointmentNotifications } from "./appointments/appointment-notification"
import { generateSampleAppointments } from "@/lib/sample-data"

export function AppointmentManagementPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null)
  const [isEditingAppointment, setIsEditingAppointment] = useState(false)
  const [activeTab, setActiveTab] = useState("calendar")

  // Load sample appointments
  useEffect(() => {
    setAppointments(generateSampleAppointments())
  }, [])

  // Handle date selection
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
    setActiveTab("list")
  }

  // Handle appointment selection
  const handleSelectAppointment = (appointmentId: string) => {
    setSelectedAppointment(appointmentId)
  }

  // Handle appointment edit
  const handleEditAppointment = () => {
    setIsEditingAppointment(true)
  }

  // Handle close appointment details
  const handleCloseAppointmentDetails = () => {
    setSelectedAppointment(null)
    setIsEditingAppointment(false)
  }

  // Get selected appointment details
  const getSelectedAppointment = () => {
    if (!selectedAppointment) return null
    return appointments.find((appointment) => appointment.id === selectedAppointment)
  }

  // Create new appointment
  const handleCreateAppointment = () => {
    router.push("/appointments/new")
  }

  // View reports
  const handleViewReports = () => {
    router.push("/appointments/reports")
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleViewReports}>
              View Reports
            </Button>
            <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]" onClick={handleCreateAppointment}>
              <Plus className="mr-2 h-4 w-4" /> New Appointment
            </Button>
          </div>
        </div>

        {selectedAppointment && !isEditingAppointment ? (
          // Show appointment details
          <AppointmentDetails
            id={selectedAppointment}
            patientId="P1001"
            patientName={getSelectedAppointment()?.patientName || ""}
            doctorId="D1001"
            doctorName={getSelectedAppointment()?.doctorName || ""}
            doctorDepartment="Cardiology"
            date={getSelectedAppointment()?.date || new Date()}
            time={getSelectedAppointment()?.time || ""}
            duration="30"
            type="checkup"
            typeName={getSelectedAppointment()?.type || ""}
            notes="Patient has reported mild chest pain and shortness of breath. Follow-up from previous visit."
            status={getSelectedAppointment()?.status || "scheduled"}
            onEdit={handleEditAppointment}
            onClose={handleCloseAppointmentDetails}
          />
        ) : isEditingAppointment && selectedAppointment ? (
          // Show appointment edit form
          <AppointmentForm
            initialData={{
              patientId: "P1001",
              doctorId: "D1001",
              date: getSelectedAppointment()?.date || new Date(),
              time: getSelectedAppointment()?.time || "",
              duration: "30",
              type: "checkup",
              notes: "Patient has reported mild chest pain and shortness of breath. Follow-up from previous visit.",
            }}
            onCancel={handleCloseAppointmentDetails}
          />
        ) : (
          // Show calendar and list view
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-[1fr_300px]">
                <AppointmentCalendar
                  appointments={appointments}
                  onSelectDate={handleSelectDate}
                  onSelectAppointment={handleSelectAppointment}
                />

                <div className="space-y-4">
                  <AppointmentList
                    appointments={appointments}
                    selectedDate={selectedDate}
                    onSelectAppointment={handleSelectAppointment}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              <AppointmentList
                appointments={appointments}
                selectedDate={selectedDate}
                onSelectAppointment={handleSelectAppointment}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Appointment Notifications */}
      <AppointmentNotifications appointments={appointments} onView={handleSelectAppointment} />
    </>
  )
}