"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"
import { searchBirds } from "@/lib/api/birds"
import { parseSearchQuery } from "@/lib/search-parser"
import BirdCard from "@/components/bird-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [taxonomy, setTaxonomy] = useState("")
  const [location, setLocation] = useState("")
  const [flightPattern, setFlightPattern] = useState("")
  const [useOperators, setUseOperators] = useState(false)
  const [parsedQuery, setParsedQuery] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Parse the query if using operators
      if (useOperators) {
        const parsed = parseSearchQuery(searchQuery)
        setParsedQuery(parsed)
      } else {
        setParsedQuery(null)
      }

      const results = await searchBirds({
        query: searchQuery,
        taxonomy,
        location,
        flightPattern,
        useOperators,
      })

      setSearchResults(results)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Search Birds</h1>
          <p className="text-muted-foreground">Find bird sightings by species, location, taxonomy, and more.</p>
        </div>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic" onClick={() => setAdvancedSearch(false)}>
              Basic Search
            </TabsTrigger>
            <TabsTrigger value="advanced" onClick={() => setAdvancedSearch(true)}>
              Advanced Search
            </TabsTrigger>
            <TabsTrigger
              value="operators"
              onClick={() => {
                setAdvancedSearch(true)
                setUseOperators(true)
              }}
            >
              Search Operators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search for birds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </form>
                <p className="mt-2 text-sm text-muted-foreground">
                  Search terms are separated by spaces. Commas are ignored.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="query">Search Query</Label>
                    <Input
                      id="query"
                      type="text"
                      placeholder="Search for birds..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxonomy">Taxonomy</Label>
                      <Select onValueChange={setTaxonomy} value={taxonomy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any taxonomy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any taxonomy</SelectItem>
                          <SelectItem value="passeriformes">Passeriformes (Perching Birds)</SelectItem>
                          <SelectItem value="falconiformes">Falconiformes (Falcons)</SelectItem>
                          <SelectItem value="strigiformes">Strigiformes (Owls)</SelectItem>
                          <SelectItem value="anseriformes">Anseriformes (Waterfowl)</SelectItem>
                          <SelectItem value="galliformes">Galliformes (Game Birds)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="Any location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="flightPattern">Flight Pattern</Label>
                      <Select onValueChange={setFlightPattern} value={flightPattern}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any flight pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any flight pattern</SelectItem>
                          <SelectItem value="direct">Direct Flight</SelectItem>
                          <SelectItem value="undulating">Undulating</SelectItem>
                          <SelectItem value="soaring">Soaring</SelectItem>
                          <SelectItem value="hovering">Hovering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operators" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="operatorQuery">Search Query with Operators</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md">
                            <p className="font-semibold">Search Operators:</p>
                            <ul className="text-sm mt-1 space-y-1">
                              <li>
                                <span className="font-medium">&quot;term&quot;</span> - Exact string search
                              </li>
                              <li>
                                <span className="font-medium">term_term</span> - Combines terms
                              </li>
                              <li>
                                <span className="font-medium">term*</span> - Wildcard (matches any sequence)
                              </li>
                              <li>
                                <span className="font-medium">term%</span> - Wildcard (matches any sequence)
                              </li>
                              <li>
                                <span className="font-medium">-term</span> - Exclusion
                              </li>
                              <li>
                                <span className="font-medium">~term</span> - OR operator
                              </li>
                              <li>
                                <span className="font-medium">namespace:term</span> - Namespace search
                              </li>
                              <li>
                                <span className="font-medium">term$</span> - Exact tag search
                              </li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="operatorQuery"
                      type="text"
                      placeholder='Try: "red breast" -sparrow ~warbler tag:migratory'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Use operators for advanced searching. Hover the info icon for help.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="useOperators"
                      checked={useOperators}
                      onCheckedChange={(checked) => setUseOperators(checked as boolean)}
                    />
                    <Label htmlFor="useOperators">Enable search operators</Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Searching..." : "Search with Operators"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Search Operator Reference</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Operator</th>
                      <th className="py-2 px-4 text-left">Effect</th>
                      <th className="py-2 px-4 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium">&quot; &quot;</td>
                      <td className="py-2 px-4">Exact string search</td>
                      <td className="py-2 px-4">&quot;red cardinal&quot;</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium">_</td>
                      <td className="py-2 px-4">Combines terms</td>
                      <td className="py-2 px-4">red_cardinal</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium">*</td>
                      <td className="py-2 px-4">Wildcard</td>
                      <td className="py-2 px-4">warb*</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium">%</td>
                      <td className="py-2 px-4">Wildcard</td>
                      <td className="py-2 px-4">warb%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium">-</td>
                      <td className="py-2 px-4">Exclusion</td>
                      <td className="py-2 px-4">warbler -yellow</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium">~</td>
                      <td className="py-2 px-4">OR operator</td>
                      <td className="py-2 px-4">~warbler ~finch</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-medium">:</td>
                      <td className="py-2 px-4">Namespace</td>
                      <td className="py-2 px-4">location:park</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">$</td>
                      <td className="py-2 px-4">Exact tag search</td>
                      <td className="py-2 px-4">migratory$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          {loading ? (
            <div className="text-center py-8">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((bird: any) => (
                <BirdCard key={bird.id} bird={bird} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? "No results found. Try a different search." : "Enter a search query to find birds."}
            </div>
          )}

          {parsedQuery && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Parsed Query:</h3>
              <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
                {JSON.stringify(parsedQuery, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
