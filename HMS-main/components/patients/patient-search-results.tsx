"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Calendar, Phone, Mail, FileText, Activity, Heart } from "lucide-react"
import type { PatientRecord } from "@/types/patient"

interface PatientSearchResultsProps {
  patients: PatientRecord[]
}

export function PatientSearchResults({ patients }: PatientSearchResultsProps) {
  const router = useRouter()

  // View patient details
  const viewPatientDetails = (patientId: string) => {
    router.push(`/patients/${patientId}`)
  }

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

  if (patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No patients found</h3>
        <p className="text-muted-foreground mt-1">Try adjusting your search criteria or filters</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px]">
      <div className="space-y-4">
        {patients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Patient basic info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-[#4DB6AC] mr-2" />
                        <h3 className="font-medium text-lg">{patient.name}</h3>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {patient.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{patient.phone}</span>
                      </div>
                    )}
                    {patient.email && (
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="truncate">{patient.email}</span>
                      </div>
                    )}
                    {patient.admissionDate && (
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {patient.bloodType && (
                      <div className="flex items-center text-sm">
                        <Heart className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>Blood Type: {patient.bloodType}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Medical info */}
                <div className="flex-1">
                  <div className="space-y-2">
                    {patient.condition && (
                      <div className="flex items-start">
                        <Activity className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Condition</p>
                          <p className="text-sm">{patient.condition}</p>
                        </div>
                      </div>
                    )}
                    {patient.department && (
                      <div className="flex items-start">
                        <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Department</p>
                          <p className="text-sm">{patient.department}</p>
                        </div>
                      </div>
                    )}
                    {patient.insuranceProvider && (
                      <div className="flex items-start">
                        <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Insurance</p>
                          <p className="text-sm">{patient.insuranceProvider}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]" onClick={() => viewPatientDetails(patient.id)}>
                    View Details
                  </Button>
                  <Button variant="outline">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
