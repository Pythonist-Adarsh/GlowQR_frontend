import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      food_rating, 
      service_rating, 
      meal_type, 
      selected_items, 
      wait_time, 
      spend_range, 
      seating_type,
      business_name,
      location
    } = body;

    // AI Prompt Construction (Conceptual)
    // Generate natural language review based on these inputs
    // Do NOT use symbols (⭐)
    
    // For now, we simulate AI generation with a sophisticated template system
    // that mimics natural language based on the detailed inputs.
    
    const dishList = selected_items && selected_items.length > 0 
      ? selected_items.join(", ") 
      : "everything";

    const reviews = [
      `I had a fantastic ${meal_type} at ${business_name}. The food was outstanding, especially the ${dishList}. The service was incredibly attentive with a wait time of only ${wait_time}. The ${seating_type} seating made for a great atmosphere. Highly recommended for anyone looking to spend around ${spend_range} for a premium experience.`,
      `Great visit to ${business_name} in ${location}. We came for ${meal_type} and were not disappointed. The ${seating_type} atmosphere was lovely, and the food quality was top-notch. Our ${wait_time} wait was well worth it for the ${dishList}. Definitely worth the ${spend_range} price point for the service we received.`,
      `${business_name} is definitely a must-visit in ${location}. The ${food_rating}/5 food and ${service_rating}/5 service made our ${meal_type} special. Really enjoyed the ${dishList} in the ${seating_type} area. Fast ${wait_time} service and reasonable ${spend_range} pricing. I'll definitely be back!`
    ];

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error generating review:', error);
    return NextResponse.json({ error: 'Failed to generate review' }, { status: 500 });
  }
}
