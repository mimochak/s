import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Administration — Golden Spoon Bio",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-cream-100 font-sans text-ink-950 antialiased">
        {children}
      </body>
    </html>
  );
}
