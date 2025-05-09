"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { generateResourceUtilizationData } from "@/lib/analytics-data"

interface ResourceUtilizationChartProps {
  dateRange: string
  startDate: Date
  endDate: Date
}

export function ResourceUtilizationChart({ dateRange, startDate, endDate }: ResourceUtilizationChartProps) {
  const data = generateResourceUtilizationData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="resource" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Current Utilization (%)" dataKey="utilization" stroke="#4DB6AC" fill="#4DB6AC" fillOpacity={0.6} />
        <Radar name="Target Utilization (%)" dataKey="target" stroke="#FF8A65" fill="#FF8A65" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}
