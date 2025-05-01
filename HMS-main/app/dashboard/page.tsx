"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { DashboardPage } from "@/components/dashboard-page"
import { useUser } from "@/contexts/user-context"

export default function Dashboard() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-[#4DB6AC] font-bold">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  )
}
