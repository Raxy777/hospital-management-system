"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StaffScheduling } from "./admin/staff-scheduling"
import { ResourceManagement } from "./admin/resource-management"
import { BarChart3, Calendar, Building2, Users, FileBarChart, Settings } from "lucide-react"

export function AdministrativeFeaturesPage() {
  const [activeTab, setActiveTab] = useState("staff")
  const router = useRouter()

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Administrative Features</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setActiveTab("staff")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Scheduling</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/32</div>
            <p className="text-xs text-muted-foreground">Staff on duty today</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setActiveTab("resources")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resource Management</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Current bed occupancy</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => router.push("/admin/analytics")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics Dashboard</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">Total patients this month</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Management</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">Active staff accounts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff">Staff Scheduling</TabsTrigger>
          <TabsTrigger value="resources">Resource Management</TabsTrigger>
          <TabsTrigger value="reports" onClick={() => router.push("/admin/analytics")}>
            Analytics & Reports
          </TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="staff">
          <StaffScheduling />
        </TabsContent>
        <TabsContent value="resources">
          <ResourceManagement />
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Access detailed analytics and reporting dashboards for hospital operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Analytics Dashboard provides comprehensive insights into hospital performance, patient metrics,
                financial data, and resource utilization.
              </p>
              <div className="flex justify-center">
                <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]" onClick={() => router.push("/admin/analytics")}>
                  <FileBarChart className="mr-2 h-4 w-4" />
                  Open Analytics Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Manage system-wide configurations and preferences</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">System settings module coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}