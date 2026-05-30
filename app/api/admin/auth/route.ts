import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json();
    
    // Hardcode the admin secret for comparison, or ideally fetch from env
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'supersecretadmin';

    if (secret === ADMIN_SECRET) {
      cookies().set('admin_session', secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid secret' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE() {
  cookies().delete('admin_session');
  return NextResponse.json({ success: true });
}
