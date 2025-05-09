import { addDays } from "date-fns"
import type { CalendarAppointment } from "../components/appointments/appointment-calendar"
import type { AppointmentStatus } from "../components/appointments/appointment-details"

// Generate sample appointment data
export const generateSampleAppointments = (): CalendarAppointment[] => {
  const today = new Date()
  const appointments: CalendarAppointment[] = []

  // Generate appointments for the next 30 days
  for (let i = -15; i < 15; i++) {
    const date = addDays(today, i)

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    // Generate 2-5 appointments per day
    const numAppointments = Math.floor(Math.random() * 4) + 2

    for (let j = 0; j < numAppointments; j++) {
      // Random time between 8am and 5pm
      const hour = Math.floor(Math.random() * 9) + 8
      const minute = Math.random() < 0.5 ? 0 : 30
      const ampm = hour >= 12 ? "PM" : "AM"
      const displayHour = hour > 12 ? hour - 12 : hour
      const time = `${displayHour}:${minute === 0 ? "00" : "30"} ${ampm}`

      // Random status
      const statuses: AppointmentStatus[] = [
        "scheduled",
        "confirmed",
        "checked-in",
        "in-progress",
        "completed",
        "cancelled",
        "no-show",
      ]
      const statusIndex = Math.floor(Math.random() * statuses.length)
      const status = statuses[statusIndex]

      // Random patient
      const patients = [
        "John Smith",
        "Emily Johnson",
        "Michael Brown",
        "Sarah Davis",
        "Robert Wilson",
        "Jennifer Lee",
        "David Martinez",
        "Amanda Wilson",
        "Thomas Anderson",
        "Jessica Taylor",
      ]
      const patientIndex = Math.floor(Math.random() * patients.length)
      const patientName = patients[patientIndex]

      // Random doctor
      const doctors = [
        "Dr. Sarah Johnson",
        "Dr. Michael Williams",
        "Dr. Robert Brown",
        "Dr. David Martinez",
        "Dr. Thomas Anderson",
      ]
      const doctorIndex = Math.floor(Math.random() * doctors.length)
      const doctorName = doctors[doctorIndex]

      // Random appointment type
      const types = ["Check-up", "Follow-up", "Consultation", "Procedure", "Emergency"]
      const typeIndex = Math.floor(Math.random() * types.length)
      const type = types[typeIndex]

      appointments.push({
        id: `appt-${i}-${j}`,
        patientName,
        doctorName,
        time,
        type,
        status,
        date: new Date(date),
      })
    }
  }

  return appointments
}