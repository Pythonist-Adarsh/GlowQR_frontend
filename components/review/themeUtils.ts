export function hexToRgb(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return { r, g, b };
}

export function getThemeVariables(plan: string, brandColor: string) {
  // Use #2F5FE0 as fallback, but if the old default #6366F1 was passed, 
  // we could just treat it as the accent, or override it.
  // The user requested: "The accent hook should just default silently to #2F5FE0 for every business unless a value is already set in whatever field you find."
  const isOldDefault = brandColor === '#6366F1' || brandColor === '#1D9E75' || !brandColor;
  const accentColor = isOldDefault ? '#2F5FE0' : brandColor;

  const { r, g, b } = hexToRgb(accentColor);

  return {
    '--accent': accentColor,
    '--accent-rgb': `${r}, ${g}, ${b}`,
    '--bg-primary': '#FAFAF8',
    '--bg-card': '#FFFFFF',
    '--text-primary': '#1F2430',
    '--text-secondary': '#62687A',
    '--text-muted': '#9BA0AE',
    '--border-default': '#E2E4E9',
    
    // Success (Green)
    '--success-main': '#159652',
    '--success-bg': '#E3F6EA',
    '--success-text': '#0B5C31',
    
    // Rating Stars (Amber)
    '--star-filled': '#F0A93E',
    '--star-empty': '#E2E4E9',
    
    // Error (Red)
    '--error-main': '#D8434B',
    '--error-bg': '#FCE6E7',
    '--error-text': '#8C242B'
  } as React.CSSProperties & Record<string, string>;
}
