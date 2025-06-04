// Advanced search parser for bird sightings
export interface SearchQuery {
  terms: string[]
  exactPhrases: string[]
  excludedTerms: string[]
  orTerms: string[]
  qualifiers: Record<string, string>
  wildcards: string[]
}

export function parseSearchQuery(query: string): SearchQuery {
  const result: SearchQuery = {
    terms: [],
    exactPhrases: [],
    excludedTerms: [],
    orTerms: [],
    qualifiers: {},
    wildcards: [],
  }

  // Remove extra spaces and normalize
  const normalizedQuery = query.trim().replace(/\s+/g, " ")

  // Extract exact phrases (quoted strings)
  const phraseRegex = /"([^"]+)"/g
  let match
  while ((match = phraseRegex.exec(normalizedQuery)) !== null) {
    result.exactPhrases.push(match[1])
  }

  // Remove quoted phrases from query for further processing
  const remainingQuery = normalizedQuery.replace(phraseRegex, " ")

  // Split by spaces and process each term
  const terms = remainingQuery.split(" ").filter((term) => term.length > 0)

  for (const term of terms) {
    if (term.startsWith("-")) {
      // Exclusion
      result.excludedTerms.push(term.substring(1))
    } else if (term.startsWith("~")) {
      // OR term
      result.orTerms.push(term.substring(1))
    } else if (term.includes(":")) {
      // Qualifier
      const [qualifier, value] = term.split(":", 2)
      result.qualifiers[qualifier] = value
    } else if (term.includes("*") || term.includes("%")) {
      // Wildcard
      result.wildcards.push(term)
    } else {
      // Regular term
      result.terms.push(term)
    }
  }

  return result
}

export function buildSearchFilter(parsedQuery: SearchQuery) {
  // This would be used to build database queries
  // For now, just return a formatted version of the parsed query
  return {
    mustMatch: [...parsedQuery.terms, ...parsedQuery.exactPhrases],
    mustNotMatch: parsedQuery.excludedTerms,
    shouldMatch: parsedQuery.orTerms,
    qualifiers: parsedQuery.qualifiers,
    wildcards: parsedQuery.wildcards,
  }
}
