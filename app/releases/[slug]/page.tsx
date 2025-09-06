// app/releases/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getRelease, getReleases } from '@/lib/cosmic'
import { Release } from '@/types'
import { formatDate, formatVersion, getReleaseTypeColor } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategoryBadge from '@/components/CategoryBadge'
import ComponentBadge from '@/components/ComponentBadge'
import Link from 'next/link'

interface ReleasePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const releases = await getReleases()
    return releases.map((release) => ({
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
    const releaseTypeColor = getReleaseTypeColor(release.metadata?.release_type?.key || 'patch')

    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        
        <main>
          {/* Release Header */}
          <section className="bg-white border-b border-secondary-200">
            <div className="container py-12 md:py-16">
              <div className="max-w-4xl mx-auto">
                {/* Back Navigation */}
                <Link 
                  href="/"
                  className="inline-flex items-center text-secondary-600 hover:text-secondary-900 mb-8 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Changelog
                </Link>

                {/* Release Title & Meta */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className={`badge ${releaseTypeColor}`}>
                      {release.metadata?.release_type?.value || 'Release'}
                    </span>
                    {release.metadata?.featured && (
                      <span className="badge bg-yellow-100 text-yellow-800 border-yellow-200">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                    {release.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-secondary-600">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Released {releaseDate}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      Version {version}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                {release.metadata?.summary && (
                  <div className="bg-secondary-50 rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold text-secondary-900 mb-3">
                      Release Summary
                    </h2>
                    <p className="text-secondary-700 leading-relaxed">
                      {release.metadata.summary}
                    </p>
                  </div>
                )}

                {/* Categories & Components */}
                <div className="flex flex-wrap gap-6 mb-8">
                  {release.metadata?.categories && release.metadata.categories.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-secondary-900 mb-2">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {release.metadata.categories.map((category) => (
                          <CategoryBadge key={category.id} category={category} />
                        ))}
                      </div>
                    </div>
                  )}

                  {release.metadata?.components && release.metadata.components.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-secondary-900 mb-2">Components Affected</h3>
                      <div className="flex flex-wrap gap-2">
                        {release.metadata.components.map((component) => (
                          <ComponentBadge key={component.id} component={component} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Release Content */}
          <section className="py-12">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-8">
                  {/* Changes */}
                  {release.metadata?.changes && (
                    <div className="card p-8">
                      <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                        What's Changed
                      </h2>
                      <div 
                        className="release-content"
                        dangerouslySetInnerHTML={{ __html: release.metadata.changes }}
                      />
                    </div>
                  )}

                  {/* Breaking Changes */}
                  {release.metadata?.breaking_changes && (
                    <div className="card border-red-200 bg-red-50 p-8">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-red-500 rounded-full p-1 mt-1">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-red-900 mb-2">
                            Breaking Changes
                          </h2>
                          <p className="text-red-700 text-sm">
                            These changes may require updates to your existing code or configuration.
                          </p>
                        </div>
                      </div>
                      <div 
                        className="release-content text-red-900"
                        dangerouslySetInnerHTML={{ __html: release.metadata.breaking_changes }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error loading release:', error)
    notFound()
  }
}