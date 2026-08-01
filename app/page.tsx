import { LandingPage } from '@/components/landing/LandingPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GlowQR — AI Google Review Generator for Indian Local Businesses',
  description: 'GlowQR helps restaurants, salons, cafes & clinics in India get more Google reviews automatically. Customers scan a QR code, AI drafts a review, they post in seconds. Start free — no card needed.',
  openGraph: {
    title: 'GlowQR — AI Google Review Generator for Indian Local Businesses',
    description: 'GlowQR helps restaurants, salons, cafes & clinics in India get more Google reviews automatically. Customers scan a QR code, AI drafts a review, they post in seconds. Start free — no card needed.',
    url: 'https://www.glowqr.com',
    type: 'website',
    images: [
      {
        url: 'https://www.glowqr.com/logo.png',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlowQR — AI Google Review Generator for Indian Local Businesses',
    description: 'GlowQR helps restaurants, salons, cafes & clinics in India get more Google reviews automatically. Customers scan a QR code, AI drafts a review, they post in seconds. Start free — no card needed.',
  },
  alternates: {
    canonical: 'https://www.glowqr.com',
  }
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "GlowQR",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "AI-powered QR code platform that helps Indian local businesses get more Google reviews automatically.",
              "url": "https://www.glowqr.com",
              "offers": {
                "@type": "Offer",
                "price": "199",
                "priceCurrency": "INR"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GlowQR",
              "url": "https://www.glowqr.com",
              "logo": "https://www.glowqr.com/logo.png",
              "foundingLocation": "Lucknow, India",
              "description": "GlowQR is a Lucknow-based SaaS that helps local businesses in India collect Google reviews using AI-powered QR codes.",
              "founder": {
                "@type": "Person",
                "name": "Adarsh"
              },
              "sameAs": [
                "https://www.instagram.com/solojourney.ai",
                "https://www.linkedin.com/in/adarsh-tiwari-78271a266"
              ]
            }
          ])
        }}
      />
      <LandingPage />
    </>
  )
}
