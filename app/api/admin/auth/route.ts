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
      const data = await backendRes.json();
      
      if (data.token) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24, // 24 hours
        });
      }
      return NextResponse.json({ success: true });
    }

    const errorData = await backendRes.json();
    return NextResponse.json({ success: false, error: errorData.detail || 'Login failed' }, { status: backendRes.status });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
