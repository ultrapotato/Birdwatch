// This is a mock API service for forum threads with hardcoded data

// Get all forum threads
export const getForumThreads = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      title: "Help identifying this small brown bird",
      preview:
        "I saw a small brown bird with a spotted chest in my backyard. It was about the size of a sparrow but had a longer tail. Any ideas what it could be?",
      author: "BirdNewbie",
      tags: ["identification", "backyard", "sparrow"],
      replies: 12,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Best binoculars for beginners?",
      preview:
        "I'm new to bird watching and looking to buy my first pair of binoculars. Any recommendations for a good pair under $200?",
      author: "StartingOut",
      tags: ["equipment", "binoculars", "beginner"],
      replies: 8,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: "3",
      title: "Migration patterns of the Arctic Tern",
      preview:
        "I'm doing research on the migration patterns of the Arctic Tern. Does anyone have any resources or personal observations to share?",
      author: "MigrationExpert",
      tags: ["migration", "arctic-tern", "research"],
      replies: 5,
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
    {
      id: "4",
      title: "Strange behavior in Blue Jays",
      preview:
        "I've noticed the Blue Jays in my area gathering in large groups and making unusual calls. Is this normal behavior for this time of year?",
      author: "CuriousBirder",
      tags: ["behavior", "blue-jay", "observation"],
      replies: 15,
      createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    },
  ]
}

// Get user threads
export const getUserThreads = async (userId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "5",
      title: "Spotted a rare Painted Bunting!",
      preview:
        "I was lucky enough to spot a male Painted Bunting in my garden yesterday. Has anyone else seen these colorful birds in the area?",
      tags: ["rare-sighting", "painted-bunting", "colorful"],
      replies: 7,
      createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    },
    {
      id: "6",
      title: "Tips for photographing birds in flight?",
      preview:
        "I'm struggling to get clear photos of birds in flight. What camera settings and techniques do you recommend for capturing birds on the wing?",
      tags: ["photography", "technique", "flight"],
      replies: 10,
      createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    },
  ]
}
