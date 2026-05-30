import re

with open('DashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# remove My QR Code from the navigation array
pattern = r'\{\s*id:\s*"qr",\s*icon:\s*QrCode,\s*label:\s*"My QR Code",\s*action:\s*\(\)\s*=>\s*router\.push\("/dashboard"\),\s*\},'
new_content = re.sub(pattern, '', content)

with open('DashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
