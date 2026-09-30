import { Metadata } from 'next';
import Head from 'next/head';

interface Props {
  params: { slug: string };
}

// Ensure this page is server-side rendered
export const dynamic = 'force-dynamic';

async function getBusinessData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:10000'}/ai-profile/${slug}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch business data');
  }
  
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getBusinessData(params.slug);
  
  if (!data) {
    return { title: 'Business Not Found | GlowQR' };
  }
  
  return {
    title: `${data.business.name} - FAQs & Reviews | GlowQR`,
    description: `Real customer reviews, FAQs, and facts about ${data.business.name} in ${data.business.city}.`,
  };
}

export default async function BusinessProfilePage({ params }: Props) {
  const data = await getBusinessData(params.slug);
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Not Found</h1>
          <p className="text-gray-600">The business profile you are looking for does not exist or is not published yet.</p>
        </div>
      </div>
    );
  }

  const { business, faq_json, structured_facts } = data;
  const addressString = [business.address, business.area_locality, business.city, business.state, business.pincode].filter(Boolean).join(', ');

  // Generate LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.city,
      "addressRegion": business.state,
      "postalCode": business.pincode,
      "addressCountry": "IN"
    },
    "aggregateRating": business.google_rating ? {
      "@type": "AggregateRating",
      "ratingValue": business.google_rating,
      "reviewCount": business.review_count
    } : undefined
  };

  // Generate FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq_json?.map((faq: any) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    })) || []
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {faq_json && faq_json.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{business.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{business.category} • {business.city}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Location</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{addressString}</p>
            </div>
            {business.business_hours && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Hours</h3>
                <p className="text-gray-700">See Google Maps for current hours.</p>
              </div>
            )}
          </div>
        </div>

        {/* Extracted Facts Section */}
        {structured_facts && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Customers Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {structured_facts.dishes_mentioned && structured_facts.dishes_mentioned.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Popular Items</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {structured_facts.dishes_mentioned.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {structured_facts.praise_points && structured_facts.praise_points.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {structured_facts.praise_points.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQs Section */}
        {faq_json && faq_json.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faq_json.map((faq: any, i: number) => (
                <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Are you a business owner?</p>
          <a 
            href="https://glowqr.com" 
            className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Get a page like this for your business
          </a>
        </div>
      </main>
    </div>
  );
}
