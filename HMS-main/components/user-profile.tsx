"use client"

import { useUser } from "@/contexts/user-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Phone, Clock, Building2, Award, FileText, Shield } from "lucide-react"

export function UserProfile() {
  const { user } = useUser()

  if (!user) {
    return <div>Loading user profile...</div>
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500"
      case "doctor":
        return "bg-blue-500"
      case "nurse":
        return "bg-green-500"
      case "lab":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription className="flex justify-center mt-2">
              <Badge className={`${getRoleBadgeColor(user.role)} capitalize`}>{user.role}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              {user.contactNumber && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user.contactNumber}</span>
                </div>
              )}
              {user.department && (
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user.department}</span>
                </div>
              )}
              {user.specialty && (
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user.specialty}</span>
                </div>
              )}
              {user.joinDate && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              )}
              {user.lastActive && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Last active {new Date(user.lastActive).toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="permissions">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="permissions" className="flex gap-2 items-center">
                  <Shield className="h-4 w-4" /> Permissions
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex gap-2 items-center">
                  <Clock className="h-4 w-4" /> Activity
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex gap-2 items-center">
                  <FileText className="h-4 w-4" /> Documents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="permissions" className="mt-4 space-y-4">
                <h3 className="font-medium">Role-Based Permissions</h3>
                <div className="grid gap-2">
                  {user.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center p-2 rounded-md bg-muted">
                      <Shield className="h-4 w-4 mr-2 text-[#4DB6AC]" />
                      <span className="capitalize">{permission.replace(/_/g, " ")}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <div className="space-y-4">
                  {[
                    { action: "Logged in", time: "Today, 9:15 AM" },
                    { action: "Updated patient record #12345", time: "Yesterday, 3:30 PM" },
                    { action: "Scheduled appointment", time: "Apr 26, 2023, 11:20 AM" },
                    { action: "Generated report", time: "Apr 25, 2023, 2:45 PM" },
                    { action: "Password changed", time: "Apr 20, 2023, 10:10 AM" },
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border-b">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{activity.action}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-4">
                <div className="space-y-4">
                  {[
                    { name: "Employment Contract", date: "Jan 15, 2020", type: "PDF" },
                    { name: "Confidentiality Agreement", date: "Jan 15, 2020", type: "PDF" },
                    { name: "License Certificate", date: "Mar 10, 2022", type: "PDF" },
                    { name: "Training Completion", date: "Nov 5, 2022", type: "PDF" },
                  ].map((doc, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border-b">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{doc.date}</span>
                        <Badge variant="outline">{doc.type}</Badge>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
