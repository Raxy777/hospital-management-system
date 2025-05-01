"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider } from "@/components/sidebar-provider"
import { SiteNavigation } from "@/components/site-navigation"
import { useUser } from "@/contexts/user-context"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Check authorization for admin-only routes
  useEffect(() => {
    if (!isLoading) {
      // Admin-only routes
      const adminRoutes = ["/admin"]
      const isAdminRoute = adminRoutes.some((route) => pathname?.startsWith(route))

      // Check if user is authenticated
      if (!user) {
        router.push("/")
        return
      }

      // Check if user has permission for admin routes
      if (isAdminRoute && user.role !== "admin") {
        router.push("/dashboard")
        return
      }

      setIsAuthorized(true)
      setIsCheckingAuth(false)
    }
  }, [user, isLoading, router, pathname])

  if (isLoading || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-[#4DB6AC] font-bold">Loading...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Will redirect in the useEffect
  }

  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <SiteNavigation />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
