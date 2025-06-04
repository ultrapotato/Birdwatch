"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Plus, Trash2 } from "lucide-react"
import { getUserAlerts, createAlert, deleteAlert } from "@/lib/api/alerts"
import { useToast } from "@/hooks/use-toast"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function AlertsPage() {
  // Hardcoded user for demonstration
  const { user, userLoading } = useFirebase()

  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState<any[]>([])
  const [newAlertSpecies, setNewAlertSpecies] = useState("")
  const [newAlertLocation, setNewAlertLocation] = useState("")
  const [newAlertNotificationType, setNewAlertNotificationType] = useState("email")
  const [isCreatingAlert, setIsCreatingAlert] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!user) return

    const fetchAlerts = async () => {
      try {
        const userAlerts = await getUserAlerts(user.uid)
        setAlerts(userAlerts)
      } catch (error) {
        console.error("Error fetching alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [user?.uid])

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreatingAlert(true)

    try {
      if (!user) return
      const newAlert = {
        userId: user.uid,
        species: newAlertSpecies,
        location: newAlertLocation,
        notificationType: newAlertNotificationType,
        active: true,
        createdAt: new Date().toISOString(),
      }

      const result = await createAlert(newAlert)

      // Add to local state
      setAlerts([...alerts, { ...newAlert, id: result.id }])

      toast({
        title: "Alert created",
        description: "You will be notified when this bird is spotted.",
      })

      setNewAlertSpecies("")
      setNewAlertLocation("")
      setNewAlertNotificationType("email")
    } catch (error: any) {
      toast({
        title: "Error creating alert",
        description: error.message || "Failed to create alert",
        variant: "destructive",
      })
    } finally {
      setIsCreatingAlert(false)
    }
  }

  const handleDeleteAlert = async (alertId: string) => {
    try {
      await deleteAlert(alertId)

      // Update local state
      setAlerts(alerts.filter((alert) => alert.id !== alertId))

      toast({
        title: "Alert deleted",
        description: "The alert has been removed from your account.",
      })
    } catch (error: any) {
      toast({
        title: "Error deleting alert",
        description: error.message || "Failed to delete alert",
        variant: "destructive",
      })
    }
  }

  if (userLoading) {
    return <div>Loading user info...</div>
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Bird Alerts</h1>
          <Bell className="h-6 w-6 text-green-600" />
        </div>

        <p className="text-muted-foreground mb-8">
          Set up alerts to be notified when specific birds are spotted in your area.
        </p>

        {!user ? (
          <div className="text-center py-10 text-muted-foreground">
            Please {" "}
            <a href="/login" className="text-green-600 hover:underline">
              sign in
            </a>{" "} to manage your alerts.
          </div>
        ) : (

          <Tabs defaultValue="myAlerts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="myAlerts">My Alerts</TabsTrigger>
              <TabsTrigger value="createAlert">Create Alert</TabsTrigger>
            </TabsList>

            <TabsContent value="myAlerts" className="space-y-4">

              {loading ? (
                <div className="text-center py-4">Loading your alerts...</div>
              ) : alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  You don&apos;t have any alerts set up yet. Create one to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <Card key={alert.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{alert.species || "Any bird"}</CardTitle>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteAlert(alert.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <CardDescription>
                          {alert.location ? `Location: ${alert.location}` : "Any location"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            Notification: {alert.notificationType === "email" ? "Email" : "Push notification"}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`active-${alert.id}`} className="text-sm">
                              Active
                            </Label>
                            <Switch id={`active-${alert.id}`} checked={alert.active} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="createAlert">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Alert</CardTitle>
                  <CardDescription>Set up an alert to be notified when a specific bird is spotted.</CardDescription>
                </CardHeader>
                <form onSubmit={handleCreateAlert}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="species">Bird Species</Label>
                      <Input
                        id="species"
                        placeholder="e.g., American Robin (leave empty for any bird)"
                        value={newAlertSpecies}
                        onChange={(e) => setNewAlertSpecies(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Central Park, New York (leave empty for any location)"
                        value={newAlertLocation}
                        onChange={(e) => setNewAlertLocation(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notificationType">Notification Type</Label>
                      <Select value={newAlertNotificationType} onValueChange={setNewAlertNotificationType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="push">Push Notification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isCreatingAlert}>
                      {isCreatingAlert ? (
                        "Creating Alert..."
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Alert
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
