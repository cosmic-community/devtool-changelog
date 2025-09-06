'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Release } from '@/types'
import Link from 'next/link'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  releases: Release[]
}

interface SearchResult {
  type: 'release'
  item: Release
  matchType: 'title' | 'version' | 'summary' | 'changes'
  matchText: string
}

export default function SearchModal({ isOpen, onClose, releases }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Search function
  const searchReleases = useCallback((term: string): SearchResult[] => {
    if (!term.trim()) return []

    const searchResults: SearchResult[] = []
    const lowerTerm = term.toLowerCase()

    releases.forEach((release) => {
      const matches: Array<{ type: SearchResult['matchType'], text: string, score: number }> = []

      // Search in title (highest priority)
      if (release.title.toLowerCase().includes(lowerTerm)) {
        matches.push({ type: 'title', text: release.title, score: 10 })
      }

      // Search in version
      if (release.metadata?.version?.toLowerCase().includes(lowerTerm)) {
        matches.push({ type: 'version', text: release.metadata.version, score: 8 })
      }

      // Search in summary
      if (release.metadata?.summary?.toLowerCase().includes(lowerTerm)) {
        matches.push({ type: 'summary', text: release.metadata.summary, score: 6 })
      }

      // Search in changes content
      if (release.metadata?.changes?.toLowerCase().includes(lowerTerm)) {
        const snippet = release.metadata.changes.substring(0, 150) + '...'
        matches.push({ type: 'changes', text: snippet, score: 4 })
      }

      // Add results for this release (highest scoring match first)
      matches.sort((a, b) => b.score - a.score)
      matches.forEach((match) => {
        searchResults.push({
          type: 'release',
          item: release,
          matchType: match.type,
          matchText: match.text
        })
      })
    })

    // Sort by release date (newest first) and limit results
    return searchResults.slice(0, 10)
  }, [releases])

  // Update results when search term changes
  useEffect(() => {
    const newResults = searchReleases(searchTerm)
    setResults(newResults)
    setSelectedIndex(0)
  }, [searchTerm, searchReleases])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            const result = results[selectedIndex]
            if (result.type === 'release') {
              window.location.href = `/releases/${result.item.slug}`
            }
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  if (!isOpen) return null

  const getMatchTypeLabel = (matchType: SearchResult['matchType']) => {
    switch (matchType) {
      case 'title': return 'Title'
      case 'version': return 'Version'
      case 'summary': return 'Summary'
      case 'changes': return 'Changes'
      default: return 'Match'
    }
  }

  const highlightMatch = (text: string, term: string) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200 px-0.5 rounded">
          {part}
        </span>
      ) : part
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal - Responsive positioning and sizing */}
      <div className="fixed inset-x-2 top-4 sm:inset-x-4 sm:top-20 mx-auto max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-2xl max-h-[calc(100vh-2rem)] sm:max-h-none flex flex-col">
          {/* Search Input */}
          <div className="relative border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search releases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base sm:text-lg"
            />
            <div className="absolute inset-y-0 right-0 pr-2 sm:pr-4 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div 
            ref={resultsRef}
            className="flex-1 overflow-y-auto max-h-96 sm:max-h-none"
          >
            {searchTerm && results.length === 0 && (
              <div className="p-4 sm:p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-2">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">No results found for "{searchTerm}"</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1">Try searching for version numbers, feature names, or release content.</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="p-2">
                {results.map((result, index) => (
                  <Link
                    key={`${result.item.id}-${result.matchType}`}
                    href={`/releases/${result.item.slug}`}
                    onClick={onClose}
                    className={`block p-2 sm:p-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? 'bg-gray-100 dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                            {highlightMatch(result.item.title, searchTerm)}
                          </h3>
                          {result.item.metadata?.version && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 flex-shrink-0 self-start sm:self-auto">
                              {highlightMatch(result.item.metadata.version, searchTerm)}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded self-start">
                            {getMatchTypeLabel(result.matchType)}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="text-xs">{new Date(result.item.metadata?.release_date || result.item.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {highlightMatch(result.matchText, searchTerm)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!searchTerm && (
              <div className="p-4 sm:p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-2 sm:mb-4">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Start typing to search releases</p>
                <div className="mt-2 sm:mt-4 hidden sm:flex flex-wrap gap-2 justify-center text-sm text-gray-500 dark:text-gray-500">
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">↑↓</kbd>
                  <span>to navigate</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">↵</kbd>
                  <span>to select</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">ESC</kbd>
                  <span>to close</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}