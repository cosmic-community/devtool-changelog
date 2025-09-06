import Link from 'next/link'
import { Release } from '@/types'
import { formatDate, formatVersion, getReleaseTypeColor, stripHtmlTags, truncateText } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'
import ComponentBadge from '@/components/ComponentBadge'

interface FeaturedReleaseProps {
  release: Release
}

export default function FeaturedRelease({ release }: FeaturedReleaseProps) {
  const releaseDate = formatDate(release.metadata?.release_date || release.created_at)
  const version = formatVersion(release.metadata?.version || release.title)
  const releaseTypeColor = getReleaseTypeColor(release.metadata?.release_type?.key || 'patch')
  
  // Extract plain text from HTML content for preview
  const changesPreview = release.metadata?.changes 
    ? truncateText(stripHtmlTags(release.metadata.changes), 200)
    : ''

  return (
    <div className="card bg-gradient-to-br from-white to-secondary-50 border-primary-200 shadow-lg">
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge bg-yellow-100 text-yellow-800 border-yellow-300 font-semibold">
            ⭐ Featured Release
          </span>
          <span className={`badge ${releaseTypeColor}`}>
            {release.metadata?.release_type?.value || 'Release'}
          </span>
          <span className="text-secondary-600 font-medium">
            {releaseDate}
          </span>
        </div>

        {/* Title & Version */}
        <div className="mb-6">
          <Link 
            href={`/releases/${release.slug}`}
            className="block group"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors mb-3">
              {release.title}
            </h2>
            <p className="text-primary-600 font-semibold text-lg">
              Version {version}
            </p>
          </Link>
        </div>

        {/* Summary */}
        {release.metadata?.summary && (
          <div className="bg-white/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-3">
              What's New
            </h3>
            <p className="text-secondary-700 leading-relaxed">
              {release.metadata.summary}
            </p>
          </div>
        )}

        {/* Changes Preview */}
        {changesPreview && (
          <div className="mb-6">
            <p className="text-secondary-600 leading-relaxed">
              {changesPreview}
            </p>
          </div>
        )}

        {/* Categories & Components */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {release.metadata?.categories && release.metadata.categories.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-secondary-900 mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {release.metadata.categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            </div>
          )}

          {release.metadata?.components && release.metadata.components.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-secondary-900 mb-3">Components Affected</h4>
              <div className="flex flex-wrap gap-2">
                {release.metadata.components.map((component) => (
                  <ComponentBadge key={component.id} component={component} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Breaking Changes Warning */}
        {release.metadata?.breaking_changes && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-red-500 rounded-full p-1 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-1">
                  Breaking Changes Included
                </h4>
                <p className="text-red-700 text-sm">
                  This release includes changes that may require updates to your existing code or configuration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-secondary-200">
          <Link 
            href={`/releases/${release.slug}`}
            className="btn-primary text-base px-6 py-3"
          >
            View Full Release Notes
          </Link>
          <div className="text-secondary-600">
            <span className="font-medium">Version {version}</span>
            <span className="mx-2">•</span>
            <span>{releaseDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}