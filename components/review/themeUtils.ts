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
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function getContrastText(hexColor: string): string {
  const luminance = getLuminance(hexColor);
  return luminance > 145 ? '#111111' : '#FFFFFF';
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
  const color = isBasic ? '#E53E3E' : (brandColor || '#7C3AED');

  const { r, g, b } = hexToRgb(color);

  return {
    '--accent': color,
    '--accent-rgb': `${r}, ${g}, ${b}`,
    '--accent-glow': `${color}B3`,
    '--accent-text': getContrastText(color),
    '--bg-primary': isBasic ? '#0a0a0a' : mixColorWithBlack(color, 85),
    '--bg-card': isBasic ? '#141414' : mixColorWithBlack(color, 75),
    '--text-primary': '#FFFFFF',
    '--text-secondary': 'rgba(255, 255, 255, 0.65)',
    '--text-muted': 'rgba(255, 255, 255, 0.40)',
    '--border-default': isBasic ? '#333333' : mixColorWithBlack(color, 65)
  } as React.CSSProperties;
}
