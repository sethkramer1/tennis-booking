import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProviderWrapper } from "@/components/AuthProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Court Booker",
  description: "Book tennis courts at your local club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
