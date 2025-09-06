'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import SearchModal from './SearchModal'
import { Release } from '@/types'

interface GlobalSearchContextType {
  openSearch: () => void
  closeSearch: () => void
  isSearchOpen: boolean
}

const GlobalSearchContext = createContext<GlobalSearchContextType>({
  openSearch: () => {},
  closeSearch: () => {},
  isSearchOpen: false,
})

export const useGlobalSearch = () => useContext(GlobalSearchContext)

interface GlobalSearchProviderProps {
  children: ReactNode
  releases: Release[]
}

export default function GlobalSearchProvider({ children, releases }: GlobalSearchProviderProps) {
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

  const contextValue: GlobalSearchContextType = {
    openSearch: () => setIsSearchModalOpen(true),
    closeSearch: () => setIsSearchModalOpen(false),
    isSearchOpen: isSearchModalOpen,
  }

  return (
    <GlobalSearchContext.Provider value={contextValue}>
      {children}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        releases={releases}
      />
    </GlobalSearchContext.Provider>
  )
}