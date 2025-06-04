// This is a mock API service for bird alerts with hardcoded data

// Get user alerts
export const getUserAlerts = async (userId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      userId: "user123",
      species: "Bald Eagle",
      location: "Within 50 miles of Seattle",
      notificationType: "email",
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "user123",
      species: "Painted Bunting",
      location: "",
      notificationType: "push",
      active: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: "3",
      userId: "user123",
      species: "",
      location: "Central Park, New York",
      notificationType: "email",
      active: false,
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
  ]
}

// Create a new alert
export const createAlert = async (alertData: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("Creating alert:", alertData)

  // Return a mock response
  return { id: "new-alert-" + Date.now() }
}

// Update an alert
export const updateAlert = async (alertId: string, updateData: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log("Updating alert:", alertId, updateData)

  // Return a mock response
  return { success: true }
}

// Delete an alert
export const deleteAlert = async (alertId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log("Deleting alert:", alertId)

  // Return a mock response
  return { success: true }
}
