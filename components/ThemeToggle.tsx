'use client'

import { useState, useEffect } from 'react'

type ThemeType = 'light' | 'dark' | 'system'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const validTheme: ThemeType = (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') 
      ? savedTheme 
      : 'system'
    setTheme(validTheme)
    applyTheme(validTheme)
  }, [])

  const applyTheme = (newTheme: ThemeType) => {
    const root = window.document.documentElement
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.toggle('dark', systemTheme === 'dark')
    } else {
      root.classList.toggle('dark', newTheme === 'dark')
    }
  }

  const toggleTheme = () => {
    const themes: ThemeType[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length] as ThemeType
    
    // Since we're using modulo on a fixed array, nextTheme is guaranteed to be defined
    // and will be one of the ThemeType values
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    applyTheme(nextTheme)
  }

  if (!mounted) {
    return <div className="w-9 h-9" /> // Placeholder to prevent layout shift
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )
      case 'dark':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"></path>
          </svg>
        )
      case 'system':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="M10 4v16"></path>
          </svg>
        )
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
      title={`Current: ${theme} theme. Click to change.`}
    >
      {getIcon()}
    </button>
  )
}