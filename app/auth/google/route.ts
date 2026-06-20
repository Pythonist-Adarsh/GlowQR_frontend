import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api-config";

export async function GET() {
  // Redirect to the backend OAuth initialization endpoint
  return NextResponse.redirect(`${API_BASE_URL}/auth/google`);
}
