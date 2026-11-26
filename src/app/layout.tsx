import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jb-mono", subsets: ["latin"] });
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Le Thanh Phuong — Full-Stack Developer",
  description:
    "Full-stack developer with 4 years shipping B2B platforms, internal tools, Web3 products and wearable health apps end to end. NestJS, Laravel, React/Next.js, Flutter, Kubernetes & ArgoCD.",
  openGraph: {
    title: "Le Thanh Phuong — Full-Stack Developer",
    description:
      "NestJS · Laravel · React/Next.js · Flutter · Kubernetes & ArgoCD. Based in Ho Chi Minh City.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${mono.variable} ${syne.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
