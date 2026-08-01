import { Metadata } from 'next';
import Link from 'next/link';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { Footer } from '@/components/landing/Footer';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Google Business Health Checker | GlowQR',
  description: 'Check your Google Business Profile score for free. See how you rank vs local competitors and if AI tools like ChatGPT can find your business.',
  alternates: {
    canonical: 'https://www.glowqr.com/health-checker',
  }
};

export default function HealthCheckerPage() {
  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the GlowQR Health Checker really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The tool requires no signup, no credit card, and no payment to see full results. It's designed as a free diagnostic tool for any local business owner in India."
        }
      },
      {
        "@type": "Question",
        "name": "What is GEO and AEO, and why does it matter for a local business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) refer to how discoverable a business is to AI tools like ChatGPT, Perplexity, and Google AI Overviews — as opposed to traditional search engine ranking. As more customers ask AI tools directly for local recommendations, a business that isn't optimized for AI discovery can be invisible in this channel even while ranking well on Google Maps."
        }
      },
      {
        "@type": "Question",
        "name": "How is this different from just checking my Google Business Profile rating myself?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A star rating alone doesn't show how a business compares to nearby competitors, whether its review count is falling behind the local average, or whether its online presence is structured in a way AI search tools can actually read. The Health Checker combines all of this into one comparative, actionable report."
        }
      },
      {
        "@type": "Question",
        "name": "Does this work for any type of business, or only restaurants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The tool works across all local business categories supported by GlowQR, including restaurants, cafes, salons, gyms, CA firms, bakeries, jewellery stores, real estate agencies, and more — each category is compared against its own relevant local competitors, not a generic benchmark."
        }
      },
      {
        "@type": "Question",
        "name": "What happens after I see my score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The report shows specific next steps based on the business's weakest area — whether that's closing a review-count gap, fixing structured data on a website, or improving review detail. Businesses can act on these independently, or use GlowQR's core product to automate review collection."
        }
      }
    ]
  };

  const jsonLdSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GlowQR Health Checker",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Check your Google Business Profile score for free. See how you rank vs local competitors and if AI tools like ChatGPT can find your business."
  };

  return (
    <div className="min-h-screen font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <LandingNavbar forceScrolled={true} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-[var(--text-primary)]">
            Is Your Business Actually Visible — Or Just You Think So?
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            GlowQR's Business Health Checker is a free tool that shows any local business 
            owner in India exactly how their Google Business Profile compares to nearby 
            competitors — and, for the first time, whether their business is discoverable 
            to AI search tools like ChatGPT and Google AI Overviews. The tool checks a 
            business's Google rating, review count, and review recency against real, 
            live data from competitors in the same category and area, then scores the 
            business's "AI Search Readiness" based on structured data, website 
            signals, and review quality. Results are generated in under 30 seconds, 
            require no signup, and are completely free.
          </p>
        </header>

        {/* Content Section */}
        <article className="space-y-12">
          
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)]">
              Why Local Visibility Isn't What It Used To Be
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                For years, ranking well on Google Maps was the finish line for local business 
                visibility. That's no longer the full picture. A growing share of customers 
                now ask AI tools directly for recommendations — "what's the best bakery near 
                me," "which CA firm should I use in my city" — instead of scrolling through 
                search results themselves. This shift has a name: <strong>Generative Engine 
                Optimization (GEO)</strong> and <strong>Answer Engine Optimization (AEO)</strong> — the practice 
                of making a business's information structured and trustworthy enough for AI 
                systems to read, understand, and recommend it.
              </p>
              <p>
                A business can have an excellent Google rating and still be completely 
                invisible to this newer form of search — because AI tools look for different 
                signals than traditional search rankings do: structured data (Schema.org 
                markup), consistent business information across the web, and specific, 
                detailed customer reviews rather than generic praise.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)]">
              What the Health Checker Actually Measures
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">The tool combines three dimensions into a single Health Score (0–100):</p>
            
            <div className="space-y-6">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">1. Local Visibility (Google Maps & Reviews)</h3>
                <p className="text-[var(--text-secondary)]">Compares the business's rating, review count, and review recency against the real local average and top competitors in the same category and area — using live Google Places data, not estimates.</p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">2. Website SEO</h3>
                <p className="text-[var(--text-secondary)]">Checks fundamental on-page search signals — page titles, meta descriptions, and whether the site is properly indexable.</p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">3. AI Search Readiness (GEO/AEO)</h3>
                <p className="text-[var(--text-secondary)]">The newest and most differentiated part of the score. Checks for LocalBusiness structured data (Schema.org JSON-LD), FAQ or Q&A-formatted content, consistency of business name/address/phone across the web, and whether the business's Google reviews contain specific, quotable details that AI engines are more likely to surface in a recommendation.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)]">
              See Exactly Where You Stand
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">Beyond the score itself, the report shows:</p>
            <ul className="list-disc pl-6 space-y-3 text-[var(--text-secondary)]">
              <li><strong>A local competitor leaderboard</strong> — real ranking against 5–8 nearby businesses in the same category</li>
              <li><strong>A 90-day growth projection</strong> — where the business could realistically be if it closes its review gap at a steady pace</li>
              <li><strong>Specific, actionable issues</strong> — plain-language explanations of exactly what's holding the score back, not vague scores with no context</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {jsonLdFAQ.mainEntity.map((faq, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{faq.name}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-3xl p-8 md:p-12 text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)]">
              Check Your Business Now
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 text-lg">
              Free, instant, and requires nothing but your business name.
            </p>
            <Link href="/score">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 mx-auto">
                Check My Free Score <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </section>
        </article>

      </main>

      <Footer />
    </div>
  );
}
