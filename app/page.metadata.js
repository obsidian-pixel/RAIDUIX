// Server-side metadata export for Next.js
export async function generateMetadata() {
  return {
    // --- Core SEO Metadata ---
    title: "Raiduix | The Free, Open-Source Visual UI Builder & Code Generator",
    description:
      "Build stunning user interfaces with a drag-and-drop canvas. Instantly switch between Material, Glass, and Skeuomorphic themes, and generate clean, production-ready code for React, Vue, and Angular. Free forever.",
    keywords: [
      "UI builder",
      "design tool",
      "open source",
      "React code generator",
      "Vue UI builder",
      "Angular visual editor",
      "glassmorphism generator",
      "skeuomorphism UI kit",
      "no-code to code",
      "front-end development",
    ],
    applicationName: "Raiduix",
    authors: [
      {
        name: "Raiduix Team",
        url: "https://github.com/obsidian-pixel/RAIDUIX",
      },
    ],
    creator: "Raiduix Team",
    publisher: "Raiduix Team",
    // --- End Core SEO ---

    // --- Open Graph (OG) Metadata for Social Sharing ---
    openGraph: {
      title: "Raiduix: The Visual Layer for Your Code. Free & Open-Source.",
      description:
        "Visually build UIs with themeable components and instantly generate code for React, Vue, & Angular. Stop translating, start creating.",
      url: "https://raiduix.app",
      siteName: "Raiduix",
      images: [
        {
          url: "https://raiduix.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Raiduix application interface showing the canvas, component library, and code generation panel.",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    // --- End Open Graph ---

    // --- Twitter Card Metadata ---
    twitter: {
      card: "summary_large_image",
      title: "Raiduix: The Visual Layer for Your Code. Free & Open-Source.",
      description:
        "Visually build UIs with themeable components and instantly generate code for React, Vue, & Angular. Stop translating, start creating.",
      site: "@raiduix_app",
      creator: "@raiduix_app",
      images: ["https://raiduix.app/og-image.png"],
    },
    // --- End Twitter Card ---
  };
}
