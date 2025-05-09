"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { generateStaffPerformanceData } from "@/lib/analytics-data"

interface StaffPerformanceChartProps {
  dateRange: string
  startDate: Date
  endDate: Date
}

export function StaffPerformanceChart({ dateRange, startDate, endDate }: StaffPerformanceChartProps) {
  const data = generateStaffPerformanceData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="role" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="patientsPerDay" fill="#4DB6AC" name="Patients Per Day" />
        <Bar dataKey="hoursPerPatient" fill="#FF8A65" name="Hours Per Patient" />
        <Bar dataKey="satisfactionScore" fill="#9575CD" name="Satisfaction Score" />
      </BarChart>
    </ResponsiveContainer>
  )
}
