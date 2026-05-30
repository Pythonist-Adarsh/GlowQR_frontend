import re

with open('ARExperience.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Determine theme styles
style_logic = '''const isPremium = plan === 'premium';
  const animStyle = businessData?.animation_style || 'glow_float';
  const isLight = animStyle === 'free' || animStyle === 'glow_float';
  const textColor = isLight ? 'text-slate-800' : 'text-white';
  const textColorMuted = isLight ? 'text-slate-500' : 'text-white/60';
  const bgColor = isLight ? 'bg-slate-50' : (animStyle === 'premium' ? 'bg-[#06060F]' : 'bg-slate-900');'''

content = content.replace("const isPremium = plan === 'premium' || plan === 'trial';", style_logic)

# Remove hardcoded bg-slate-900/95
content = content.replace('<div className="absolute inset-0 bg-slate-900/95 mix-blend-multiply" />', '{!isLight && <div className="absolute inset-0 bg-slate-900/95 mix-blend-multiply" />}\n      {isLight && <div className="absolute inset-0 bg-white/90 mix-blend-screen" />}')

# Update text colors dynamically
content = content.replace('text-white/90', '{textColor}')
content = content.replace('text-white/60', '{textColorMuted}')
content = content.replace('text-white', '{textColor}')

with open('ARExperience.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ARExperience.tsx")
