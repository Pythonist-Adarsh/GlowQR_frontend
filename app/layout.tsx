import type { Metadata } from 'next'
import Script from 'next/script'
import { Syne, DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'GlowQR — AI-Powered QR Review Platform',
  description:
    'Turn scans into authentic reviews across Google, Yelp, and more with AI-crafted drafts and a premium QR experience.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${cormorant.variable} font-body antialiased`}
      >

        <Script id="glowqr-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('glowqr-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  )
}
