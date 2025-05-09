"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, FileText, Pill, FlaskRoundIcon as Flask } from "lucide-react"
import { useState, useEffect } from "react"
import type { PatientRecord } from "../types/patients"
import { generateSamplePatients } from "../lib/patients-data"

export function PatientRecordsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [patients, setPatients] = useState<PatientRecord[]>([])

  // Load sample patients
  useEffect(() => {
    setPatients(generateSamplePatients())
  }, [])

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/patients/search?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Handle advanced search
  const handleAdvancedSearch = () => {
    router.push("/patients/search")
  }

  // Handle view patient
  const handleViewPatient = (patientId: string) => {
    router.push(`/patients/${patientId}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patient Records</h1>
        <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">
          <Plus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2" onClick={handleAdvancedSearch}>
            <Filter className="h-4 w-4" /> Advanced Search
          </Button>
          <Button variant="outline" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="inpatient">Inpatient</TabsTrigger>
          <TabsTrigger value="outpatient">Outpatient</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {patients.slice(0, 6).map((patient) => (
              <Card key={patient.id} className="overflow-hidden">
                <CardHeader className="bg-[#EEEEEE] pb-2">
                  <CardTitle className="flex justify-between">
                    <span>{patient.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">{patient.id}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Age</p>
                      <p>{patient.age}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gender</p>
                      <p>{patient.gender}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Primary Condition</p>
                      <p>{patient.condition}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewPatient(patient.id)}
                    >
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleAdvancedSearch}>
              View All Patients
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="inpatient" className="h-[200px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
          <p className="text-muted-foreground">Inpatient records would appear here</p>
        </TabsContent>
        <TabsContent value="outpatient" className="h-[200px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
          <p className="text-muted-foreground">Outpatient records would appear here</p>
        </TabsContent>
        <TabsContent value="emergency" className="h-[200px] flex items-center justify-center bg-[#EEEEEE] rounded-md">
          <p className="text-muted-foreground">Emergency records would appear here</p>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Patient Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="history" className="flex gap-2">
                <FileText className="h-4 w-4" /> Medical History
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex gap-2">
                <Pill className="h-4 w-4" /> Medications
              </TabsTrigger>
              <TabsTrigger value="tests" className="flex gap-2">
                <Flask className="h-4 w-4" /> Test Results
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="history"
              className="mt-4 h-[300px] flex items-center justify-center bg-[#EEEEEE] rounded-md"
            >
              <p className="text-muted-foreground">Select a patient to view medical history</p>
            </TabsContent>
            <TabsContent
              value="medications"
              className="mt-4 h-[300px] flex items-center justify-center bg-[#EEEEEE] rounded-md"
            >
              <p className="text-muted-foreground">Select a patient to view medications</p>
            </TabsContent>
            <TabsContent
              value="tests"
              className="mt-4 h-[300px] flex items-center justify-center bg-[#EEEEEE] rounded-md"
            >
              <p className="text-muted-foreground">Select a patient to view test results</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}