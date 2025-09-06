import Link from 'next/link'
import { Release } from '@/types'
import { formatDate, formatVersion, getReleaseTypeColor, stripHtmlTags, truncateText } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'
import ComponentBadge from '@/components/ComponentBadge'

interface ReleaseCardProps {
  release: Release
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const releaseDate = formatDate(release.metadata?.release_date || release.created_at)
  const version = formatVersion(release.metadata?.version || release.title)
  const releaseTypeColor = getReleaseTypeColor(release.metadata?.release_type?.key || 'patch')
  
  // Extract plain text from HTML content for preview
  const changesPreview = release.metadata?.changes 
    ? truncateText(stripHtmlTags(release.metadata.changes), 150)
    : ''

  return (
    <article className="card hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`badge ${releaseTypeColor}`}>
            {release.metadata?.release_type?.value || 'Release'}
          </span>
          {release.metadata?.featured && (
            <span className="badge bg-yellow-100 text-yellow-800 border-yellow-200">
              ⭐ Featured
            </span>
          )}
          <span className="text-secondary-500 text-sm">
            {releaseDate}
          </span>
        </div>

        {/* Title & Version */}
        <div className="mb-4">
          <Link 
            href={`/releases/${release.slug}`}
            className="block group"
          >
            <h2 className="text-xl md:text-2xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors mb-2">
              {release.title}
            </h2>
            <p className="text-primary-600 font-medium">
              Version {version}
            </p>
          </Link>
        </div>

        {/* Summary */}
        {release.metadata?.summary && (
          <p className="text-secondary-600 mb-4 leading-relaxed">
            {release.metadata.summary}
          </p>
        )}

        {/* Changes Preview */}
        {changesPreview && (
          <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
            {changesPreview}
          </p>
        )}

        {/* Categories & Components */}
        <div className="flex flex-wrap gap-4 mb-4">
          {release.metadata?.categories && release.metadata.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {release.metadata.categories.slice(0, 3).map((category) => (
                <CategoryBadge key={category.id} category={category} size="sm" />
              ))}
              {release.metadata.categories.length > 3 && (
                <span className="badge bg-secondary-100 text-secondary-600 border-secondary-200 text-xs">
                  +{release.metadata.categories.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {release.metadata?.components && release.metadata.components.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-secondary-500 mb-2">Components Affected:</p>
            <div className="flex flex-wrap gap-2">
              {release.metadata.components.slice(0, 4).map((component) => (
                <ComponentBadge key={component.id} component={component} size="xs" />
              ))}
              {release.metadata.components.length > 4 && (
                <span className="badge bg-secondary-100 text-secondary-600 border-secondary-200 text-xs">
                  +{release.metadata.components.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Breaking Changes Warning */}
        {release.metadata?.breaking_changes && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-red-800">
                Contains Breaking Changes
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
          <Link 
            href={`/releases/${release.slug}`}
            className="btn-primary"
          >
            View Release
          </Link>
          <div className="text-secondary-500 text-sm">
            <span>{version}</span>
          </div>
        </div>
      </div>
    </article>
  )
}