// Types for our user roles
export type UserRole = "admin" | "doctor" | "nurse" | "lab"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: string[]
  department?: string
  specialty?: string
  profileImage?: string
  contactNumber?: string
  joinDate?: string
  lastActive?: string
}

// Sample users for testing
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@careos.com",
    password: "admin123",
    role: "admin" as UserRole,
    permissions: ["all"],
    department: "Administration",
    joinDate: "2020-01-15",
    contactNumber: "(555) 123-4567",
    profileImage: "/placeholder.svg?height=200&width=200",
    lastActive: "2023-04-28T09:15:00",
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "doctor@careos.com",
    password: "doctor123",
    role: "doctor" as UserRole,
    permissions: ["view_patients", "edit_patients", "view_appointments", "edit_appointments"],
    department: "Cardiology",
    specialty: "Interventional Cardiology",
    joinDate: "2018-05-10",
    contactNumber: "(555) 234-5678",
    profileImage: "/placeholder.svg?height=200&width=200",
    lastActive: "2023-04-28T10:30:00",
  },
  {
    id: "3",
    name: "Nurse Emily Davis",
    email: "nurse@careos.com",
    password: "nurse123",
    role: "nurse" as UserRole,
    permissions: ["view_patients", "edit_vitals", "view_appointments"],
    department: "Emergency",
    joinDate: "2019-08-22",
    contactNumber: "(555) 345-6789",
    profileImage: "/placeholder.svg?height=200&width=200",
    lastActive: "2023-04-28T08:45:00",
  },
  {
    id: "4",
    name: "Lab Tech Michael Brown",
    email: "lab@careos.com",
    password: "lab123",
    role: "lab" as UserRole,
    permissions: ["view_lab_tests", "edit_lab_tests", "view_patients"],
    department: "Laboratory",
    specialty: "Hematology",
    joinDate: "2021-03-15",
    contactNumber: "(555) 456-7890",
    profileImage: "/placeholder.svg?height=200&width=200",
    lastActive: "2023-04-28T11:20:00",
  },
]

// Mock authentication service
export const authService = {
  // Login function
  login: async (email: string, password: string): Promise<User | null> => {
    // In a real app, this would make an API call to your backend
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      // Remove password before returning user
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword as User
    }

    return null
  },

  // Get dashboard URL based on user role
  getDashboardUrl: (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "/admin"
      case "doctor":
      case "nurse":
      case "lab":
        return "/dashboard"
      default:
        return "/"
    }
  },

  // Check if user has permission
  hasPermission: (user: User, permission: string): boolean => {
    return user.permissions.includes("all") || user.permissions.includes(permission)
  },
}
