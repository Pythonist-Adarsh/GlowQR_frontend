import re

with open('OverviewTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_logo_div = '''<div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0" style={{ backgroundColor: b.primaryColor || "#1a8a3c" }}>
                {(b.logo_url || b.logo) ? (
                  <img src={b.logo_url || b.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                    {b.name?.charAt(0) || "B"}
                  </div>
                )}
              </div>'''

new_logo_div = '''{(b.logo_url || b.logo) ? (
                <div className="h-20 w-auto min-w-[5rem] max-w-[180px] rounded-2xl border-4 border-white shadow-lg overflow-hidden shrink-0 bg-white flex items-center justify-center px-3 py-2">
                  <img src={b.logo_url || b.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0" style={{ backgroundColor: b.primaryColor || "#1a8a3c" }}>
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                    {b.name?.charAt(0) || "B"}
                  </div>
                </div>
              )}'''

content = content.replace(old_logo_div, new_logo_div)

with open('OverviewTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed OverviewTab.tsx logo")
