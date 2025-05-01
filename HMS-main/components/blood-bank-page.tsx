"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Droplet, Heart, UserPlus, AlertCircle } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export function BloodBankPage() {
  const { user } = useUser()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Blood Bank Management</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search blood inventory..." className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Blood Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="a-pos">A+</SelectItem>
              <SelectItem value="a-neg">A-</SelectItem>
              <SelectItem value="b-pos">B+</SelectItem>
              <SelectItem value="b-neg">B-</SelectItem>
              <SelectItem value="ab-pos">AB+</SelectItem>
              <SelectItem value="ab-neg">AB-</SelectItem>
              <SelectItem value="o-pos">O+</SelectItem>
              <SelectItem value="o-neg">O-</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">
            <Plus className="mr-2 h-4 w-4" /> Record Donation
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blood Units</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+12 from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Types</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">O- and AB- are low</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 scheduled for today</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donors Registered</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Blood Inventory</CardTitle>
            <CardDescription>Current blood stock by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { type: "A+", units: 78, status: "Adequate", color: "#4DB6AC" },
                { type: "A-", units: 32, status: "Adequate", color: "#4DB6AC" },
                { type: "B+", units: 54, status: "Adequate", color: "#4DB6AC" },
                { type: "B-", units: 28, status: "Adequate", color: "#4DB6AC" },
                { type: "AB+", units: 22, status: "Adequate", color: "#4DB6AC" },
                { type: "AB-", units: 8, status: "Critical", color: "#FF8A65" },
                { type: "O+", units: 102, status: "Adequate", color: "#4DB6AC" },
                { type: "O-", units: 18, status: "Critical", color: "#FF8A65" },
              ].map((blood) => (
                <div
                  key={blood.type}
                  className="p-4 rounded-md border flex flex-col items-center"
                  style={{ borderColor: blood.color }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Droplet className="h-6 w-6" style={{ color: blood.color }} />
                    <span className="text-xl font-bold ml-2">{blood.type}</span>
                  </div>
                  <div className="text-2xl font-bold">{blood.units}</div>
                  <Badge
                    className="mt-2"
                    style={{
                      backgroundColor: blood.color,
                    }}
                  >
                    {blood.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blood Type Compatibility</CardTitle>
            <CardDescription>Donor and recipient compatibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Universal Donor</h3>
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 mr-2 text-[#FF8A65]" />
                  <span className="font-bold">O-</span>
                  <span className="ml-2 text-sm text-muted-foreground">Can donate to all blood types</span>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Universal Recipient</h3>
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 mr-2 text-[#4DB6AC]" />
                  <span className="font-bold">AB+</span>
                  <span className="ml-2 text-sm text-muted-foreground">Can receive from all blood types</span>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Compatibility Chart</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-1">Recipient</th>
                      <th className="text-left py-1">Can Receive From</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">A+</td>
                      <td className="py-1">A+, A-, O+, O-</td>
                    </tr>
                    <tr>
                      <td className="py-1">A-</td>
                      <td className="py-1">A-, O-</td>
                    </tr>
                    <tr>
                      <td className="py-1">B+</td>
                      <td className="py-1">B+, B-, O+, O-</td>
                    </tr>
                    <tr>
                      <td className="py-1">B-</td>
                      <td className="py-1">B-, O-</td>
                    </tr>
                    <tr>
                      <td className="py-1">AB+</td>
                      <td className="py-1">All types</td>
                    </tr>
                    <tr>
                      <td className="py-1">AB-</td>
                      <td className="py-1">A-, B-, AB-, O-</td>
                    </tr>
                    <tr>
                      <td className="py-1">O+</td>
                      <td className="py-1">O+, O-</td>
                    </tr>
                    <tr>
                      <td className="py-1">O-</td>
                      <td className="py-1">O-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blood Donations</CardTitle>
            <CardDescription>Latest donations recorded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  donor: "John Smith",
                  type: "O+",
                  date: "Today, 10:30 AM",
                  units: 1,
                  status: "Processed",
                },
                {
                  donor: "Emily Johnson",
                  type: "A-",
                  date: "Today, 9:15 AM",
                  units: 1,
                  status: "Processed",
                },
                {
                  donor: "Michael Brown",
                  type: "B+",
                  date: "Yesterday, 3:45 PM",
                  units: 1,
                  status: "Processed",
                },
                {
                  donor: "Sarah Davis",
                  type: "AB+",
                  date: "Yesterday, 2:20 PM",
                  units: 1,
                  status: "Processed",
                },
                {
                  donor: "Robert Wilson",
                  type: "O-",
                  date: "Yesterday, 11:10 AM",
                  units: 1,
                  status: "Processed",
                },
              ].map((donation, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{donation.donor}</p>
                    <p className="text-sm text-muted-foreground">
                      {donation.type} • {donation.units} unit(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{donation.date}</p>
                    <Badge className="bg-[#4DB6AC]">{donation.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Donations
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Donations</CardTitle>
            <CardDescription>Upcoming blood donations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  donor: "Jennifer Lee",
                  type: "A+",
                  date: "Today, 2:30 PM",
                  status: "Confirmed",
                },
                {
                  donor: "David Martinez",
                  type: "O+",
                  date: "Today, 4:00 PM",
                  status: "Confirmed",
                },
                {
                  donor: "Amanda Wilson",
                  type: "B-",
                  date: "Tomorrow, 10:15 AM",
                  status: "Confirmed",
                },
                {
                  donor: "Thomas Anderson",
                  type: "O-",
                  date: "Tomorrow, 11:30 AM",
                  status: "Pending",
                },
                {
                  donor: "Jessica Taylor",
                  type: "AB-",
                  date: "Tomorrow, 3:45 PM",
                  status: "Pending",
                },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{appointment.donor}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.type} • {appointment.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={appointment.status === "Confirmed" ? "bg-[#4DB6AC]" : "bg-[#FF8A65]"}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Schedule New Donation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blood Request Management</CardTitle>
          <CardDescription>Track and manage blood requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left font-medium">Request ID</th>
                  <th className="py-2 px-4 text-left font-medium">Patient</th>
                  <th className="py-2 px-4 text-left font-medium">Blood Type</th>
                  <th className="py-2 px-4 text-left font-medium">Units</th>
                  <th className="py-2 px-4 text-left font-medium">Department</th>
                  <th className="py-2 px-4 text-left font-medium">Status</th>
                  <th className="py-2 px-4 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "BR-1001",
                    patient: "John Smith",
                    type: "O+",
                    units: 2,
                    department: "Surgery",
                    status: "Fulfilled",
                  },
                  {
                    id: "BR-1002",
                    patient: "Emily Johnson",
                    type: "A-",
                    units: 1,
                    department: "Emergency",
                    status: "Pending",
                  },
                  {
                    id: "BR-1003",
                    patient: "Michael Brown",
                    type: "AB-",
                    units: 2,
                    department: "ICU",
                    status: "Urgent",
                  },
                  {
                    id: "BR-1004",
                    patient: "Sarah Davis",
                    type: "B+",
                    units: 3,
                    department: "Surgery",
                    status: "Pending",
                  },
                  {
                    id: "BR-1005",
                    patient: "Robert Wilson",
                    type: "O-",
                    units: 1,
                    department: "Emergency",
                    status: "Urgent",
                  },
                ].map((request, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{request.id}</td>
                    <td className="py-2 px-4">{request.patient}</td>
                    <td className="py-2 px-4">{request.type}</td>
                    <td className="py-2 px-4">{request.units}</td>
                    <td className="py-2 px-4">{request.department}</td>
                    <td className="py-2 px-4">
                      <Badge
                        className={
                          request.status === "Fulfilled"
                            ? "bg-[#4DB6AC]"
                            : request.status === "Urgent"
                              ? "bg-red-500"
                              : "bg-[#FF8A65]"
                        }
                      >
                        {request.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={request.status === "Fulfilled"}
                        className={request.status === "Urgent" ? "text-red-500" : ""}
                      >
                        {request.status === "Fulfilled" ? "View" : "Process"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">
              <Plus className="mr-2 h-4 w-4" /> New Blood Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
