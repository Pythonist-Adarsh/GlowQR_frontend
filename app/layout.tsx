import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { WhatsAppButton } from '@/components/WhatsAppButton'
export const metadata: Metadata = {
  title: 'GlowQR — AI Google Review Generator for Indian Local Businesses',
  description: 'GlowQR helps restaurants, salons, cafes & clinics in India get more Google reviews automatically. Customers scan a QR code, AI drafts a review, they post in seconds. Start free — no card needed.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap" />
      </head>
      <body
        className="font-sans antialiased"
        suppressHydrationWarning
      >

        <Script id="glowqr-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('glowqr-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`}
        </Script>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
