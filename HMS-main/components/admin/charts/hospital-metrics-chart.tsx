"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { generateHospitalTimeSeriesData } from "@/lib/analytics-data"

interface HospitalMetricsChartProps {
  dateRange: string
  startDate: Date
  endDate: Date
}

export function HospitalMetricsChart({ dateRange, startDate, endDate }: HospitalMetricsChartProps) {
  const data = generateHospitalTimeSeriesData(startDate, endDate)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="admissions"
          stroke="#4DB6AC"
          activeDot={{ r: 8 }}
          name="Admissions"
        />
        <Line yAxisId="left" type="monotone" dataKey="discharges" stroke="#FF8A65" name="Discharges" />
        <Line yAxisId="right" type="monotone" dataKey="bedOccupancy" stroke="#9575CD" name="Bed Occupancy (%)" />
      </LineChart>
    </ResponsiveContainer>
  )
}
