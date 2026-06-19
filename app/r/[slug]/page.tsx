import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { ReviewPageOrchestrator } from "@/components/review/ReviewPageOrchestrator";
import { API_BASE_URL } from "@/lib/api-config";

// This is a mock function to fetch business data
// In a real application, this would fetch from a database or external API
async function getBusinessData(slug: string) {
  if (!slug) return null;

  try {
    // Determine the API URL depending on the environment
    const apiUrl = API_BASE_URL;
    console.log(`[DEBUG] Fetching QR Data for slug: ${slug} from ${apiUrl}/api/qr/${slug}`);
    
    const res = await fetch(`${apiUrl}/api/qr/${slug}`, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error(`[DEBUG] Failed to fetch QR data: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.error(`[DEBUG] Response body:`, text);
      return null;
    }
    
    const data = await res.json();
    
    if (data.status === "paused") {
      return { status: "paused", message: data.message };
    }
    
    return {
      name: data.business_name,
      tagline: data.tagline || "Experience the excellence with us",
      location: data.city || "Downtown Area",
      business_category: data.business_category || "",
      category: data.business_category || "Restaurant",
      primaryColor: data.brand_color || "#1D9E75",
      logoUrl: data.logo_url,
      website: data.website || "",
      instagram_url: data.instagram_url || "",
      googleReviewUrl: data.google_review_url || "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83fYSh",
      plan: data.plan || "trial",
      animationStyle: data.animation_style,
      welcomeMessage: data.welcome_message,
      particleIntensity: data.particle_intensity,
      seasonalTheme: data.seasonal_theme,
      negativeFilterEnabled: data.negative_filter_enabled,
      highlighted_dishes: data.highlighted_dishes,
      menuItems: data.menu_items && data.menu_items.length > 0 
        ? data.menu_items.map((item: string, idx: number) => ({
            id: String(idx + 1),
            name: item,
            icon: "Utensils"
          }))
        : [
            { id: "1", name: "Signature Coffee", icon: "Coffee" },
            { id: "2", name: "Avocado Toast", icon: "Utensils" }
          ]
    };
  } catch (error) {
    console.error("Error fetching business data:", error);
    return null;
  }
}

export default async function BusinessReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const businessData = await getBusinessData(slug);

  if (!businessData) {
    notFound();
  }
  
  if (businessData.status === "paused") {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl max-w-md w-full text-center border border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Service Temporarily Unavailable</h1>
          <p className="text-slate-500 leading-relaxed font-medium">
            This business is currently not accepting reviews. Please check back later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative">
      <ReviewPageOrchestrator initialData={businessData} />
    </main>
  );
}
