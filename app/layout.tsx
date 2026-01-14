import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans, Bebas_Neue } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SITE_CONFIG, COMPANY } from "@/lib/constants";
import "./globals.css";

// Elegant serif for display - refined, editorial
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Clean, modern sans for body
const instrument = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Bold display for hero headlines
const bebas = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "bouwbedrijf",
    "aannemer",
    "renovatie",
    "nieuwbouw",
    "erfgoedrenovatie",
    "België",
    "Oost-Vlaanderen",
    "Zele",
    "De Raedt",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-BE">
      <body className={`${instrument.variable} ${cormorant.variable} ${bebas.variable} font-body antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
