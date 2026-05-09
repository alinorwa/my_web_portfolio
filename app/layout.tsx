import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alinordic.dev'),
  title: {
    default: 'Ali | Idea → Reality | Full Stack Developer',
    template: '%s | Ali'
  },
  description: 'Full Stack Developer & Digital Craftsman specialized in turning complex ideas into high-performance web and mobile applications.',
  keywords: ['Full Stack Developer', 'Ali Nordic', 'Web Development', 'Django', 'React', 'AI Solutions'],
  authors: [{ name: 'Ali' }],
  openGraph: {
    title: 'Ali | Idea → Reality',
    description: 'A developer who turns ideas into reality through code and design.',
    url: 'https://alinordic.dev',
    siteName: 'Ali Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali | Full Stack Developer',
    description: 'Crafting digital experiences from database to interface.',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={spaceMono.variable}>{children}</body>
    </html>
  )
}
