import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let requestHeaders: { [key: string]: string } = {
    'user-agent': request.headers.get('user-agent'),
    referer: request.headers.get('referer'),
    host: request.headers.get('host'),
  };

  const response = NextResponse.next();

  console.log(`${request.method} ${request.url} ${JSON.stringify(requestHeaders)} ${response.status}`);

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
