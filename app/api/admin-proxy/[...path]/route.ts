import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/api-config';
import { cookies } from 'next/headers';

async function handler(req: NextRequest, { params }: { params: { path: string[] } }) {
  const token = cookies().get('admin_session')?.value;
  const path = params.path.join('/');
  
  const headers = new Headers(req.headers);
  if (token) headers.set('cookie', `admin_session=${token}`);
  // Remove host header to avoid SSL mismatch on render
  headers.delete('host');
  
  const url = `${API_BASE_URL}/api/admin/${path}${req.nextUrl.search}`;
  
  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body: (req.method !== 'GET' && req.method !== 'HEAD') ? await req.text() : undefined,
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
