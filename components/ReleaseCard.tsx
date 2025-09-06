import Link from 'next/link'
import { Release } from '@/types'
import { formatDate, formatVersion, getReleaseTypeColor } from '@/lib/utils'

interface ReleaseCardProps {
  release: Release
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const releaseDate = formatDate(release.metadata?.release_date || release.created_at)
  const version = formatVersion(release.metadata?.version || release.title)

  return (
    <article className="space-y-6">
      {/* Date */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {releaseDate}
        </span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Link 
          href={`/releases/${release.slug}`}
          className="group block"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {release.title}
          </h2>
        </Link>
        
        {/* Summary */}
        {release.metadata?.summary && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {release.metadata.summary}
          </p>
        )}
      </div>

      {/* Categories */}
      {release.metadata?.categories && release.metadata.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {release.metadata.categories.map((category) => (
            <span 
              key={category.id}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {category.metadata?.name || category.title}
            </span>
          ))}
        </div>
      )}

      {/* Breaking Changes Warning */}
      {release.metadata?.breaking_changes && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-red-800 dark:text-red-200">
            Breaking Changes
          </span>
        </div>
      )}

      {/* View More Link */}
      <div>
        <Link 
          href={`/releases/${release.slug}`}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
        >
          View full changelog →
        </Link>
      </div>
    </article>
  )
}