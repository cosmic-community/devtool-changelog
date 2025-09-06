'use client'

import { useState, useEffect } from 'react'
import { getReleases, getCategories } from '@/lib/cosmic'
import { Release, Category } from '@/types'
import Header from '@/components/Header'
import ReleaseCard from '@/components/ReleaseCard'
import SearchBar from '@/components/SearchBar'
import SearchModal from '@/components/SearchModal'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [releasesData, categoriesData] = await Promise.all([
          getReleases(),
          getCategories()
        ])

        setReleases(releasesData as Release[])
        setCategories(categoriesData as Category[])
      } catch (err) {
        console.error('Error loading homepage:', err)
        setError('Unable to load releases. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Command+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchModalOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold mb-4">
              Unable to Load Releases
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {error}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar onOpenModal={() => setIsSearchModalOpen(true)} />
        </div>

        {/* Releases Timeline */}
        {loading ? (
          <div className="space-y-16">
            {/* Loading skeleton */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative">
                <div className="absolute left-0 top-8 w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full -translate-x-0.5 animate-pulse"></div>
                <div className="ml-8">
                  <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6 animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {releases.length > 0 ? (
              releases.map((release, index) => (
                <div key={release.id} className="relative">
                  {/* Timeline line */}
                  {index !== releases.length - 1 && (
                    <div className="absolute left-0 top-20 w-px h-full bg-gray-200 dark:bg-gray-800"></div>
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-8 w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full -translate-x-0.5"></div>
                  
                  {/* Release content */}
                  <div className="ml-8">
                    <ReleaseCard release={release} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No releases found. Check back soon for updates!
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        releases={releases}
      />
    </div>
  )
}