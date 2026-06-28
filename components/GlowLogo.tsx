export function GlowLogo({ size = 40, className = '' }: { size?: number, className?: string }) {
  // SVG representation of the new GlowQR Logo (Q embedded in QR Code)
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="GlowQR logo"
    >
      {/* Outer Glow / Base Background (if dark) */}
      <rect width="100" height="100" rx="16" fill="transparent" />
      
      {/* Top Left QR Square */}
      <rect x="20" y="20" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="4" />
      <rect x="26" y="26" width="10" height="10" rx="2" fill="currentColor" />
      
      {/* Top Right QR Square */}
      <rect x="58" y="20" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="4" />
      <rect x="64" y="26" width="10" height="10" rx="2" fill="currentColor" />
      
      {/* Bottom Left QR Square */}
      <rect x="20" y="58" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="4" />
      <rect x="26" y="64" width="10" height="10" rx="2" fill="currentColor" />
      
      {/* Small scattered QR pixels around */}
      <rect x="46" y="20" width="4" height="4" fill="currentColor" />
      <rect x="50" y="28" width="4" height="4" fill="currentColor" />
      <rect x="20" y="46" width="4" height="4" fill="currentColor" />
      <rect x="28" y="50" width="4" height="4" fill="currentColor" />
      <rect x="76" y="46" width="4" height="4" fill="currentColor" />
      <rect x="68" y="50" width="4" height="4" fill="currentColor" />
      <rect x="72" y="58" width="4" height="4" fill="currentColor" />
      <rect x="46" y="76" width="4" height="4" fill="currentColor" />
      <rect x="54" y="76" width="4" height="4" fill="currentColor" />
      <rect x="60" y="72" width="4" height="4" fill="currentColor" />

      {/* The Central "Q" overlapping the QR code */}
      <circle cx="50" cy="50" r="16" fill="black" /> {/* Masking background */}
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="4" />
      
      {/* The tail of the Q */}
      <path d="M58 58 L76 76" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
