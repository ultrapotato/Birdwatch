"use client"

import { useState } from "react"
import { Bell, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as frontendApiAlerts from "@/lib/frontend-api/alerts"
import { useToast } from "@/hooks/use-toast"
import { useUserAlerts } from "@/hooks/use-user-alerts"
import type { UserAlert } from "@/lib/models/alert.models"

export default function AlertsPage() {
  const {
    alerts,
    user,
    loading,
    userLoading,
    deleteAlert,
    toggleAlertActive,
    addAlertToList,
  } = useUserAlerts()

  const { toast } = useToast()

  const [newAlertSpecies, setNewAlertSpecies] = useState("")
  const [newAlertLocation, setNewAlertLocation] = useState("")
  const [newAlertNotificationType, setNewAlertNotificationType] = useState<UserAlert["notificationType"]>("email")
  const [isCreatingAlert, setIsCreatingAlert] = useState(false)

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({ title: "Not Authenticated", description: "Please sign in to create alerts.", variant: "destructive" })
      return
    }
    setIsCreatingAlert(true)

    try {
      const alertDataToCreate: Partial<Omit<UserAlert, "id" | "userId" | "createdAt">> = {
        speciesName: newAlertSpecies || undefined,
        location: newAlertLocation || undefined,
        notificationType: newAlertNotificationType,
        active: true,
      }

      const newAlert = await frontendApiAlerts.createAlert(alertDataToCreate)
      addAlertToList(newAlert)

      toast({ title: "Alert created", description: "You will be notified when this bird is spotted." })

      setNewAlertSpecies("")
      setNewAlertLocation("")
      setNewAlertNotificationType("email")
    } catch (error: any) {
      toast({ title: "Error creating alert", description: error.message || "Failed to create alert", variant: "destructive" })
    } finally {
      setIsCreatingAlert(false)
    }
  }

  if (userLoading || (loading && user)) {
    return <div className="container py-10 text-center">Loading your alerts...</div>
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
            Please <a href="/login" className="text-green-600 hover:underline">sign in</a> to manage your alerts.
          </div>
        ) : (
          <Tabs defaultValue="myAlerts" className="space-y-6">
            <TabsList>
              <TabsTrigger value="myAlerts">My Alerts</TabsTrigger>
              <TabsTrigger value="createAlert">Create Alert</TabsTrigger>
            </TabsList>

            <TabsContent value="myAlerts" className="space-y-4">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  You don&apos;t have any alerts set up yet. Create one to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <Card key={alert.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>{alert.speciesName || "Any bird"}</CardTitle>
                          <Button variant="ghost" size="icon" onClick={() => deleteAlert(alert.id!)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <CardDescription>{alert.location ? `Location: ${alert.location}` : "Any location"}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            Notification:{" "}
                            {alert.notificationType === "email"
                              ? "Email"
                              : alert.notificationType === "push"
                                ? "Push notification"
                                : "In-app"}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`active-${alert.id}`} className="text-sm">Active</Label>
                            <Switch
                              id={`active-${alert.id}`}
                              checked={alert.active}
                              onCheckedChange={() => toggleAlertActive(alert.id!, alert.active)}
                            />
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
                      <Select
                        value={newAlertNotificationType}
                        onValueChange={(value) => setNewAlertNotificationType(value as UserAlert["notificationType"])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="push">Push Notification</SelectItem>
                          <SelectItem value="in-app">In-app Notification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isCreatingAlert}>
                      {isCreatingAlert ? "Creating Alert..." : (<><Plus className="mr-2 h-4 w-4" /> Create Alert</>)}
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
