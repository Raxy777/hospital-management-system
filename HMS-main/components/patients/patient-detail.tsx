"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Calendar,
  Phone,
  Mail,
  FileText,
  Activity,
  Heart,
  AlertTriangle,
  Pill,
  Clock,
  Edit,
  ArrowLeft,
  Printer,
  Download,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { PatientRecord } from "@/types/patient"
import { useToast } from "@/components/ui/use-toast"

interface PatientDetailProps {
  patient: PatientRecord
}

export function PatientDetail({ patient }: PatientDetailProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "critical":
        return "bg-red-500"
      case "stable":
        return "bg-green-500"
      case "under observation":
        return "bg-blue-500"
      case "discharged":
        return "bg-gray-500"
      case "inpatient":
        return "bg-purple-500"
      case "outpatient":
        return "bg-[#4DB6AC]"
      case "emergency":
        return "bg-[#FF8A65]"
      default:
        return "bg-gray-500"
    }
  }

  // Handle edit patient
  const handleEditPatient = () => {
    router.push(`/patients/edit/${patient.id}`)
  }

  // Handle back button
  const handleBack = () => {
    router.back()
  }

  // Handle print patient record
  const handlePrintRecord = () => {
    toast({
      title: "Print initiated",
      description: "Patient record sent to printer.",
    })
    // In a real app, this would trigger a print dialog
    window.print()
  }

  // Handle download patient record
  const handleDownloadRecord = () => {
    toast({
      title: "Download started",
      description: "Patient record download initiated.",
    })
    // In a real app, this would trigger a download of the patient record
  }

  // Handle share patient record
  const handleShareRecord = () => {
    toast({
      title: "Share options",
      description: "Patient record sharing options would appear here.",
    })
    // In a real app, this would open a sharing dialog
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Patient Details</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrintRecord}>
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleDownloadRecord}>
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleShareRecord}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]" onClick={handleEditPatient}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Patient
          </Button>
        </div>
      </div>

      {/* Patient summary card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Patient basic info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-[#4DB6AC] mr-2" />
                    <h2 className="text-2xl font-bold">{patient.name}</h2>
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="mr-2">
                      ID: {patient.id}
                    </Badge>
                    <Badge variant="outline">{patient.gender}</Badge>
                    <Badge variant="outline" className="ml-2">
                      {patient.age} years
                    </Badge>
                  </div>
                </div>
                {patient.status && <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>}
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {patient.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{patient.phone}</span>
                  </div>
                )}
                {patient.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{patient.email}</span>
                  </div>
                )}
                {patient.admissionDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</span>
                  </div>
                )}
                {patient.bloodType && (
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>Blood Type: {patient.bloodType}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Medical info */}
            <div className="flex-1">
              <div className="space-y-4">
                {patient.condition && (
                  <div className="flex items-start">
                    <Activity className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Primary Condition</p>
                      <p>{patient.condition}</p>
                    </div>
                  </div>
                )}
                {patient.department && (
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <p>{patient.department}</p>
                    </div>
                  </div>
                )}
                {patient.insuranceProvider && (
                  <div className="flex items-start">
                    <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Insurance</p>
                      <p>
                        {patient.insuranceProvider} {patient.insuranceNumber && `(#${patient.insuranceNumber})`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed patient information tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="visits">Visits & Appointments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Summary</CardTitle>
              <CardDescription>Overview of patient information and recent activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {patient.notes && (
                <div className="space-y-2">
                  <h3 className="font-medium">Notes</h3>
                  <p className="text-sm">{patient.notes}</p>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Allergies */}
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 text-[#FF8A65] mr-2" />
                    Allergies
                  </h3>
                  {patient.allergies && patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No known allergies</p>
                  )}
                </div>

                {/* Current Medications */}
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <Pill className="h-4 w-4 text-[#4DB6AC] mr-2" />
                    Current Medications
                  </h3>
                  {patient.medications && patient.medications.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.medications.map((medication, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">
                          {medication}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No current medications</p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Recent Activity */}
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  {[
                    { date: "2025-04-15", activity: "Blood test results uploaded", type: "Lab Result" },
                    { date: "2025-04-10", activity: "Appointment with Dr. Williams", type: "Appointment" },
                    { date: "2025-04-05", activity: "Prescription renewed", type: "Medication" },
                    { date: "2025-03-28", activity: "Vital signs recorded", type: "Check-up" },
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                      <div>
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <p className="text-xs text-muted-foreground">{activity.type}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Medical History Tab */}
        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Patient's medical history and conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Medical Conditions */}
                <div className="space-y-2">
                  <h3 className="font-medium">Medical Conditions</h3>
                  <div className="space-y-2">
                    {patient.medicalHistory
                      ? patient.medicalHistory.map((condition, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <p className="font-medium">{condition}</p>
                            <p className="text-sm text-muted-foreground">Diagnosed: Jan 2023</p>
                          </div>
                        ))
                      : [
                          {
                            condition: patient.condition || "Primary condition",
                            diagnosed: "Jan 2023",
                            status: "Active",
                          },
                          { condition: "Seasonal allergies", diagnosed: "Mar 2020", status: "Recurring" },
                        ].map((condition, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <div className="flex justify-between">
                              <p className="font-medium">{condition.condition}</p>
                              <Badge variant="outline">{condition.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Diagnosed: {condition.diagnosed}</p>
                          </div>
                        ))}
                  </div>
                </div>

                <Separator />

                {/* Surgical History */}
                <div className="space-y-2">
                  <h3 className="font-medium">Surgical History</h3>
                  <div className="space-y-2">
                    {[
                      { procedure: "Appendectomy", date: "Jun 2018", surgeon: "Dr. Martinez" },
                      { procedure: "Knee arthroscopy", date: "Sep 2020", surgeon: "Dr. Johnson" },
                    ].map((surgery, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <p className="font-medium">{surgery.procedure}</p>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-muted-foreground">Date: {surgery.date}</p>
                          <p className="text-sm text-muted-foreground">Surgeon: {surgery.surgeon}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Family Medical History */}
                <div className="space-y-2">
                  <h3 className="font-medium">Family Medical History</h3>
                  <div className="space-y-2">
                    {[
                      { condition: "Hypertension", relation: "Father" },
                      { condition: "Diabetes Type 2", relation: "Mother" },
                      { condition: "Coronary Artery Disease", relation: "Grandfather (Paternal)" },
                    ].map((family, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <p className="font-medium">{family.condition}</p>
                        <p className="text-sm text-muted-foreground">Relation: {family.relation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medications Tab */}
        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
              <CardDescription>Current and past medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Medications */}
                <div className="space-y-2">
                  <h3 className="font-medium">Current Medications</h3>
                  <div className="space-y-2">
                    {patient.medications ? (
                      patient.medications.map((medication, index) => (
                        <div key={index} className="p-3 border rounded-md">
                          <div className="flex justify-between">
                            <p className="font-medium">{medication}</p>
                            <Badge className="bg-[#4DB6AC]">Active</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <p className="text-sm text-muted-foreground">Dosage: 10mg daily</p>
                            <p className="text-sm text-muted-foreground">Prescribed: Mar 2025</p>
                            <p className="text-sm text-muted-foreground">Refills: 3 remaining</p>
                            <p className="text-sm text-muted-foreground">Prescriber: Dr. Williams</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No current medications</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Medication History */}
                <div className="space-y-2">
                  <h3 className="font-medium">Medication History</h3>
                  <div className="space-y-2">
                    {[
                      {
                        name: "Amoxicillin",
                        dosage: "500mg 3x daily",
                        startDate: "Jan 2025",
                        endDate: "Jan 2025",
                        reason: "Respiratory infection",
                      },
                      {
                        name: "Prednisone",
                        dosage: "20mg daily",
                        startDate: "Nov 2024",
                        endDate: "Dec 2024",
                        reason: "Inflammation",
                      },
                    ].map((medication, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <p className="font-medium">{medication.name}</p>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <p className="text-sm text-muted-foreground">Dosage: {medication.dosage}</p>
                          <p className="text-sm text-muted-foreground">
                            Duration: {medication.startDate} - {medication.endDate}
                          </p>
                          <p className="text-sm text-muted-foreground">Reason: {medication.reason}</p>
                          <p className="text-sm text-muted-foreground">Prescriber: Dr. Johnson</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Medication Allergies */}
                <div className="space-y-2">
                  <h3 className="font-medium">Medication Allergies</h3>
                  <div className="space-y-2">
                    {patient.allergies ? (
                      patient.allergies
                        .filter((allergy) => ["Penicillin", "Sulfa drugs", "Codeine", "NSAIDs"].includes(allergy))
                        .map((allergy, index) => (
                          <div key={index} className="p-3 border rounded-md border-red-200 bg-red-50">
                            <div className="flex items-center">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                              <p className="font-medium">{allergy}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Reaction: Rash, difficulty breathing</p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No known medication allergies</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visits & Appointments Tab */}
        <TabsContent value="visits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visits & Appointments</CardTitle>
              <CardDescription>Patient's visit history and upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upcoming Appointments */}
                <div className="space-y-2">
                  <h3 className="font-medium">Upcoming Appointments</h3>
                  <div className="space-y-2">
                    {[
                      {
                        date: "2025-05-10",
                        time: "10:30 AM",
                        doctor: "Dr. Williams",
                        type: "Follow-up",
                        department: "Cardiology",
                      },
                      {
                        date: "2025-05-25",
                        time: "2:15 PM",
                        doctor: "Dr. Martinez",
                        type: "Consultation",
                        department: "Neurology",
                      },
                    ].map((appointment, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <p className="font-medium">
                            {appointment.type} with {appointment.doctor}
                          </p>
                          <Badge className="bg-[#4DB6AC]">Scheduled</Badge>
                        </div>
                        <div className="flex justify-between mt-2">
                          <p className="text-sm text-muted-foreground">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">{appointment.department}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Visit History */}
                <div className="space-y-2">
                  <h3 className="font-medium">Visit History</h3>
                  <div className="space-y-2">
                    {[
                      {
                        date: "2025-04-10",
                        doctor: "Dr. Williams",
                        type: "Check-up",
                        notes: "Routine check-up, vitals normal.",
                      },
                      {
                        date: "2025-03-15",
                        doctor: "Dr. Johnson",
                        type: "Urgent Care",
                        notes: "Patient presented with acute symptoms.",
                      },
                      {
                        date: "2025-02-22",
                        doctor: "Dr. Martinez",
                        type: "Follow-up",
                        notes: "Follow-up after medication change.",
                      },
                      {
                        date: "2025-01-05",
                        doctor: "Dr. Williams",
                        type: "Annual Physical",
                        notes: "Comprehensive annual examination.",
                      },
                    ].map((visit, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <p className="font-medium">
                            {visit.type} with {visit.doctor}
                          </p>
                          <p className="text-sm text-muted-foreground">{new Date(visit.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-sm mt-2">{visit.notes}</p>
                        <Button variant="link" className="p-0 h-auto mt-1 text-[#4DB6AC]">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#4DB6AC] hover:bg-[#3da69c] w-full">Schedule New Appointment</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Patient's medical documents and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Lab Results */}
                <div className="space-y-2">
                  <h3 className="font-medium">Lab Results</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Complete Blood Count", date: "2025-04-15", provider: "Central Lab", type: "PDF" },
                      { name: "Lipid Panel", date: "2025-04-15", provider: "Central Lab", type: "PDF" },
                      { name: "Metabolic Panel", date: "2025-03-02", provider: "Central Lab", type: "PDF" },
                    ].map((document, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(document.date).toLocaleDateString()} • {document.provider}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{document.type}</Badge>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Imaging */}
                <div className="space-y-2">
                  <h3 className="font-medium">Imaging</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Chest X-Ray", date: "2025-03-15", provider: "Radiology Dept", type: "DICOM" },
                      { name: "Echocardiogram", date: "2025-02-10", provider: "Cardiology Dept", type: "Video" },
                    ].map((document, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(document.date).toLocaleDateString()} • {document.provider}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{document.type}</Badge>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Other Documents */}
                <div className="space-y-2">
                  <h3 className="font-medium">Other Documents</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Discharge Summary", date: "2025-01-20", provider: "Hospital", type: "PDF" },
                      { name: "Referral Letter", date: "2025-01-05", provider: "Dr. Williams", type: "PDF" },
                      { name: "Insurance Authorization", date: "2025-01-02", provider: "Admin", type: "PDF" },
                    ].map((document, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(document.date).toLocaleDateString()} • {document.provider}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{document.type}</Badge>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Upload New Document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
