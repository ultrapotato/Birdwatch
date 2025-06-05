"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, Camera, MessageCircle } from "lucide-react"
import FeaturedBirds from "@/components/featured-birds"
import RecentSightings from "@/components/recent-sightings"
import ArticlesList from "@/components/articles-list"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function Home() {
  const { user, userLoading } = useFirebase()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20 md:py-28">

        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Discover and Share Bird Sightings
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our community of bird enthusiasts. Report sightings, share photos, and connect with fellow
                  birders.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href={user ? "/dashboard" : "/beginners"} passHref>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/explore" passHref>
                  <Button size="lg" variant="outline">
                    Explore Sightings
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1624133310859-348852f33103?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=400&width=600&query=colorful bird in natural habitat"
                alt="Bird watching"
                className="rounded-lg object-cover shadow-xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 text-center md:gap-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need for Bird Watching</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                Our platform provides all the tools you need to document and share your bird watching experiences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Advanced Search</h3>
              <p className="text-gray-500">
                Find birds by taxonomy, location, flight patterns, and more with our powerful search tools.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Camera className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Photo Galleries</h3>
              <p className="text-gray-500">
                Upload and organize your bird photos into beautiful galleries to share with the community.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-gray-500">
                Ask questions, chat with other birders, and join discussions about your favorite species.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Birds Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Birds</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover some of the most interesting bird sightings from our community.
              </p>
            </div>
          </div>
          <FeaturedBirds />
          <div className="flex justify-center mt-8">
            <Link href="/birds" passHref>
              <Button variant="outline" size="lg">
                View All Birds
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Sightings */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Recent Sightings</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out the latest bird sightings reported by our community.
              </p>
            </div>
          </div>
          <RecentSightings />
          <div className="flex justify-center mt-8">
            <Link href="/sightings" passHref>
              <Button variant="outline" size="lg">
                View All Sightings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bird Articles</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Learn more about birds with our curated articles and guides.
              </p>
            </div>
          </div>
          <ArticlesList />
          <div className="flex justify-center mt-8">
            <Link href="/articles" passHref>
              <Button variant="outline" size="lg">
                Read More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-green-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Bird Watching Community Today
                </h2>
                <p className="max-w-[600px] text-gray-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sign up now to start sharing your bird sightings and connect with fellow enthusiasts.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register" passHref>
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold">5000+</div>
                <div className="text-sm font-medium">Bird Species</div>
              </div>
              <div className="h-16 w-px bg-white/20" />
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold">10k+</div>
                <div className="text-sm font-medium">Active Users</div>
              </div>
              <div className="h-16 w-px bg-white/20" />
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold">50k+</div>
                <div className="text-sm font-medium">Sightings</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
