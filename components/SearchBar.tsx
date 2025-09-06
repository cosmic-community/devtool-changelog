'use client'

import { useState } from 'react'
import { useGlobalSearch } from './GlobalSearchProvider'

interface SearchBarProps {
  compact?: boolean
}

export default function SearchBar({ compact = false }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const { openSearch } = useGlobalSearch()

  const handleClick = () => {
    openSearch()
  }

  return (
    <div className={`relative ${compact ? 'max-w-sm' : 'max-w-md'} w-full`}>
      <div
        onClick={handleClick}
        className={`
          flex items-center w-full px-3 ${compact ? 'py-2' : 'py-3'}
          bg-gray-50 dark:bg-gray-900/50 
          border border-gray-200 dark:border-gray-800
          rounded-lg cursor-text transition-all duration-200
          ${isFocused ? 'border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-900' : 'hover:bg-white dark:hover:bg-gray-900'}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <svg 
          className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        
        <span className={`flex-1 text-gray-500 dark:text-gray-400 ${compact ? 'text-sm' : 'text-sm'} min-w-0`}>
          <span className="hidden sm:inline">{compact ? 'Search...' : 'Search releases, versions, changes...'}</span>
          <span className="sm:hidden">Search...</span>
        </span>
        
        {/* Hide keyboard shortcuts on mobile */}
        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
          <kbd className={`px-1.5 py-0.5 ${compact ? 'text-xs' : 'text-xs'} font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded`}>
            ⌘
          </kbd>
          <kbd className={`px-1.5 py-0.5 ${compact ? 'text-xs' : 'text-xs'} font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded`}>
            K
          </kbd>
        </div>
      </div>
    </div>
  )
}