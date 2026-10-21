import { NextResponse } from 'next/server'

// Protects /translator-dashboard/* (same app, same port 3001).
// `translator-session` is a routing flag set right after translator login;
// the API still verifies the real HttpOnly cookie.
export function proxy(request) {
    const auth = request.cookies.get('translator-session')?.value

    if (auth !== '1') {
        const url = new URL('/login', request.url)
        url.searchParams.set('type', 'translator')
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/translator-dashboard/:path*'],
}
