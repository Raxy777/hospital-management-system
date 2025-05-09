"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { generateDepartmentPerformanceData } from "@/lib/analytics-data"

interface DepartmentPerformanceChartProps {
  dateRange: string
  startDate: Date
  endDate: Date
}

export function DepartmentPerformanceChart({ dateRange, startDate, endDate }: DepartmentPerformanceChartProps) {
  const data = generateDepartmentPerformanceData()

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
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="patients" fill="#4DB6AC" name="Patients" />
        <Bar yAxisId="left" dataKey="avgStay" fill="#FF8A65" name="Avg. Stay (days)" />
        <Bar yAxisId="right" dataKey="satisfaction" fill="#9575CD" name="Patient Satisfaction" />
      </BarChart>
    </ResponsiveContainer>
  )
}
