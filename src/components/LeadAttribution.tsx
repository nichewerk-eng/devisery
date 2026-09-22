"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getLeadAttribution } from "../utils/leadAttribution";

export default function LeadAttribution() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => { getLeadAttribution(); }, [pathname, searchParams]);
	return null;
}
