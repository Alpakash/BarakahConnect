import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { draftMode } from "next/headers";
import VisualEditingWrapper from "@/components/VisualEditingWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://barakahconnect.nl"),
  title: {
    default: "Barakah Connect | Islamitische Netwerkorganisatie",
    template: "%s | Barakah Connect",
  },
  description: "Een netwerkorganisatie die broeders en zusters verbindt in de regio middels bijeenkomsten. Samen sterker, versterk de ummah.",
  keywords: ["Netwerkorganisatie", "Islamitisch", "Moslim Ondernemers", "Broeders en Zusters", "Netwerken", "Bijeenkomsten", "Barakah", "Ummah", "Halal Ondernemen"],
  authors: [{ name: "Barakah Connect" }],
  creator: "Barakah Connect",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://barakahconnect.nl",
    siteName: "Barakah Connect",
    title: "Barakah Connect | Islamitische Netwerkorganisatie",
    description: "Een netwerkorganisatie die broeders en zusters verbindt in de regio middels bijeenkomsten.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 800,
        alt: "Barakah Connect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barakah Connect | Islamitische Netwerkorganisatie",
    description: "Een netwerkorganisatie die broeders en zusters verbindt in de regio.",
    images: ["/og-image.jpg"],
  },
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode()
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        {isEnabled && <VisualEditingWrapper />}
      </body>
    </html>
  );
}
