import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, CreditCard, Clock, Download, Pill } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function PatientPortalPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patient Portal</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Welcome, John Smith</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-[#4DB6AC]" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-[#4DB6AC]">
              View Schedule
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4 text-[#4DB6AC]" />
              Medical Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-[#4DB6AC]">
              Access Records
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Pill className="mr-2 h-4 w-4 text-[#4DB6AC]" />
              Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-[#4DB6AC]">
              Refill Requests
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-[#4DB6AC]" />
              Billing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$120.00</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-[#4DB6AC]">
              Make Payment
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>Schedule a new appointment with your healthcare provider</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
              <p className="text-muted-foreground">Appointment booking interface would appear here</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">Book Appointment</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "May 5, 2025",
                    time: "10:30 AM",
                    doctor: "Dr. Williams",
                    type: "Annual Check-up",
                    location: "Main Campus, Room 302",
                  },
                  {
                    date: "May 15, 2025",
                    time: "2:15 PM",
                    doctor: "Dr. Johnson",
                    type: "Follow-up",
                    location: "West Wing, Room 118",
                  },
                ].map((appointment, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4DB6AC]/20 text-[#4DB6AC]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{appointment.type}</h4>
                        <p className="text-sm font-medium text-[#4DB6AC]">{appointment.date}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-muted-foreground">
                          {appointment.time} • {appointment.location}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Access and download your medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Annual Physical Results", date: "January 15, 2025", type: "PDF", size: "1.2 MB" },
                  { title: "Blood Test Results", date: "February 3, 2025", type: "PDF", size: "0.8 MB" },
                  { title: "Vaccination Record", date: "March 10, 2025", type: "PDF", size: "0.5 MB" },
                  { title: "Cardiology Consultation", date: "April 2, 2025", type: "PDF", size: "1.5 MB" },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEEEEE]">
                        <FileText className="h-5 w-5 text-[#4DB6AC]" />
                      </div>
                      <div>
                        <p className="font-medium">{record.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.date} • {record.type} • {record.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Lisinopril", dosage: "10mg", instructions: "Take once daily", refills: 2, progress: 70 },
                  {
                    name: "Atorvastatin",
                    dosage: "20mg",
                    instructions: "Take once daily at bedtime",
                    refills: 3,
                    progress: 45,
                  },
                  {
                    name: "Metformin",
                    dosage: "500mg",
                    instructions: "Take twice daily with meals",
                    refills: 1,
                    progress: 20,
                  },
                ].map((prescription, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">
                          {prescription.name} {prescription.dosage}
                        </h4>
                        <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{prescription.refills} refills remaining</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Supply remaining</span>
                        <span>{prescription.progress}%</span>
                      </div>
                      <Progress value={prescription.progress} className="h-2" />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className={prescription.progress < 30 ? "text-[#FF8A65]" : ""}
                      >
                        Request Refill
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    description: "Annual Physical",
                    date: "January 15, 2025",
                    amount: 150.0,
                    status: "Paid",
                    insurance: "Covered 80%",
                  },
                  {
                    description: "Cardiology Consultation",
                    date: "April 2, 2025",
                    amount: 200.0,
                    status: "Pending",
                    insurance: "Pending approval",
                  },
                  {
                    description: "Laboratory Tests",
                    date: "April 2, 2025",
                    amount: 120.0,
                    status: "Due",
                    insurance: "Not covered",
                  },
                ].map((bill, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{bill.description}</h4>
                        <p className="text-sm text-muted-foreground">{bill.date}</p>
                        <p className="text-xs text-muted-foreground mt-1">{bill.insurance}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${bill.amount.toFixed(2)}</p>
                        <p
                          className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                            bill.status === "Paid"
                              ? "bg-[#4DB6AC] text-white"
                              : bill.status === "Pending"
                                ? "bg-[#EEEEEE] text-[#333333]"
                                : "bg-[#FF8A65] text-white"
                          }`}
                        >
                          {bill.status}
                        </p>
                      </div>
                    </div>
                    {bill.status === "Due" && (
                      <div className="mt-4 flex justify-end">
                        <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">Pay Now</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Due</p>
                <p className="text-xl font-bold">$120.00</p>
              </div>
              <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">Pay All</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
