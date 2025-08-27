"use client";

import { useState, useEffect, useRef } from "react";
// Replaced Recharts with a bespoke radial gauge visualization

const data = [
	{
		reason: "Boost Growth",
		value: 85,
		icon: "fi-br-stats",
		description: "Accelerate revenue with proven strategies",
		explanation:
			"85% of Austin businesses hire consultants primarily to drive revenue growth and scale their operations effectively.",
		color: "hsl(var(--primary))",
	},
	{
		reason: "Financial Planning",
		value: 75,
		icon: "fi-br-calculator",
		description: "Secure your financial future",
		explanation:
			"75% of businesses seek consulting help to improve cash flow management, budgeting, and long-term financial stability.",
		color: "hsl(var(--primary-variant))",
	},
	{
		reason: "Operational Efficiency",
		value: 70,
		icon: "fi-br-rocket",
		description: "Streamline processes and workflows",
		explanation:
			"70% of companies need help optimizing their operations to reduce costs and boost productivity across teams.",
		color: "hsl(221 39% 25%)",
	},
	{
		reason: "Expert Guidance",
		value: 65,
		icon: "fi-br-user-crown",
		description: "Access seasoned business expertise",
		explanation:
			"65% of businesses hire consultants to gain access to specialized knowledge and strategic insights they lack in-house.",
		color: "hsl(190 85% 35%)",
	},
	{
		reason: "Market Expansion",
		value: 60,
		icon: "fi-br-building",
		description: "Expand your market reach",
		explanation:
			"60% of growing businesses use consulting services to successfully enter new markets and reach untapped customer segments.",
		color: "hsl(221 39% 35%)",
	},
];

export default function ConsultantReasonsChart() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	// Intersection Observer for scroll-triggered animation
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.3 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	// Removed CustomTooltip (Recharts) in favor of our own central gauge content

	return (
		<section
			ref={sectionRef}
			className="py-24 bg-gradient-subtle relative overflow-visible"
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-20 left-10 w-32 h-32 bg-primary-variant rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			<div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
				<div
					className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
				>
					<h2 className="text-base font-semibold leading-7 text-primary-variant">
						Why Hire a Business Consultant?
					</h2>
					<h1
						className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black uppercase"
						style={{ fontFamily: "Oswald-PFG, sans-serif" }}
					>
						WHY HIRE A BUSINESS CONSULTANT?
					</h1>
					<p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
						Austin businesses trust Devisery to deliver proven strategies that
						drive growth, reduce costs, and provide clarity in decision-making.
					</p>
				</div>

				{/* Calendar-like schedule of services */}
				<div
					className={`mt-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
				>
					{(() => {
						const year = currentDate.getFullYear();
						const month = currentDate.getMonth();
						const start = new Date(year, month, 1);
						const end = new Date(year, month + 1, 0);
						const startWeekday = (start.getDay() + 6) % 7; // make Monday=0
						const daysInMonth = end.getDate();

						// Map some days to services for the demo
						const schedule: Record<number, (typeof data)[number][]> = {
							2: [data[0]],
							5: [data[2]],
							9: [data[1], data[4]],
							14: [data[3]],
						};

						const cells = [] as Array<{
							day: number | null;
							items: (typeof data)[number][];
						}>;
						for (let i = 0; i < startWeekday; i++)
							cells.push({ day: null, items: [] });
						for (let d = 1; d <= daysInMonth; d++)
							cells.push({
								day: d,
								items: (schedule[d] ?? []).filter(
									Boolean
								) as (typeof data)[number][],
							});
						while (cells.length % 7 !== 0) cells.push({ day: null, items: [] });

						const monthLabel = currentDate.toLocaleString(undefined, {
							month: "long",
							year: "numeric",
						});

						return (
							<div className="mx-auto max-w-5xl md:grid md:grid-cols-2 md:gap-6">
								{/* Left: Calendar (desktop only) */}
								<div className="hidden md:block">
									<div className="flex items-center justify-between mb-4">
										<button
											className="px-3 py-1.5 rounded-md border bg-background hover:bg-accent text-sm"
											onClick={() =>
												setCurrentDate(new Date(year, month - 1, 1))
											}
										>
											← Prev
										</button>
										<div className="text-lg font-semibold">{monthLabel}</div>
										<button
											className="px-3 py-1.5 rounded-md border bg-background hover:bg-accent text-sm"
											onClick={() =>
												setCurrentDate(new Date(year, month + 1, 1))
											}
										>
											Next →
										</button>
									</div>

									<div className="grid grid-cols-7 gap-2 text-xs font-semibold text-muted-foreground mb-2">
										{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
											(w) => (
												<div key={w} className="text-center">
													{w}
												</div>
											)
										)}
									</div>

									<div className="grid grid-cols-7 gap-2">
										{cells.map((cell, i) => (
											<div
												key={i}
												className={`relative min-h-28 rounded-xl border bg-card p-2 ${cell.day ? "hover:shadow-glow transition-shadow" : "opacity-50"}`}
											>
												<div className="flex items-center justify-between mb-1">
													<span className="text-xs font-semibold text-muted-foreground">
														{cell.day ?? ""}
													</span>
												</div>
												<div className="space-y-1">
													{cell.items.map((it, idx) => (
														<div key={idx} className="relative">
															<div
																className="truncate text-[11px] px-2 py-1 rounded-md"
																style={{ backgroundColor: `${it.color}` }}
															>
																<span className="opacity-90 text-white font-medium">
																	{it.reason}
																</span>
															</div>
														</div>
													))}
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Right: Agenda (all screens) */}
								<div className="mt-6 md:mt-0">
									{(() => {
										const agenda: Array<{
											day: number;
											item: (typeof data)[number];
										}> = [];
										const seen = new Set<string>();
										cells.forEach((cell) => {
											if (cell.day && cell.items.length) {
												cell.items.forEach((item) => {
													const key = `${cell.day}-${item.reason}`;
													if (!seen.has(key)) {
														seen.add(key);
														agenda.push({ day: cell.day as number, item });
													}
												});
											}
										});
										agenda.sort((a, b) => a.day - b.day);
										return (
											<div>
												<h3 className="text-sm font-semibold text-muted-foreground mb-3">
													Agenda
												</h3>
												{agenda.length === 0 ?
													<div className="text-sm text-muted-foreground">
														No scheduled services this month.
													</div>
												:	<ul className="space-y-2">
														{agenda.map((entry, idx) => (
															<li
																key={idx}
																className="flex items-start gap-3 rounded-lg border bg-card p-4"
															>
																<div className="mt-0.5 text-xs font-bold text-primary-variant w-10">
																	{entry.day}
																</div>
																<div className="flex-1">
																	<div className="flex items-center gap-2">
																		<i
																			className={`${entry.item.icon} text-primary-variant`}
																		></i>
																		<span className="text-sm font-semibold text-card-foreground">
																			{entry.item.reason}
																		</span>
																	</div>
																	<p className="text-sm md:text-base text-muted-foreground mt-2">
																		{entry.item.description}
																	</p>
																	<p className="text-xs md:text-sm text-muted-foreground/90 mt-1">
																		{entry.item.explanation}
																	</p>
																</div>
															</li>
														))}
													</ul>
												}
											</div>
										);
									})()}
								</div>
							</div>
						);
					})()}
				</div>
			</div>
		</section>
	);
}
