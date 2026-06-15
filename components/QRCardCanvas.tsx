'use client'
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import QRCode from 'qrcode'

export interface QRCardRef {
  download: () => void
}

interface QRCardCanvasProps {
  businessName: string
  logoUrl: string
  scanUrl: string
  slug: string
}

const QRCardCanvas = forwardRef<QRCardRef, QRCardCanvasProps>(({ 
  businessName, logoUrl, scanUrl, slug 
}, ref) => {
  const previewRef = useRef<HTMLCanvasElement>(null)

  const CARD_W = 1080
  const CARD_H = 2160
  const CENTER = CARD_W / 2

  async function drawCard(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!
    canvas.width = CARD_W
    canvas.height = CARD_H

    // 1. WHITE BACKGROUND WITH ROUNDED BORDER
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#E2E8F0' // nice light gray border
    ctx.lineWidth = 6 // thicker border
    roundRect(ctx, 3, 3, CARD_W - 6, CARD_H - 6, 60)
    ctx.fill()
    ctx.stroke()

    let y = 80 // Top margin

    // 2. LOGO
    const LOGO_SIZE = 380
    const logoX = CENTER
    const logoY = y + LOGO_SIZE / 2

    ctx.save()

    try {
      const logoImg = await loadImage(logoUrl)
      // Implement object-fit: contain to fit any shape without cropping
      const aspect = logoImg.width / logoImg.height
      let drawW = LOGO_SIZE
      let drawH = LOGO_SIZE
      
      if (aspect > 1) { // wider
        drawH = LOGO_SIZE / aspect
      } else if (aspect < 1) { // taller
        drawW = LOGO_SIZE * aspect
      }
      ctx.drawImage(logoImg, logoX - drawW/2, logoY - drawH/2, drawW, drawH)
    } catch {
      ctx.fillStyle = '#c0392b'
      ctx.fillRect(logoX - LOGO_SIZE/2, logoY - LOGO_SIZE/2, LOGO_SIZE, LOGO_SIZE)
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 120px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(businessName?.[0]?.toUpperCase() || 'B', logoX, logoY)
    }
    ctx.restore()

    y += LOGO_SIZE + 48 // Bottom margin to business name

    // 3. BUSINESS NAME
    ctx.fillStyle = '#1a2340'
    ctx.font = 'bold 120px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText((businessName || '').toUpperCase(), CENTER, y)
    y += 120 + 40 // Bottom margin to QR (font size approx 120)

    // 4. QR CODE BOX
    const QR_SIZE = 780
    
    // Add padding and border around QR to match reference design
    const PADDING = 40;
    const BOX_SIZE = QR_SIZE + PADDING * 2;
    const boxX = CENTER - BOX_SIZE / 2;
    const boxY = y;

    // Draw white box with border
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#E2E8F0' // nice light gray border
    ctx.lineWidth = 6
    roundRect(ctx, boxX, boxY, BOX_SIZE, BOX_SIZE, 40)
    ctx.fill()
    ctx.stroke()

    // Generate QR
    const qrDataUrl = await QRCode.toDataURL(scanUrl, {
      width: QR_SIZE,
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#ffffff' }
    })
    const qrImg = await loadImage(qrDataUrl)
    ctx.drawImage(qrImg, boxX + PADDING, boxY + PADDING, QR_SIZE, QR_SIZE)
    y += BOX_SIZE + 72 // Bottom margin to scan text

    // 5. SCAN TEXT
    ctx.fillStyle = '#222222'
    ctx.font = 'bold 52px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText('Scan the QR code to', CENTER, y)
    y += 72 // Line height 72px
    ctx.fillText('leave us a review on', CENTER, y)
    y += 72 + 40 // Bottom margin to Google text

    // 6. GOOGLE COLORED LETTERS
    const googleLetters = [
      { char: 'G', color: '#4285F4' },
      { char: 'o', color: '#EA4335' },
      { char: 'o', color: '#FBBC05' },
      { char: 'g', color: '#4285F4' },
      { char: 'l', color: '#34A853' },
      { char: 'e', color: '#EA4335' },
    ]
    ctx.font = 'bold 110px Arial'
    ctx.textBaseline = 'top'
    
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
    y += 110 + 48 // Bottom margin to stars

    // 7. GOLD STARS
    const STAR = '★'
    ctx.font = '120px Arial'
    ctx.fillStyle = '#FBBC05'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    
    const starW = ctx.measureText(STAR).width
    const gap = 16
    const totalStarW = 5 * starW + 4 * gap
    const starsStartX = CENTER - totalStarW / 2 + starW / 2
    
    for (let i = 0; i < 5; i++) {
      ctx.fillText(STAR, starsStartX + i * (starW + gap), y)
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

  useImperativeHandle(ref, () => ({
    download: handleDownload
  }))

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16, width: '100%' }}>
      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '24px', border: '1px solid #e2e8f0', width: '100%', display: 'flex', justifyContent: 'center', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
        <canvas
          ref={previewRef}
          style={{ width: '100%', maxWidth: '340px', height: 'auto', borderRadius: 20, border: '1px solid #eee' }}
        />
      </div>
    </div>
  )
})

export default QRCardCanvas
