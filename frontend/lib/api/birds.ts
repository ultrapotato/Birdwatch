// This is a mock API service for bird sightings with hardcoded data

// Create a new bird sighting
export const createBirdSighting = async (sightingData: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("Creating bird sighting:", sightingData)

  // Return a mock response
  return { id: "new-sighting-" + Date.now() }
}

// Get featured birds
export const getFeaturedBirds = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return (await getAllBirds()).slice(0,3)
}

// Get recent sightings
export const getRecentSightings = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return (await getAllBirds()).slice(3,6)

}

// Get user sightings
export const getUserSightings = async (userId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "7",
      species: "Eastern Bluebird",
      location: "Backyard, Suburban Area",
      description: "Beautiful bluebird visiting my bird feeder. Stayed for about 10 minutes.",
      date: "2023-05-15",
      time: "08:30",
      tags: ["blue", "songbird", "backyard"],
      createdAt: new Date().toISOString(),
    },
    {
      id: "8",
      species: "Red-tailed Hawk",
      location: "Highway 101, California",
      description: "Large hawk perched on a roadside pole. Was scanning the fields for prey.",
      date: "2023-05-10",
      time: "14:15",
      tags: ["raptor", "predator", "common"],
      createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    },
  ]
}

// Search birds
export const searchBirds = async (searchParams: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("Search params:", searchParams)

  // Mock search results
  return [
    {
      id: "9",
      species: "Yellow Warbler",
      location: "Everglades National Park, Florida",
      description: "Bright yellow warbler hopping between branches. Very active and vocal.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=yellow warbler",
      tags: ["yellow", "warbler", "migratory"],
      createdAt: new Date().toISOString(),
    },
    {
      id: "10",
      species: "Pileated Woodpecker",
      location: "Redwood Forest, California",
      description: "Large woodpecker drumming on a dead tree. The sound echoed through the forest.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=pileated woodpecker",
      tags: ["woodpecker", "forest", "loud"],
      createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    },
  ]
}


export const getCommonBirds = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: "1",
      name: "Northern Cardinal",
      description: "Bright red bird with a crest and black face. Females are brownish with red accents.",
      habitat: "Woodlands, gardens, shrubby areas",
      difficulty: "Easy",
      imageUrl: "/placeholder.svg?height=200&width=200&query=northern cardinal",
    },
    {
      id: "2",
      name: "American Robin",
      description: "Gray-brown bird with a reddish-orange breast and yellow bill.",
      habitat: "Lawns, parks, woodlands",
      difficulty: "Easy",
      imageUrl: "/placeholder.svg?height=200&width=200&query=american robin",
    },
    {
      id: "3",
      name: "Blue Jay",
      description: "Blue bird with white underparts, a blue crest, and black markings.",
      habitat: "Forests, suburban areas with trees",
      difficulty: "Easy",
      imageUrl: "/placeholder.svg?height=200&width=200&query=blue jay",
    },
    {
      id: "4",
      name: "Black-capped Chickadee",
      description: "Small bird with a black cap and bib, white cheeks, and gray back.",
      habitat: "Woodlands, parks, backyards",
      difficulty: "Easy",
      imageUrl: "/placeholder.svg?height=200&width=200&query=black-capped chickadee",
    },
    {
      id: "5",
      name: "American Goldfinch",
      description:
        "Small yellow bird with black wings and forehead (breeding male). Females and winter males are duller.",
      habitat: "Open areas with trees and shrubs, gardens",
      difficulty: "Easy",
      imageUrl: "/placeholder.svg?height=200&width=200&query=american goldfinch",
    },
    {
      id: "6",
      name: "Downy Woodpecker",
      description:
        "Small black and white woodpecker with a white back. Males have a red patch on the back of the head.",
      habitat: "Woodlands, parks, suburban areas with trees",
      difficulty: 'Medium',
      imageUrl: "/placeholder.svg?height=200&width=200&query=downy woodpecker",
    },
  ]
}

