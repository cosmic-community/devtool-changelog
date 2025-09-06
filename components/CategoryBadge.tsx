import { Category } from '@/types'
import { getCategoryColor } from '@/lib/utils'

interface CategoryBadgeProps {
  category: Category
  size?: 'xs' | 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const categoryColor = getCategoryColor(category.metadata?.color)
  
  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5'
  }
  
  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses[size]}`}
      style={{
        backgroundColor: `${categoryColor}15`,
        borderColor: `${categoryColor}40`,
        color: categoryColor
      }}
    >
      <div 
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: categoryColor }}
      />
      {category.metadata?.name || category.title}
    </span>
  )
}