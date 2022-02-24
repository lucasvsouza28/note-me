import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const res = NextResponse.next();;
  res.headers.append('Set-Cookie', `csrfToken=teste`)

  return res;
}
