import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
