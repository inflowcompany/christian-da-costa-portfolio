import type { MetadataRoute } from "next";
import { getCases } from "@/lib/cases";
import { baseURL, routes } from "@/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.entries(routes).filter(([, enabled]) => enabled).map(([route]) => ({
      url: `${baseURL}${route === "/" ? "" : route}`,
    })),
    ...getCases().map((post) => ({ url: `${baseURL}/work/${post.slug}` })),
  ];
}

