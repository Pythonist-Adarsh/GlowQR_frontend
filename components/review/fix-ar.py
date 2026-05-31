import re

with open('ARExperience.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken textColor logic
content = content.replace("const textColor = isLight ? 'text-slate-800' : '{textColor}';", "const textColor = isLight ? 'text-slate-800' : 'text-white';")

# Fix broken className strings
# We'll use regex to find className="..." that contains {textColor} or {textColorMuted} and replace them with className={...  ...}
def fix_classname(match):
    inner = match.group(1)
    inner = inner.replace('{textColor}', '')
    inner = inner.replace('{textColorMuted}', '')
    return f'className={{{inner}}}'

content = re.sub(r'className="([^"]*(?:\{textColor\}|\{textColorMuted\})[^"]*)"', fix_classname, content)

# Fix the logo cropping
old_logo_div = '''<motion.div
            className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-3 shadow-[0_0_30px_rgba(0,0,0,0.3)] flex items-center justify-center relative z-10 overflow-hidden"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {businessData.logo || businessData.logoUrl ? (
              <img src={businessData.logo || businessData.logoUrl} alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
            ) : (
              <span className={	ext-3xl font-black  text-center uppercase tracking-tighter leading-none} style={{ color: brandColor }}>
                {businessData.name?.substring(0, 2)}
              </span>
            )}
          </motion.div>'''

new_logo_div = '''<motion.div
            className="h-24 w-auto min-w-[6rem] max-w-[200px] bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-3 shadow-[0_0_30px_rgba(0,0,0,0.3)] flex items-center justify-center relative z-10 overflow-hidden"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {businessData.logo || businessData.logoUrl ? (
              <img src={businessData.logo || businessData.logoUrl} alt="Logo" className="max-h-full max-w-full object-contain drop-shadow-md" />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">
                <span className={	ext-3xl font-black  text-center uppercase tracking-tighter leading-none} style={{ color: brandColor }}>
                  {businessData.name?.substring(0, 2)}
                </span>
              </div>
            )}
          </motion.div>'''

# Apply the logo fix. We need to handle variations in the old_logo_div string because we just fixed the className above it.
content = re.sub(r'<motion\.div\s+className="w-24 h-24[^>]+>\s*\{businessData\.logo.*?<\/motion\.div>', new_logo_div, content, flags=re.DOTALL)

with open('ARExperience.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed ARExperience.tsx")
