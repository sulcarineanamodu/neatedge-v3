import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/admin/login' ||
    !request.nextUrl.pathname.startsWith('/admin')
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('admin_session');

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
