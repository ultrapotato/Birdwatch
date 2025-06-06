"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Trash2 } from "lucide-react"

import { useUserAlerts } from "@/hooks/use-user-alerts"

interface UserAlertsProps {
  userId: string
}

export default function UserAlerts({ userId }: UserAlertsProps) {
  const {
    alerts,
    loading,
    user: loggedInUser,
    deleteAlert,
    toggleAlertActive,
  } = useUserAlerts()

  if (loading) return <div className="text-center py-4">Loading alerts...</div>
  if (!loggedInUser) return <div className="text-center py-4 text-muted-foreground">Please log in to see alerts.</div>
  if (loggedInUser.uid !== userId) {
    return <div className="text-center py-4 text-muted-foreground">Viewing other users’ alerts is not supported.</div>
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No alerts set up yet.</p>
        <Button className="bg-green-600 hover:bg-green-700" asChild>
          <Link href="/alerts"><Bell className="mr-2 h-4 w-4" /> Set Up Alerts</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {alerts.map((alert) => (
        <Card key={alert.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{alert.speciesName || "Any bird"}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
                onClick={() => deleteAlert(alert.id!)}
                disabled={loggedInUser.uid !== userId}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-muted-foreground">{alert.location ? `Location: ${alert.location}` : "Any location"}</p>
              <p className="text-sm text-muted-foreground">
                Notification:{" "}
                {alert.notificationType === "email" ? "Email" :
                 alert.notificationType === "push" ? "Push notification" :
                 "In-app"}
              </p>
              <div className="flex items-center justify-between">
                <Label htmlFor={`active-${alert.id}`} className="text-sm">Active</Label>
                <Switch
                  id={`active-${alert.id}`}
                  checked={alert.active}
                  onCheckedChange={() => toggleAlertActive(alert.id!, alert.active)}
                  disabled={loggedInUser.uid !== userId}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
