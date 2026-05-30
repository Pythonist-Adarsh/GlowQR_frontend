import re

with open('DashboardClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '{activeTab === "reviews" && ('
end_str = '{(activeTab === "overview" || activeTab === "qr") && ('

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + '''{activeTab === "reviews" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-900 mb-6">All Reviews</h2>
            {(!analyticsSummary?.all_reviews || analyticsSummary.all_reviews.length === 0) ? (
              <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No reviews yet</h3>
                <p className="text-slate-500 text-sm">When customers scan your QR code and leave a review, they will appear here.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {analyticsSummary.all_reviews.map((rev: any, i: number) => (
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
                    </div>
                    {rev.selected_items && rev.selected_items.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {rev.selected_items.map((item: string, j: number) => (
                          <span key={j} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold tracking-wider uppercase">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-slate-700 leading-relaxed italic">
                      "{rev.review_text || Customer enjoyed their visit and left a positive rating!}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        ''' + content[end_idx:]
    with open('DashboardClient.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated reviews tab")
else:
    print("Could not find blocks")
