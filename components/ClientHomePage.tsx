'use client'

import { useState, useEffect } from 'react'
import { Release } from '@/types'
import SearchModal from '@/components/SearchModal'

interface ClientHomePageProps {
  releases: Release[]
}

export default function ClientHomePage({ releases }: ClientHomePageProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  // Command+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchModalOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        releases={releases}
      />
    </>
  )
}