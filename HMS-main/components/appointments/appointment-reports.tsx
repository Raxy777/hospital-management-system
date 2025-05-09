"use client"

import { useState } from "react"
import { format, subDays, startOfMonth, endOfMonth } from "date-fns"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { AppointmentStatus } from "./appointment-details"
import type { CalendarAppointment } from "./appointment-calendar"

interface AppointmentReportsProps {
  appointments: CalendarAppointment[]
}

export function AppointmentReports({ appointments }: AppointmentReportsProps) {
  const [dateRange, setDateRange] = useState<"week" | "month" | "custom">("week")
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")

  // Get filtered appointments based on date range and department
  const getFilteredAppointments = () => {
    let filteredByDate = appointments

    // Filter by date range
    if (dateRange === "week") {
      const weekStart = subDays(new Date(), 7)
      filteredByDate = appointments.filter(
        (appointment) => appointment.date >= weekStart && appointment.date <= new Date(),
      )
    } else if (dateRange === "month") {
      const monthStart = startOfMonth(new Date())
      const monthEnd = endOfMonth(new Date())
      filteredByDate = appointments.filter(
        (appointment) => appointment.date >= monthStart && appointment.date <= monthEnd,
      )
    } else {
      // Custom date range
      filteredByDate = appointments.filter(
        (appointment) => appointment.date >= startDate && appointment.date <= endDate,
      )
    }

    // Filter by department (in a real app, we would have department info)
    if (departmentFilter !== "all") {
      // This is a placeholder - in a real app, we would filter by department
      return filteredByDate
    }

    return filteredByDate
  }

  const filteredAppointments = getFilteredAppointments()

  // Generate data for appointment status chart
  const getStatusChartData = () => {
    const statusCounts: Record<AppointmentStatus, number> = {
      scheduled: 0,
      confirmed: 0,
      "checked-in": 0,
      "in-progress": 0,
      completed: 0,
      cancelled: 0,
      "no-show": 0,
    }

    filteredAppointments.forEach((appointment) => {
      statusCounts[appointment.status]++
    })

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, " "),
      value: count,
    }))
  }

  // Generate data for appointments by day chart
  const getAppointmentsByDayData = () => {
    const dayCount: Record<string, number> = {}

    filteredAppointments.forEach((appointment) => {
      const day = format(appointment.date, "EEE")
      dayCount[day] = (dayCount[day] || 0) + 1
    })

    // Ensure all days of the week are represented
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return daysOfWeek.map((day) => ({
      name: day,
      appointments: dayCount[day] || 0,
    }))
  }

  // Colors for pie chart
  const COLORS = ["#4DB6AC", "#FF8A65", "#9575CD", "#64B5F6", "#81C784", "#e57373", "#9e9e9e"]

  // Handle date range change
  const handleDateRangeChange = (value: string) => {
    setDateRange(value as "week" | "month" | "custom")

    if (value === "week") {
      setStartDate(subDays(new Date(), 7))
      setEndDate(new Date())
    } else if (value === "month") {
      setStartDate(startOfMonth(new Date()))
      setEndDate(endOfMonth(new Date()))
    }
  }

  // Handle export report
  const handleExportReport = () => {
    // In a real app, this would generate and download a report
    console.log("Exporting report for", {
      dateRange,
      startDate,
      endDate,
      departmentFilter,
      appointmentCount: filteredAppointments.length,
    })

    alert("Report export functionality would be implemented here.")
  }

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {dateRange === "custom" && (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(startDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span>to</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(endDate, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={handleExportReport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredAppointments.length}</div>
            <p className="text-xs text-muted-foreground">During selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredAppointments.filter((a) => a.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (filteredAppointments.filter((a) => a.status === "completed").length / filteredAppointments.length) *
                  100,
              ) || 0}
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredAppointments.filter((a) => a.status === "cancelled").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (filteredAppointments.filter((a) => a.status === "cancelled").length / filteredAppointments.length) *
                  100,
              ) || 0}
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">No-Shows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredAppointments.filter((a) => a.status === "no-show").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (filteredAppointments.filter((a) => a.status === "no-show").length / filteredAppointments.length) * 100,
              ) || 0}
              % of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getStatusChartData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {getStatusChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments by Day</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getAppointmentsByDayData()}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#4DB6AC" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
