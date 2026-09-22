const STORAGE_KEY = "lead_attribution";

export function getLeadAttribution() {
	const query = new URLSearchParams(window.location.search);
	let previous: Record<string, string> = {};
	try {
		previous = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
	} catch {}
	const attribution = {
		page: window.location.pathname,
		landingPage: previous.landingPage || window.location.pathname,
		utmSource: query.get("utm_source") || previous.utmSource || "direct",
		utmMedium: query.get("utm_medium") || previous.utmMedium || "none",
		utmCampaign: query.get("utm_campaign") || previous.utmCampaign || "none",
	};
	try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution)); } catch {}
	return attribution;
}
