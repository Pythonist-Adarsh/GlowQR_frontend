import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

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
      </body>
    </html>
  )
}
