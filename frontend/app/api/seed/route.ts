import { NextResponse } from "next/server"
import { firestoreAdmin } from "@/lib/firebase/firebase-admin"
import type { BirdSighting, BirdSpecies } from "@/lib/models/bird.models"
import type { Article } from "@/lib/models/article.models"
import type { UserAlert } from "@/lib/models/alert.models"

async function clearCollection(collectionName: string) {
  const colRef = firestoreAdmin!.collection(collectionName)
  const snapshot = await colRef.get()

  const deleteBatch = firestoreAdmin!.batch()
  snapshot.docs.forEach(doc => deleteBatch.delete(doc.ref))
  await deleteBatch.commit()
}

export async function POST() {
  if (!firestoreAdmin) {
    return NextResponse.json({ error: "Firestore Admin is not initialized. Cannot seed data." }, { status: 500 })
  }

  try {
    await clearCollection("birdSpecies")
    await clearCollection("sightings")
    await clearCollection("articles")
    await clearCollection("alerts")

    const batch = firestoreAdmin.batch()

    // Seed Bird Species
    const speciesData: Omit<BirdSpecies, "id">[] = [
      {
        speciesName: "Northern Cardinal",
        scientificName: "Cardinalis cardinalis",
        description: "A bright red songbird known for its crest and beautiful singing.",
        habitat: "Woodlands, gardens",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Northern_Cardinal_Male-27527-2.jpg/800px-Northern_Cardinal_Male-27527-2.jpg",
        tags: ["red", "songbird"],
        taxonomy: "Passeriformes",
        flightPattern: "Undulating"
      },
      {
        speciesName: "Blue Jay",
        scientificName: "Cyanocitta cristata",
        description: "A noisy and intelligent bird, recognized by its blue feathers and loud calls.",
        habitat: "Forests, suburban areas",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Cyanocitta-cristata-004.jpg/800px-Cyanocitta-cristata-004.jpg",
        tags: ["blue", "corvid"],
        taxonomy: "Passeriformes",
        flightPattern: "Flap-and-glide"
      },
      {
        speciesName: "American Goldfinch",
        scientificName: "Spinus tristis",
        description: "A small, bright yellow finch often seen flitting among thistles.",
        habitat: "Open fields, gardens",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/American_Goldfinch_yellowbird.jpg/800px-American_Goldfinch_yellowbird.jpg",
        tags: ["yellow", "finch"],
        taxonomy: "Passeriformes",
        flightPattern: "Bouncing"
      },
      {
        speciesName: "Downy Woodpecker",
        scientificName: "Dryobates pubescens",
        description: "North America's smallest woodpecker, often seen tapping tree trunks.",
        habitat: "Forests, urban trees",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Downy_Woodpecker_male_001.jpg/800px-Downy_Woodpecker_male_001.jpg",
        tags: ["black-and-white", "woodpecker"],
        taxonomy: "Piciformes",
        flightPattern: "Undulating"
      },
      {
        speciesName: "Barn Owl",
        scientificName: "Tyto alba",
        description: "A ghostly owl with a heart-shaped face, known for silent flight.",
        habitat: "Barns, open country",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Tyto_alba_-British_Wildlife_Centre%2C_Surrey%2C_England-8a_%281%29.jpg/800px-Tyto_alba_-British_Wildlife_Centre%2C_Surrey%2C_England-8a_%281%29.jpg",
        tags: ["nocturnal", "owl"],
        taxonomy: "Strigiformes",
        flightPattern: "Silent and steady"
      },
      {
        speciesName: "American Robin",
        scientificName: "Turdus migratorius",
        description: "Familiar gray-brown bird with an orange breast, a sign of spring.",
        habitat: "Lawns, woodlands",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/American_robin.jpg/800px-American_robin.jpg",
        tags: ["common", "thrush"],
        taxonomy: "Passeriformes",
        flightPattern: "Direct and steady"
      },
      {
        speciesName: "Mourning Dove",
        scientificName: "Zenaida macroura",
        description: "Soft cooing bird with a long tail and gentle appearance.",
        habitat: "Open country, towns",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mourning_Dove_-_Nashua_NH.jpg/800px-Mourning_Dove_-_Nashua_NH.jpg",
        tags: ["gray", "dove"],
        taxonomy: "Columbiformes",
        flightPattern: "Powerful and fast"
      },
      {
        speciesName: "Eastern Bluebird",
        scientificName: "Sialia sialis",
        description: "Brilliant blue and rusty orange bird of open fields and fence lines.",
        habitat: "Fields, orchards",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Eastern_Bluebird.jpg/800px-Eastern_Bluebird.jpg",
        tags: ["blue", "songbird"],
        taxonomy: "Passeriformes",
        flightPattern: "Swift and direct"
      },
      {
        speciesName: "Black-capped Chickadee",
        scientificName: "Poecile atricapillus",
        description: "Friendly and curious small bird with a distinctive black cap.",
        habitat: "Forests, suburban areas",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Black-capped_Chickadee_1.jpg/800px-Black-capped_Chickadee_1.jpg",
        tags: ["black and white", "small"],
        taxonomy: "Passeriformes",
        flightPattern: "Flitting"
      },
      {
        speciesName: "Red-tailed Hawk",
        scientificName: "Buteo jamaicensis",
        description: "Large hawk with a distinctive red tail and piercing scream.",
        habitat: "Open country, woodlands",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Red-tailed_Hawk_Buteo_jamaicensis_Full_Body_1880px.jpg/800px-Red-tailed_Hawk_Buteo_jamaicensis_Full_Body_1880px.jpg",
        tags: ["raptor", "large"],
        taxonomy: "Accipitriformes",
        flightPattern: "Soaring"
      },
      {
        speciesName: "Ruby-throated Hummingbird",
        scientificName: "Archilochus colubris",
        description: "Tiny iridescent bird known for its rapid wing beats and hovering.",
        habitat: "Gardens, forests",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ruby-throated_Hummingbird_-_male.jpg/800px-Ruby-throated_Hummingbird_-_male.jpg",
        tags: ["hummingbird", "tiny"],
        taxonomy: "Apodiformes",
        flightPattern: "Hovering"
      },
      {
        speciesName: "Great Egret",
        scientificName: "Ardea alba",
        description: "Elegant white wading bird with long legs and neck.",
        habitat: "Wetlands, shores",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Great_Egret_%28Ardea_alba%29.jpg/800px-Great_Egret_%28Ardea_alba%29.jpg",
        tags: ["wading bird", "white"],
        taxonomy: "Pelecaniformes",
        flightPattern: "Gliding"
      },
      {
        speciesName: "Peregrine Falcon",
        scientificName: "Falco peregrinus",
        description: "Fastest bird in the world, a powerful raptor with a fierce dive.",
        habitat: "Cliffs, cities",
        conservationStatus: "Least Concern",
        defaultImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Falco_peregrinus_good_-_Christopher_Watson.jpg/800px-Falco_peregrinus_good_-_Christopher_Watson.jpg",
        tags: ["falcon", "fast"],
        taxonomy: "Falconiformes",
        flightPattern: "High-speed dives"
      }
    ]

    const speciesCol = firestoreAdmin.collection("birdSpecies")
    for (const species of speciesData) {
      const docRef = speciesCol.doc() // Auto-generate ID
      batch.set(docRef, species)
    }

    // Seed Sightings
    const sightingsData: Omit<BirdSighting, "id" | "createdAt" | "likesCount">[] = [
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Northern Cardinal",
        location: "Central Park, New York",
        date: "2024-05-01",
        time: "08:30",
        description: "Vibrant male cardinal singing.",
        images: [
          {
            id: "img1",
            url: "https://images.unsplash.com/photo-1624143770488-9ef41e7edba2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0"
          }
        ],
        tags: ["red", "songbird"],
        behavior: "Singing",
        taxonomy: "Passeriformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "American Goldfinch",
        location: "Millennium Park, Chicago",
        date: "2024-04-12",
        time: "10:45",
        description: "Group of goldfinches flitting between sunflowers.",
        images: [
          {
            id: "img2",
            url: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=3000"
          }
        ],
        tags: ["yellow", "flock"],
        behavior: "Feeding",
        taxonomy: "Passeriformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Blue Jay",
        location: "Golden Gate Park, San Francisco",
        date: "2024-03-19",
        time: "09:10",
        description: "Loud calls from a high pine branch.",
        images: [
          {
            id: "img3",
            url: "https://images.unsplash.com/photo-1630186617564-9317a3b4ca32?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["blue", "noisy"],
        behavior: "Calling",
        taxonomy: "Passeriformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Red-tailed Hawk",
        location: "Prairie Restoration Site, Illinois",
        date: "2024-05-10",
        time: "14:00",
        description: "Soaring above the tallgrass.",
        images: [
          {
            id: "img4",
            url: "https://images.unsplash.com/photo-1620589919644-5dca17e6d039?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["raptor", "soaring"],
        behavior: "Gliding",
        taxonomy: "Accipitriformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Pileated Woodpecker",
        location: "Suburban backyard, Texas",
        date: "2024-02-28",
        time: "11:15",
        description: "Drumming on a wooden pole.",
        images: [
          {
            id: "img5",
            url: "https://images.unsplash.com/photo-1620588280287-ebb81815191e?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["woodpecker", "drumming"],
        behavior: "Foraging",
        taxonomy: "Piciformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Barn Owl",
        location: "Barn field, Kentucky",
        date: "2024-01-12",
        time: "19:45",
        description: "Silent flight just before dusk.",
        images: [
          {
            id: "img6",
            url: "https://images.unsplash.com/photo-1637793492728-0cb7af658e69?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["owl", "nocturnal"],
        behavior: "Hunting",
        taxonomy: "Strigiformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "American Robin",
        location: "Brooklyn Botanic Garden, New York",
        date: "2024-04-21",
        time: "07:20",
        description: "Robin hopping across the lawn in search of worms.",
        images: [
          {
            id: "img7",
            url: "https://images.unsplash.com/photo-1629960148257-92f1d47027ad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["ground", "insectivore"],
        behavior: "Foraging",
        taxonomy: "Passeriformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Great Blue Heron",
        location: "Everglades National Park, Florida",
        date: "2024-03-30",
        time: "15:00",
        description: "Wading slowly through shallow waters.",
        images: [
          {
            id: "img8",
            url: "https://images.unsplash.com/photo-1594329500058-491f207b0769?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["wetland", "wading"],
        behavior: "Hunting",
        taxonomy: "Pelecaniformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Eastern Bluebird",
        location: "Appalachian Trail, Pennsylvania",
        date: "2024-04-03",
        time: "09:40",
        description: "Perched on a branch singing intermittently.",
        images: [
          {
            id: "img9",
            url: "https://images.unsplash.com/photo-1624812039512-bd428d690ea4?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["blue", "open-field"],
        behavior: "Perching",
        taxonomy: "Passeriformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Snowy Owl",
        location: "Barrow, Alaska",
        date: "2024-02-05",
        time: "12:00",
        description: "Perched on a snow mound scanning the tundra.",
        images: [
          {
            id: "img10",
            url: "https://plus.unsplash.com/premium_photo-1698525821429-632fc2799ae7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["white", "arctic"],
        behavior: "Watching",
        taxonomy: "Strigiformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Bald Eagle",
        location: "Lake Coeur d'Alene, Idaho",
        date: "2024-01-18",
        time: "13:30",
        description: "Soaring above the lake, spotted a fish.",
        images: [
          {
            id: "img11",
            url: "https://images.unsplash.com/photo-1474511019749-26a5a4b632b2?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["national bird", "fishing"],
        behavior: "Soaring",
        taxonomy: "Accipitriformes"
      },
      {
        userId: "da8Sx7SuFdXL6FTJBJzcxUH6YY52",
        userName: "John Doe",
        speciesName: "Common Loon",
        location: "Boundary Waters, Minnesota",
        date: "2024-06-01",
        time: "06:45",
        description: "Echoing calls from the misty lake.",
        images: [
          {
            id: "img12",
            url: "https://images.unsplash.com/photo-1599227294320-6de91c96396d?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        ],
        tags: ["lake", "call"],
        behavior: "Calling",
        taxonomy: "Gaviiformes"
      }
    ]

    const sightingsCol = firestoreAdmin.collection("sightings")
    for (const sighting of sightingsData) {
      const docRef = sightingsCol.doc()
      batch.set(docRef, { ...sighting, createdAt: new Date().toISOString(), likesCount: Math.floor(Math.random() * 50) })
      console.log({ ...sighting, createdAt: new Date().toISOString(), likesCount: Math.floor(Math.random() * 50) })
    }

    // Seed Articles
    const articlesData: Omit<Article, "id" | "createdAt" | "publishedAt">[] = [
      {
        title: "The Fascinating World of Hummingbirds",
        excerpt: "Discover these tiny aerial acrobats...",
        content: "Full content here...",
        authorId: "seedAuthor1",
        authorName: "Dr. Avian Expert",
        tags: ["hummingbirds", "flight"],
        imageUrl: "https://images.unsplash.com/photo-1635604133914-e68aa11e99a5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0",
        isFeatured: true
      },
      {
        title: "Backyard Bird Feeding: A Guide",
        excerpt: "Attract birds to your backyard...",
        content: "Full content here...",
        authorId: "seedAuthor2",
        authorName: "Garden Birder",
        tags: ["backyard", "feeding"],
        imageUrl: "https://images.unsplash.com/photo-1524675784525-96b2219b588a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0"
      },
      {
        title: "Migration Patterns of Arctic Terns",
        excerpt: "Explore the epic journeys of Arctic terns...",
        content: "Full content here...",
        authorId: "seedAuthor3",
        authorName: "Migration Maven",
        tags: ["migration", "arctic"],
        imageUrl: "https://images.unsplash.com/photo-1704303666797-82b42f5b05a1?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Why Woodpeckers Don't Get Headaches",
        excerpt: "A fascinating look into woodpecker biology...",
        content: "Full content here...",
        authorId: "seedAuthor4",
        authorName: "Dr. Peck",
        tags: ["woodpeckers", "anatomy"],
        imageUrl: "https://images.unsplash.com/photo-1615018160530-d37d31520d87?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Top 10 Birding Hotspots in the US",
        excerpt: "Plan your next birding adventure...",
        content: "Full content here...",
        authorId: "seedAuthor5",
        authorName: "Traveling Twitcher",
        tags: ["travel", "hotspots"],
        imageUrl: "https://images.unsplash.com/photo-1560951750-1e85780f946b?q=80&w=3082&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Understanding Bird Songs and Calls",
        excerpt: "Bird vocalizations are more than just noise...",
        content: "Full content here...",
        authorId: "seedAuthor6",
        authorName: "Field Recorder",
        tags: ["calls", "songs"],
        imageUrl: "https://images.unsplash.com/photo-1639573089707-15289b7dcddb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Climate Change and Bird Migration",
        excerpt: "How shifting seasons affect bird routes...",
        content: "Full content here...",
        authorId: "seedAuthor7",
        authorName: "Eco Analyst",
        tags: ["climate", "migration"],
        imageUrl: "https://images.unsplash.com/photo-1605687709136-16660905a874?q=80&w=2886&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Bird Photography Tips for Beginners",
        excerpt: "Capture stunning avian moments...",
        content: "Full content here...",
        authorId: "seedAuthor8",
        authorName: "ShutterBirder",
        tags: ["photography", "beginner"],
        imageUrl: "https://images.unsplash.com/photo-1611007629878-d51d711e9d14?q=80&w=2722&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Feeding Birds Without Harming Them",
        excerpt: "The do's and don'ts of bird feeding...",
        content: "Full content here...",
        authorId: "seedAuthor9",
        authorName: "Conscious Feeder",
        tags: ["feeding", "health"],
        imageUrl: "https://images.unsplash.com/photo-1524675784525-96b2219b588a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "Nesting Behavior of Songbirds",
        excerpt: "Peek into the nesting rituals of common songbirds...",
        content: "Full content here...",
        authorId: "seedAuthor10",
        authorName: "Nest Watcher",
        tags: ["nesting", "songbirds"],
        imageUrl: "https://images.unsplash.com/photo-1667375381766-aff0289f9374?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "The Comeback of Bald Eagles",
        excerpt: "A conservation success story...",
        content: "Full content here...",
        authorId: "seedAuthor11",
        authorName: "Raptor Reporter",
        tags: ["eagles", "conservation"],
        imageUrl: "https://images.unsplash.com/photo-1575350126138-9259890f965a?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "What to Pack for a Birding Trip",
        excerpt: "Your essential birdwatching gear checklist...",
        content: "Full content here...",
        authorId: "seedAuthor12",
        authorName: "Gear Up Guide",
        tags: ["gear", "birding"],
        imageUrl: "https://images.unsplash.com/photo-1519462746248-f6d189ee340c?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ]

    const articlesCol = firestoreAdmin.collection("articles")
    for (const article of articlesData) {
      const docRef = articlesCol.doc()
      batch.set(docRef, {
        ...article, createdAt: new Date().toISOString()
        , publishedAt: new Date().toISOString()
      })
    }

    // Seed Alerts
    const alertsData: Omit<UserAlert, "id" | "createdAt">[] = [
      {
        userId: "seedUser1",
        speciesName: "Northern Cardinal",
        location: "Central Park, New York",
        radius: 2,
        notificationType: "email",
        active: true,
        lastTriggeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        userId: "seedUser2",
        speciesName: "Blue Jay",
        location: "Golden Gate Park, San Francisco",
        radius: 5,
        notificationType: "push",
        active: false,
        lastTriggeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      },
      {
        userId: "seedUser1",
        location: "Prospect Park, Brooklyn",
        radius: 1.5,
        notificationType: "in-app",
        active: true,
        lastTriggeredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 day ago
      },
    ]
    const alertsCol = firestoreAdmin.collection("alerts")
    for (const alert of alertsData) {
      const docRef = alertsCol.doc()
      batch.set(docRef, {
        ...alert,
        createdAt: new Date().toISOString(),
      })
    }

    await batch.commit()
    return NextResponse.json({ message: "Database seeded successfully" })

  } catch (error: any) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database", details: error.message }, { status: 500 })
  }


}
