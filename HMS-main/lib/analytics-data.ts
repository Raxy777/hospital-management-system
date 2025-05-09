import { format, addDays, differenceInDays } from "date-fns"

// Generate hospital metrics
export function generateHospitalMetrics(startDate: Date, endDate: Date, department = "all") {
  // In a real app, this would fetch data from an API
  return {
    totalPatients: 1284 + Math.floor(Math.random() * 100),
    patientsTrend: Math.floor(Math.random() * 10) - 2,
    bedOccupancy: 78 + Math.floor(Math.random() * 10),
    occupancyTrend: Math.floor(Math.random() * 8) - 3,
    avgLengthOfStay: 4.2 + (Math.random() * 0.6 - 0.3).toFixed(1),
    lengthOfStayTrend: Math.floor(Math.random() * 6) - 3,
    revenue: 2450000 + Math.floor(Math.random() * 200000),
    revenueTrend: Math.floor(Math.random() * 12) - 4,
    expenses: 1980000 + Math.floor(Math.random() * 150000),
    expensesTrend: Math.floor(Math.random() * 8) - 2,
    admissions: 320 + Math.floor(Math.random() * 40),
    admissionsTrend: Math.floor(Math.random() * 14) - 6,
    discharges: 310 + Math.floor(Math.random() * 40),
    dischargesTrend: Math.floor(Math.random() * 12) - 5,
    erVisits: 850 + Math.floor(Math.random() * 100),
    erVisitsTrend: Math.floor(Math.random() * 10) - 3,
    erWaitTime: 42 + Math.floor(Math.random() * 15),
    erWaitTimeTrend: Math.floor(Math.random() * 10) - 5,
    erAdmissions: 120 + Math.floor(Math.random() * 20),
    erAdmissionRate: 14 + Math.floor(Math.random() * 4),

    // Top performing departments
    topDepartments: [
      { name: "Cardiology", metric: "Patient Outcomes", score: "94%" },
      { name: "Neurology", metric: "Treatment Success", score: "92%" },
      { name: "Oncology", metric: "Survival Rate", score: "89%" },
      { name: "Pediatrics", metric: "Patient Satisfaction", score: "96%" },
      { name: "Emergency", metric: "Response Time", score: "91%" },
    ],

    // Department capacity
    departmentCapacity: [
      { name: "Cardiology", total: 40, occupied: 32 },
      { name: "Neurology", total: 35, occupied: 28 },
      { name: "Pediatrics", total: 30, occupied: 21 },
      { name: "Emergency", total: 25, occupied: 22 },
      { name: "Surgery", total: 20, occupied: 15 },
      { name: "Oncology", total: 30, occupied: 24 },
    ],

    // Department efficiency
    departmentEfficiency: [
      { name: "Cardiology", avgStay: 4.2, trend: -2 },
      { name: "Neurology", avgStay: 5.1, trend: -1 },
      { name: "Pediatrics", avgStay: 3.5, trend: -3 },
      { name: "Emergency", avgStay: 1.2, trend: 0 },
      { name: "Surgery", avgStay: 6.3, trend: 1 },
      { name: "Oncology", avgStay: 7.5, trend: -2 },
    ],

    // Top diagnoses
    topDiagnoses: [
      { name: "Hypertension", department: "Cardiology", count: 145 },
      { name: "Type 2 Diabetes", department: "Endocrinology", count: 132 },
      { name: "Acute Myocardial Infarction", department: "Cardiology", count: 98 },
      { name: "Pneumonia", department: "Pulmonology", count: 87 },
      { name: "Stroke", department: "Neurology", count: 76 },
    ],

    // Patient satisfaction
    patientSatisfaction: {
      overall: 4.2,
      categories: {
        "Doctor Care": 4.4,
        "Nursing Care": 4.3,
        Cleanliness: 4.1,
        Communication: 3.9,
        "Wait Times": 3.7,
      },
    },

    // Staff distribution
    staffDistribution: [
      {
        department: "Cardiology",
        count: 45,
        roles: { doctors: 15, nurses: 25, staff: 5 },
      },
      {
        department: "Neurology",
        count: 40,
        roles: { doctors: 12, nurses: 22, staff: 6 },
      },
      {
        department: "Pediatrics",
        count: 38,
        roles: { doctors: 10, nurses: 24, staff: 4 },
      },
      {
        department: "Emergency",
        count: 50,
        roles: { doctors: 18, nurses: 28, staff: 4 },
      },
      {
        department: "Surgery",
        count: 42,
        roles: { doctors: 16, nurses: 20, staff: 6 },
      },
    ],

    // Top staff
    topStaff: [
      { name: "Dr. Sarah Johnson", role: "Cardiologist", department: "Cardiology", score: "96%" },
      { name: "Dr. Michael Williams", role: "Neurologist", department: "Neurology", score: "95%" },
      { name: "Nurse Emily Davis", role: "Head Nurse", department: "ICU", score: "94%" },
      { name: "Dr. Robert Brown", role: "Pediatrician", department: "Pediatrics", score: "93%" },
      { name: "Nurse Jessica Wilson", role: "Nurse", department: "Emergency", score: "92%" },
    ],

    // Staff utilization
    staffUtilization: [
      { role: "Doctors", utilization: 85, patientLoad: 12 },
      { role: "Nurses", utilization: 92, patientLoad: 8 },
      { role: "Technicians", utilization: 78, patientLoad: 15 },
      { role: "Administrative", utilization: 65, patientLoad: 0 },
    ],

    // Revenue breakdown
    revenueBreakdown: [
      { department: "Cardiology", revenue: 520000 },
      { department: "Neurology", revenue: 480000 },
      { department: "Pediatrics", revenue: 320000 },
      { department: "Emergency", revenue: 620000 },
      { department: "Surgery", revenue: 510000 },
    ],

    // Expense breakdown
    expenseBreakdown: [
      { category: "Staff Salaries", amount: 1200000 },
      { category: "Medications", amount: 350000 },
      { category: "Equipment", amount: 180000 },
      { category: "Facilities", amount: 150000 },
      { category: "Administrative", amount: 100000 },
    ],

    // Equipment utilization
    equipmentUtilization: [
      { equipment: "MRI Machines", utilization: 82, total: 3, inUse: 2 },
      { equipment: "CT Scanners", utilization: 75, total: 4, inUse: 3 },
      { equipment: "Ventilators", utilization: 60, total: 20, inUse: 12 },
      { equipment: "Ultrasound", utilization: 85, total: 8, inUse: 7 },
      { equipment: "X-Ray Machines", utilization: 70, total: 6, inUse: 4 },
    ],

    // Room utilization
    roomUtilization: [
      { roomType: "Operating Rooms", utilization: 75, total: 8, inUse: 6 },
      { roomType: "ICU Rooms", utilization: 90, total: 20, inUse: 18 },
      { roomType: "Patient Rooms", utilization: 78, total: 120, inUse: 94 },
      { roomType: "Exam Rooms", utilization: 65, total: 30, inUse: 20 },
      { roomType: "Emergency Bays", utilization: 85, total: 15, inUse: 13 },
    ],

    // Supply inventory
    supplyInventory: [
      { item: "Surgical Masks", current: 2500, minimum: 1000 },
      { item: "Nitrile Gloves", current: 800, minimum: 1000 },
      { item: "IV Solution", current: 350, minimum: 200 },
      { item: "Syringes", current: 1200, minimum: 500 },
      { item: "Bandages", current: 600, minimum: 300 },
    ],

    // Appointment status
    appointmentStatus: {
      scheduled: 120,
      confirmed: 85,
      "checked-in": 42,
      "in-progress": 28,
      completed: 350,
      cancelled: 45,
      "no-show": 30,
    },

    // Total appointments
    totalAppointments: 700,

    // Appointment types
    appointmentTypes: [
      { name: "Check-up", count: 250 },
      { name: "Follow-up", count: 180 },
      { name: "Consultation", count: 120 },
      { name: "Procedure", count: 90 },
      { name: "Emergency", count: 60 },
    ],

    // Appointment efficiency
    appointmentEfficiency: {
      avgWaitTime: 18,
      waitTimeTrend: -5,
      avgDuration: 22,
      targetDuration: 20,
      noShowRate: 8,
      noShowTrend: -2,
    },
  }
}