export const getNearbyBirds = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [
    {
      id: "1",
      species: "Northern Cardinal",
      location: "Central Park, New York",
      distance: 1.2,
      description: "Bright red male cardinal spotted near the lake. It was singing loudly from a maple tree branch.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=red cardinal bird",
      tags: ["red", "songbird", "common"],
      createdAt: new Date().toISOString(),
      userName: "BirdWatcher123",
    },
    {
      id: "2",
      species: "American Robin",
      location: "Bryant Park, New York",
      distance: 1.8,
      description: "Robin pulling worms from the ground after a spring rain.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=american robin bird",
      tags: ["common", "migratory", "songbird"],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      userName: "RobinFan",
    },
    {
      id: "3",
      species: "Red-tailed Hawk",
      location: "Riverside Park, New York",
      distance: 2.5,
      description: "Hawk perched on a tall tree overlooking the Hudson River. Later seen soaring above the park.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=red-tailed hawk",
      tags: ["raptor", "predator", "common"],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      userName: "HawkSpotter",
    },
    {
      id: "4",
      species: "Yellow Warbler",
      location: "Prospect Park, Brooklyn",
      distance: 5.7,
      description: "Bright yellow warbler hopping between branches. Very active and vocal.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=yellow warbler",
      tags: ["yellow", "warbler", "migratory"],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      userName: "WarblerWatcher",
    },
    {
      id: "5",
      species: "Great Blue Heron",
      location: "Jamaica Bay Wildlife Refuge, Queens",
      distance: 9.3,
      description: "Tall heron wading in shallow water, hunting for fish. Very patient and still.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=great blue heron",
      tags: ["wader", "wetland", "large"],
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      userName: "HeronLover",
    },
    {
      id: "6",
      species: "Black-capped Chickadee",
      location: "Inwood Hill Park, Manhattan",
      distance: 7.1,
      description: "Small chickadee calling and foraging in a mixed flock with titmice and nuthatches.",
      imageUrl: "/placeholder.svg?height=300&width=400&query=black-capped chickadee",
      tags: ["small", "forest", "common"],
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      userName: "ChickadeeFan",
    },
  ]
}

export const getAllBirds = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      species: "Northern Cardinal",
      location: "Central Park, New York",
      description: "Bright red male cardinal spotted near the lake. It was singing loudly from a maple tree branch.",
      imageUrl: "/homepage_images/northern_cardinal_0.avif?height=300&width=400&query=red cardinal bird",
      tags: ["red", "songbird", "common"],
      createdAt: new Date().toISOString(),
      userName: "BirdWatcher123",
    },
    {
      id: "2",
      species: "Blue Jay",
      location: "Golden Gate Park, San Francisco",
      description: "Noisy blue jay gathering acorns. It was very active and seemed to be storing food for winter.",
      imageUrl: "/homepage_images/blue_jay_0.avif?height=300&width=400&query=blue jay bird",
      tags: ["blue", "corvid", "intelligent"],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      userName: "NatureLover",
    },
    {
      id: "3",
      species: "Great Horned Owl",
      location: "Yellowstone National Park",
      description: "Majestic owl spotted at dusk. It was perched on a tall pine tree scanning for prey.",
      imageUrl: "/homepage_images/great_horned_owl_0.avif?height=300&width=400&query=great horned owl",
      tags: ["nocturnal", "predator", "rare"],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      userName: "OwlFan",
    },
    {
      id: "4",
      species: "American Robin",
      location: "Prospect Park, Brooklyn",
      description: "Robin pulling worms from the ground after a spring rain.",
      imageUrl: "/homepage_images/american_robin_0.avif?height=300&width=400&query=american robin bird",
      tags: ["common", "migratory", "songbird"],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      userName: "BrooklynBirder",
    },
    {
      id: "5",
      species: "Bald Eagle",
      location: "Olympic National Park, Washington",
      description: "Magnificent bald eagle soaring over the lake. It eventually swooped down and caught a fish!",
      imageUrl: "/homepage_images/bald_eagle_0.avif?height=300&width=400&query=bald eagle flying",
      tags: ["raptor", "predator", "national-symbol"],
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      userName: "EagleSpotter",
    },
    {
      id: "6",
      species: "Ruby-throated Hummingbird",
      location: "Botanical Gardens, Chicago",
      description: "Tiny hummingbird feeding on red flowers. Its throat gleamed ruby-red in the sunlight.",
      imageUrl: "/homepage_images/ruby_throated_hummingbird_0.avif?height=300&width=400&query=ruby throated hummingbird",
      tags: ["tiny", "fast", "nectar-feeder"],
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      userName: "HummingbirdLover",
    },
    {
      id: "7",
      species: "Mallard Duck",
      location: "Boston Public Garden",
      description:
        "Family of mallards swimming in the pond. The ducklings were following their mother in a perfect line.",
      imageUrl: "/homepage_images/mallard_duck_0.avif?height=300&width=400&query=mallard duck with ducklings",
      tags: ["waterfowl", "common", "family"],
      createdAt: new Date(Date.now() - 518400000).toISOString(),
      userName: "DuckWatcher",
    },
    {
      id: "8",
      species: "Pileated Woodpecker",
      location: "Great Smoky Mountains National Park",
      description: "Large woodpecker drumming on a dead tree. The sound echoed through the forest.",
      imageUrl: "/homepage_images/pileated_woodpecker_0.avif?height=300&width=400&query=pileated woodpecker",
      tags: ["woodpecker", "forest", "loud"],
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      userName: "ForestExplorer",
    },
    {
      id: "9",
      species: "Barn Owl",
      location: "Rural farmland, Iowa",
      description: "Silent hunter looking over fields at night. Its pale face seemed to glow in the moonlight.",
      imageUrl: "/homepage_images/barn_owl_0.avif?height=300&width=400&query=barn owl flying",
      tags: ["nocturnal", "predator", "farm"],
      createdAt: new Date(Date.now() - 691200000).toISOString(),
      userName: "NightBirder",
    },
  ]
}

