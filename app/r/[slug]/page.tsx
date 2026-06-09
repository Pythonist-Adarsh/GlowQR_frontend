import { notFound } from "next/navigation";
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
    
    return {
      name: data.business_name,
      tagline: data.tagline || "Experience the excellence with us",
      location: data.city || "Downtown Area",
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

  return (
    <main className="min-h-screen relative">
      <ReviewPageOrchestrator initialData={businessData} />
    </main>
  );
}
