import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import LeadAttribution from "@/components/LeadAttribution";
import { Suspense } from "react";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.devisery.com"),
	title: "Devisery - Transform Your Business with Expert Solutions",
	description:
		"Professional consulting, development, and design services to help your business grow. Expert solutions for digital transformation and business optimization.",
	alternates: { canonical: "/" },
	openGraph: { type: "website", url: "/", siteName: "Devisery", images: [{ url: "/og-image.jpg", alt: "Devisery business consulting" }] },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
			>
				<Suspense fallback={null}><LeadAttribution /></Suspense>
				<Header />
				{children}
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
