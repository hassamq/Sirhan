import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function allowedOrigins() {
  const fromEnv = [
    process.env.ADMIN_ORIGIN,
    process.env.ADMIN_ORIGINS,
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "https://sirhan-wcmd.vercel.app",
  ]
    .filter(Boolean)
    .flatMap((value) => String(value).split(","))
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(fromEnv));
}

function isTrustedAdminOrigin(origin: string) {
  if (allowedOrigins().includes(origin)) return true;
  // Allow Sirhan admin deployments / previews on Vercel
  try {
    const host = new URL(origin).hostname;
    return (
      host === "sirhan-wcmd.vercel.app" ||
      /^sirhan.*-.*\.vercel\.app$/i.test(host) ||
      /^sirhan-wcmd-.*\.vercel\.app$/i.test(host)
    );
  } catch {
    return false;
  }
}

function resolveOrigin(request: NextRequest) {
  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && isTrustedAdminOrigin(requestOrigin)) {
    return requestOrigin;
  }

  // Fallback for same-origin API calls / tools without Origin
  return allowedOrigins()[0] || "*";
}

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const origin = resolveOrigin(request);
  const headers = corsHeaders(origin);

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers,
    });
  }

  const response = NextResponse.next();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
