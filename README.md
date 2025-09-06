# DevTool Changelog

![DevTool Changelog](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=300&fit=crop&auto=format)

A modern, professional changelog website for developer tool software built with Next.js 15, TypeScript, and Tailwind CSS. This application provides a clean, organized way to showcase software releases, track version history, and communicate updates to users and developers.

## ✨ Features

### 🔍 Advanced Search & Discovery
- **Global Search Modal** - Press `⌘K` (or `Ctrl+K`) to instantly search across all releases
- **Smart Search Results** - Search by version numbers, titles, summaries, and release content
- **Keyboard Navigation** - Navigate search results with arrow keys and select with Enter
- **Real-time Filtering** - Instant results as you type with highlighted matches
- **Search Categories** - Results organized by match type (title, version, summary, changes)

### 🎨 Modern User Interface
- **Dark Mode Support** - Full dark/light/system theme with smooth transitions
- **Responsive Design** - Optimized for desktop, tablet, and mobile viewing
- **Clean Timeline Layout** - Chronological display with visual timeline indicators
- **Category Color Coding** - Visual categorization with customizable colors
- **Interactive Components** - Hover states and smooth transitions throughout

### 📅 Release Management
- **Release Timeline** - Chronological display of all software releases with version details
- **Category Filtering** - Filter releases by type (New Features, Bug Fixes, Breaking Changes)  
- **Component Tracking** - Track which software components are affected by each release
- **Featured Releases** - Highlight major releases and important updates
- **Breaking Changes Alerts** - Visual warnings for releases with breaking changes
- **Release Types** - Support for Major, Minor, Patch, and Hotfix classifications

### 🔧 Technical Excellence
- **TypeScript Integration** - Full type safety with strict typing throughout
- **Performance Optimized** - Fast loading with optimized images and efficient rendering
- **SEO Optimized** - Built-in meta tags, Open Graph, and Twitter Card support
- **Accessibility Compliant** - ARIA labels, keyboard navigation, and screen reader support
- **Console Debugging** - Built-in console capture for dashboard preview debugging

### 🚀 Developer Experience
- **Modern Tech Stack** - Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Type-Safe Development** - Comprehensive TypeScript interfaces and strict type checking
- **Hot Reloading** - Instant development feedback with Next.js dev server
- **Build Optimization** - Pre-build type checking to prevent deployment errors
- **ESLint Integration** - Code quality enforcement with Next.js ESLint config

## 🎯 Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68bbb4ac285c02bfe718dd4f&clone_repository=68bbb6c2285c02bfe718dd6c)

## 💬 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a changelog website for a developer tool software service"

### Code Generation Prompt

> "Create a changelog website for a developer tool software product using Next.js."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router and server components
- **TypeScript** - Type-safe development with strict mode enabled
- **Tailwind CSS** - Utility-first CSS framework with custom theme
- **Cosmic CMS** - Headless CMS for content management with SDK v1.5+
- **React 18** - Latest React features with concurrent rendering
- **PostCSS** - CSS processing with Autoprefixer
- **ESLint** - Code quality and consistency enforcement

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun (recommended)
- A Cosmic account and bucket

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd devtool-changelog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage Guide

### Search Functionality
- **Global Search**: Press `⌘K` (or `Ctrl+K`) to open the search modal
- **Navigation**: Use arrow keys to navigate results, Enter to select, Escape to close
- **Search Types**: Search across titles, version numbers, summaries, and detailed changes
- **Instant Results**: Results appear as you type with highlighted matching text

### Theme System
- **Theme Toggle**: Click the theme button in the header to cycle through light/dark/system themes
- **System Theme**: Automatically follows your device's preference when set to system mode
- **Persistent**: Theme preference is saved to localStorage

### Content Management
- **Releases**: Manage software releases with version numbers, dates, and detailed changes
- **Categories**: Organize releases by type (features, bug fixes, breaking changes, etc.)
- **Components**: Track which parts of your software are affected by each release
- **Featured Releases**: Highlight important releases with special styling and prominence

## 🔌 Cosmic SDK Examples

