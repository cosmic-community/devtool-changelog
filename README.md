# DevTool Changelog

![DevTool Changelog](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=300&fit=crop&auto=format)

A modern, professional changelog website for developer tool software built with Next.js, TypeScript, and Tailwind CSS. This application provides a clean, organized way to showcase software releases, track version history, and communicate updates to users and developers.

## Features

- **📅 Release Timeline** - Chronological display of all software releases with version details
- **🏷️ Category Filtering** - Filter releases by type (New Features, Bug Fixes, Breaking Changes)  
- **🔧 Component Tracking** - Track which software components are affected by each release
- **⭐ Featured Releases** - Highlight major releases and important updates
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile viewing
- **🔍 SEO Optimized** - Built-in meta tags and structured data for search engines
- **⚡ Performance Focused** - Fast loading with optimized images and caching
- **🎨 Modern UI** - Clean design with color-coded categories and intuitive navigation

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68bbb4ac285c02bfe718dd4f&clone_repository=68bbb6c2285c02bfe718dd6c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a changelog website for a developer tool software service"

### Code Generation Prompt

> "Create a changelog website for a developer tool software product using Next.js."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
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

## Cosmic SDK Examples

### Fetching Releases
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all releases with categories and components
const releases = await cosmic.objects
  .find({ type: 'releases' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured releases only
const featuredReleases = await cosmic.objects
  .find({ 
    type: 'releases',
    'metadata.featured': true 
  })
  .depth(1)
```

### Fetching Categories
```typescript
// Get all categories with color codes
const categories = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application integrates with three main Cosmic object types:

### Releases
- **Version**: Release version number (e.g., v2.1.0)
- **Release Date**: When the release was published
- **Summary**: Brief overview of the release
- **Changes**: Detailed HTML content of changes and features
- **Breaking Changes**: Important breaking changes information
- **Release Type**: Major, Minor, Patch, or Hotfix
- **Categories**: Connected category objects (New Features, Bug Fixes, etc.)
- **Components**: Connected component objects (API, Dashboard, CLI Tool)
- **Featured**: Boolean flag to highlight important releases

### Categories
- **Name**: Category display name
- **Description**: Category description
- **Color**: Hex color code for visual categorization

### Components
- **Name**: Component name
- **Description**: Component description

## Deployment Options

### Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify

1. Build the application: `bun run build`
2. Upload the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Environment Variables

Set these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key  
- `COSMIC_WRITE_KEY` - Your Cosmic write key (if using write operations)

<!-- README_END -->