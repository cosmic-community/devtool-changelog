import { Inter } from 'next/font/google'
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        {children}
      </body>
    </html>
  )
}