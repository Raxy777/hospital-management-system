"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, MessageSquare, Users, UserCircle, ChevronRight, Settings, Droplet } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/sidebar-provider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUser } from "@/contexts/user-context"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: string[] // Optional roles that can access this item
}

export function SiteNavigation() {
  const pathname = usePathname()
  const { isOpen } = useSidebar()
  const { user } = useUser()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Patient Records",
      href: "/patients",
      icon: Users,
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: Calendar,
    },
    {
      title: "Messaging",
      href: "/messaging",
      icon: MessageSquare,
    },
    {
      title: "Patient Portal",
      href: "/portal",
      icon: UserCircle,
    },
    {
      title: "Blood Bank",
      href: "/blood-bank",
      icon: Droplet,
    },
    {
      title: "Administrative",
      href: "/admin",
      icon: Settings,
      roles: ["admin"], // Only admin can see this
    },
  ]

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) => {
    // If no roles specified, everyone can access
    if (!item.roles) return true

    // If roles specified, check if user has the required role
    return user && item.roles.includes(user.role)
  })

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <ScrollArea className="h-full py-6">
        <div className="px-3 py-2">
          <div className="mb-6 px-3 flex items-center">
            <span className="text-lg font-semibold">Navigation</span>
          </div>
          <div className="space-y-1">
            {filteredNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", pathname === item.href && "bg-[#EEEEEE] text-[#4DB6AC]")}
                asChild
              >
                <Link href={item.href} className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
