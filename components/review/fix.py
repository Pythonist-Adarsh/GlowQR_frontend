import re

with open('ARExperience.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("'{textColor}'", "'text-white'")
content = content.replace("'{textColorMuted}'", "'text-white/60'")

def replacer(match):
    inner = match.group(1)
    # Replace literal {textColor} with 
    inner = inner.replace('{textColor}', '')
    inner = inner.replace('{textColorMuted}', '')
    return f'className={{{inner}}}'

content = re.sub(r'className="([^"]*?\{textColor(?:Muted)?\}[^"]*?)"', replacer, content)

with open('ARExperience.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
