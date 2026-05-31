import re

with open('components/review/ARExperience.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update logo container to support wide logos better
old_logo = '''<motion.div
            className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-3 shadow-[0_0_30px_rgba(0,0,0,0.3)] flex items-center justify-center relative z-10 overflow-hidden"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {businessData.logo || businessData.logoUrl ? (
              <img src={businessData.logo || businessData.logoUrl} alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
            ) : ('''
new_logo = '''<motion.div
            className="h-24 w-auto min-w-[6rem] max-w-[200px] bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-3 shadow-[0_0_30px_rgba(0,0,0,0.3)] flex items-center justify-center relative z-10 overflow-hidden"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {businessData.logo || businessData.logoUrl ? (
              <img src={businessData.logo || businessData.logoUrl} alt="Logo" className="max-h-full max-w-full object-contain drop-shadow-md" />
            ) : ('''
content = content.replace(old_logo, new_logo)

# 2. Add dynamic theme logic without breaking anything
style_logic = '''const isPremium = plan === 'premium' || plan === 'trial';
  const animStyle = businessData?.animation_style || 'glow_float';
  const isLight = animStyle === 'free' || animStyle === 'glow_float';
  const textColor = isLight ? 'text-slate-800' : 'text-white';
  const textColorMuted = isLight ? 'text-slate-500' : 'text-white/60';'''
content = content.replace("const isPremium = plan === 'premium' || plan === 'trial';", style_logic)

# Replace the hardcoded bg-slate-900/95 overlay with dynamic one
content = content.replace('<div className="absolute inset-0 bg-slate-900/95 mix-blend-multiply" />', '{!isLight && <div className="absolute inset-0 bg-slate-900/95 mix-blend-multiply" />}\\n      {isLight && <div className="absolute inset-0 bg-white/90 mix-blend-screen" />}')

# Safely replace text colors
content = content.replace('text-white/90', '')
content = content.replace('text-white/60', '')
content = content.replace('text-white', '')

# We need to add backticks to className where we just injected 
content = re.sub(r'className="([^"]*\$\{textColor[^"]*)"', lambda m: f'className={{{m.group(1)}}}', content)

with open('components/review/ARExperience.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated ARExperience")
