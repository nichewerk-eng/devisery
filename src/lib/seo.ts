import { Metadata } from "next";

interface SEOData {
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
	url?: string;
	type?: "website" | "article";
}

export function generateMetadata({
	title,
	description,
	keywords = [],
	image = "/og-image.jpg",
	url = "",
	type = "website",
}: SEOData): Metadata {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://devisery.com";
	const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
	const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

	return {
		title,
		description,
		keywords: keywords.join(", "),

		// Open Graph
		openGraph: {
			title,
			description,
			url: fullUrl,
			siteName: "Devisery",
			images: [
				{
					url: fullImageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: "en_US",
			type,
		},

		// Twitter
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [fullImageUrl],
			creator: "@devisery",
			site: "@devisery",
		},

		// Additional meta tags
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},

		// Verification
		verification: {
			google: process.env.GOOGLE_SITE_VERIFICATION,
		},
	};
}

// Common SEO configurations
export const defaultSEO = {
	title: "Devisery - Transform Your Business with Expert Solutions",
	description:
		"Professional consulting, development, and design services to help your business grow. Expert solutions for digital transformation and business optimization.",
	keywords: [
		"business consulting",
		"web development",
		"digital transformation",
		"business solutions",
	],
};

export const seoConfig = {
	home: {
		title: "Devisery - Transform Your Business with Expert Solutions",
		description:
			"Professional consulting, development, and design services to help your business grow. Expert solutions for digital transformation and business optimization.",
		keywords: [
			"business consulting",
			"web development",
			"digital transformation",
			"business solutions",
		],
	},
	about: {
		title: "About Us | Devisery",
		description:
			"Learn about Devisery - our mission, values, and team dedicated to providing exceptional business solutions and services.",
		keywords: [
			"about devisery",
			"company history",
			"business team",
			"mission values",
		],
	},
	services: {
		title: "Our Services | Devisery",
		description:
			"Comprehensive business services including consulting, development, and design. Transform your business with our expert solutions.",
		keywords: [
			"business services",
			"consulting",
			"web development",
			"design services",
		],
	},
	contact: {
		title: "Contact Us | Devisery",
		description:
			"Get in touch with Devisery. We're here to help with your business needs and answer any questions about our services.",
		keywords: [
			"contact devisery",
			"business consultation",
			"get quote",
			"business help",
		],
	},
	blog: {
		title: "Blog | Devisery",
		description:
			"Stay updated with the latest insights, tips, and industry news from the Devisery team. Expert advice on business growth and digital transformation.",
		keywords: [
			"business blog",
			"industry insights",
			"business tips",
			"digital transformation news",
		],
	},
};
