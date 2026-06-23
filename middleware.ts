import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  
  // Auto-redirect any old physical QR codes scanning the vercel domain
  if (host.includes('vercel.app')) {
    const url = request.nextUrl.clone();
    url.host = 'glowqr.com';
    url.port = '';
    url.protocol = 'https:';
    // 301 Permanent Redirect
    return NextResponse.redirect(url, 301);
  }

  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const adminSession = request.cookies.get('admin_session')
    
    if (!adminSession?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
