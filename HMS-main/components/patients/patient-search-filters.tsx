"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { SearchFilters } from "./patient-search"

interface PatientSearchFiltersProps {
  filters: SearchFilters
  onChange: (filters: Partial<SearchFilters>) => void
  onApply: () => void
  onReset: () => void
}

export function PatientSearchFilters({ filters, onChange, onApply, onReset }: PatientSearchFiltersProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    filters.admissionDateRange[0] ? new Date(filters.admissionDateRange[0]) : undefined,
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    filters.admissionDateRange[1] ? new Date(filters.admissionDateRange[1]) : undefined,
  )

  // Handle checkbox change for array filters
  const handleCheckboxChange = (field: keyof SearchFilters, value: string, checked: boolean) => {
    const currentValues = filters[field] as string[]
    let newValues: string[]

    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter((v) => v !== value)
    }

    onChange({ [field]: newValues })
  }

  // Handle age range change
  const handleAgeRangeChange = (value: number[]) => {
    onChange({ ageRange: [value[0], value[1]] })
  }

  // Handle date range change
  const handleDateRangeChange = (field: "start" | "end", date?: Date) => {
    if (field === "start") {
      setStartDate(date)
      onChange({
        admissionDateRange: [date || null, filters.admissionDateRange[1]],
      })
    } else {
      setEndDate(date)
      onChange({
        admissionDateRange: [filters.admissionDateRange[0], date || null],
      })
    }
  }

  // Clear date range
  const clearDateRange = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    onChange({ admissionDateRange: [null, null] })
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" defaultValue={["demographics", "medical", "administrative"]}>
        {/* Demographics Filters */}
        <AccordionItem value="demographics">
          <AccordionTrigger>Demographics</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {/* Gender Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gender</Label>
                <div className="flex flex-wrap gap-4">
                  {["Male", "Female", "Other"].map((gender) => (
                    <div key={gender} className="flex items-center space-x-2">
                      <Checkbox
                        id={`gender-${gender}`}
                        checked={filters.gender.includes(gender)}
                        onCheckedChange={(checked) => handleCheckboxChange("gender", gender, checked as boolean)}
                      />
                      <Label htmlFor={`gender-${gender}`} className="text-sm font-normal">
                        {gender}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age Range Filter */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium">Age Range</Label>
                  <span className="text-sm text-muted-foreground">
                    {filters.ageRange[0]} - {filters.ageRange[1]} years
                  </span>
                </div>
                <Slider
                  defaultValue={[filters.ageRange[0], filters.ageRange[1]]}
                  max={100}
                  step={1}
                  onValueChange={handleAgeRangeChange}
                  className="py-4"
                />
              </div>

              {/* Blood Type Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Blood Type</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`blood-${type}`}
                        checked={filters.bloodType.includes(type)}
                        checked={filters.bloodType.includes(type)}
                        onCheckedChange={(checked) => handleCheckboxChange("bloodType", type, checked as boolean)}
                      />
                      <Label htmlFor={`blood-${type}`} className="text-sm font-normal">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Medical Filters */}
        <AccordionItem value="medical">
          <AccordionTrigger>Medical Information</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {/* Department Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Department</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Cardiology",
                    "Neurology",
                    "Pediatrics",
                    "Oncology",
                    "Emergency",
                    "Surgery",
                    "Orthopedics",
                    "Psychiatry",
                  ].map((dept) => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dept-${dept}`}
                        checked={filters.department.includes(dept)}
                        onCheckedChange={(checked) => handleCheckboxChange("department", dept, checked as boolean)}
                      />
                      <Label htmlFor={`dept-${dept}`} className="text-sm font-normal">
                        {dept}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Condition Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Condition</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Hypertension",
                    "Diabetes",
                    "Asthma",
                    "Cancer",
                    "Heart Disease",
                    "Stroke",
                    "Pregnancy",
                    "Fracture",
                    "Infection",
                    "Chronic Pain",
                  ].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={`condition-${condition}`}
                        checked={filters.condition.includes(condition)}
                        onCheckedChange={(checked) => handleCheckboxChange("condition", condition, checked as boolean)}
                      />
                      <Label htmlFor={`condition-${condition}`} className="text-sm font-normal">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Patient Status</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Inpatient",
                    "Outpatient",
                    "Emergency",
                    "Discharged",
                    "Critical",
                    "Stable",
                    "Under Observation",
                  ].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={filters.status.includes(status)}
                        onCheckedChange={(checked) => handleCheckboxChange("status", status, checked as boolean)}
                      />
                      <Label htmlFor={`status-${status}`} className="text-sm font-normal">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Administrative Filters */}
        <AccordionItem value="administrative">
          <AccordionTrigger>Administrative</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {/* Admission Date Range */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Admission Date Range</Label>
                  {(startDate || endDate) && (
                    <Button variant="ghost" size="sm" onClick={clearDateRange} className="h-6 px-2 text-xs">
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => handleDateRangeChange("start", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "End date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => handleDateRangeChange("end", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Insurance Provider */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Insurance Provider</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Medicare", "Medicaid", "Blue Cross", "Aetna", "UnitedHealthcare", "Cigna", "Humana", "Kaiser"].map(
                    (provider) => (
                      <div key={provider} className="flex items-center space-x-2">
                        <Checkbox
                          id={`insurance-${provider}`}
                          checked={filters.insuranceProvider.includes(provider)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("insuranceProvider", provider, checked as boolean)
                          }
                        />
                        <Label htmlFor={`insurance-${provider}`} className="text-sm font-normal">
                          {provider}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Filter Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
        <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]" onClick={onApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
