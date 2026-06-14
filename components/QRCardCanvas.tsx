'use client'
import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

interface QRCardCanvasProps {
  businessName: string
  logoUrl: string
  scanUrl: string
  slug: string
}

export default function QRCardCanvas({ 
  businessName, logoUrl, scanUrl, slug 
}: QRCardCanvasProps) {
  const previewRef = useRef<HTMLCanvasElement>(null)

  const CARD_W = 1080
  const CARD_H = 1920
  const CENTER = CARD_W / 2

  async function drawCard(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!
    canvas.width = CARD_W
    canvas.height = CARD_H

    // 1. WHITE BACKGROUND
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, CARD_W, CARD_H)

    let y = 100 // Top padding

    // 2. LOGO CIRCLE
    const LOGO_SIZE = 480 // 160px * 3
    const logoX = CENTER
    const logoY = y + LOGO_SIZE / 2

    // Draw circle border (very light thin border)
    ctx.save()
    ctx.beginPath()
    ctx.arc(logoX, logoY, LOGO_SIZE / 2 + 2, 0, Math.PI * 2)
    ctx.fillStyle = '#F5F5F5'
    ctx.fill()
    ctx.restore()

    // Draw circular clip for logo
    ctx.save()
    ctx.beginPath()
    ctx.arc(logoX, logoY, LOGO_SIZE / 2, 0, Math.PI * 2)
    ctx.clip()

    try {
      const logoImg = await loadImage(logoUrl)
      ctx.drawImage(logoImg, logoX - LOGO_SIZE/2, logoY - LOGO_SIZE/2, LOGO_SIZE, LOGO_SIZE)
    } catch {
      // Fallback: colored circle with first letter
      ctx.fillStyle = '#c0392b'
      ctx.fillRect(logoX - LOGO_SIZE/2, logoY - LOGO_SIZE/2, LOGO_SIZE, LOGO_SIZE)
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 120px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(businessName?.[0]?.toUpperCase() || 'B', logoX, logoY)
    }
    ctx.restore()

    y += LOGO_SIZE + 36 // 12px gap

    // 3. BUSINESS NAME
    ctx.fillStyle = '#111111'
    ctx.font = 'bold 56px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText((businessName || '').toUpperCase(), CENTER, y)
    y += 56 + 48 // 16px gap

    // 4. QR CODE
    const QR_SIZE = 660
    const qrX = CENTER - QR_SIZE / 2

    // QR border box (thin black line, slightly rounded)
    ctx.strokeStyle = '#111111'
    ctx.lineWidth = 3
    roundRect(ctx, qrX - 24, y - 24, QR_SIZE + 48, QR_SIZE + 48, 16)
    ctx.stroke()

    // Generate QR as data URL then draw
    const qrDataUrl = await QRCode.toDataURL(scanUrl, {
      width: QR_SIZE,
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#ffffff' }
    })
    const qrImg = await loadImage(qrDataUrl)
    ctx.drawImage(qrImg, qrX, y, QR_SIZE, QR_SIZE)
    y += QR_SIZE + 80 // original gap

    // 5. SCAN TEXT
    ctx.fillStyle = '#666666'
    ctx.font = '54px Arial' // 18px * 3
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('Scan the QR code to', CENTER, y)
    y += 54 + 8
    ctx.fillText('leave us a review on', CENTER, y)
    y += 54 + 24 // 8px gap

    // 6. GOOGLE COLORED TEXT
    const googleLetters = [
      { char: 'G', color: '#4285F4' },
      { char: 'o', color: '#EA4335' },
      { char: 'o', color: '#FBBC05' },
      { char: 'g', color: '#4285F4' },
      { char: 'l', color: '#34A853' },
      { char: 'e', color: '#EA4335' },
    ]
    const GFONT = 126 // 42px * 3
    ctx.font = `bold ${GFONT}px Arial`
    ctx.textBaseline = 'top'
    
    // Measure total width first
    let totalW = 0
    googleLetters.forEach(l => {
      totalW += ctx.measureText(l.char).width
    })
    let gx = CENTER - totalW / 2
    
    googleLetters.forEach(l => {
      ctx.fillStyle = l.color
      ctx.textAlign = 'left'
      ctx.fillText(l.char, gx, y)
      gx += ctx.measureText(l.char).width
    })
    y += GFONT + 24 // 8px gap

    // 7. GOLD STARS
    const STAR = '★'
    const STAR_SIZE = 126 // 42px * 3
    ctx.font = `${STAR_SIZE}px Arial`
    ctx.fillStyle = '#FBBC05'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    
    const starSpacing = STAR_SIZE + 10
    const starsStartX = CENTER - (5 * starSpacing) / 2 + STAR_SIZE / 2
    for (let i = 0; i < 5; i++) {
      ctx.fillText(STAR, starsStartX + i * starSpacing, y)
    }
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    w: number, h: number,
    r: number
  ) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  useEffect(() => {
    if (previewRef.current) {
      drawCard(previewRef.current)
    }
  }, [businessName, logoUrl, scanUrl])

  async function handleDownload() {
    const offscreen = document.createElement('canvas')
    await drawCard(offscreen)
    const link = document.createElement('a')
    link.download = `${slug}_glowqr_card.png`
    link.href = offscreen.toDataURL('image/png', 1.0)
    link.click()
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, width: '100%' }}>
      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '24px', border: '1px solid #e2e8f0', width: '100%', display: 'flex', justifyContent: 'center', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
        <canvas
          ref={previewRef}
          style={{ width: '100%', maxWidth: '280px', height: 'auto', borderRadius: 12, border: '1px solid #e2e8f0' }}
        />
      </div>
      <button onClick={handleDownload}
        className="w-full"
        style={{
          background:'#0f172a', color:'#fff',
          border:'none', borderRadius: 12,
          padding:'14px 24px', fontSize: 13,
          fontWeight:800, cursor:'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download Print Card
      </button>
    </div>
  )
}
