import type { Metadata } from "next";
import { inter, instrumentSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vit Rehacek — Builder & Founder",
    template: "%s | Vit Rehacek",
  },
  description:
    "Student founder, builder, and explorer. Building things that matter.",
  openGraph: {
    title: "Vit Rehacek — Builder & Founder",
    description:
      "Student founder, builder, and explorer. Building things that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
