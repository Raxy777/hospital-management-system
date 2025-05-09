"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Filter, X, Save, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { PatientSearchFilters } from "./patient-search-filters"
import { PatientSearchResults } from "./patient-search-results"
import type { PatientRecord } from "@/types/patient"
import { useToast } from "@/components/ui/use-toast"

export interface SearchFilters {
  query: string
  gender: string[]
  ageRange: [number, number]
  bloodType: string[]
  insuranceProvider: string[]
  admissionDateRange: [Date | null, Date | null]
  department: string[]
  condition: string[]
  status: string[]
}

const initialFilters: SearchFilters = {
  query: "",
  gender: [],
  ageRange: [0, 100],
  bloodType: [],
  insuranceProvider: [],
  admissionDateRange: [null, null],
  department: [],
  condition: [],
  status: [],
}

interface PatientSearchProps {
  patients: PatientRecord[]
}

export function PatientSearch({ patients }: PatientSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(initialFilters)
  const [activeFilters, setActiveFilters] = useState<SearchFilters>(initialFilters)
  const [filteredPatients, setFilteredPatients] = useState<PatientRecord[]>(patients)
  const [showFilters, setShowFilters] = useState(false)
  const [savedSearches, setSavedSearches] = useState<{ name: string; filters: SearchFilters }[]>([])
  const [recentSearches, setRecentSearches] = useState<{ query: string; timestamp: Date }[]>([])
  const [sortOption, setSortOption] = useState<string>("name-asc")

  // Initialize from URL params if available
  useEffect(() => {
    const query = searchParams.get("query") || ""
    if (query) {
      setSearchFilters({ ...searchFilters, query })
      setActiveFilters({ ...activeFilters, query })
      performSearch({ ...activeFilters, query })

      // Add to recent searches
      addToRecentSearches(query)
    }
  }, [searchParams])

  // Load saved and recent searches from localStorage
  useEffect(() => {
    const savedSearchesData = localStorage.getItem("savedSearches")
    if (savedSearchesData) {
      try {
        setSavedSearches(JSON.parse(savedSearchesData))
      } catch (e) {
        console.error("Error loading saved searches:", e)
      }
    }

    const recentSearchesData = localStorage.getItem("recentSearches")
    if (recentSearchesData) {
      try {
        setRecentSearches(JSON.parse(recentSearchesData))
      } catch (e) {
        console.error("Error loading recent searches:", e)
      }
    }
  }, [])

  // Add to recent searches
  const addToRecentSearches = (query: string) => {
    if (!query.trim()) return

    const newRecentSearches = [
      { query, timestamp: new Date() },
      ...recentSearches.filter((s) => s.query !== query).slice(0, 9),
    ]

    setRecentSearches(newRecentSearches)
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))
  }

  // Save current search
  const saveCurrentSearch = (name: string) => {
    if (!name.trim()) return

    const newSavedSearches = [{ name, filters: { ...activeFilters } }, ...savedSearches.filter((s) => s.name !== name)]

    setSavedSearches(newSavedSearches)
    localStorage.setItem("savedSearches", JSON.stringify(newSavedSearches))

    toast({
      title: "Search saved",
      description: `Your search "${name}" has been saved.`,
    })
  }

  // Apply saved search
  const applySavedSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
    setActiveFilters(filters)
    performSearch(filters)
  }

  // Apply recent search
  const applyRecentSearch = (query: string) => {
    const newFilters = { ...initialFilters, query }
    setSearchFilters(newFilters)
    setActiveFilters(newFilters)
    performSearch(newFilters)

    // Update URL
    router.push(`/patients/search?query=${encodeURIComponent(query)}`)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters({ ...searchFilters, query: e.target.value })
  }

  // Handle filter changes
  const handleFilterChange = (filters: Partial<SearchFilters>) => {
    setSearchFilters({ ...searchFilters, ...filters })
  }

  // Apply filters
  const applyFilters = () => {
    setActiveFilters(searchFilters)
    performSearch(searchFilters)

    // Add to recent searches if there's a query
    if (searchFilters.query.trim()) {
      addToRecentSearches(searchFilters.query)

      // Update URL
      router.push(`/patients/search?query=${encodeURIComponent(searchFilters.query)}`)
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchFilters(initialFilters)
    setActiveFilters(initialFilters)
    setFilteredPatients(patients)
    router.push("/patients/search")
  }

  // Perform search with active filters
  const performSearch = (filters: SearchFilters) => {
    let results = [...patients]

    // Text search (case insensitive)
    if (filters.query) {
      const query = filters.query.toLowerCase()
      results = results.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.id.toLowerCase().includes(query) ||
          patient.email?.toLowerCase().includes(query) ||
          patient.condition?.toLowerCase().includes(query) ||
          patient.notes?.toLowerCase().includes(query),
      )
    }

    // Gender filter
    if (filters.gender.length > 0) {
      results = results.filter((patient) => filters.gender.includes(patient.gender))
    }

    // Age range filter
    results = results.filter((patient) => patient.age >= filters.ageRange[0] && patient.age <= filters.ageRange[1])

    // Blood type filter
    if (filters.bloodType.length > 0) {
      results = results.filter((patient) => filters.bloodType.includes(patient.bloodType || ""))
    }

    // Insurance provider filter
    if (filters.insuranceProvider.length > 0) {
      results = results.filter((patient) => filters.insuranceProvider.includes(patient.insuranceProvider || ""))
    }

    // Admission date range filter
    if (filters.admissionDateRange[0] && filters.admissionDateRange[1]) {
      results = results.filter((patient) => {
        if (!patient.admissionDate) return false
        const admissionDate = new Date(patient.admissionDate)
        return (
          admissionDate >= (filters.admissionDateRange[0] as Date) &&
          admissionDate <= (filters.admissionDateRange[1] as Date)
        )
      })
    }

    // Department filter
    if (filters.department.length > 0) {
      results = results.filter((patient) => filters.department.includes(patient.department || ""))
    }

    // Condition filter
    if (filters.condition.length > 0) {
      results = results.filter((patient) => filters.condition.includes(patient.condition || ""))
    }

    // Status filter
    if (filters.status.length > 0) {
      results = results.filter((patient) => filters.status.includes(patient.status || ""))
    }

    // Apply sorting
    results = sortPatients(results, sortOption)

    setFilteredPatients(results)
  }

  // Sort patients based on selected option
  const sortPatients = (patients: PatientRecord[], sortOption: string): PatientRecord[] => {
    const [field, direction] = sortOption.split("-")

    return [...patients].sort((a, b) => {
      let comparison = 0

      switch (field) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "id":
          comparison = a.id.localeCompare(b.id)
          break
        case "age":
          comparison = a.age - b.age
          break
        case "date":
          if (a.admissionDate && b.admissionDate) {
            comparison = new Date(a.admissionDate).getTime() - new Date(b.admissionDate).getTime()
          }
          break
        default:
          comparison = 0
      }

      return direction === "desc" ? -comparison : comparison
    })
  }

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option)
    setFilteredPatients(sortPatients(filteredPatients, option))
  }

  // Export search results
  const exportResults = () => {
    toast({
      title: "Export started",
      description: `Exporting ${filteredPatients.length} patient records.`,
    })

    // In a real app, this would trigger a download of the search results
    console.log("Exporting patients:", filteredPatients)
  }

  // Count active filters (excluding query and default age range)
  const countActiveFilters = () => {
    let count = 0
    if (activeFilters.gender.length > 0) count++
    if (activeFilters.ageRange[0] > 0 || activeFilters.ageRange[1] < 100) count++
    if (activeFilters.bloodType.length > 0) count++
    if (activeFilters.insuranceProvider.length > 0) count++
    if (activeFilters.admissionDateRange[0] || activeFilters.admissionDateRange[1]) count++
    if (activeFilters.department.length > 0) count++
    if (activeFilters.condition.length > 0) count++
    if (activeFilters.status.length > 0) count++
    return count
  }

  return (
    <div className="space-y-4">
      {/* Search header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients by name, ID, condition..."
              className="w-full pl-8 pr-10"
              value={searchFilters.query}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
            {searchFilters.query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => {
                  setSearchFilters({ ...searchFilters, query: "" })
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            className={`flex gap-2 ${showFilters ? "bg-[#4DB6AC] hover:bg-[#3da69c]" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            {countActiveFilters() > 0 && <Badge className="ml-1 bg-white text-[#4DB6AC]">{countActiveFilters()}</Badge>}
          </Button>
          <Button variant="outline" className="flex gap-2" onClick={applyFilters}>
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <Card>
            <CardContent className="p-4">
              <PatientSearchFilters
                filters={searchFilters}
                onChange={handleFilterChange}
                onApply={applyFilters}
                onReset={resetFilters}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search results and saved searches */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="saved">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="saved">Saved Searches</TabsTrigger>
                  <TabsTrigger value="recent">Recent Searches</TabsTrigger>
                </TabsList>
                <TabsContent value="saved" className="mt-4">
                  <ScrollArea className="h-[300px]">
                    {savedSearches.length > 0 ? (
                      <div className="space-y-2">
                        {savedSearches.map((saved, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => applySavedSearch(saved.filters)}
                          >
                            <div>
                              <p className="font-medium">{saved.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {saved.filters.query || "No query"}
                                {countFilters(saved.filters) > 0 && ` + ${countFilters(saved.filters)} filters`}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X
                                className="h-4 w-4"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSavedSearches(savedSearches.filter((_, i) => i !== index))
                                  localStorage.setItem(
                                    "savedSearches",
                                    JSON.stringify(savedSearches.filter((_, i) => i !== index)),
                                  )
                                }}
                              />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[200px] text-center">
                        <Save className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No saved searches</p>
                        <p className="text-xs text-muted-foreground mt-1">Save your searches for quick access</p>
                      </div>
                    )}
                  </ScrollArea>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const name = prompt("Enter a name for this search:")
                        if (name) saveCurrentSearch(name)
                      }}
                      disabled={!activeFilters.query && countActiveFilters() === 0}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Current Search
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="recent" className="mt-4">
                  <ScrollArea className="h-[300px]">
                    {recentSearches.length > 0 ? (
                      <div className="space-y-2">
                        {recentSearches.map((recent, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                            onClick={() => applyRecentSearch(recent.query)}
                          >
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                              <p className="font-medium truncate max-w-[200px]">{recent.query}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{formatRelativeTime(recent.timestamp)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[200px] text-center">
                        <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No recent searches</p>
                        <p className="text-xs text-muted-foreground mt-1">Your recent searches will appear here</p>
                      </div>
                    )}
                  </ScrollArea>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setRecentSearches([])
                        localStorage.removeItem("recentSearches")
                        toast({
                          title: "Recent searches cleared",
                          description: "Your recent search history has been cleared.",
                        })
                      }}
                      disabled={recentSearches.length === 0}
                    >
                      Clear Recent Searches
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Active filters summary */}
          {(activeFilters.query || countActiveFilters() > 0) && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Active Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2">
                  {activeFilters.query && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Query</p>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {activeFilters.query}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            setSearchFilters({ ...searchFilters, query: "" })
                            setActiveFilters({ ...activeFilters, query: "" })
                            performSearch({ ...activeFilters, query: "" })
                          }}
                        />
                      </Badge>
                    </div>
                  )}
                  {activeFilters.gender.length > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Gender</p>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {activeFilters.gender.map((gender) => (
                          <Badge key={gender} variant="outline" className="flex items-center gap-1">
                            {gender}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => {
                                const newGender = activeFilters.gender.filter((g) => g !== gender)
                                setSearchFilters({ ...searchFilters, gender: newGender })
                                setActiveFilters({ ...activeFilters, gender: newGender })
                                performSearch({ ...activeFilters, gender: newGender })
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {(activeFilters.ageRange[0] > 0 || activeFilters.ageRange[1] < 100) && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Age Range</p>
                      <Badge variant="outline">
                        {activeFilters.ageRange[0]} - {activeFilters.ageRange[1]} years
                      </Badge>
                    </div>
                  )}
                  {/* Display other active filters similarly */}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredPatients.length} {filteredPatients.length === 1 ? "result" : "results"} found
            </p>
            <div className="flex items-center gap-2">
              <select
                className="text-sm border rounded-md px-2 py-1"
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="id-asc">ID (Ascending)</option>
                <option value="id-desc">ID (Descending)</option>
                <option value="age-asc">Age (Youngest first)</option>
                <option value="age-desc">Age (Oldest first)</option>
                <option value="date-desc">Admission Date (Newest)</option>
                <option value="date-asc">Admission Date (Oldest)</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={exportResults}
                disabled={filteredPatients.length === 0}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <Separator />
          <PatientSearchResults patients={filteredPatients} />
        </div>
      </div>
    </div>
  )
}

// Helper function to count filters
function countFilters(filters: SearchFilters): number {
  let count = 0
  if (filters.gender.length > 0) count++
  if (filters.ageRange[0] > 0 || filters.ageRange[1] < 100) count++
  if (filters.bloodType.length > 0) count++
  if (filters.insuranceProvider.length > 0) count++
  if (filters.admissionDateRange[0] || filters.admissionDateRange[1]) count++
  if (filters.department.length > 0) count++
  if (filters.condition.length > 0) count++
  if (filters.status.length > 0) count++
  return count
}

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const timestamp = new Date(date).getTime()
  const diffInSeconds = Math.floor((now.getTime() - timestamp) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} ${days === 1 ? "day" : "days"} ago`
  }
}
