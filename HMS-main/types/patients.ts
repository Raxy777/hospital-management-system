export interface PatientRecord {
  id: string
  name: string
  age: number
  gender: string
  email?: string
  phone?: string
  address?: string
  bloodType?: string
  condition?: string
  department?: string
  status?: string
  admissionDate?: string
  dischargeDate?: string
  insuranceProvider?: string
  insuranceNumber?: string
  emergencyContact?: string
  emergencyPhone?: string
  notes?: string
  allergies?: string[]
  medications?: string[]
  medicalHistory?: string[]
}