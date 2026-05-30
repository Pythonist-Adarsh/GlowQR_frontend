import re

with open('OverviewTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix logo
content = content.replace('{b.logo ? (', '{(b.logo_url || b.logo) ? (')
content = content.replace('<img src={b.logo} alt="Logo"', '<img src={b.logo_url || b.logo} alt="Logo"')

# Fix website
content = content.replace('{b.website &&', '{(b.website_url || b.website) &&')
content = content.replace('{b.website}</div>', '{b.website_url || b.website}</div>')

# Fix QR Code download logic
download_btn = '''<button
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <Download className="w-4 h-4" /> PNG
                </button>'''

new_download_btn = '''<button
                  onClick={() => {
                    const canvas = document.querySelector("canvas");
                    if (canvas) {
                      const pngUrl = canvas
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");
                      const downloadLink = document.createElement("a");
                      downloadLink.href = pngUrl;
                      downloadLink.download = ${b.slug || "glowqr"}-code.png;
                      document.body.appendChild(downloadLink);
                      downloadLink.click();
                      document.body.removeChild(downloadLink);
                    } else if (b.qr_image_url) {
                      window.open(b.qr_image_url, "_blank");
                    }
                  }}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  <Download className="w-4 h-4" /> PNG
                </button>'''

content = content.replace(download_btn, new_download_btn)

# Add Google Review link
google_review_section = '''<div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600"><MapPin className="w-4 h-4" /> {b.city}, PIN verified</div>
                {(b.website_url || b.website) && <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600"><Globe className="w-4 h-4" /> {b.website_url || b.website}</div>}
              </div>'''

new_google_review_section = '''<div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600"><MapPin className="w-4 h-4" /> {b.city}, PIN verified</div>
                {(b.website_url || b.website) && <a href={b.website_url || b.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"><Globe className="w-4 h-4" /> Website</a>}
                {b.google_review_url && <a href={b.google_review_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:underline"><Star className="w-4 h-4" /> Google Review Link</a>}
              </div>'''

content = content.replace(google_review_section, new_google_review_section)

with open('OverviewTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated OverviewTab.tsx")