// Generate hospital time series data
export function generateHospitalTimeSeriesData(startDate: Date, endDate: Date) {
  const days = differenceInDays(endDate, startDate) + 1
  const data = []

  for (let i = 0; i < days; i++) {
    const currentDate = addDays(startDate, i)
    data.push({
      date: format(currentDate, "MMM d"),
      admissions: 10 + Math.floor(Math.random() * 10),
      discharges: 8 + Math.floor(Math.random() * 12),
      bedOccupancy: 70 + Math.floor(Math.random() * 20),
    })
  }

  return data
}

// Generate department performance data
export function generateDepartmentPerformanceData() {
  return [
    { name: "Cardiology", patients: 320, avgStay: 4.2, satisfaction: 4.4 },
    { name: "Neurology", patients: 280, avgStay: 5.1, satisfaction: 4.2 },
    { name: "Pediatrics", patients: 210, avgStay: 3.5, satisfaction: 4.6 },
    { name: "Emergency", patients: 450, avgStay: 1.2, satisfaction: 3.8 },
    { name: "Surgery", patients: 180, avgStay: 6.3, satisfaction: 4.1 },
    { name: "Oncology", patients: 150, avgStay: 7.5, satisfaction: 4.3 },
  ]
}

// Generate patient demographics data
export function generatePatientDemographicsData() {
  const ageData = [
    { name: "0-17", value: 15 },
    { name: "18-34", value: 20 },
    { name: "35-50", value: 25 },
    { name: "51-65", value: 22 },
    { name: "66+", value: 18 },
  ]

  const genderData = [
    { name: "Male", value: 48 },
    { name: "Female", value: 51 },
    { name: "Other", value: 1 },
  ]

  return { ageData, genderData }
}

