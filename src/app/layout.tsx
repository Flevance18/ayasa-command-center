import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayasa Command Center",
  description: "Interactive anime-neobrutalist command deck for Ayasa / Flevance18.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
