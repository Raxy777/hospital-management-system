import type { PatientRecord } from "../types/patients"

// Generate sample patient data
export function generateSamplePatients(): PatientRecord[] {
  const patients: PatientRecord[] = [
    {
      id: "P-1001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      bloodType: "O+",
      condition: "Hypertension",
      department: "Cardiology",
      status: "Stable",
      admissionDate: "2025-03-15",
      insuranceProvider: "Blue Cross",
      notes: "Patient has a history of high blood pressure and is currently on medication.",
      allergies: ["Penicillin", "Peanuts"],
      medications: ["Lisinopril", "Aspirin"],
    },
    {
      id: "P-1002",
      name: "Emily Johnson",
      age: 32,
      gender: "Female",
      email: "emily.johnson@example.com",
      phone: "(555) 234-5678",
      bloodType: "A+",
      condition: "Pregnancy",
      department: "Obstetrics",
      status: "Outpatient",
      admissionDate: "2025-04-02",
      insuranceProvider: "Aetna",
      notes: "Patient is in her second trimester, regular check-up scheduled.",
    },
    {
      id: "P-1003",
      name: "Michael Brown",
      age: 58,
      gender: "Male",
      email: "michael.brown@example.com",
      phone: "(555) 345-6789",
      bloodType: "B+",
      condition: "Diabetes",
      department: "Endocrinology",
      status: "Inpatient",
      admissionDate: "2025-04-10",
      insuranceProvider: "Medicare",
      notes: "Patient admitted for diabetic ketoacidosis, blood sugar levels stabilizing.",
      allergies: ["Sulfa drugs"],
      medications: ["Insulin", "Metformin"],
    },
    {
      id: "P-1004",
      name: "Sarah Davis",
      age: 27,
      gender: "Female",
      email: "sarah.davis@example.com",
      phone: "(555) 456-7890",
      bloodType: "AB-",
      condition: "Asthma",
      department: "Pulmonology",
      status: "Outpatient",
      admissionDate: "2025-03-28",
      insuranceProvider: "Cigna",
      notes: "Patient experiencing increased frequency of asthma attacks, adjusting medication.",
      allergies: ["Dust", "Pollen"],
      medications: ["Albuterol", "Fluticasone"],
    },
    {
      id: "P-1005",
      name: "Robert Wilson",
      age: 62,
      gender: "Male",
      email: "robert.wilson@example.com",
      phone: "(555) 567-8901",
      bloodType: "O-",
      condition: "Heart Disease",
      department: "Cardiology",
      status: "Critical",
      admissionDate: "2025-04-15",
      insuranceProvider: "Medicare",
      notes: "Patient admitted after myocardial infarction, scheduled for angioplasty.",
      allergies: ["Iodine"],
      medications: ["Clopidogrel", "Atorvastatin", "Metoprolol"],
    },
    {
      id: "P-1006",
      name: "Jennifer Lee",
      age: 41,
      gender: "Female",
      email: "jennifer.lee@example.com",
      phone: "(555) 678-9012",
      bloodType: "A-",
      condition: "Migraine",
      department: "Neurology",
      status: "Outpatient",
      admissionDate: "2025-04-05",
      insuranceProvider: "UnitedHealthcare",
      notes: "Patient reporting increased frequency and severity of migraines.",
      medications: ["Sumatriptan", "Propranolol"],
    },
    {
      id: "P-1007",
      name: "David Martinez",
      age: 35,
      gender: "Male",
      email: "david.martinez@example.com",
      phone: "(555) 789-0123",
      bloodType: "B-",
      condition: "Fracture",
      department: "Orthopedics",
      status: "Inpatient",
      admissionDate: "2025-04-12",
      insuranceProvider: "Blue Cross",
      notes: "Patient admitted after car accident with multiple fractures, scheduled for surgery.",
      allergies: ["Codeine"],
      medications: ["Hydrocodone", "Ibuprofen"],
    },
    {
      id: "P-1008",
      name: "Amanda Wilson",
      age: 29,
      gender: "Female",
      email: "amanda.wilson@example.com",
      phone: "(555) 890-1234",
      bloodType: "AB+",
      condition: "Anxiety",
      department: "Psychiatry",
      status: "Outpatient",
      admissionDate: "2025-03-20",
      insuranceProvider: "Aetna",
      notes: "Patient experiencing increased anxiety attacks, adjusting medication and therapy.",
      medications: ["Sertraline", "Lorazepam"],
    },
    {
      id: "P-1009",
      name: "Thomas Anderson",
      age: 55,
      gender: "Male",
      email: "thomas.anderson@example.com",
      phone: "(555) 901-2345",
      bloodType: "O+",
      condition: "Cancer",
      department: "Oncology",
      status: "Inpatient",
      admissionDate: "2025-04-01",
      insuranceProvider: "Medicare",
      notes: "Patient undergoing chemotherapy for stage 3 colon cancer.",
      allergies: ["Latex"],
      medications: ["Ondansetron", "Dexamethasone"],
    },
    {
      id: "P-1010",
      name: "Jessica Taylor",
      age: 38,
      gender: "Female",
      email: "jessica.taylor@example.com",
      phone: "(555) 012-3456",
      bloodType: "A+",
      condition: "Chronic Pain",
      department: "Pain Management",
      status: "Outpatient",
      admissionDate: "2025-04-08",
      insuranceProvider: "Cigna",
      notes: "Patient with chronic back pain following workplace injury, exploring alternative treatments.",
      allergies: ["NSAIDs"],
      medications: ["Gabapentin", "Tramadol"],
    },
    {
      id: "P-1011",
      name: "William Johnson",
      age: 72,
      gender: "Male",
      email: "william.johnson@example.com",
      phone: "(555) 123-7890",
      bloodType: "B+",
      condition: "Stroke",
      department: "Neurology",
      status: "Inpatient",
      admissionDate: "2025-04-14",
      insuranceProvider: "Medicare",
      notes: "Patient admitted after ischemic stroke, beginning rehabilitation therapy.",
      medications: ["Clopidogrel", "Atorvastatin", "Lisinopril"],
    },
    {
      id: "P-1012",
      name: "Olivia Garcia",
      age: 25,
      gender: "Female",
      email: "olivia.garcia@example.com",
      phone: "(555) 234-8901",
      bloodType: "O-",
      condition: "Appendicitis",
      department: "Surgery",
      status: "Emergency",
      admissionDate: "2025-04-16",
      insuranceProvider: "Blue Cross",
      notes: "Patient admitted with acute appendicitis, scheduled for emergency appendectomy.",
      allergies: ["Morphine"],
      medications: ["Cefazolin", "Hydromorphone"],
    },
    {
      id: "P-1013",
      name: "James Wilson",
      age: 48,
      gender: "Male",
      email: "james.wilson@example.com",
      phone: "(555) 345-9012",
      bloodType: "AB-",
      condition: "Kidney Disease",
      department: "Nephrology",
      status: "Inpatient",
      admissionDate: "2025-04-03",
      insuranceProvider: "Medicare",
      notes: "Patient with chronic kidney disease, evaluating for dialysis.",
      allergies: ["Contrast dye"],
      medications: ["Furosemide", "Calcitriol"],
    },
    {
      id: "P-1014",
      name: "Sophia Martinez",
      age: 31,
      gender: "Female",
      email: "sophia.martinez@example.com",
      phone: "(555) 456-0123",
      bloodType: "A+",
      condition: "Pneumonia",
      department: "Pulmonology",
      status: "Inpatient",
      admissionDate: "2025-04-11",
      insuranceProvider: "UnitedHealthcare",
      notes: "Patient admitted with severe pneumonia, responding well to antibiotics.",
      allergies: ["Sulfa drugs"],
      medications: ["Azithromycin", "Ceftriaxone"],
    },
    {
      id: "P-1015",
      name: "Benjamin Taylor",
      age: 65,
      gender: "Male",
      email: "benjamin.taylor@example.com",
      phone: "(555) 567-1234",
      bloodType: "B-",
      condition: "COPD",
      department: "Pulmonology",
      status: "Inpatient",
      admissionDate: "2025-04-09",
      insuranceProvider: "Medicare",
      notes: "Patient with exacerbation of COPD, requiring oxygen therapy.",
      allergies: ["Aspirin"],
      medications: ["Albuterol", "Prednisone", "Tiotropium"],
    },
    {
      id: "P-1016",
      name: "Emma Brown",
      age: 42,
      gender: "Female",
      email: "emma.brown@example.com",
      phone: "(555) 678-2345",
      bloodType: "O+",
      condition: "Rheumatoid Arthritis",
      department: "Rheumatology",
      status: "Outpatient",
      admissionDate: "2025-03-25",
      insuranceProvider: "Aetna",
      notes: "Patient experiencing increased joint pain and swelling, adjusting medication regimen.",
      allergies: ["Shellfish"],
      medications: ["Methotrexate", "Prednisone"],
    },
    {
      id: "P-1017",
      name: "Alexander Davis",
      age: 52,
      gender: "Male",
      email: "alexander.davis@example.com",
      phone: "(555) 789-3456",
      bloodType: "AB+",
      condition: "Liver Disease",
      department: "Gastroenterology",
      status: "Inpatient",
      admissionDate: "2025-04-07",
      insuranceProvider: "Cigna",
      notes: "Patient with cirrhosis, admitted for management of ascites.",
      allergies: ["Tetracycline"],
      medications: ["Furosemide", "Spironolactone"],
    },
    {
      id: "P-1018",
      name: "Mia Johnson",
      age: 36,
      gender: "Female",
      email: "mia.johnson@example.com",
      phone: "(555) 890-4567",
      bloodType: "A-",
      condition: "Multiple Sclerosis",
      department: "Neurology",
      status: "Outpatient",
      admissionDate: "2025-04-04",
      insuranceProvider: "Blue Cross",
      notes: "Patient experiencing new symptoms, scheduled for MRI.",
      medications: ["Interferon beta-1a", "Baclofen"],
    },
    {
      id: "P-1019",
      name: "Ethan Wilson",
      age: 28,
      gender: "Male",
      email: "ethan.wilson@example.com",
      phone: "(555) 901-5678",
      bloodType: "B+",
      condition: "Crohn's Disease",
      department: "Gastroenterology",
      status: "Outpatient",
      admissionDate: "2025-03-30",
      insuranceProvider: "UnitedHealthcare",
      notes: "Patient with flare-up of Crohn's disease, adjusting biologic therapy.",
      allergies: ["Dairy"],
      medications: ["Adalimumab", "Azathioprine"],
    },
    {
      id: "P-1020",
      name: "Ava Martinez",
      age: 33,
      gender: "Female",
      email: "ava.martinez@example.com",
      phone: "(555) 012-6789",
      bloodType: "O-",
      condition: "Thyroid Disorder",
      department: "Endocrinology",
      status: "Outpatient",
      admissionDate: "2025-04-13",
      insuranceProvider: "Aetna",
      notes: "Patient with hypothyroidism, adjusting levothyroxine dosage.",
      medications: ["Levothyroxine"],
    },
  ]

  return patients
}

// Search patients
export function searchPatients(patients: PatientRecord[], query: string, filters: any = {}): PatientRecord[] {
  // This is a simplified version - the actual implementation is in the PatientSearch component
  if (!query && Object.keys(filters).length === 0) return patients

  return patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase()) ||
      patient.id.toLowerCase().includes(query.toLowerCase()) ||
      (patient.email && patient.email.toLowerCase().includes(query.toLowerCase())) ||
      (patient.condition && patient.condition.toLowerCase().includes(query.toLowerCase())),
  )
}