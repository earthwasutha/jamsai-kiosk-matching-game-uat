import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { StoreHydration } from "@/app/components/StoreHydration"; // ✅ เพิ่ม

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  icons: [{ rel: "icon", href: "/images/jamsai.png", url: "" }],
  title: "Jamsai Book Theater 2025",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/images/logo.webp" as="image" />
        <link rel="preload" href="/images/50-Hearts.webp" as="image" />
        <link rel="preload" href="/images/100-Hearts.webp" as="image" />
        <link rel="preload" href="/images/200-Hearts.webp" as="image" />
        <link rel="preload" href="/images/300-Hearts.webp" as="image" />
        <link rel="preload" href="/images/congratulations.webp" as="image" />
        <link rel="preload" href="/images/congratulations2.webp" as="image" />
        <link rel="preload" href="/images/BG-Home1.webp" as="image" />
        <link rel="preload" href="/images/BG-Home2.webp" as="image" />
        <link rel="preload" href="/images/Hearts.webp" as="image" />
        <link rel="preload" href="/images/Hearts2.webp" as="image" />
        <link rel="preload" href="/images/cards/1.webp" as="image" />
        <link rel="preload" href="/images/cards/2.webp" as="image" />
        <link rel="preload" href="/images/cards/3.webp" as="image" />
        <link rel="preload" href="/images/cards/4.webp" as="image" />
        <link rel="preload" href="/images/cards/5.webp" as="image" />
        <link rel="preload" href="/images/cards/6.webp" as="image" />
        <link rel="icon" type="image/svg+xml" href="/images/jamsai.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${kanit.className} antialiased`}>
        <StoreHydration />
        <div className="flex justify-center w-full overflow-x-hidden bg-black">
          <div className="w-full overflow-x-hidden bg-white max-w-3xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}