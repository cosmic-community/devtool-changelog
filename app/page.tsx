import { getReleases, getCategories, getFeaturedReleases } from '@/lib/cosmic'
import { Release, Category } from '@/types'
import Header from '@/components/Header'
import FeaturedRelease from '@/components/FeaturedRelease'
import ReleaseCard from '@/components/ReleaseCard'
import CategoryFilter from '@/components/CategoryFilter'
import Footer from '@/components/Footer'

export const revalidate = 300 // Revalidate every 5 minutes

export default async function HomePage() {
  try {
    const [releases, categories, featuredReleases] = await Promise.all([
      getReleases(),
      getCategories(), 
      getFeaturedReleases()
    ])

    const typedReleases = releases as Release[]
    const typedCategories = categories as Category[]
    const typedFeaturedReleases = featuredReleases as Release[]
    const latestFeatured = typedFeaturedReleases[0]

    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="bg-white border-b border-secondary-200">
            <div className="container py-16 md:py-24">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
                  DevTool Changelog
                </h1>
                <p className="text-xl md:text-2xl text-secondary-600 text-balance mb-8">
                  Stay up-to-date with the latest releases, features, and improvements to our developer tool platform.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <span className="badge bg-primary-100 text-primary-800 border-primary-200">
                    Latest: {typedReleases[0]?.metadata?.version || 'v2.3.0'}
                  </span>
                  <span className="badge bg-green-100 text-green-800 border-green-200">
                    {typedReleases.length} Releases
                  </span>
                  <span className="badge bg-blue-100 text-blue-800 border-blue-200">
                    {typedCategories.length} Categories  
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Release Section */}
          {latestFeatured && (
            <section className="bg-gradient-to-br from-primary-50 to-blue-50 border-b border-secondary-200">
              <div className="container py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                    Featured Release
                  </h2>
                  <p className="text-lg text-secondary-600">
                    Highlighting our most significant update
                  </p>
                </div>
                <FeaturedRelease release={latestFeatured} />
              </div>
            </section>
          )}

          {/* Releases Section */}
          <section className="py-16">
            <div className="container">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:w-80 shrink-0">
                  <div className="sticky top-8">
                    <CategoryFilter categories={typedCategories} />
                  </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
                      All Releases
                    </h2>
                    <p className="text-secondary-600">
                      Complete history of DevTool updates and improvements
                    </p>
                  </div>

                  {typedReleases.length > 0 ? (
                    <div className="space-y-6">
                      {typedReleases.map((release) => (
                        <ReleaseCard key={release.id} release={release} />
                      ))}
                    </div>
                  ) : (
                    <div className="card p-8 text-center">
                      <p className="text-secondary-600 text-lg">
                        No releases found. Check back soon for updates!
                      </p>
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
    console.error('Error loading homepage:', error)
    
    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main className="container py-16">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-bold text-secondary-900 mb-4">
              Unable to Load Releases
            </h1>
            <p className="text-secondary-600">
              We're experiencing some technical difficulties. Please try again later.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}