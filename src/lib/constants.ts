// Company constants and configuration
export const COMPANY_INFO = {
	name: "Devisery",
	tagline: "Transform Your Business with Expert Solutions",
	description:
		"Professional consulting, development, and design services to help your business grow.",

	// Contact Information
	contact: {
		email: "hello@devisery.com",
		phone: "(123) 456-7890",
		address: {
			street: "123 Business Street",
			suite: "Suite 100",
			city: "City",
			state: "State",
			zip: "12345",
			country: "United States",
		},
	},

	// Business Hours
	businessHours: {
		monday: "9:00 AM - 6:00 PM",
		tuesday: "9:00 AM - 6:00 PM",
		wednesday: "9:00 AM - 6:00 PM",
		thursday: "9:00 AM - 6:00 PM",
		friday: "9:00 AM - 6:00 PM",
		saturday: "10:00 AM - 4:00 PM",
		sunday: "Closed",
	},

	// Social Media
	social: {
		linkedin: "https://linkedin.com/company/devisery",
		twitter: "https://twitter.com/devisery",
		github: "https://github.com/devisery",
		facebook: "https://facebook.com/devisery",
		instagram: "https://instagram.com/devisery",
	},

	// Website
	website: {
		url: "https://devisery.com",
		domain: "devisery.com",
	},
};

// Service categories
export const SERVICES = {
	consulting: {
		title: "Business Consulting",
		description:
			"Strategic consulting services to optimize operations and drive growth",
		features: [
			"Business Strategy",
			"Process Optimization",
			"Digital Transformation",
		],
		icon: "💼",
	},
	development: {
		title: "Development Services",
		description:
			"Custom software development solutions for your business needs",
		features: ["Web Applications", "Mobile Apps", "API Development"],
		icon: "💻",
	},
	design: {
		title: "Design Services",
		description:
			"Creative design services that enhance user experience and brand identity",
		features: ["UI/UX Design", "Brand Identity", "Marketing Materials"],
		icon: "🎨",
	},
};

// Navigation structure
export const NAVIGATION = {
	main: [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Services", href: "/services" },
		{ name: "Contact", href: "/contact" },
	],
	footer: [
		{ name: "About", href: "/about" },
		{ name: "Services", href: "/services" },
		{ name: "Contact", href: "/contact" },
		{ name: "Privacy Policy", href: "/privacy" },
		{ name: "Terms of Service", href: "/terms" },
	],
};

// Common form configurations
export const FORM_CONFIG = {
	contact: {
		fields: {
			name: { required: true, minLength: 2, maxLength: 100 },
			email: { required: true, type: "email" },
			phone: { required: false, pattern: /^[\+]?[1-9][\d]{0,15}$/ },
			subject: { required: false, maxLength: 200 },
			message: { required: true, minLength: 10, maxLength: 1000 },
		},
		messages: {
			success:
				"Thank you for your message! We'll get back to you within 24 hours.",
			error:
				"Sorry, there was an error sending your message. Please try again or contact us directly.",
			validation: {
				required: "This field is required",
				email: "Please enter a valid email address",
				minLength: "This field is too short",
				maxLength: "This field is too long",
			},
		},
	},
	newsletter: {
		fields: {
			email: { required: true, type: "email" },
		},
		messages: {
			success:
				"Thanks for subscribing! Check your email to confirm your subscription.",
			error: "Sorry, there was an error subscribing. Please try again.",
		},
	},
};

// SEO and analytics
export const SEO_CONFIG = {
	defaultTitle: "Devisery - Transform Your Business with Expert Solutions",
	titleTemplate: "%s | Devisery",
	defaultDescription:
		"Professional consulting, development, and design services to help your business grow. Expert solutions for digital transformation and business optimization.",
	siteUrl: "https://devisery.com",

	// Default keywords for all pages
	defaultKeywords: [
		"business consulting",
		"web development",
		"digital transformation",
		"business solutions",
		"professional services",
	],

	// Open Graph defaults
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "Devisery",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Devisery - Transform Your Business",
			},
		],
	},
};

// Theme configuration
export const THEME = {
	colors: {
		primary: "#2563eb", // blue-600
		secondary: "#4b5563", // gray-600
		accent: "#f59e0b", // amber-500
		success: "#10b981", // emerald-500
		warning: "#f59e0b", // amber-500
		error: "#ef4444", // red-500
	},

	fonts: {
		sans: ["Inter", "system-ui", "sans-serif"],
		mono: ["Fira Code", "monospace"],
	},

	breakpoints: {
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
		"2xl": "1536px",
	},
};

// API endpoints (if using external APIs)
export const API_ENDPOINTS = {
	base: process.env.NEXT_PUBLIC_API_URL || "https://api.devisery.com",
	contact: "/api/contact",
	newsletter: "/api/newsletter",
	blog: "/api/blog",
};