// Generate staff performance data
export function generateStaffPerformanceData() {
  return [
    { role: "Doctors", patientsPerDay: 12, hoursPerPatient: 0.8, satisfactionScore: 4.4 },
    { role: "Nurses", patientsPerDay: 8, hoursPerPatient: 2.5, satisfactionScore: 4.3 },
    { role: "Specialists", patientsPerDay: 6, hoursPerPatient: 1.2, satisfactionScore: 4.5 },
    { role: "Technicians", patientsPerDay: 15, hoursPerPatient: 0.5, satisfactionScore: 4.0 },
  ]
}

// Generate financial time series data
export function generateFinancialTimeSeriesData(startDate: Date, endDate: Date) {
  const days = differenceInDays(endDate, startDate) + 1
  const data = []

  // Group by week if more than 30 days
  const groupByWeek = days > 30
  const groupSize = groupByWeek ? 7 : 1
  const groups = Math.ceil(days / groupSize)

  for (let i = 0; i < groups; i++) {
    const currentDate = addDays(startDate, i * groupSize)
    const revenue = 80000 + Math.floor(Math.random() * 20000)
    const expenses = 65000 + Math.floor(Math.random() * 15000)

    data.push({
      date: format(currentDate, groupByWeek ? "'Week of' MMM d" : "MMM d"),
      revenue: revenue,
      expenses: expenses,
      profit: revenue - expenses,
    })
  }

  return data
}

// Generate resource utilization data
export function generateResourceUtilizationData() {
  return [
    { resource: "Beds", utilization: 78, target: 85 },
    { resource: "Operating Rooms", utilization: 75, target: 80 },
    { resource: "MRI Machines", utilization: 82, target: 90 },
    { resource: "CT Scanners", utilization: 75, target: 85 },
    { resource: "Ventilators", utilization: 60, target: 70 },
    { resource: "Staff", utilization: 85, target: 90 },
    { resource: "ICU", utilization: 90, target: 85 },
    { resource: "Emergency", utilization: 85, target: 80 },
  ]
}

// Generate appointment analytics data
export function generateAppointmentAnalyticsData(startDate: Date, endDate: Date) {
  const days = differenceInDays(endDate, startDate) + 1
  const data = []

  // Group by week if more than 30 days
  const groupByWeek = days > 30
  const groupSize = groupByWeek ? 7 : 1
  const groups = Math.ceil(days / groupSize)

  for (let i = 0; i < groups; i++) {
    const currentDate = addDays(startDate, i * groupSize)
    const scheduled = 20 + Math.floor(Math.random() * 10)
    const completed = Math.floor(scheduled * (0.7 + Math.random() * 0.2))
    const cancelled = Math.floor(scheduled * (0.05 + Math.random() * 0.1))
    const noShow = scheduled - completed - cancelled

    data.push({
      date: format(currentDate, groupByWeek ? "'Week of' MMM d" : "MMM d"),
      scheduled: scheduled,
      completed: completed,
      cancelled: cancelled,
      noShowRate: Math.round((noShow / scheduled) * 100),
    })
  }

  return data
}