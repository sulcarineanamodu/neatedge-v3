import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Pass pathname to layout for canonical URL generation
  response.headers.set('x-pathname', request.nextUrl.pathname);

  // Admin auth check
  if (
    request.nextUrl.pathname === '/admin/login' ||
    !request.nextUrl.pathname.startsWith('/admin')
  ) {
    return response;
  }

  const sessionCookie = request.cookies.get('admin_session');

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/admin/:path*'],
};
