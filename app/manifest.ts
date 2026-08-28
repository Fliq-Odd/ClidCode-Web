import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CLIQ Code",
    short_name: "CLIQ Code",
    description: "AI coding assistant for terminal workflows.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#00FFA2",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}