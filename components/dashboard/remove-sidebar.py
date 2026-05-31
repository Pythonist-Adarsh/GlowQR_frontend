import re

with open('DashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

idx1 = content.find('{/* Right Sidebar */}')
if idx1 != -1:
    idx2 = content.find('</main>', idx1)
    if idx2 != -1:
        new_content = content[:idx1] + '      ' + content[idx2:]
        with open('DashboardClient.tsx', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Removed Right Sidebar from DashboardClient")
    else:
        print("Could not find end of Right Sidebar")
else:
    print("Could not find Right Sidebar")
