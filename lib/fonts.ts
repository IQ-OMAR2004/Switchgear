import { Poppins, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

// Self-hosted at build time by next/font — no hotlinking to Google.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontVariables = `${poppins.variable} ${plexSans.variable} ${plexMono.variable}`;
