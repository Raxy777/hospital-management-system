"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Plus, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function StaffScheduling() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search staff members..." className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">
            <Plus className="mr-2 h-4 w-4" /> Add Shift
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>Staff shifts for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-8 gap-2">
                  <div className="p-2 font-medium text-center">Staff</div>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="p-2 font-medium text-center">
                      {day}
                    </div>
                  ))}
                </div>
                {[
                  {
                    name: "Dr. Sarah Johnson",
                    role: "Cardiologist",
                    department: "Cardiology",
                    shifts: [1, 1, 0, 1, 1, 0, 0],
                  },
                  {
                    name: "Dr. Michael Williams",
                    role: "Neurologist",
                    department: "Neurology",
                    shifts: [1, 1, 1, 1, 0, 0, 0],
                  },
                  {
                    name: "Nurse Emily Davis",
                    role: "Head Nurse",
                    department: "ICU",
                    shifts: [0, 1, 1, 1, 1, 0, 0],
                  },
                  {
                    name: "Dr. Robert Brown",
                    role: "Pediatrician",
                    department: "Pediatrics",
                    shifts: [1, 0, 0, 1, 1, 1, 0],
                  },
                  {
                    name: "Nurse Jessica Wilson",
                    role: "Nurse",
                    department: "Emergency",
                    shifts: [0, 0, 1, 1, 1, 1, 1],
                  },
                  {
                    name: "Dr. David Martinez",
                    role: "Surgeon",
                    department: "Surgery",
                    shifts: [1, 1, 1, 0, 0, 0, 1],
                  },
                ].map((staff, index) => (
                  <div key={index} className="grid grid-cols-8 gap-2 border-t py-2">
                    <div className="p-2">
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">{staff.role}</p>
                    </div>
                    {staff.shifts.map((shift, idx) => (
                      <div key={idx} className="p-2 flex items-center justify-center">
                        {shift === 1 ? (
                          <Badge className="bg-[#4DB6AC]">
                            <Clock className="mr-1 h-3 w-3" /> On Duty
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Off</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Availability</CardTitle>
            <CardDescription>Current staff on duty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { department: "Cardiology", total: 12, available: 8 },
                { department: "Neurology", total: 10, available: 6 },
                { department: "Pediatrics", total: 8, available: 5 },
                { department: "Emergency", total: 15, available: 12 },
                { department: "Surgery", total: 9, available: 4 },
                { department: "ICU", total: 14, available: 10 },
              ].map((dept, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{dept.department}</span>
                    <span className="text-sm text-muted-foreground">
                      {dept.available}/{dept.total} Available
                    </span>
                  </div>
                  <Progress value={(dept.available / dept.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Shift Changes</CardTitle>
          <CardDescription>Scheduled changes for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                staff: "Dr. Sarah Johnson",
                type: "Time Off",
                date: "April 30, 2025",
                status: "Approved",
                notes: "Annual leave",
              },
              {
                staff: "Nurse Emily Davis",
                type: "Shift Swap",
                date: "May 2, 2025",
                status: "Pending",
                notes: "Swapping with Jessica Wilson",
              },
              {
                staff: "Dr. Michael Williams",
                type: "Coverage",
                date: "May 3, 2025",
                status: "Approved",
                notes: "Covering for Dr. Brown",
              },
              {
                staff: "Dr. Robert Brown",
                type: "Time Off",
                date: "May 3-5, 2025",
                status: "Approved",
                notes: "Conference attendance",
              },
            ].map((change, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4DB6AC]/20 text-[#4DB6AC]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{change.staff}</h4>
                    <Badge
                      className={
                        change.status === "Approved"
                          ? "bg-[#4DB6AC]"
                          : change.status === "Pending"
                            ? "bg-[#FF8A65]"
                            : "bg-gray-500"
                      }
                    >
                      {change.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {change.type} • {change.date}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{change.notes}</p>
                </div>
                <div className="flex gap-2">
                  {change.status === "Pending" && (
                    <>
                      <Button variant="outline" size="sm">
                        Deny
                      </Button>
                      <Button size="sm" className="bg-[#4DB6AC] hover:bg-[#3da69c]">
                        Approve
                      </Button>
                    </>
                  )}
                  {change.status === "Approved" && (
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
