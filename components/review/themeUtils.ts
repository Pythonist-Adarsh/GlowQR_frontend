export function hexToRgb(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return { r, g, b };
}

export function getLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return r * 0.299 + g * 0.587 + b * 0.114;
}

export function mixColorWithBlack(hex: string, percentage: number) {
  const { r, g, b } = hexToRgb(hex);
  const factor = 1 - (percentage / 100);
  const newR = Math.round(r * factor);
  const newG = Math.round(g * factor);
  const newB = Math.round(b * factor);
  return `rgb(${newR}, ${newG}, ${newB})`;
}

export function getThemeVariables(plan: string, brandColor: string) {
  const isBasic = plan === 'basic' || plan === 'free';
  const color = brandColor || '#7C3AED';

  if (isBasic) {
    return {
      '--accent': '#E53E3E',
      '--accent-glow': '#FF6B6B',
      '--bg-primary': '#0a0a0a',
      '--bg-card': '#141414',
      '--text-primary': '#FFFFFF',
      '--text-secondary': '#A0A0A0',
      '--border-default': '#333333'
    } as React.CSSProperties;
  }

  const lum = getLuminance(color);
  const textPrimary = lum > 128 ? '#111111' : '#FFFFFF';
  const textSecondary = lum > 128 ? 'rgba(17,17,17,0.6)' : 'rgba(255,255,255,0.6)';

  return {
    '--accent': color,
    '--accent-glow': `${color}B3`,
    '--bg-primary': mixColorWithBlack(color, 85),
    '--bg-card': mixColorWithBlack(color, 75),
    '--text-primary': textPrimary,
    '--text-secondary': textSecondary,
    '--border-default': mixColorWithBlack(color, 65)
  } as React.CSSProperties;
}
