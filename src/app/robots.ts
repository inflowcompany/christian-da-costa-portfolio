import type { MetadataRoute } from "next";

// Phase 1 contains unvalidated case placeholders. Revisit before publication.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}

