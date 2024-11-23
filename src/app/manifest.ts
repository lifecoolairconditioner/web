import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Life Cool Air Conditioners",
    short_name: "Life Cool",
    description: "Book AC on rent & maintainance services",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/logosmall.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logosmall.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
