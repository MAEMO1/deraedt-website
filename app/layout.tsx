import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Syne } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SITE_CONFIG, COMPANY } from "@/lib/constants";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      <body className={`${dmSans.variable} ${playfair.variable} ${syne.variable} font-body antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
