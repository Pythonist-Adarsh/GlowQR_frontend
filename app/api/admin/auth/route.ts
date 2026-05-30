import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { API_BASE_URL } from '@/lib/api-config';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    const backendRes = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (backendRes.ok) {
      // Extract the cookie from backend response
      const setCookieHeader = backendRes.headers.get('set-cookie');
      
      const response = NextResponse.json({ success: true });
      if (setCookieHeader) {
        response.headers.set('set-cookie', setCookieHeader);
      }
      return response;
    }

    const errorData = await backendRes.json();
    return NextResponse.json({ success: false, error: errorData.detail || 'Login failed' }, { status: backendRes.status });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  cookies().delete('admin_session');
  return NextResponse.json({ success: true });
}
