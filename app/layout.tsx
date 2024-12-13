import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SessionProvider } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SessionProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
