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
        content: `
## Introduction

Hummingbirds are among the most fascinating creatures in the avian world. Known for their iridescent feathers, rapid wingbeats, and unique hovering ability, these tiny birds captivate birdwatchers and scientists alike.

## Anatomy and Adaptations

One of the most distinctive features of hummingbirds is their **incredible flight capability**. Unlike most birds, hummingbirds can hover in mid-air, fly backwards, and even fly upside down for short bursts. This agility is thanks to their unique ball-and-socket shoulder joints and exceptionally strong pectoral muscles, which make up about 30% of their body weight.

Their wings beat at an astonishing rate—**up to 80 times per second** in some species—creating the characteristic humming sound that gives them their name.

## Feeding Habits

Hummingbirds have a **high metabolism** and must eat frequently throughout the day. They feed on flower nectar using their long, specialized tongues that extend far beyond their beaks. In addition to nectar, they also consume insects and spiders for protein.

To fuel their rapid wingbeats, hummingbirds may visit **1,000–2,000 flowers per day**. They play a crucial role in pollination, transferring pollen from flower to flower as they feed.

## Migration Marvels

Some species of hummingbirds migrate astonishing distances. The Ruby-throated Hummingbird, for example, travels over **2,000 miles** from Central America to North America each year—including a **non-stop 500-mile flight over the Gulf of Mexico**.

Despite their small size (weighing less than a nickel), these birds are tenacious and remarkably efficient navigators.

## Courtship and Behavior

During mating season, male hummingbirds often perform dramatic aerial displays to attract females. These displays may include steep dives, rapid zig-zags, and showing off their brightest plumage in the sunlight.

They are also **highly territorial**, especially around feeding areas. It's not uncommon to see hummingbirds chase each other away from favored flowers or feeders.

## Conservation Status

While many species are thriving, others face threats from **habitat loss, climate change, and pesticides**. Planting native flowering plants, avoiding chemicals in your garden, and putting up hummingbird feeders with a simple sugar-water solution can help support local populations.

## Fun Facts

- There are over **330 species** of hummingbirds, mostly found in the Americas.
- Their heart can beat more than **1,200 times per minute** during intense activity.
- Some can enter a hibernation-like state called **torpor** at night to conserve energy.

## Conclusion

Hummingbirds are more than just a flash of color in your garden. They are **marvels of evolution**, combining beauty, speed, and resilience. Whether you're a casual observer or an avid birder, there's always something new to learn from these incredible birds.
`
        ,
        authorId: "seedAuthor1",
        authorName: "Dr. Avian Expert",
        tags: ["hummingbirds", "flight"],
        imageUrl: "https://images.unsplash.com/photo-1635604133914-e68aa11e99a5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0",
        isFeatured: true
      },
      {
        title: "Backyard Bird Feeding: A Guide",
        excerpt: "Attract birds to your backyard by providing the right food and environment.",
        content: `
## Introduction

Creating a bird-friendly backyard is a rewarding endeavor that supports local wildlife and enhances your outdoor space. By offering the right food, shelter, and water sources, you can attract a variety of bird species to your garden.

## Choosing the Right Feeders

Different bird species have varying feeding habits. To cater to a diverse avian population, consider providing a mix of feeders:

- **Tube Feeders**: Ideal for small songbirds like chickadees and finches.
- **Platform Feeders**: Attract ground-feeding birds such as sparrows and juncos.
- **Suet Feeders**: Provide high-energy food for woodpeckers and nuthatches.

## Selecting the Right Food

Offer a variety of seeds to attract different species:

- **Sunflower Seeds**: Loved by cardinals, finches, and chickadees.
- **Safflower Seeds**: Preferred by cardinals and grosbeaks.
- **Nyjer (Thistle)**: Attracts finches and siskins.
- **Suet**: Provides energy for woodpeckers and nuthatches.

## Creating a Safe Environment

Ensure your backyard is safe for birds by:

- **Placing Feeders Away from Windows**: To prevent collisions.
- **Providing Shelter**: Plant native shrubs and trees for cover.
- **Offering Fresh Water**: Maintain a birdbath with clean water.

## Maintaining Your Feeders

Regular maintenance is crucial:

- **Clean Feeders Weekly**: To prevent mold and disease.
- **Replace Spoiled Food**: Dispose of old or wet seed promptly.

## Conclusion

By following these guidelines, you can create a welcoming environment for birds, providing them with the resources they need to thrive.
  `.trim(),
        authorId: "seedAuthor2",
        authorName: "Garden Birder",
        tags: ["backyard", "feeding"],
        imageUrl: "https://images.unsplash.com/photo-1524675784525-96b2219b588a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0"
      },
      {
        title: "Migration Patterns of Arctic Terns",
        excerpt: "Explore the epic journeys of Arctic terns, the longest migratory birds.",
        content: `
## Introduction

Arctic terns are renowned for their remarkable migration, traveling from their breeding grounds in the Arctic to their wintering areas in the Antarctic—a round-trip journey that can exceed 40,000 kilometers annually.

## Breeding Grounds

During the northern summer, Arctic terns breed in the Arctic regions, including parts of Greenland, Iceland, and northern Canada. They nest on coastal islands, where they lay their eggs on bare ground or gravel.

## Migration Journey

After breeding, Arctic terns embark on their southward migration. They travel along the eastern coast of North America, crossing the Atlantic Ocean to reach the southern hemisphere. Their journey takes them over vast expanses of ocean, where they rely on their exceptional navigational skills to find food and rest.

## Wintering Grounds

In the southern hemisphere, Arctic terns spend their winter months in the waters off the coast of Antarctica. Here, they feed on fish and other marine life, taking advantage of the abundant food supply.

## Return Migration

As the southern summer ends, Arctic terns begin their return journey to the Arctic. They retrace their path across the Atlantic Ocean, arriving back at their breeding grounds in time for the northern spring.

## Conservation Concerns

Despite their impressive migratory abilities, Arctic terns face threats from climate change, habitat loss, and human activities. Conservation efforts are essential to ensure the survival of these extraordinary birds.
  `.trim(),
        authorId: "seedAuthor3",
        authorName: "Migration Maven",
        tags: ["migration", "arctic"],
        imageUrl: "https://images.unsplash.com/photo-1704303666797-82b42f5b05a1?q=80&w=3125&auto=format&fit=crop&ixlib=rb-4.1.0"
      },
      {
        title: "Why Woodpeckers Don't Get Headaches",
        excerpt: "A fascinating look into woodpecker biology and their unique adaptations.",
        content: `
## Introduction

Woodpeckers are known for their distinctive drumming behavior, which involves pecking at tree trunks at high speeds. Despite the intense forces involved, woodpeckers do not suffer from headaches or brain injuries.

## Anatomical Adaptations

Woodpeckers possess several unique anatomical features that protect their brains during drumming:

- **Spongy Skull Bones**: The outer layer of a woodpecker's skull is dense, while the inner layer is spongy, helping to absorb the shock of each peck.
- **Hyoid Bone**: A specialized bone structure that wraps around the skull and helps to stabilize the head during pecking.
- **Shorter, Stiffer Neck Muscles**: These muscles reduce the amount of movement during pecking, minimizing the risk of injury.

## Behavioral Strategies

Woodpeckers also employ specific behaviors to protect themselves:

- **Glancing Blows**: Instead of striking directly, woodpeckers often deliver glancing blows, reducing the impact on their skulls.
- **Rapid Pecking**: By pecking rapidly, woodpeckers minimize the duration of each impact, decreasing the risk of injury.

## Evolutionary Significance

These adaptations have evolved over millions of years, allowing woodpeckers to thrive in their ecological niches. Their ability to drum without injury is a testament to the wonders of evolutionary biology.
  `.trim(),
        authorId: "seedAuthor4",
        authorName: "Dr. Peck",
        tags: ["woodpeckers", "anatomy"],
        imageUrl: "https://images.unsplash.com/photo-1615018160530-d37d31520d87?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.1.0"
      },
      {
        title: "Top 10 Birding Hotspots in the US",
        excerpt: "Plan your next birding adventure by visiting these top locations across the United States.",
        content: `
## Introduction

The United States offers a diverse array of habitats, making it a prime destination for birdwatching enthusiasts. Here are ten of the best birding hotspots in the country:

1. **Point Reyes National Seashore, California**  
Located along the Pacific Flyway, this coastal park is home to over 490 bird species.

2. **Everglades National Park, Florida**  
A unique wetland ecosystem home to herons, egrets, and roseate spoonbills.

3. **Cape May, New Jersey**  
A migration magnet with raptors, warblers, and shorebirds every fall.

4. **Bosque del Apache, New Mexico**  
Thousands of snow geese and sandhill cranes gather here each winter.

5. **Magee Marsh, Ohio**  
Famous for spring warbler migrations right along the boardwalk.

6. **Great Smoky Mountains National Park, Tennessee/North Carolina**  
A haven for breeding songbirds and wood warblers.

7. **Santa Ana National Wildlife Refuge, Texas**  
A mix of tropical species and U.S. rarities.

8. **Klamath Basin, Oregon/California**  
A vital stopover for migrating waterfowl and raptors.

9. **Hawk Mountain Sanctuary, Pennsylvania**  
Premier site for hawk watching in the fall.

10. **Alaska Maritime National Wildlife Refuge, Alaska**  
Covers 2,500 islands and supports millions of seabirds.

## Conclusion

Whether you're chasing warblers in Ohio or seabirds in Alaska, these hotspots offer unforgettable experiences for bird lovers of all levels.
  `.trim(),
        authorId: "seedAuthor5",
        authorName: "Traveling Twitcher",
        tags: ["travel", "hotspots"],
        imageUrl: "https://images.unsplash.com/photo-1560951750-1e85780f946b?q=80&w=3082&auto=format&fit=crop&ixlib=rb-4.1.0"
      },
      {
        title: "Understanding Bird Songs and Calls",
        excerpt: "Bird vocalizations are more than just pleasant sounds — they serve vital purposes in communication and survival.",
        content: `
## Introduction

Birds use songs and calls to communicate a wide variety of messages, from claiming territory to warning of predators. Understanding these vocalizations offers deep insights into avian behavior and ecology.

## Songs vs. Calls

- **Songs**: Typically longer and more complex, used primarily by males during the breeding season to attract mates and defend territory.
- **Calls**: Shorter sounds used year-round for alarms, location signaling, and group cohesion.

## Why Birds Sing

1. **Mating**: Males sing to attract females by demonstrating fitness and territory ownership.
2. **Territorial Defense**: Songs mark a male’s territory and deter rival males.
3. **Species Identification**: Each species has distinct songs and calls, which help birds recognize each other.

## How Birds Learn to Sing

Many songbirds learn their songs from adult tutors during a sensitive learning period. This process resembles human language development, involving:

- **Listening** to adult songs
- **Practicing** through subsong (akin to babbling)
- **Crystallizing** their final song as they mature

## Tools for Birdwatchers

Modern technology has made it easier than ever to identify bird sounds:

- **Apps like Merlin and BirdNET** allow users to record and identify bird calls in real time.
- **Field guides with audio features** help in learning regional variations.

## Conclusion

Bird vocalizations are a fascinating and essential part of avian life. Whether you're a casual birder or an ornithologist, tuning in to their songs opens a whole new dimension of appreciation.
  `.trim(),
        authorId: "seedAuthor6",
        authorName: "Field Recorder",
        tags: ["calls", "songs"],
        imageUrl: "https://images.unsplash.com/photo-1639573089707-15289b7dcddb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0"
      },
      {
        title: "Climate Change and Bird Migration",
        excerpt: "Learn how shifting climates are altering the ancient migratory patterns of birds around the globe.",
        content: `
## Introduction

Climate change is reshaping ecosystems across the planet — and birds are among the most affected. As global temperatures rise, many species are changing when, where, and how they migrate.

## Earlier Migrations

Research shows that many birds are migrating earlier in spring due to warmer temperatures. This shift can lead to mismatches in food availability, especially for species that rely on insect hatches timed to historical climate patterns.

## Range Shifts

- **Northward Expansion**: Species such as the black-capped chickadee are expanding their range northward in search of cooler habitats.
- **High-Altitude Movement**: Mountain species are being pushed to higher elevations where suitable conditions remain.

## Habitat Loss

- **Wetlands Drying**: Migration stopovers like marshes and lakes are drying up, limiting rest and refueling points.
- **Coastal Erosion**: Rising sea levels are eroding nesting grounds for shorebirds.

## Species at Risk

Species with specialized diets, narrow habitat ranges, or long migration routes are particularly vulnerable. The red knot and snowy plover are two such species facing increased pressure.

## Conservation Responses

- **Creating Bird-Friendly Cities**: Green roofs and native landscaping help support urban migrants.
- **International Cooperation**: Migratory birds need protections across borders — from Arctic breeding grounds to tropical wintering habitats.

## Conclusion

Birds are strong indicators of ecological health. Protecting them in the age of climate change means protecting the planet we all share.
  `.trim(),
        authorId: "seedAuthor7",
        authorName: "Eco Analyst",
        tags: ["climate", "migration"],
        imageUrl: "https://images.unsplash.com/photo-1605687709136-16660905a874?q=80&w=2886&auto=format&fit=crop&ixlib=rb-4.1.0"
      },
      {
        title: "Bird Photography Tips for Beginners",
        excerpt: "Learn how to capture stunning bird images with the right techniques and gear.",
        content: `
## Introduction

Bird photography combines patience, skill, and a deep appreciation for nature. For beginners, capturing beautiful bird images can be incredibly rewarding — and a little challenging.

## Essential Gear

1. **Camera**: A DSLR or mirrorless camera with fast autofocus is ideal.
2. **Lens**: A telephoto lens (at least 300mm) lets you shoot from a distance.
3. **Tripod or Monopod**: Stabilizes your shot, especially with heavier gear.

## Finding Birds

- **Start Early**: Birds are most active during the early morning hours.
- **Visit Local Hotspots**: Parks, wetlands, and feeders attract birds regularly.
- **Stay Still**: Patience is key — move slowly and avoid sudden movements.

## Composition Tips

- **Focus on the Eye**: A sharp eye makes the entire photo feel more lifelike.
- **Use Natural Light**: Early morning or late afternoon light creates soft, warm tones.
- **Think About Backgrounds**: A clutter-free background helps your subject stand out.

## Camera Settings

- **Shutter Speed**: Use 1/1000s or faster to freeze motion.
- **Aperture**: A wide aperture (f/4 to f/6.3) blurs the background and highlights the bird.
- **ISO**: Keep it as low as possible, but increase in low light to avoid motion blur.

## Ethical Considerations

- Never disturb nests or breeding birds.
- Avoid playback calls that might stress wildlife.
- Respect local guidelines and property boundaries.

## Conclusion

Start with your backyard or a local park, and keep practicing. With time, your skills will sharpen — and your photo gallery will grow.
  `.trim(),
        authorId: "seedAuthor8",
        authorName: "ShutterBirder",
        tags: ["photography", "beginner"],
        imageUrl: "https://images.unsplash.com/photo-1611007629878-d51d711e9d14?q=80&w=2722&auto=format&fit=crop&ixlib=rb-4.1.0"
      },
      {
        title: "Feeding Birds Without Harming Them",
        excerpt: "Learn the safe way to offer food to your feathered friends while protecting their health and habitat.",
        content: `
## Introduction

Feeding birds can bring joy and a deeper connection with nature. But doing it incorrectly can harm the very creatures you’re trying to help. Here’s how to feed birds safely and responsibly.

## Choose the Right Food

- **Black Oil Sunflower Seeds**: A high-fat favorite for most songbirds.
- **Nyjer Seed**: Perfect for finches.
- **Suet**: Great for cold-weather energy boosts.
- **Avoid Bread**: It offers little nutrition and can cause health problems.

## Use Clean, Safe Feeders

- **Clean Weekly**: Wash feeders with a 10% bleach solution.
- **Dry Completely**: Prevents mold and mildew growth.
- **Rotate Feeder Types**: Keeps bird activity diverse and prevents crowding.

## Prevent Disease

Birds are susceptible to outbreaks of disease when feeders are crowded or dirty. Signs of trouble include:

- Lethargy
- Crusty eyes
- Visible injuries

If you notice sick birds, take feeders down for at least two weeks and clean thoroughly before reinstalling.

## Mind the Placement

- **Keep Feeders High**: Out of reach of predators like cats.
- **Near Shrubs or Trees**: Offers shelter and escape routes.
- **Away from Windows**: Helps reduce collision risk.

## Don't Overfeed

Feeding should supplement, not replace, natural foraging. Too much food can lead to dependence or attract invasive species.

## Conclusion

Feeding birds responsibly supports their well-being while providing you a front-row seat to their daily lives. With a little care, you can turn your yard into a bird-friendly haven.
  `.trim(),
        authorId: "seedAuthor9",
        authorName: "Conscious Feeder",
        tags: ["feeding", "health"],
        imageUrl: "https://images.unsplash.com/photo-1524675784525-96b2219b588a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0"
      }
      ,
      {
  title: "Nesting Behavior of Songbirds",
  excerpt: "Peek into the fascinating nesting rituals of common songbirds and what makes them unique.",
  content: `
## Introduction

Nesting is a crucial phase in the life cycle of songbirds. From selecting the perfect site to raising their young, songbirds exhibit a wide array of fascinating behaviors.

## Nest Site Selection

Songbirds carefully choose nesting sites to maximize safety and success. Choices range from tree branches to dense shrubs and even human structures.

## Nest Construction

- **Materials**: Twigs, leaves, feathers, moss, and spider silk are common materials.
- **Techniques**: Some species weave intricate nests, while others build simple cups or cavities.

## Incubation and Care

After laying eggs, parents take turns incubating to keep them warm. Songbirds are attentive caregivers, feeding their chicks frequently and protecting them from predators.

## Nest Defense

Parents employ strategies like alarm calls, distraction displays, and sometimes aggressive behavior to deter threats.

## Fledging

Young birds leave the nest once they can fly but often remain dependent on parents for food and protection for several weeks.

## Conclusion

Understanding nesting behaviors enhances our appreciation of songbirds’ resilience and adaptability. Observing these rituals can be a deeply rewarding experience for bird enthusiasts.
  `.trim(),
  authorId: "seedAuthor10",
  authorName: "Nest Watcher",
  tags: ["nesting", "songbirds"],
  imageUrl: "https://images.unsplash.com/photo-1667375381766-aff0289f9374?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0"
},
{
  title: "The Comeback of Bald Eagles",
  excerpt: "A conservation success story about how bald eagles have returned from the brink of extinction.",
  content: `
## Introduction

Once endangered and struggling to survive, bald eagles have made a remarkable recovery thanks to dedicated conservation efforts.

## Historical Decline

- Widespread pesticide use (especially DDT) caused eggshell thinning.
- Habitat destruction and hunting further threatened populations.

## Conservation Measures

- **DDT Ban**: Enacted in 1972, this helped restore eagle reproductive success.
- **Legal Protection**: The Bald and Golden Eagle Protection Act provided safeguards.
- **Habitat Restoration**: Efforts focused on protecting nesting and foraging areas.

## Population Recovery

Since the 1980s, bald eagle numbers have steadily increased, allowing removal from the endangered species list in 2007.

## Current Challenges

- Lead poisoning from spent ammunition
- Collisions with wind turbines and power lines
- Continued habitat loss

## What You Can Do

- Support local conservation groups
- Practice safe shooting and cleanup
- Respect eagle habitats and nests

## Conclusion

The bald eagle’s comeback is a beacon of hope, demonstrating that thoughtful human intervention can reverse environmental damage.
  `.trim(),
  authorId: "seedAuthor11",
  authorName: "Raptor Reporter",
  tags: ["eagles", "conservation"],
  imageUrl: "https://images.unsplash.com/photo-1575350126138-9259890f965a?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.1.0"
},
{
  title: "What to Pack for a Birding Trip",
  excerpt: "Your essential checklist for gear and supplies to make your birdwatching trip a success.",
  content: `
## Introduction

Proper preparation is key to enjoying a successful birding trip. From optics to clothing, having the right gear makes all the difference.

## Essential Gear

- **Binoculars**: The most important tool for any birder.
- **Field Guide**: Helps with quick identification.
- **Camera**: Optional, but great for documenting sightings.
- **Notebook and Pen**: For jotting down notes and sketches.

## Clothing

- Wear layered, weather-appropriate clothing.
- Use neutral colors to avoid startling birds.
- Comfortable, sturdy footwear is a must.

## Other Useful Items

- **Water Bottle**: Stay hydrated during long hikes.
- **Snacks**: Energy bars or trail mix.
- **Sun Protection**: Hat, sunglasses, and sunscreen.
- **Insect Repellent**: To ward off bugs in wooded or wet areas.

## Safety Considerations

- Let someone know your itinerary.
- Carry a basic first aid kit.
- Be aware of local wildlife hazards.

## Conclusion

Packing smart makes your birding experience more enjoyable and comfortable. Tailor your gear to the environment and length of your trip for the best results.
  `.trim(),
  authorId: "seedAuthor12",
  authorName: "Gear Up Guide",
  tags: ["gear", "birding"],
  imageUrl: "https://images.unsplash.com/photo-1519462746248-f6d189ee340c?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.1.0"
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
