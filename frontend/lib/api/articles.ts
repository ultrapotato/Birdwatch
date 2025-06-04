// This is a mock API service for articles with hardcoded data

// Get all articles
export const getArticles = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      title: "The Fascinating World of Hummingbirds",
      excerpt:
        "Discover the incredible adaptations and behaviors of these tiny aerial acrobats that can hover in mid-air and fly backwards.",
      author: "Dr. Avian Expert",
      imageUrl: "/placeholder.svg?height=300&width=400&query=colorful hummingbird feeding",
      tags: ["hummingbirds", "adaptation", "flight"],
      publishedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Backyard Bird Feeding: A Complete Guide",
      excerpt:
        "Learn how to attract a variety of birds to your backyard with the right feeders, food, and habitat features.",
      author: "Garden Birder",
      imageUrl: "/placeholder.svg?height=300&width=400&query=bird feeder with multiple birds",
      tags: ["backyard", "feeding", "habitat"],
      publishedAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    },
    {
      id: "3",
      title: "The Incredible Migration of the Arctic Tern",
      excerpt:
        "Follow the journey of the Arctic Tern as it completes the longest migration of any animal, flying from the Arctic to the Antarctic and back each year.",
      author: "Migration Researcher",
      imageUrl: "/placeholder.svg?height=300&width=400&query=arctic tern in flight",
      tags: ["migration", "arctic-tern", "journey"],
      publishedAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
    },
  ]
}
