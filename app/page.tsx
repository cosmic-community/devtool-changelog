import { getReleases, getCategories } from '@/lib/cosmic'
import { Release, Category } from '@/types'
import Header from '@/components/Header'
import ReleaseCard from '@/components/ReleaseCard'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DevTool Changelog - Latest Releases & Updates',
  description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform. View release notes, breaking changes, and feature updates.',
  openGraph: {
    title: 'DevTool Changelog - Latest Releases & Updates',
    description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform. View release notes, breaking changes, and feature updates.',
    url: 'https://changelog.devtool.com',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'DevTool Changelog - Latest releases and updates for developers',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTool Changelog - Latest Releases & Updates',
    description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform.',
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&auto=format,compress'],
  },
}

export default async function HomePage() {
  try {
    // Server-side data fetching
    const [releases, categories] = await Promise.all([
      getReleases(),
      getCategories()
    ])

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <Header />
        
        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              DevTool Changelog
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Stay up-to-date with the latest releases, features, and improvements
            </p>
          </div>

          {/* Releases Timeline */}
          <div className="space-y-16">
            {releases.length > 0 ? (
              releases.map((release, index) => (
                <div key={release.id} className="relative">
                  {/* Timeline line */}
                  {index !== releases.length - 1 && (
                    <div className="absolute left-0 top-6 w-px h-full bg-gray-200 dark:bg-gray-800"></div>
                  )}
                  {/* Timeline dot - aligned with date */}
                  <div className="absolute left-0 top-2 w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full -translate-x-0.5"></div>
                  
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
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error loading homepage:', error)
    
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold mb-4">
              Unable to Load Releases
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load releases. Please try again later.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}