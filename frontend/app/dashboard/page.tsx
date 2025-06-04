"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Eye, MessageCircle, Bell } from "lucide-react"
import Link from "next/link"
import UserSightings from "@/components/user-sightings"
import UserAlerts from "@/components/user-alerts"
import UserThreads from "@/components/user-threads"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function DashboardPage() {
  // Hardcoded user for demonstration
  const { user, userLoading } = useFirebase()
  if (!user) {
    if (!userLoading) {
      return <div>Please sign in to see dashboard.</div>
    } else {
      return null
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link href="/birds/new" passHref>
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Report Sighting
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sightings</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Species Spotted</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forum Threads</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sightings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sightings">My Sightings</TabsTrigger>
            <TabsTrigger value="alerts">My Alerts</TabsTrigger>
            <TabsTrigger value="threads">My Threads</TabsTrigger>
          </TabsList>
          <TabsContent value="sightings" className="space-y-4">
            <UserSightings userId={user.uid} />
          </TabsContent>
          <TabsContent value="alerts" className="space-y-4">
            <UserAlerts userId={user.uid} />
          </TabsContent>
          <TabsContent value="threads" className="space-y-4">
            <UserThreads userId={user.uid} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
