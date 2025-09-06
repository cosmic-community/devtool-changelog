'use client'

import { useState } from 'react'
import { Category } from '@/types'
import { getCategoryColor } from '@/lib/utils'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      }
      return [...prev, categoryId]
    })
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-secondary-900">
          Filter by Category
        </h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id)
          const categoryColor = getCategoryColor(category.metadata?.color)
          
          return (
            <label 
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleCategory(category.id)}
                className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
              />
              
              <div className="flex items-center gap-2 flex-1">
                <div 
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: categoryColor }}
                />
                <div className="flex-1">
                  <p className="text-secondary-900 font-medium group-hover:text-primary-600 transition-colors">
                    {category.metadata?.name || category.title}
                  </p>
                  {category.metadata?.description && (
                    <p className="text-xs text-secondary-600">
                      {category.metadata.description}
                    </p>
                  )}
                </div>
              </div>
            </label>
          )
        })}
      </div>

      {categories.length === 0 && (
        <p className="text-secondary-600 text-sm text-center py-4">
          No categories available
        </p>
      )}

      {selectedCategories.length > 0 && (
        <div className="mt-6 pt-4 border-t border-secondary-200">
          <p className="text-sm text-secondary-600 mb-2">
            Selected categories:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(categoryId => {
              const category = categories.find(c => c.id === categoryId)
              if (!category) return null
              
              const categoryColor = getCategoryColor(category.metadata?.color)
              
              return (
                <span 
                  key={categoryId}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full"
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: categoryColor }}
                  />
                  {category.metadata?.name || category.title}
                  <button
                    onClick={() => toggleCategory(categoryId)}
                    className="hover:text-secondary-900 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}