import re

with open('d:/glowQR/frontend/components/onboarding/OnboardingWizard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace the useEffect that reads localStorage.
# We will just search for the start of the useEffect and replace until the end of it.
pattern = re.compile(r"useEffect\(\(\) => \{\s*const existing = localStorage\.getItem\('glowqr_business_data'\).*?\}, \[\]\)", re.DOTALL)

replacement = '''useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(${API_BASE_URL}/api/onboarding/status, {
      headers: { 'Authorization': Bearer  }
    })
    .then(res => res.json())
    .then(result => {
      if (result.business) {
        const parsed = result.business;
        // Only autofill if they have actually onboarded or have saved data
        if (result.is_onboarded || parsed.name) {
            setData((prev: any) => ({
              ...prev,
              name: parsed.name || prev.name,
              tagline: parsed.tagline || prev.tagline,
              googleReviewUrl: parsed.google_review_url || prev.googleReviewUrl,
              placeId: parsed.place_id || prev.placeId,
              currentRating: parsed.google_rating || prev.currentRating,
              reviewCount: parsed.review_count || prev.reviewCount,
              city: parsed.city || prev.city,
              area: parsed.area_locality || prev.area,
              address: parsed.address || prev.address,
              phone: parsed.phone_number || prev.phone,
              whatsapp: parsed.whatsapp_number || prev.whatsapp,
              email: parsed.owner_email || prev.email,
              openTime: parsed.business_hours?.opening || prev.openTime,
              closeTime: parsed.business_hours?.closing || prev.closeTime,
              daysOpen: parsed.business_hours?.days || prev.daysOpen,
              category: parsed.category || prev.category,
              spendRange: parsed.price_range || prev.spendRange,
              speciality: parsed.cuisine_speciality || prev.speciality,
              dietary: parsed.dietary_options || prev.dietary,
              theme: parsed.animation_style === 'particle_burst' ? 'classic' : parsed.animation_style === 'minimal_fade' ? 'premium' : 'free',
              primaryColor: parsed.primary_color || prev.primaryColor,
              variants: parsed.ai_variant_count ? ${parsed.ai_variant_count} variants : prev.variants,
              language: parsed.review_language ? parsed.review_language.charAt(0).toUpperCase() + parsed.review_language.slice(1) : prev.language,
              logo: parsed.logo_url || prev.logo,
              plan: parsed.plan || prev.plan,
            }));
        }
      } else {
        // If no business exists at all in the backend for this user, ensure local storage is wiped
        localStorage.removeItem('glowqr_business_data');
      }
    })
    .catch(err => console.error("Failed to load onboarding status", err));
  }, []);'''

new_content, count = pattern.subn(replacement, content)

if count > 0:
    with open('d:/glowQR/frontend/components/onboarding/OnboardingWizard.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated OnboardingWizard.tsx")
else:
    print("Failed to find pattern in OnboardingWizard.tsx")
