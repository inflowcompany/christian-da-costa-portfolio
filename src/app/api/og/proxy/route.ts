// Optional upstream endpoint is outside phase 1; no external requests or private content.
export function GET() {
  return new Response(null, { status: 404 });
}

