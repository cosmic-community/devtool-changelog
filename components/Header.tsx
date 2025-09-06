import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="container py-4">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link 
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-primary-600 rounded-lg p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-secondary-900">DevTool</h1>
              <p className="text-xs text-secondary-600">Changelog</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/"
              className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors"
            >
              Releases
            </Link>
            <a 
              href="https://docs.devtool.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors"
            >
              Documentation
            </a>
            <a 
              href="https://github.com/devtool/devtool"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-600 hover:text-secondary-900 font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}