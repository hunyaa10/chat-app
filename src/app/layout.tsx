import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: "Chat Application",
  description: "Real-time chat application built with Next.js",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-chosungu antialiased">
        <Header />
        <main className="min-h-screen"> {/* pt-14 제거하고 min-h-screen 추가 */}
          {children}
        </main>
      </body>
    </html>
  );
}
