"use client"

import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { generateAppointmentAnalyticsData } from "@/lib/analytics-data"

interface AppointmentAnalyticsChartProps {
  dateRange: string
  startDate: Date
  endDate: Date
}

export function AppointmentAnalyticsChart({ dateRange, startDate, endDate }: AppointmentAnalyticsChartProps) {
  const data = generateAppointmentAnalyticsData(startDate, endDate)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" scale="band" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="scheduled" barSize={20} fill="#4DB6AC" name="Scheduled" />
        <Bar yAxisId="left" dataKey="completed" barSize={20} fill="#81C784" name="Completed" />
        <Bar yAxisId="left" dataKey="cancelled" barSize={20} fill="#FF8A65" name="Cancelled" />
        <Line yAxisId="right" type="monotone" dataKey="noShowRate" stroke="#9575CD" name="No-Show Rate (%)" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
