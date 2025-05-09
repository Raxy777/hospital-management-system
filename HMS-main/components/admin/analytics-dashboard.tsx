"use client"

import { useState } from "react"
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns"
import { Calendar, Download, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { HospitalMetricsChart } from "./charts/hospital-metrics-chart"
import { DepartmentPerformanceChart } from "./charts/department-performance-chart"
import { PatientDemographicsChart } from "./charts/patient-demographics-chart"
import { StaffPerformanceChart } from "./charts/staff-performance-chart"
import { FinancialMetricsChart } from "./charts/financial-metrics-chart"
import { ResourceUtilizationChart } from "./charts/resource-utilization-chart"
import { AppointmentAnalyticsChart } from "./charts/appointment-analytics-chart"
import { generateHospitalMetrics } from "@/lib/analytics-data"

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year" | "custom">("month")
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState<Date>(endOfMonth(new Date()))
  const [department, setDepartment] = useState<string>("all")
  const [refreshKey, setRefreshKey] = useState<number>(0)

  // Handle date range change
  const handleDateRangeChange = (value: string) => {
    setDateRange(value as "week" | "month" | "quarter" | "year" | "custom")

    const today = new Date()
    if (value === "week") {
      setStartDate(subDays(today, 7))
      setEndDate(today)
    } else if (value === "month") {
      setStartDate(startOfMonth(today))
      setEndDate(endOfMonth(today))
    } else if (value === "quarter") {
      setStartDate(subMonths(today, 3))
      setEndDate(today)
    } else if (value === "year") {
      setStartDate(subMonths(today, 12))
      setEndDate(today)
    }
  }

  // Handle export report
  const handleExportReport = () => {
    // In a real app, this would generate and download a report
    alert("Exporting report for the selected date range and filters")
  }

  // Handle refresh data
  const handleRefreshData = () => {
    setRefreshKey((prev) => prev + 1)
  }

  // Get metrics based on selected date range and department
  const metrics = generateHospitalMetrics(startDate, endDate, department)

  return (
    <div className="space-y-6" key={refreshKey}>
      {/* Dashboard Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive analytics and reporting for hospital administrators</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Dashboard Filters</CardTitle>
          <CardDescription>Customize the dashboard view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Date Range:</span>
              <Select value={dateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">Last 3 Months</SelectItem>
                  <SelectItem value="year">Last 12 Months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dateRange === "custom" && (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-[130px] justify-start text-left font-normal">
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
                    <Button variant="outline" size="sm" className="w-[130px] justify-start text-left font-normal">
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

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Department:</span>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPatients.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge className={metrics.patientsTrend > 0 ? "bg-green-500" : "bg-red-500"}>
                {metrics.patientsTrend > 0 ? "+" : ""}
                {metrics.patientsTrend}%
              </Badge>
              <span className="ml-2">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.bedOccupancy}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge className={metrics.occupancyTrend > 0 ? "bg-green-500" : "bg-red-500"}>
                {metrics.occupancyTrend > 0 ? "+" : ""}
                {metrics.occupancyTrend}%
              </Badge>
              <span className="ml-2">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Length of Stay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgLengthOfStay} days</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge className={metrics.lengthOfStayTrend < 0 ? "bg-green-500" : "bg-red-500"}>
                {metrics.lengthOfStayTrend > 0 ? "+" : ""}
                {metrics.lengthOfStayTrend}%
              </Badge>
              <span className="ml-2">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge className={metrics.revenueTrend > 0 ? "bg-green-500" : "bg-red-500"}>
                {metrics.revenueTrend > 0 ? "+" : ""}
                {metrics.revenueTrend}%
              </Badge>
              <span className="ml-2">vs. previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="hospital" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="hospital">Hospital</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        {/* Hospital Overview Tab */}
        <TabsContent value="hospital" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <HospitalMetricsChart dateRange={dateRange} startDate={startDate} endDate={endDate} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Admissions vs. Discharges</CardTitle>
                <CardDescription>Patient flow analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Total Admissions</p>
                      <p className="text-2xl font-bold">{metrics.admissions.toLocaleString()}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge className={metrics.admissionsTrend > 0 ? "bg-green-500" : "bg-red-500"}>
                          {metrics.admissionsTrend > 0 ? "+" : ""}
                          {metrics.admissionsTrend}%
                        </Badge>
                        <span className="ml-2">vs. previous period</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Total Discharges</p>
                      <p className="text-2xl font-bold">{metrics.discharges.toLocaleString()}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge className={metrics.dischargesTrend > 0 ? "bg-green-500" : "bg-red-500"}>
                          {metrics.dischargesTrend > 0 ? "+" : ""}
                          {metrics.dischargesTrend}%
                        </Badge>
                        <span className="ml-2">vs. previous period</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Net Patient Flow</p>
                    <p className="text-2xl font-bold">{metrics.admissions - metrics.discharges}</p>
                    <p className="text-xs text-muted-foreground">
                      {metrics.admissions > metrics.discharges
                        ? "More patients admitted than discharged"
                        : "More patients discharged than admitted"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Department</CardTitle>
                <CardDescription>Emergency metrics and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">ER Visits</p>
                      <p className="text-2xl font-bold">{metrics.erVisits.toLocaleString()}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge className={metrics.erVisitsTrend > 0 ? "bg-green-500" : "bg-red-500"}>
                          {metrics.erVisitsTrend > 0 ? "+" : ""}
                          {metrics.erVisitsTrend}%
                        </Badge>
                        <span className="ml-2">vs. previous period</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Avg. Wait Time</p>
                      <p className="text-2xl font-bold">{metrics.erWaitTime} min</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge className={metrics.erWaitTimeTrend < 0 ? "bg-green-500" : "bg-red-500"}>
                          {metrics.erWaitTimeTrend > 0 ? "+" : ""}
                          {metrics.erWaitTimeTrend}%
                        </Badge>
                        <span className="ml-2">vs. previous period</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Admission Rate from ER</p>
                    <p className="text-2xl font-bold">{metrics.erAdmissionRate}%</p>
                    <p className="text-xs text-muted-foreground">
                      {metrics.erAdmissions.toLocaleString()} patients admitted from ER
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Comparative analysis across departments</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <DepartmentPerformanceChart dateRange={dateRange} startDate={startDate} endDate={endDate} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Departments</CardTitle>
                <CardDescription>Based on patient outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.topDepartments.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4DB6AC]/20">
                          <span className="text-xs font-bold text-[#4DB6AC]">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{dept.name}</p>
                          <p className="text-xs text-muted-foreground">{dept.metric}</p>
                        </div>
                      </div>
                      <Badge className="bg-[#4DB6AC]">{dept.score}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Capacity</CardTitle>
                <CardDescription>Current bed utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.departmentCapacity.map((dept, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{dept.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {dept.occupied}/{dept.total} Beds
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${
                            (dept.occupied / dept.total) > 0.9
                              ? "bg-red-500"
                              : dept.occupied / dept.total > 0.7
                                ? "bg-amber-500"
                                : "bg-[#4DB6AC]"
                          }`}
                          style={{ width: `${(dept.occupied / dept.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Efficiency</CardTitle>
                <CardDescription>Average length of stay by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.departmentEfficiency.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{dept.name}</p>
                        <p className="text-xs text-muted-foreground">Avg. stay: {dept.avgStay} days</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={dept.trend < 0 ? "bg-green-500" : dept.trend > 0 ? "bg-red-500" : "bg-gray-500"}
                        >
                          {dept.trend > 0 ? "+" : ""}
                          {dept.trend}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Patients Tab */}
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
              <CardDescription>Analysis of patient population</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PatientDemographicsChart dateRange={dateRange} startDate={startDate} endDate={endDate} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Diagnoses</CardTitle>
                <CardDescription>Most common patient conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.topDiagnoses.map((diagnosis, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4DB6AC]/20">
                          <span className="text-xs font-bold text-[#4DB6AC]">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{diagnosis.name}</p>
                          <p className="text-xs text-muted-foreground">{diagnosis.department}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{diagnosis.count} patients</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Satisfaction</CardTitle>
                <CardDescription>Survey results and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Satisfaction</span>
                    <span className="text-sm font-medium">{metrics.patientSatisfaction.overall}/5</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#4DB6AC]"
                      style={{ width: `${(metrics.patientSatisfaction.overall / 5) * 100}%` }}
                    ></div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    {Object.entries(metrics.patientSatisfaction.categories).map(([category, score], index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{category}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{score}/5</span>
                          <div className="ml-2 h-2 w-16 rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-[#4DB6AC]"
                              style={{ width: `${(score / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance</CardTitle>
              <CardDescription>Productivity and efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <StaffPerformanceChart dateRange={dateRange} startDate={startDate} endDate={endDate} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Staff Distribution</CardTitle>
                <CardDescription>By department and role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.staffDistribution.map((dept, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{dept.department}</span>
                        <span className="text-sm text-muted-foreground">{dept.count} staff</span>
                      </div>
                      <div className="flex h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(dept.roles.doctors / dept.count) * 100}%` }}
                        ></div>
                        <div
                          className="h-full bg-[#4DB6AC]"
                          style={{ width: `${(dept.roles.nurses / dept.count) * 100}%` }}
                        ></div>
                        <div
                          className="h-full bg-[#FF8A65]"
                          style={{ width: `${(dept.roles.staff / dept.count) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex text-xs text-muted-foreground justify-between">
                        <span>Doctors: {dept.roles.doctors}</span>
                        <span>Nurses: {dept.roles.nurses}</span>
                        <span>Other: {dept.roles.staff}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Staff</CardTitle>
                <CardDescription>Based on patient outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.topStaff.map((staff, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4DB6AC]/20">
                          <span className="text-xs font-bold text-[#4DB6AC]">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {staff.role}, {staff.department}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-[#4DB6AC]">{staff.score}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff Utilization</CardTitle>
                <CardDescription>Workload and capacity analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.staffUtilization.map((role, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{role.role}</span>
                        <span className="text-sm text-muted-foreground">{role.utilization}% utilized</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${
                            role.utilization > 90
                              ? "bg-red-500"
                              : role.utilization > 75
                                ? "bg-amber-500"
                                : "bg-[#4DB6AC]"
                          }`}
                          style={{ width: `${role.utilization}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {role.patientLoad} patients per {role.role.toLowerCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
              <CardDescription>Revenue, expenses, and profitability</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <FinancialMetricsChart dateRange={dateRange} startDate={startDate} endDate={endDate} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>By department and service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.revenueBreakdown.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.department}</span>
                        <span className="text-sm font-medium">${item.revenue.toLocaleString()}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#4DB6AC]"
                          style={{ width: `${(item.revenue / metrics.revenue) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {((item.revenue / metrics.revenue) * 100).toFixed(1)}% of total revenue
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Analysis</CardTitle>
                <CardDescription>Major expense categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.expenseBreakdown.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#FF8A65]"
                          style={{ width: `${(item.amount / metrics.expenses) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {((item.amount / metrics.expenses) * 100).toFixed(1)}% of total expenses
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Key financial indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge className={metrics.revenueTrend > 0 ? "bg-green-500" : "bg-red-500"}>
                          {metrics.revenueTrend > 0 ? "+" : ""}
                          {metrics.revenueTrend}%
                        </Badge>
                        <span className="ml-2">vs. previous period</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Total Expenses</p>
                      <p className="text-2xl font-bold">${metrics.expenses.toLocaleString()}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge className={metrics.expensesTrend < 0 ? "bg-green-500" : "bg-red-500"}>
                          {metrics.expensesTrend > 0 ? "+" : ""}
                          {metrics.expensesTrend}%
                        </Badge>
                        <span className="ml-2">vs. previous period</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Net Profit</p>
                    <p className="text-2xl font-bold">${(metrics.revenue - metrics.expenses).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      Profit Margin: {(((metrics.revenue - metrics.expenses) / metrics.revenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>Equipment, rooms, and supplies usage</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResourceUtilizationChart dateRange={dateRange} startDate={startDate} endDate={endDate} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Utilization</CardTitle>
                <CardDescription>Usage rates for critical equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.equipmentUtilization.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.equipment}</span>
                        <span className="text-sm text-muted-foreground">{item.utilization}% utilized</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${
                            item.utilization > 90
                              ? "bg-red-500"
                              : item.utilization > 75
                                ? "bg-amber-500"
                                : "bg-[#4DB6AC]"
                          }`}
                          style={{ width: `${item.utilization}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.inUse} of {item.total} units in use
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Utilization</CardTitle>
                <CardDescription>Usage rates by room type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.roomUtilization.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.roomType}</span>
                        <span className="text-sm text-muted-foreground">{item.utilization}% utilized</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${
                            item.utilization > 90
                              ? "bg-red-500"
                              : item.utilization > 75
                                ? "bg-amber-500"
                                : "bg-[#4DB6AC]"
                          }`}
                          style={{ width: `${item.utilization}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.inUse} of {item.total} rooms in use
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supply Inventory</CardTitle>
                <CardDescription>Critical supplies status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.supplyInventory.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.item}</span>
                        <span className="text-sm text-muted-foreground">{item.current} units</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${
                            (item.current / item.minimum) < 1.1
                              ? "bg-red-500"
                              : item.current / item.minimum < 1.5
                                ? "bg-amber-500"
                                : "bg-[#4DB6AC]"
                          }`}
                          style={{ width: `${Math.min((item.current / item.minimum) * 50, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.current < item.minimum
                          ? `${item.minimum - item.current} units below minimum`
                          : `${item.current - item.minimum} units above minimum`}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Analytics</CardTitle>
              <CardDescription>Scheduling and attendance patterns</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AppointmentAnalyticsChart dateRange={dateRange} startDate={startDate} endDate={endDate} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
                <CardDescription>Distribution by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(metrics.appointmentStatus).map(([status, count], index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium capitalize">{status.replace(/-/g, " ")}</span>
                        <span className="text-sm text-muted-foreground">{count} appointments</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${
                            status === "completed"
                              ? "bg-[#4DB6AC]"
                              : status === "cancelled" || status === "no-show"
                                ? "bg-red-500"
                                : status === "in-progress" || status === "checked-in"
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                          }`}
                          style={{ width: `${(count / metrics.totalAppointments) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {((count / metrics.totalAppointments) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Types</CardTitle>
                <CardDescription>Distribution by appointment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.appointmentTypes.map((type, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{type.name}</span>
                        <span className="text-sm text-muted-foreground">{type.count} appointments</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#4DB6AC]"
                          style={{ width: `${(type.count / metrics.totalAppointments) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {((type.count / metrics.totalAppointments) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Efficiency</CardTitle>
                <CardDescription>Wait times and duration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Average Wait Time</p>
                    <p className="text-2xl font-bold">{metrics.appointmentEfficiency.avgWaitTime} min</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Badge
                        className={metrics.appointmentEfficiency.waitTimeTrend < 0 ? "bg-green-500" : "bg-red-500"}
                      >
                        {metrics.appointmentEfficiency.waitTimeTrend > 0 ? "+" : ""}
                        {metrics.appointmentEfficiency.waitTimeTrend}%
                      </Badge>
                      <span className="ml-2">vs. previous period</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Average Appointment Duration</p>
                    <p className="text-2xl font-bold">{metrics.appointmentEfficiency.avgDuration} min</p>
                    <p className="text-xs text-muted-foreground">
                      Target: {metrics.appointmentEfficiency.targetDuration} min
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">No-Show Rate</p>
                    <p className="text-2xl font-bold">{metrics.appointmentEfficiency.noShowRate}%</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Badge className={metrics.appointmentEfficiency.noShowTrend < 0 ? "bg-green-500" : "bg-red-500"}>
                        {metrics.appointmentEfficiency.noShowTrend > 0 ? "+" : ""}
                        {metrics.appointmentEfficiency.noShowTrend}%
                      </Badge>
                      <span className="ml-2">vs. previous period</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}