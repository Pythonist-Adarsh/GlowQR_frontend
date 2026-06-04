import re

with open('d:/glowQR/frontend/components/dashboard/DashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''                  {analyticsSummary.all_reviews.map((rev: any, i: number) => (
                    <div key={i} className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-1 text-emerald-500">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={w-4 h-4 } />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          {rev.created_at ? new Date(rev.created_at).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>'''

replacement = '''                  {analyticsSummary.all_reviews.map((rev: any, i: number) => {
                    const isPositive = (rev.overall_rating || 5) >= 3;
                    const bgColor = isPositive ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200";
                    const starColor = isPositive ? "text-emerald-500" : "text-red-500";
                    const statusBg = rev.redirected_to_google ? "bg-blue-100 text-blue-800" : "bg-slate-200 text-slate-600";
                    
                    return (
                    <div key={i} className={p-6 rounded-[2rem] border shadow-sm }>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className={lex items-center gap-1 }>
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className={w-4 h-4 } />
                            ))}
                          </div>
                          <span className={px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider }>
                            {rev.redirected_to_google ? "Posted on Google" : "Not posted"}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          {rev.created_at ? new Date(rev.created_at).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>'''

content = content.replace(target, replacement)
content = content.replace('"{rev.review_text || Customer enjoyed their visit and left a positive rating!}"', '"{rev.review_text || Customer left a rating.}"')
content = content.replace('</p>\n                    </div>\n                  ))}','</p>\n                    </div>\n                  )})}');

with open('d:/glowQR/frontend/components/dashboard/DashboardClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
