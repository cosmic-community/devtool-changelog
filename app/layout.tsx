import { Inter } from 'next/font/google'
import './globals.css'
import { getReleases } from '@/lib/cosmic'
import GlobalSearchProvider from '@/components/GlobalSearchProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DevTool Changelog',
  description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform.',
  metadataBase: new URL('https://changelog.devtool.com'),
  openGraph: {
    title: 'DevTool Changelog',
    description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform.',
    type: 'website',
    locale: 'en_US',
    siteName: 'DevTool Changelog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTool Changelog',
    description: 'Stay up-to-date with the latest releases, features, and improvements to our developer tool platform.',
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