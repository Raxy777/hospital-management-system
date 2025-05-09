"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Clock, User, FileText, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Define the form schema with validation
const appointmentFormSchema = z.object({
  patientId: z.string({
    required_error: "Please select a patient.",
  }),
  doctorId: z.string({
    required_error: "Please select a doctor.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  duration: z.string().default("30"),
  type: z.string({
    required_error: "Please select an appointment type.",
  }),
  notes: z.string().optional(),
})

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

// Default values for the form
const defaultValues: Partial<AppointmentFormValues> = {
  duration: "30",
  notes: "",
}

interface AppointmentFormProps {
  initialData?: Partial<AppointmentFormValues>
  onCancel: () => void
}

export function AppointmentForm({ initialData, onCancel }: AppointmentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form with react-hook-form
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: initialData || defaultValues,
  })

  // Sample data for dropdowns
  const patients = [
    { id: "P1001", name: "John Smith" },
    { id: "P1002", name: "Emily Johnson" },
    { id: "P1003", name: "Michael Brown" },
    { id: "P1004", name: "Sarah Davis" },
    { id: "P1005", name: "Robert Wilson" },
  ]

  const doctors = [
    { id: "D1001", name: "Dr. Sarah Johnson", department: "Cardiology" },
    { id: "D1002", name: "Dr. Michael Williams", department: "Neurology" },
    { id: "D1003", name: "Dr. Robert Brown", department: "Pediatrics" },
    { id: "D1004", name: "Dr. David Martinez", department: "Surgery" },
    { id: "D1005", name: "Dr. Thomas Anderson", department: "Psychiatry" },
  ]

  const appointmentTypes = [
    { id: "checkup", name: "Check-up" },
    { id: "followup", name: "Follow-up" },
    { id: "consultation", name: "Consultation" },
    { id: "procedure", name: "Procedure" },
    { id: "emergency", name: "Emergency" },
  ]

  const timeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ]

  // Handle form submission
  async function onSubmit(data: AppointmentFormValues) {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to save the appointment
      console.log("Appointment data:", data)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Appointment scheduled",
        description: `Appointment for ${patients.find((p) => p.id === data.patientId)?.name} on ${format(data.date, "PPP")} at ${data.time} has been scheduled.`,
      })

      // Redirect to appointments page
      router.push("/appointments")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error scheduling the appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? "Edit Appointment" : "Schedule New Appointment"}</CardTitle>
        <CardDescription>
          {initialData
            ? "Update the appointment details below."
            : "Fill in the details below to schedule a new appointment."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Selection */}
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{patient.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the patient for this appointment.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Doctor Selection */}
              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            <div className="flex items-center">
                              <Stethoscope className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{doctor.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">({doctor.department})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the doctor for this appointment.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Selection */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            date.getDay() === 0 ||
                            date.getDay() === 6
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select the appointment date (weekdays only).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Selection */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{time}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the appointment time.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duration Selection */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the appointment duration.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Appointment Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {appointmentTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{type.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the type of appointment.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes or information about the appointment"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Add any relevant notes about the appointment.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#4DB6AC] hover:bg-[#3da69c]" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : initialData ? "Update Appointment" : "Schedule Appointment"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
