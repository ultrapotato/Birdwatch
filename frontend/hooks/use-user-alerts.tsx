"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import * as frontendApiAlerts from "@/lib/frontend-api/alerts"
import type { UserAlert } from "@/lib/models/alert.models"

export function useUserAlerts() {
  const { user, userLoading } = useFirebase()
  const { toast } = useToast()

  const [alerts, setAlerts] = useState<UserAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreatingAlert, setIsCreatingAlert] = useState(false)

  const fetchAlerts = async () => {
    if (!user) return
    setLoading(true)
    try {
      const data = await frontendApiAlerts.getUserAlerts()
      setAlerts(data)
    } catch (error: any) {
      toast({
        title: "Error fetching alerts",
        description: error.message || "Could not load alerts.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createAlert = async (alert: Partial<UserAlert>) => {
    if (!user) return
    setIsCreatingAlert(true)
    try {
      const newAlert = await frontendApiAlerts.createAlert(alert)
      setAlerts((prev) => [newAlert, ...prev])
      toast({ title: "Alert created", description: "You'll be notified when this bird is spotted." })
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

  const deleteAlert = async (alertId: string) => {
    try {
      await frontendApiAlerts.deleteAlert(alertId)
      setAlerts((prev) => prev.filter((a) => a.id !== alertId))
      toast({ title: "Alert deleted", description: "The alert has been removed." })
    } catch (error: any) {
      toast({
        title: "Error deleting alert",
        description: error.message || "Failed to delete alert",
        variant: "destructive",
      })
    }
  }

  const toggleAlertActive = async (alertId: string, currentStatus: boolean) => {
    try {
      const updated = await frontendApiAlerts.updateAlert(alertId, { active: !currentStatus })
      setAlerts((prev) => prev.map((a) => (a.id === alertId ? updated : a)))
      toast({ title: `Alert ${updated.active ? "activated" : "deactivated"}` })
    } catch (error: any) {
      toast({
        title: "Error updating alert",
        description: error.message || "Failed to update alert.",
        variant: "destructive",
      })
    }
  }

  const addAlertToList = (newAlert: UserAlert) => {
    setAlerts((prev) => [newAlert, ...prev])
  }

  useEffect(() => {
    if (user && !userLoading) fetchAlerts()
    else if (!userLoading) {
      setAlerts([])
      setLoading(false)
    }
  }, [user, userLoading])

  return {
    alerts,
    loading,
    isCreatingAlert,
    user,
    userLoading,
    fetchAlerts,
    createAlert,
    deleteAlert,
    toggleAlertActive,
    addAlertToList,
  }
}
