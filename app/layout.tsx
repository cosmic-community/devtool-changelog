import { Inter } from 'next/font/google'
import './globals.css'
import { getReleases } from '@/lib/cosmic'
import GlobalSearchProvider from '@/components/GlobalSearchProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DevTool Changelog',
  description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform.',
  metadataBase: new URL('https://changelog.devtool.com'),
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>",
  },
  openGraph: {
    title: 'DevTool Changelog',
    description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform.',
    url: 'https://changelog.devtool.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'DevTool Changelog',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'DevTool Changelog - Stay updated with the latest releases',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTool Changelog',
    description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform.',
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&auto=format,compress'],
    creator: '@devtool',
    site: '@devtool',
  },
  alternates: {
    canonical: 'https://changelog.devtool.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch releases for global search functionality
  let releases: any[] = []
  try {
    releases = await getReleases()
  } catch (error) {
    console.error('Error loading releases for search:', error)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme') || 'system';
                if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <GlobalSearchProvider releases={releases}>
          {children}
        </GlobalSearchProvider>
      </body>
    </html>
  )
}