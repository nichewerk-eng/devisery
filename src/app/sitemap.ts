import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://www.devisery.com";

	return [
		{
			url: baseUrl,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/services`,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/contact`,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/blog`,
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];
}
