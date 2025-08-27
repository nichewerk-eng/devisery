// Vercel Analytics configuration
export const analytics = {
	// Track page views automatically
	enabled: process.env.NODE_ENV === "production",
};

// Custom event tracking
export function trackEvent(name: string, properties?: Record<string, unknown>) {
	if (typeof window !== "undefined" && analytics.enabled) {
		// Use Vercel Analytics track function if available
		const va = (
			window as unknown as {
				va?: (
					type: string,
					name: string,
					props?: Record<string, unknown>
				) => void;
			}
		).va;
		if (typeof va === "function") {
			va("track", name, properties);
		}
	}
}

// Common tracking events
export const trackingEvents = {
	// Contact form events
	contactFormStarted: () => trackEvent("Contact Form Started"),
	contactFormSubmitted: () => trackEvent("Contact Form Submitted"),
	contactFormError: (error: string) =>
		trackEvent("Contact Form Error", { error }),

	// Navigation events
	serviceClicked: (service: string) =>
		trackEvent("Service Clicked", { service }),
	blogPostClicked: (title: string) =>
		trackEvent("Blog Post Clicked", { title }),

	// CTA events
	ctaClicked: (location: string, text: string) =>
		trackEvent("CTA Clicked", { location, text }),
	getStartedClicked: (location: string) =>
		trackEvent("Get Started Clicked", { location }),

	// Newsletter events
	newsletterSubscribed: () => trackEvent("Newsletter Subscribed"),

	// Download events
	resourceDownloaded: (resource: string) =>
		trackEvent("Resource Downloaded", { resource }),
};

// Page view tracking (automatic with Vercel Analytics)
export function trackPageView(url: string) {
	if (typeof window !== "undefined" && analytics.enabled) {
		// Hook for custom page view tracking
		void url;
	}
}

// Error tracking
export function trackError(error: Error, context?: Record<string, unknown>) {
	if (typeof window !== "undefined" && analytics.enabled) {
		trackEvent("Error Occurred", {
			error: error.message,
			stack: error.stack,
			...context,
		});
	}
}

// Performance tracking
export function trackPerformance(
	metric: string,
	value: number,
	unit: string = "ms"
) {
	if (typeof window !== "undefined" && analytics.enabled) {
		trackEvent("Performance Metric", {
			metric,
			value,
			unit,
		});
	}
}
