import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react"

export function AppointmentManagementPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
        <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">
          <Plus className="mr-2 h-4 w-4" /> New Appointment
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-medium">April 2025</h3>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Today
                </Button>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2 font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2 // Offset to start month on correct day
                return (
                  <div
                    key={i}
                    className={`
                      aspect-square rounded-md flex flex-col items-center justify-start p-1
                      ${day > 0 && day <= 30 ? "bg-white border" : "bg-transparent"}
                      ${day === 27 ? "border-2 border-[#4DB6AC]" : ""}
                    `}
                  >
                    {day > 0 && day <= 30 && (
                      <>
                        <span className={`text-xs ${day === 27 ? "font-bold" : ""}`}>{day}</span>
                        {[5, 12, 19, 27].includes(day) && (
                          <div className="mt-1 w-full">
                            <div className={`text-[10px] rounded px-1 py-0.5 bg-[#4DB6AC] text-white truncate`}>
                              {day === 27 ? "4 appts" : "2 appts"}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-[350px]">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "09:00 AM",
                  patient: "John Smith",
                  doctor: "Dr. Williams",
                  type: "Check-up",
                  status: "Completed",
                },
                {
                  time: "10:30 AM",
                  patient: "Emily Johnson",
                  doctor: "Dr. Martinez",
                  type: "Follow-up",
                  status: "In Progress",
                },
                {
                  time: "11:45 AM",
                  patient: "Michael Brown",
                  doctor: "Dr. Johnson",
                  type: "Consultation",
                  status: "Waiting",
                },
                {
                  time: "02:15 PM",
                  patient: "Sarah Davis",
                  doctor: "Dr. Thompson",
                  type: "Procedure",
                  status: "Scheduled",
                },
                {
                  time: "03:30 PM",
                  patient: "Robert Wilson",
                  doctor: "Dr. Garcia",
                  type: "Check-up",
                  status: "Scheduled",
                },
              ].map((appointment, index) => (
                <div
                  key={index}
                  className="flex gap-3 border-l-2 pl-3"
                  style={{
                    borderColor:
                      appointment.status === "Completed"
                        ? "#9e9e9e"
                        : appointment.status === "In Progress"
                          ? "#FF8A65"
                          : appointment.status === "Waiting"
                            ? "#4DB6AC"
                            : "#EEEEEE",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <div className="h-full w-[1px] bg-muted my-1"></div>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor} • {appointment.type}
                    </p>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm">{appointment.time}</p>
                      <p
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor:
                            appointment.status === "Completed"
                              ? "#9e9e9e"
                              : appointment.status === "In Progress"
                                ? "#FF8A65"
                                : appointment.status === "Waiting"
                                  ? "#4DB6AC"
                                  : "#EEEEEE",
                          color:
                            appointment.status === "Completed"
                              ? "white"
                              : appointment.status === "In Progress"
                                ? "white"
                                : appointment.status === "Waiting"
                                  ? "white"
                                  : "#333333",
                        }}
                      >
                        {appointment.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Appointments
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Patient Information</h3>
              <div className="rounded-md bg-[#EEEEEE] p-4 h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">Select an appointment to view details</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Appointment History</h3>
              <div className="rounded-md bg-[#EEEEEE] p-4 h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">Select an appointment to view history</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline">Reschedule</Button>
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">Check In</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
