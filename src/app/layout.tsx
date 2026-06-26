import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACM-W Build Accelerator 2026",
  description: "A focused 4-week build accelerator for SNU students. Learn, build, and submit projects in Web Dev, AI/ML, and Data Science.",
  icons: {
    icon: "/acmw-logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="font-sans bg-theme-default text-brand-text min-h-screen flex flex-col selection:bg-brand-blue/20">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
