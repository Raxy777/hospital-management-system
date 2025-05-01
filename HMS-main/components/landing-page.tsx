"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  Shield,
  Clock,
  Users,
  FileText,
  Lock,
  ChevronRight,
  User,
  Stethoscope,
  Clipboard,
  FlaskRoundIcon as Flask,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUser } from "@/contexts/user-context"
import { authService } from "@/lib/auth-service"

// Sample user credentials for testing
const sampleUsers = {
  admin: {
    username: "admin@careos.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    redirect: "/admin",
  },
  doctor: {
    username: "doctor@careos.com",
    password: "doctor123",
    role: "doctor",
    name: "Dr. Sarah Johnson",
    redirect: "/dashboard",
  },
  nurse: {
    username: "nurse@careos.com",
    password: "nurse123",
    role: "nurse",
    name: "Nurse Emily Davis",
    redirect: "/dashboard",
  },
  lab: {
    username: "lab@careos.com",
    password: "lab123",
    role: "lab",
    name: "Lab Tech Michael Brown",
    redirect: "/dashboard",
  },
}

export function LandingPage() {
  const router = useRouter()
  const { login } = useUser()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Authenticate user
      const user = await authService.login(username, password)

      if (user) {
        // If role is specified, check if it matches
        if (role && role !== "any" && user.role !== role) {
          setError("You don't have access with the selected role.")
          setLoading(false)
          return
        }

        // Store user in context
        login(user)

        // Redirect to appropriate dashboard
        const redirectUrl = authService.getDashboardUrl(user.role)
        router.push(redirectUrl)
      } else {
        setError("Invalid credentials. Please try again or use one of the sample accounts below.")
        setLoading(false)
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.")
      setLoading(false)
    }
  }

  const setDemoCredentials = (userType: keyof typeof sampleUsers) => {
    const user = sampleUsers[userType]
    setUsername(user.username)
    setPassword(user.password)
    setRole(user.role)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Login */}
      <section className="relative bg-[#4DB6AC] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                CareOS Hospital Management System
              </h1>
              <p className="text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A comprehensive solution for healthcare providers to manage patients, appointments, resources, and
                administrative tasks efficiently and securely.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-white text-[#4DB6AC] hover:bg-gray-100">
                  Learn More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="bg-[#4DB6AC] border-white text-white hover:bg-white/10">
                  Contact Support
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 w-full max-w-md">
              <Card className="border-0 shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-[#333333]">Sign In</CardTitle>
                  <CardDescription>Enter your credentials to access the system</CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username/Email</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username or email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role (Optional)</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Role</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="nurse">Nurse</SelectItem>
                          <SelectItem value="lab">Lab Assistant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Button type="submit" className="w-full bg-[#4DB6AC] hover:bg-[#3da69c]" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" className="text-[#4DB6AC]">
                    Forgot password?
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#4DB6AC]/20 to-[#4DB6AC] -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Comprehensive Healthcare Management</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our system provides all the tools needed for efficient hospital management
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users className="h-10 w-10 text-[#4DB6AC]" />,
                title: "Patient Management",
                description: "Comprehensive patient records, medical history, and treatment plans.",
              },
              {
                icon: <Clock className="h-10 w-10 text-[#4DB6AC]" />,
                title: "Appointment Scheduling",
                description: "Efficient scheduling system for patients and healthcare providers.",
              },
              {
                icon: <Building2 className="h-10 w-10 text-[#4DB6AC]" />,
                title: "Resource Management",
                description: "Track and manage hospital resources, rooms, and equipment.",
              },
              {
                icon: <FileText className="h-10 w-10 text-[#4DB6AC]" />,
                title: "Medical Records",
                description: "Secure storage and easy access to patient medical records.",
              },
              {
                icon: <Shield className="h-10 w-10 text-[#4DB6AC]" />,
                title: "HIPAA Compliant",
                description: "Secure system designed to meet healthcare privacy standards.",
              },
              {
                icon: <Lock className="h-10 w-10 text-[#4DB6AC]" />,
                title: "Role-Based Access",
                description: "Customized access based on staff roles and responsibilities.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Credentials Section */}
      <section className="py-12 md:py-24 bg-[#EEEEEE]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Test the System</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Use these sample credentials to explore different roles in the system
            </p>
          </div>

          <Tabs defaultValue="admin" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="admin" className="flex gap-2 items-center">
                <User className="h-4 w-4" /> Admin
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex gap-2 items-center">
                <Stethoscope className="h-4 w-4" /> Doctor
              </TabsTrigger>
              <TabsTrigger value="nurse" className="flex gap-2 items-center">
                <Clipboard className="h-4 w-4" /> Nurse
              </TabsTrigger>
              <TabsTrigger value="lab" className="flex gap-2 items-center">
                <Flask className="h-4 w-4" /> Lab
              </TabsTrigger>
            </TabsList>

            {Object.entries(sampleUsers).map(([key, user]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {key === "admin" && <User className="h-5 w-5" />}
                      {key === "doctor" && <Stethoscope className="h-5 w-5" />}
                      {key === "nurse" && <Clipboard className="h-5 w-5" />}
                      {key === "lab" && <Flask className="h-5 w-5" />}
                      {user.name}
                    </CardTitle>
                    <CardDescription>
                      {key === "admin" && "Full access to all system features and administrative tools"}
                      {key === "doctor" && "Access to patient records, appointments, and medical tools"}
                      {key === "nurse" && "Access to patient care, vitals, and treatment plans"}
                      {key === "lab" && "Access to lab tests, results, and sample management"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Username/Email</Label>
                        <p className="font-medium">{user.username}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Password</Label>
                        <p className="font-medium">{user.password}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-[#4DB6AC] hover:bg-[#3da69c]"
                      onClick={() => setDemoCredentials(key as keyof typeof sampleUsers)}
                    >
                      Use These Credentials
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4">CareOS HMS</h3>
              <p className="text-sm text-gray-300">
                A comprehensive hospital management system designed for healthcare professionals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    HIPAA Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>123 Medical Center Dr.</li>
                <li>Healthcare City, HC 12345</li>
                <li>support@careos-hms.com</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
            <p>&copy; {new Date().getFullYear()} CareOS Hospital Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
