import type { Metadata } from "next";
import { Inter, Roboto_Serif } from "next/font/google";
import "./globals.css";
import BASE_URL from '@/lib/seo';

const inter = Inter({
  variable: "--font-inter-normal",
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashwin Parande 🌻 🌊 | Full-stack Developer",
  description:
    "Full-stack developer building modern web apps with Next.js, TypeScript, and scalable video pipelines.",
  keywords: [
    'Next.js',
    'TypeScript',
    'React',
    'Full-stack',
    'Node.js',
    'video pipelines',
  ],
  authors: [{ name: 'Ashwin Parande', url: BASE_URL }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Ashwin Parande 🌻 🌊 | Full-stack Developer',
    description:
      'Full-stack developer building modern web apps with Next.js, TypeScript, and scalable video pipelines.',
    url: BASE_URL,
    siteName: 'ashwin.wtf',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Ashwin Parande 🌻 🌊 | Full-stack Developer',
    description:
      'Full-stack developer building modern web apps with Next.js, TypeScript, and scalable video pipelines.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