### Fetching Releases with Advanced Queries
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all releases with categories and components
const releases = await cosmic.objects
  .find({ type: 'releases' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)

// Get featured releases only
const featuredReleases = await cosmic.objects
  .find({ 
    type: 'releases',
    'metadata.featured': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Search releases by version or content
const searchResults = await cosmic.objects
  .find({ 
    type: 'releases',
    $or: [
      { 'title': { $regex: searchTerm, $options: 'i' } },
      { 'metadata.version': { $regex: searchTerm, $options: 'i' } },
      { 'metadata.summary': { $regex: searchTerm, $options: 'i' } }
    ]
  })
  .depth(1)
```

### Type-Safe Data Handling
```typescript
import { Release, Category, Component } from '@/types'

// Properly typed release handling
const processRelease = (release: Release): string => {
  const version = release.metadata?.version || release.title
  const releaseDate = new Date(
    release.metadata?.release_date || release.created_at
  ).toLocaleDateString()
  
  return `${version} - ${releaseDate}`
}

// Safe category access with type checking
const getCategoryColor = (category: Category): string => {
  return category.metadata?.color || '#6B7280'
}
```

## 🎨 Cosmic CMS Integration

This application integrates with three main Cosmic object types:

### Releases Object Type
- **Version**: Release version number (e.g., v2.1.0)
- **Release Date**: When the release was published
- **Summary**: Brief overview of the release
- **Changes**: Detailed HTML content of changes and features
- **Breaking Changes**: Important breaking changes information
- **Release Type**: Major, Minor, Patch, or Hotfix (select dropdown)
- **Categories**: Connected category objects (New Features, Bug Fixes, etc.)
- **Components**: Connected component objects (API, Dashboard, CLI Tool)
- **Featured**: Boolean flag to highlight important releases

### Categories Object Type
- **Name**: Category display name
- **Description**: Category description  
- **Color**: Hex color code for visual categorization
- **Icon**: Optional emoji or icon for the category

### Components Object Type
- **Name**: Component name (e.g., "API", "Dashboard", "CLI Tool")
- **Description**: Component description
- **Color**: Optional color for component badges

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically with zero configuration

### Deploy to Netlify

1. Build the application: `bun run build`
2. Upload the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Environment Variables

Set these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key  
- `COSMIC_WRITE_KEY` - Your Cosmic write key (if using write operations)

## 🔧 Development Scripts

```bash
# Development server with hot reloading
bun dev

# Type checking (runs automatically before build)
bun run type-check

# Build for production with type checking
bun run build

# Start production server
bun run start

# Lint code for quality and consistency
bun run lint
```

## 🎯 Key Features in Detail

### Advanced Search System
The search system provides powerful discovery capabilities:
- **Multi-field search**: Searches across titles, versions, summaries, and detailed changes
- **Highlighted results**: Matching text is highlighted in search results
- **Keyboard shortcuts**: `⌘K` or `Ctrl+K` to open, arrow keys to navigate
- **Result categorization**: Shows which field matched (title, version, summary, changes)
- **Real-time updates**: Results update as you type with debounced queries

### Theme System
Comprehensive theming with three modes:
- **Light Mode**: Clean, professional light interface
- **Dark Mode**: Modern dark interface with proper contrast
- **System Mode**: Automatically follows device preference
- **Persistent Storage**: Remembers user preference across sessions
- **Smooth Transitions**: Animated theme switching throughout the UI

### TypeScript Integration
Full type safety throughout the application:
- **Strict Mode**: TypeScript strict mode enabled for maximum safety
- **Interface Definitions**: Complete type definitions for all Cosmic objects
- **Build-time Checking**: Pre-build type checking prevents deployment errors
- **Type Guards**: Runtime type validation where needed
- **Generic Types**: Reusable type patterns for consistent development

### Performance Optimizations
- **Server Components**: Leverages Next.js 15 server components for faster loading
- **Image Optimization**: Automatic image optimization with next/image alternatives
- **Code Splitting**: Automatic code splitting for smaller bundle sizes
- **Static Generation**: Pre-rendered pages for optimal performance
- **Caching**: Intelligent caching strategies for Cosmic CMS data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper TypeScript types
4. Run type checking: `bun run type-check`
5. Test your changes: `bun run build`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Cosmic CMS](https://www.cosmicjs.com) for content management
- Styled with [Tailwind CSS](https://tailwindcss.com) for rapid UI development  
- Powered by [Next.js 15](https://nextjs.org) for modern React development
- Icons from [Heroicons](https://heroicons.com) for consistent iconography

---

**Need help?** Check out the [Cosmic CMS documentation](https://www.cosmicjs.com/docs) or [Next.js documentation](https://nextjs.org/docs) for more information.