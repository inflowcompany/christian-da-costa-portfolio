import { ImageResponse } from "next/og";
import { person } from "@/resources";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const title = (new URL(request.url).searchParams.get("title") || "SaaS, Product & Implementation").slice(0, 180);
  // Uses next/og's bundled fallback font; no external font/avatar request at runtime.
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "#151515", color: "#ffffff" }}>
      <span style={{ fontSize: 32, color: "#a1e9ef" }}>{person.name}</span>
      <span style={{ fontSize: title.length > 80 ? 48 : 64, lineHeight: 1.15 }}>{title}</span>
      <span style={{ fontSize: 28 }}>Technical Project Manager · SaaS • Product • Implementation • AI</span>
    </div>,
    { width: 1200, height: 630 },
  );
}