export const getBirdDetails = async (birdId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: birdId,
    species: "Northern Cardinal",
    scientificName: "Cardinalis cardinalis",
    location: "Central Park, New York",
    coordinates: { lat: 40.7812, lng: -73.9665 },
    date: "2023-05-15",
    time: "08:30",
    description:
      "Bright red male cardinal spotted near the lake. It was singing loudly from a maple tree branch. The cardinal was perched about 10 feet up in a maple tree, occasionally flying down to feed on seeds on the ground. Its vibrant red plumage stood out against the green foliage. I observed it for about 15 minutes before it flew away deeper into the park.",
    habitat: "Woodland edge, parks, suburban gardens",
    behavior: "Foraging for seeds, singing territorial song",
    taxonomy: "Passeriformes (Perching Birds)",
    flightPattern: "Undulating",
    conservationStatus: "Least Concern",
    images: [
      {
        id: "img1",
        url: "/homepage_images/northern_cardinal_0.avif?height=600&width=800&query=male northern cardinal red bird",
        caption: "Male Northern Cardinal perched on a branch",
      },
      {
        id: "img2",
        url: "/homepage_images/northern_cardinal_singing_0.avif?height=600&width=800&query=northern cardinal singing",
        caption: "Cardinal singing its territorial song",
      },
      {
        id: "img3",
        url: "/homepage_images/northern_cardinal_in_maple_tree_0.avif?height=600&width=800&query=northern cardinal in maple tree",
        caption: "Cardinal in maple tree",
      },
    ],
    tags: ["red", "songbird", "common", "territorial", "seed-eater"],
    createdAt: new Date().toISOString(),
    userName: "BirdWatcher123",
    userAvatar: "/placeholder.svg?height=40&width=40&query=bird watcher profile",
    likes: 24,
    bookmarks: 7,
    comments: [
      {
        id: "c1",
        userName: "CardinalFan",
        userAvatar: "/placeholder.svg?height=32&width=32&query=cardinal fan",
        text: "Beautiful sighting! I've seen cardinals in that same area of the park before. They seem to have established territory there.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likes: 3,
      },
      {
        id: "c2",
        userName: "NYCBirder",
        userAvatar: "/placeholder.svg?height=32&width=32&query=nyc birder",
        text: "Great photo! Was this taken near the Ramble? That's a hotspot for cardinals in Central Park.",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        likes: 1,
      },
    ],
  }

}

export const getSimilarBirds = async (birdId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "sb1",
      species: "Scarlet Tanager",
      location: "Prospect Park, Brooklyn",
      description: "Bright red bird with black wings and tail. Very striking appearance!",
      imageUrl: "https://images.unsplash.com/photo-1617995765985-6db24655ad0b?q=80&w=2876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=400&query=scarlet tanager",
      tags: ["red", "songbird", "migratory"],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      userName: "BrooklynBirder",
    },
    {
      id: "sb2",
      species: "Summer Tanager",
      location: "Central Park, New York",
      description: "All-red bird without the black wings of the Scarlet Tanager. Melodious song.",
      imageUrl: "https://images.unsplash.com/photo-1685297553378-094a5b434f62?q=80&w=3079&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=400&query=summer tanager",
      tags: ["red", "songbird", "migratory"],
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      userName: "TanagerLover",
    },
    {
      id: "sb3",
      species: "Pyrrhuloxia",
      location: "Desert Botanical Garden, Phoenix",
      description: "Desert cardinal with gray body and red accents. Distinctive crest like a cardinal.",
      imageUrl: "https://images.unsplash.com/photo-1708894403370-1b78af419e53?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=300&width=400&query=pyrrhuloxia desert cardinal",
      tags: ["desert", "cardinal-like", "southwestern"],
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      userName: "DesertBirder",
    },
  ]
}

export interface BirdImage {
  id: string
  url: string
  caption: string
}

export interface BirdComment {
  id: string
  userName: string
  userAvatar: string
  text: string
  createdAt: string
  likes: number
}

export interface BirdCoordinates {
  lat: number
  lng: number
}

export interface Bird {
  id: string
  species: string
  scientificName: string
  location: string
  coordinates: BirdCoordinates
  date: string
  time: string
  description: string
  habitat: string
  behavior: string
  taxonomy: string
  flightPattern: string
  conservationStatus: string
  images: BirdImage[] | undefined
  tags: string[]
  createdAt: string
  userName: string
  userAvatar: string
  likes: number
  bookmarks: number
  comments: BirdComment[]
}

export interface CommonBird {
  id: string
  name: string
  description: string
  habitat: string
  difficulty: string
  imageUrl: string
}

export interface BirdEntry {
  id: string
  species: string
  location: string
  description: string
  imageUrl: string
  tags: string[]
  createdAt: string 
  userName: string
}
