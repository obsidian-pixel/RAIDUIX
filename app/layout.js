import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Raiduix | The Ultimate Visual UI Builder & Code Generator",
  description:
    "Build stunning UIs with React, Vue, and Angular. Switch between Neo-Material, Glass, and Skeuomorphic themes instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicons and manifest for SEO */}
        <link
          rel="icon"
          type="image/png"
          href="/raiduix_logo_transparent_bg.PNG"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Analytics />
          {children}
        </ThemeProvider>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Raiduix",
              operatingSystem: "WEB",
              applicationCategory: "DeveloperApplication",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "125",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "A free, open-source design tool that turns visual ideas into production-ready code for React, Vue, and Angular.",
              url: "https://raiduix.app",
            }),
          }}
        />
      </body>
    </html>
  );
}
