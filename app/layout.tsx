import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import StyledJsxRegistry from './registry'
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-inter',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alinordic.dev'),

  title: {
    default: 'Ali Nordic | Full Stack Developer',
    template: '%s | Ali Nordic',
  },

  description:
    'Full Stack Developer based in Norway building scalable web applications with React, Next.js, Django and TypeScript.',

  keywords: [
    'Ali Nordic',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Django Developer',
    'Web Developer Norway',
  ],

  authors: [{ name: 'Ali Nordic' }],

  openGraph: {
    title: 'Ali Nordic | Full Stack Developer',

    description:
      'Building modern scalable web applications and digital experiences.',

    url: 'https://alinordic.dev',

    siteName: 'Ali Nordic',

    locale: 'en_US',

    type: 'website',

    images: [
      {
        url: 'https://alinordic.dev/og.png',
        width: 1200,
        height: 630,
        alt: 'Ali Nordic Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Ali Nordic | Full Stack Developer',

    description:
      'Building modern web applications with Next.js, React and Django.',

    images: ['https://alinordic.dev/og.png'],
  },

  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],

    apple: [{ url: '/apple-touch-icon.png' }],
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable}`}>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <GoogleAnalytics gaId="G-43BND5VTJ6" />
      </body>
    </html>
  )
}
