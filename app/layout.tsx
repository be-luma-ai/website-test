import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeLuma",
  description:
    "Simplify your marketing insights through AI and Data integration",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="max-w-6xl mx-auto p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
