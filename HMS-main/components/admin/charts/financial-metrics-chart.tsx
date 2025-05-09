"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { generateFinancialTimeSeriesData } from "@/lib/analytics-data"

interface FinancialMetricsChartProps {
  dateRange: string
  startDate: Date
  endDate: Date
}

export function FinancialMetricsChart({ dateRange, startDate, endDate }: FinancialMetricsChartProps) {
  const data = generateFinancialTimeSeriesData(startDate, endDate)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Legend />
        <Area type="monotone" dataKey="revenue" stackId="1" stroke="#4DB6AC" fill="#4DB6AC" name="Revenue" />
        <Area type="monotone" dataKey="expenses" stackId="2" stroke="#FF8A65" fill="#FF8A65" name="Expenses" />
        <Area type="monotone" dataKey="profit" stackId="3" stroke="#9575CD" fill="#9575CD" name="Profit" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
