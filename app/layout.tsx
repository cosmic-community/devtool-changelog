import type { Metadata } from 'next'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'DevTool Changelog - Release Notes & Updates',
  description: 'Stay up-to-date with the latest releases, features, and improvements to DevTool. View detailed changelogs, breaking changes, and component updates.',
  keywords: ['changelog', 'release notes', 'developer tools', 'software updates', 'version history'],
  authors: [{ name: 'DevTool Team' }],
  openGraph: {
    title: 'DevTool Changelog - Release Notes & Updates',
    description: 'Stay up-to-date with the latest releases, features, and improvements to DevTool.',
    type: 'website',
    url: 'https://changelog.devtool.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop&auto=format',
        width: 1200,
        height: 630,
        alt: 'DevTool Changelog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTool Changelog - Release Notes & Updates',
    description: 'Stay up-to-date with the latest releases, features, and improvements to DevTool.',
    images: ['https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop&auto=format'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body>
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}