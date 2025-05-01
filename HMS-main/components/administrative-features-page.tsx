"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clipboard, Settings, Users, Building2 } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { StaffScheduling } from "@/components/admin/staff-scheduling"
import { ResourceManagement } from "@/components/admin/resource-management"

export function AdministrativeFeaturesPage() {
  const { user } = useUser()

  if (!user) {
    return <div>Loading...</div>
  }

  // Ensure only admins can access this page
  if (user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-2">You do not have permission to access this page.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Administrative Features</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Administrator View</span>
        </div>
      </div>

      <Tabs defaultValue="staff-scheduling" className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff-scheduling" className="flex gap-2">
            <Users className="h-4 w-4" /> Staff Scheduling
          </TabsTrigger>
          <TabsTrigger value="resource-management" className="flex gap-2">
            <Building2 className="h-4 w-4" /> Resource Management
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex gap-2">
            <Clipboard className="h-4 w-4" /> Reports
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex gap-2">
            <Settings className="h-4 w-4" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Staff Scheduling Tab */}
        <TabsContent value="staff-scheduling">
          <StaffScheduling />
        </TabsContent>

        {/* Resource Management Tab */}
        <TabsContent value="resource-management">
          <ResourceManagement />
        </TabsContent>

        <TabsContent value="reports" className="h-[400px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
          <p className="text-muted-foreground">Reports content would appear here</p>
        </TabsContent>

        <TabsContent value="settings" className="h-[400px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
          <p className="text-muted-foreground">Settings content would appear here</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
