import { notFound } from "next/navigation";
import { ReviewPageOrchestrator } from "@/components/review/ReviewPageOrchestrator";

// This is a mock function to fetch business data
// In a real application, this would fetch from a database or external API
async function getBusinessData(slug: string) {
  // Simulating a DB lookup
  // For demonstration, we'll return a dynamic object based on the slug
  if (!slug) return null;

  return {
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    tagline: "Experience the excellence with us",
    location: "Downtown Area",
    primaryColor: "#1D9E75", // Updated default color to brand green
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83fYSh", // Example Place ID
    plan: "premium", // Mock plan
    menuItems: [
      { id: "1", name: "Signature Coffee", icon: "Coffee" },
      { id: "2", name: "Avocado Toast", icon: "Utensils" },
      { id: "3", name: "Fresh Croissant", icon: "Croissant" },
      { id: "4", name: "Garden Salad", icon: "Utensils" },
      { id: "5", name: "Fruit Bowl", icon: "Heart" }
    ]
  };
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
