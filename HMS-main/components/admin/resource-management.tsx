"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Building2, Stethoscope, Bed, Clipboard } from "lucide-react"

export function ResourceManagement() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search resources..." className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="rooms">Rooms</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">
            <Plus className="mr-2 h-4 w-4" /> Add Resource
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">85% occupancy rate</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">22% of total capacity</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipment Items</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">12 require maintenance</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#4DB6AC]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supply Inventory</CardTitle>
            <Clipboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">8 items below threshold</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Room Allocation</CardTitle>
            <CardDescription>Current status of hospital rooms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { id: "101", type: "Patient Room", status: "Occupied", department: "Cardiology" },
                { id: "102", type: "Patient Room", status: "Occupied", department: "Cardiology" },
                { id: "103", type: "Patient Room", status: "Available", department: "Cardiology" },
                { id: "201", type: "Operating Room", status: "In Use", department: "Surgery" },
                { id: "202", type: "Operating Room", status: "Available", department: "Surgery" },
                { id: "301", type: "ICU Room", status: "Occupied", department: "ICU" },
                { id: "302", type: "ICU Room", status: "Occupied", department: "ICU" },
                { id: "401", type: "Exam Room", status: "Available", department: "Outpatient" },
                { id: "402", type: "Exam Room", status: "In Use", department: "Outpatient" },
                { id: "501", type: "Emergency Room", status: "Occupied", department: "Emergency" },
                { id: "502", type: "Emergency Room", status: "Available", department: "Emergency" },
                { id: "601", type: "Lab", status: "In Use", department: "Diagnostics" },
              ].map((room) => (
                <div
                  key={room.id}
                  className={`
                    p-3 rounded-md border flex flex-col
                    ${
                      room.status === "Available"
                        ? "border-[#4DB6AC] bg-[#4DB6AC]/10"
                        : room.status === "In Use"
                          ? "border-[#FF8A65] bg-[#FF8A65]/10"
                          : "border-gray-300"
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Room {room.id}</span>
                    <Badge
                      className={
                        room.status === "Available"
                          ? "bg-[#4DB6AC]"
                          : room.status === "In Use"
                            ? "bg-[#FF8A65]"
                            : "bg-gray-500"
                      }
                    >
                      {room.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{room.type}</span>
                  <span className="text-xs text-muted-foreground mt-1">{room.department}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipment Status</CardTitle>
            <CardDescription>Critical equipment availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ventilators", total: 20, inUse: 12, maintenance: 2 },
                { name: "MRI Machines", total: 3, inUse: 2, maintenance: 0 },
                { name: "CT Scanners", total: 4, inUse: 3, maintenance: 1 },
                { name: "Ultrasound", total: 8, inUse: 5, maintenance: 0 },
                { name: "Defibrillators", total: 15, inUse: 3, maintenance: 1 },
                { name: "Infusion Pumps", total: 50, inUse: 35, maintenance: 3 },
              ].map((equipment, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{equipment.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {equipment.inUse}/{equipment.total} In Use
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4DB6AC]"
                      style={{ width: `${(equipment.inUse / equipment.total) * 100}%` }}
                    ></div>
                  </div>
                  {equipment.maintenance > 0 && (
                    <p className="text-xs text-[#FF8A65]">{equipment.maintenance} unit(s) under maintenance</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                Request Maintenance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supply Inventory</CardTitle>
          <CardDescription>Critical supplies status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left font-medium">Item</th>
                  <th className="py-2 px-4 text-left font-medium">Category</th>
                  <th className="py-2 px-4 text-left font-medium">Current Stock</th>
                  <th className="py-2 px-4 text-left font-medium">Minimum Level</th>
                  <th className="py-2 px-4 text-left font-medium">Status</th>
                  <th className="py-2 px-4 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Surgical Masks", category: "PPE", current: 2500, minimum: 1000, status: "Adequate" },
                  { name: "Nitrile Gloves", category: "PPE", current: 800, minimum: 1000, status: "Low" },
                  { name: "IV Solution", category: "Medication", current: 350, minimum: 200, status: "Adequate" },
                  { name: "Syringes", category: "Disposables", current: 1200, minimum: 500, status: "Adequate" },
                  { name: "Bandages", category: "Wound Care", current: 600, minimum: 300, status: "Adequate" },
                  { name: "Antibiotics", category: "Medication", current: 120, minimum: 150, status: "Low" },
                ].map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.category}</td>
                    <td className="py-2 px-4">{item.current}</td>
                    <td className="py-2 px-4">{item.minimum}</td>
                    <td className="py-2 px-4">
                      <Badge className={item.status === "Adequate" ? "bg-[#4DB6AC]" : "bg-[#FF8A65]"}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-4">
                      <Button variant="outline" size="sm" className={item.status === "Low" ? "text-[#FF8A65]" : ""}>
                        {item.status === "Low" ? "Order Now" : "Reorder"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
