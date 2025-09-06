// app/releases/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getRelease, getReleases } from '@/lib/cosmic'
import { Release } from '@/types'
import { formatDate, formatVersion } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface ReleasePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const releases = await getReleases()
    return releases.map((release: Release) => ({
      slug: release.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: ReleasePageProps) {
  const { slug } = await params
  
  try {
    const release = await getRelease(slug) as Release | null
    
    if (!release) {
      return {
        title: 'Release Not Found',
        description: 'The requested release could not be found.',
      }
    }

    return {
      title: `${release.title} - DevTool Changelog`,
      description: release.metadata?.summary || `Release notes for ${release.metadata?.version}`,
      openGraph: {
        title: release.title,
        description: release.metadata?.summary || `Release notes for ${release.metadata?.version}`,
        type: 'article',
        publishedTime: release.metadata?.release_date,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Release - DevTool Changelog',
      description: 'DevTool release information',
    }
  }
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { slug } = await params
  
  try {
    const release = await getRelease(slug) as Release | null

    if (!release) {
      notFound()
    }

    const releaseDate = formatDate(release.metadata?.release_date || release.created_at)
    const version = formatVersion(release.metadata?.version || release.title)

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
        <Header />
        
        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Back Navigation */}
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Changelog
          </Link>

          {/* Release Header */}
          <div className="space-y-6 mb-12">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {releaseDate}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {release.title}
              </h1>
            </div>
            
            {release.metadata?.summary && (
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {release.metadata.summary}
              </p>
            )}

            {/* Categories */}
            {release.metadata?.categories && release.metadata.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {release.metadata.categories.map((category) => (
                  <span 
                    key={category.id}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {category.metadata?.name || category.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Release Content */}
          <div className="space-y-12">
            {/* Changes */}
            {release.metadata?.changes && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: release.metadata.changes }}
                />
              </div>
            )}

            {/* Breaking Changes */}
            {release.metadata?.breaking_changes && (
              <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-red-500 rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                      Breaking Changes
                    </h2>
                    <p className="text-red-700 dark:text-red-200 text-sm">
                      These changes may require updates to your existing code or configuration.
                    </p>
                  </div>
                </div>
                <div 
                  className="prose dark:prose-invert text-red-900 dark:text-red-100"
                  dangerouslySetInnerHTML={{ __html: release.metadata.breaking_changes }}
                />
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error loading release:', error)
    notFound()
  }
}