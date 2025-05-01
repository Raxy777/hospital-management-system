"use client"

import { useUser } from "@/contexts/user-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BedIcon, Calendar, Users, Activity, Clipboard, FileText, FlaskRoundIcon as Flask } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardPage() {
  const { user } = useUser()

  if (!user) {
    return <div>Loading dashboard...</div>
  }

  // Role-specific dashboard data
  const getDashboardData = () => {
    switch (user.role) {
      case "admin":
        return {
          title: "Administrator Dashboard",
          stats: [
            { title: "Total Patients", value: "1,284", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
            { title: "Bed Occupancy", value: "78%", icon: <BedIcon className="h-4 w-4 text-muted-foreground" /> },
            {
              title: "Today's Appointments",
              value: "42",
              icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
            },
            { title: "Staff On Duty", value: "24/32", icon: <Activity className="h-4 w-4 text-muted-foreground" /> },
          ],
        }
      case "doctor":
        return {
          title: "Doctor Dashboard",
          stats: [
            { title: "My Patients", value: "28", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
            {
              title: "Today's Appointments",
              value: "8",
              icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
            },
            { title: "Pending Reports", value: "5", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
            {
              title: "Department Status",
              value: "Normal",
              icon: <Activity className="h-4 w-4 text-muted-foreground" />,
            },
          ],
        }
      case "nurse":
        return {
          title: "Nurse Dashboard",
          stats: [
            { title: "Assigned Patients", value: "12", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
            { title: "Tasks Pending", value: "7", icon: <Clipboard className="h-4 w-4 text-muted-foreground" /> },
            {
              title: "Medication Rounds",
              value: "3",
              icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
            },
            { title: "Shift Status", value: "On Duty", icon: <Activity className="h-4 w-4 text-muted-foreground" /> },
          ],
        }
      case "lab":
        return {
          title: "Lab Assistant Dashboard",
          stats: [
            { title: "Pending Tests", value: "15", icon: <Flask className="h-4 w-4 text-muted-foreground" /> },
            { title: "Completed Today", value: "23", icon: <Clipboard className="h-4 w-4 text-muted-foreground" /> },
            {
              title: "Critical Results",
              value: "3",
              icon: <Activity className="h-4 w-4 text-muted-foreground" />,
            },
            {
              title: "Sample Collections",
              value: "8",
              icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
            },
          ],
        }
      default:
        return {
          title: "Dashboard",
          stats: [
            { title: "Total Patients", value: "1,284", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
            { title: "Bed Occupancy", value: "78%", icon: <BedIcon className="h-4 w-4 text-muted-foreground" /> },
            {
              title: "Today's Appointments",
              value: "42",
              icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
            },
            { title: "Staff On Duty", value: "24/32", icon: <Activity className="h-4 w-4 text-muted-foreground" /> },
          ],
        }
    }
  }

  const dashboardData = getDashboardData()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{dashboardData.title}</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dashboardData.stats.map((stat, index) => (
              <Card key={index} className="border-l-4 border-l-[#4DB6AC]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.title === "Bed Occupancy" && <Progress value={78} className="h-2 mt-2" />}
                  {stat.title === "Today's Appointments" && (
                    <p className="text-xs text-muted-foreground">8 remaining</p>
                  )}
                  {stat.title === "Staff On Duty" && <p className="text-xs text-muted-foreground">75% availability</p>}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Role-specific content */}
          {user.role === "admin" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Bed Occupancy Visualization</CardTitle>
                  <CardDescription>Hospital-wide bed status</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
                  <p className="text-muted-foreground">Bed occupancy chart would appear here</p>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Appointment Schedule</CardTitle>
                  <CardDescription>Today's appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "09:00 AM", patient: "John Smith", doctor: "Dr. Williams", type: "Check-up" },
                      { time: "10:30 AM", patient: "Emily Johnson", doctor: "Dr. Martinez", type: "Follow-up" },
                      { time: "11:45 AM", patient: "Michael Brown", doctor: "Dr. Johnson", type: "Consultation" },
                      { time: "02:15 PM", patient: "Sarah Davis", doctor: "Dr. Thompson", type: "Procedure" },
                    ].map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-sm text-muted-foreground">{appointment.patient}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{appointment.doctor}</p>
                          <p className="text-xs text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {user.role === "doctor" && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "09:00 AM", patient: "John Smith", type: "Check-up", status: "Completed" },
                      { time: "10:30 AM", patient: "Emily Johnson", type: "Follow-up", status: "In Progress" },
                      { time: "11:45 AM", patient: "Michael Brown", type: "Consultation", status: "Waiting" },
                      { time: "02:15 PM", patient: "Sarah Davis", type: "Procedure", status: "Scheduled" },
                    ].map((appointment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2"
                        style={{
                          opacity: appointment.status === "Completed" ? 0.7 : 1,
                        }}
                      >
                        <div>
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-sm text-muted-foreground">{appointment.patient}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{appointment.type}</p>
                          <p
                            className="text-xs px-2 py-0.5 rounded-full inline-block"
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
                                appointment.status === "Completed" ||
                                appointment.status === "In Progress" ||
                                appointment.status === "Waiting"
                                  ? "white"
                                  : "#333333",
                            }}
                          >
                            {appointment.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Patient Overview</CardTitle>
                  <CardDescription>Your assigned patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "John Smith", age: 45, condition: "Hypertension", status: "Stable" },
                      { name: "Emily Johnson", age: 32, condition: "Pregnancy", status: "Monitoring" },
                      { name: "Michael Brown", age: 58, condition: "Diabetes", status: "Improving" },
                      { name: "Sarah Davis", age: 27, condition: "Asthma", status: "Stable" },
                    ].map((patient, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} years • {patient.condition}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-xs px-2 py-0.5 rounded-full inline-block"
                            style={{
                              backgroundColor:
                                patient.status === "Stable"
                                  ? "#4DB6AC"
                                  : patient.status === "Monitoring"
                                    ? "#FF8A65"
                                    : "#9e9e9e",
                              color: "white",
                            }}
                          >
                            {patient.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {user.role === "nurse" && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Tasks</CardTitle>
                  <CardDescription>Assigned tasks for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "08:00 AM", task: "Medication Round", patients: "5 patients", completed: true },
                      { time: "10:00 AM", task: "Vital Signs Check", patients: "12 patients", completed: true },
                      { time: "12:00 PM", task: "Medication Round", patients: "5 patients", completed: false },
                      { time: "02:00 PM", task: "Patient Assessment", patients: "3 patients", completed: false },
                      { time: "04:00 PM", task: "Medication Round", patients: "5 patients", completed: false },
                    ].map((task, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2"
                        style={{
                          opacity: task.completed ? 0.7 : 1,
                        }}
                      >
                        <div>
                          <p className="font-medium">{task.time}</p>
                          <p className="text-sm text-muted-foreground">{task.task}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{task.patients}</p>
                          <p
                            className="text-xs px-2 py-0.5 rounded-full inline-block"
                            style={{
                              backgroundColor: task.completed ? "#9e9e9e" : "#4DB6AC",
                              color: "white",
                            }}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Patient Vitals</CardTitle>
                  <CardDescription>Recent vital sign recordings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "John Smith",
                        time: "07:30 AM",
                        vitals: "BP: 130/85, HR: 72, Temp: 98.6°F",
                        status: "Normal",
                      },
                      {
                        name: "Emily Johnson",
                        time: "08:15 AM",
                        vitals: "BP: 110/70, HR: 68, Temp: 98.2°F",
                        status: "Normal",
                      },
                      {
                        name: "Michael Brown",
                        time: "09:00 AM",
                        vitals: "BP: 145/95, HR: 88, Temp: 99.1°F",
                        status: "Attention",
                      },
                      {
                        name: "Sarah Davis",
                        time: "09:45 AM",
                        vitals: "BP: 120/80, HR: 75, Temp: 98.8°F",
                        status: "Normal",
                      },
                    ].map((record, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{record.name}</p>
                          <p className="text-sm text-muted-foreground">{record.vitals}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{record.time}</p>
                          <p
                            className="text-xs px-2 py-0.5 rounded-full inline-block"
                            style={{
                              backgroundColor: record.status === "Normal" ? "#4DB6AC" : "#FF8A65",
                              color: "white",
                            }}
                          >
                            {record.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {user.role === "lab" && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Lab Tests</CardTitle>
                  <CardDescription>Tests awaiting processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "08:30 AM", patient: "John Smith", test: "Complete Blood Count", priority: "Routine" },
                      { time: "09:15 AM", patient: "Emily Johnson", test: "Lipid Panel", priority: "Routine" },
                      { time: "10:00 AM", patient: "Michael Brown", test: "HbA1c", priority: "Urgent" },
                      { time: "11:30 AM", patient: "Sarah Davis", test: "Urinalysis", priority: "Routine" },
                      { time: "01:45 PM", patient: "Robert Wilson", test: "Liver Function", priority: "STAT" },
                    ].map((test, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{test.patient}</p>
                          <p className="text-sm text-muted-foreground">{test.test}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{test.time}</p>
                          <p
                            className="text-xs px-2 py-0.5 rounded-full inline-block"
                            style={{
                              backgroundColor:
                                test.priority === "STAT" ? "red" : test.priority === "Urgent" ? "#FF8A65" : "#4DB6AC",
                              color: "white",
                            }}
                          >
                            {test.priority}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Results</CardTitle>
                  <CardDescription>Recently completed lab tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        time: "Yesterday, 3:30 PM",
                        patient: "Jennifer Lee",
                        test: "Thyroid Panel",
                        status: "Abnormal",
                      },
                      {
                        time: "Yesterday, 2:15 PM",
                        patient: "David Martinez",
                        test: "Metabolic Panel",
                        status: "Normal",
                      },
                      {
                        time: "Yesterday, 11:45 AM",
                        patient: "Amanda Wilson",
                        test: "Complete Blood Count",
                        status: "Normal",
                      },
                      {
                        time: "Yesterday, 10:30 AM",
                        patient: "Thomas Anderson",
                        test: "Liver Function",
                        status: "Abnormal",
                      },
                    ].map((result, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{result.patient}</p>
                          <p className="text-sm text-muted-foreground">{result.test}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{result.time}</p>
                          <p
                            className="text-xs px-2 py-0.5 rounded-full inline-block"
                            style={{
                              backgroundColor: result.status === "Normal" ? "#4DB6AC" : "#FF8A65",
                              color: "white",
                            }}
                          >
                            {result.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        <TabsContent value="analytics" className="h-[400px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
          <p className="text-muted-foreground">Analytics content would appear here</p>
        </TabsContent>
        <TabsContent value="reports" className="h-[400px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
          <p className="text-muted-foreground">Reports content would appear here</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
