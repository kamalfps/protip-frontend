import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProTip.live | Premium Multi-Tenant Streaming Platform",
  description: "The ultimate white-label streaming platform. Launch custom branded domains, manage multi-tenant setups, and optimize creator revenue effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
