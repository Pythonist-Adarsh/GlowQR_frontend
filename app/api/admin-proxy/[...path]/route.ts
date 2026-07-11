import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/api-config';
import { cookies } from 'next/headers';

async function handler(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  const { path: pathArray } = await context.params;
  const path = pathArray.join('/');
  
  const headers = new Headers(req.headers);
  if (token) headers.set('cookie', `admin_session=${token}`);
  // Remove host header to avoid SSL mismatch on render
  headers.delete('host');
  
  const url = `${API_BASE_URL}/api/admin/${path}${req.nextUrl.search}`;
  
  try {
    let body = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const text = await req.text();
      if (text) body = text;
    }

    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    });
    
    // For export endpoints we need to return the raw blob
    if (path.includes('export')) {
        const blob = await res.blob();
        const responseHeaders = new Headers(res.headers);
        return new NextResponse(blob, {
            status: res.status,
            headers: responseHeaders
        });
    }

    const data = await res.text();
    
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', res.headers.get('content-type') || 'application/json');
    
    return new NextResponse(data, {
      status: res.status,
      headers: responseHeaders
    });
  } catch (err) {
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
