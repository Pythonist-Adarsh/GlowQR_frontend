import re

files = [
    'd:/glowQR/frontend/components/auth/SignInView.tsx',
    'd:/glowQR/frontend/components/auth/SignUpView.tsx'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    target = "localStorage.setItem('token', data.access_token)"
    replacement = "localStorage.setItem('token', data.access_token)\n      localStorage.removeItem('glowqr_business_data')"
    
    if target in content and replacement not in content:
        content = content.replace(target, replacement)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
