import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const SITE_NAME = "alfanar MV Switchgear";
const SITE_DESC =
  "Explore alfanar's medium-voltage 'alfa' switchgear in interactive 3D — learn how every part works, then specify and request a quote. A beacon for reliable power.";

export const metadata: Metadata = {
  metadataBase: new URL("https://alfanar-switchgear.example.com"),
  title: {
    default: `${SITE_NAME} — Interactive 3D Product & Learning`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "alfanar",
    "MV switchgear",
    "medium voltage",
    "air insulated switchgear",
    "vacuum circuit breaker",
    "IEC 62271-200",
    "alfa 12",
    "3D switchgear",
  ],
  authors: [{ name: "alfanar" }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Interactive 3D Product & Learning`,
    description: SITE_DESC,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#07151f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-grid min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--cta-bg)] focus:px-4 focus:py-2 focus:text-[var(--cta-fg)]"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
