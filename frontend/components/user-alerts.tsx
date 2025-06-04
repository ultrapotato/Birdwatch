"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { getUserAlerts, updateAlert, deleteAlert } from "@/lib/api/alerts"
import { Bell, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserAlertsProps {
  userId: string
}

export default function UserAlerts({ userId }: UserAlertsProps) {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getUserAlerts(userId)
        setAlerts(data)
      } catch (error) {
        console.error("Error fetching user alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [userId])

  const handleToggleAlert = async (alertId: string, currentStatus: boolean) => {
    try {
      await updateAlert(alertId, { active: !currentStatus })

      // Update local state
      setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, active: !currentStatus } : alert)))

      toast({
        title: `Alert ${!currentStatus ? "activated" : "deactivated"}`,
        description: `You will ${!currentStatus ? "now" : "no longer"} receive notifications for this bird.`,
      })
    } catch (error: any) {
      toast({
        title: "Error updating alert",
        description: error.message,
        variant: "destructive",
      })
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
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading your alerts...</div>
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">You don&apos;t have any alerts set up yet.</p>
        <Button className="bg-green-600 hover:bg-green-700" asChild>
          <Link href="/alerts">
            <Bell className="mr-2 h-4 w-4" />
            Set Up Alerts
          </Link>
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
              <CardTitle className="text-lg">{alert.species || "Any bird"}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
                onClick={() => handleDeleteAlert(alert.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-muted-foreground">
                {alert.location ? `Location: ${alert.location}` : "Any location"}
              </p>
              <p className="text-sm text-muted-foreground">
                Notification: {alert.notificationType === "email" ? "Email" : "Push notification"}
              </p>
              <div className="flex items-center justify-between">
                <Label htmlFor={`active-${alert.id}`} className="text-sm">
                  Active
                </Label>
                <Switch
                  id={`active-${alert.id}`}
                  checked={alert.active}
                  onCheckedChange={() => handleToggleAlert(alert.id, alert.active)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
