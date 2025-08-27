"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
	question: string;
	answer: string;
}

const faqs: FaqItem[] = [
	{
		question: "What does a business consultant actually do?",
		answer:
			"We diagnose bottlenecks, design a measurable plan, and help execute it. From growth strategy to process optimization and financial planning, consultants bring outside perspective and proven playbooks.",
	},
	{
		question: "When should a company hire a consultant?",
		answer:
			"When growth stalls, priorities feel unclear, or you need senior expertise without adding full-time headcount. Consultants help you move faster with lower risk.",
	},
	{
		question: "How fast can we see results?",
		answer:
			"Most clients see early wins within 30–60 days (quick wins), with bigger outcomes delivered over 90–180 days through prioritized roadmaps.",
	},
	{
		question: "What’s the ROI of hiring a consultant?",
		answer:
			"Typical ROI comes from revenue lift, cost reduction, and faster decision-making. We set KPIs up front so progress is transparent and defensible.",
	},
	{
		question: "Will you work with our team or do this for us?",
		answer:
			"Both. We can augment your team to execute quickly, or coach and equip your leaders so the capability remains in-house.",
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section className="py-20 bg-gradient-subtle">
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center mb-10">
					<p className="text-sm font-semibold tracking-wider text-[#3095d2]">
						FAQs
					</p>
					<h2
						className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
						style={{ fontFamily: "Oswald-PFG, sans-serif" }}
					>
						EVERYTHING YOU WANTED TO ASK ABOUT BUSINESS CONSULTING
					</h2>
					<p className="mt-4 text-base text-gray-600">
						We help businesses grow, streamline operations, and create durable
						systems. Here are answers to the most common questions we get.
					</p>
				</div>

				<div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border bg-card/60 backdrop-blur-sm">
					{faqs.map((item, idx) => {
						const isOpen = openIndex === idx;
						return (
							<div key={idx} className="p-4 md:p-6">
								<button
									onClick={() => setOpenIndex(isOpen ? null : idx)}
									className="w-full flex items-center justify-between text-left"
									aria-expanded={isOpen}
									aria-controls={`faq-panel-${idx}`}
								>
									<span className="text-base md:text-lg font-semibold text-card-foreground">
										{item.question}
									</span>
									<ChevronDown
										className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
									/>
								</button>
								<div
									id={`faq-panel-${idx}`}
									className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
								>
									<div className="overflow-hidden">
										<p className="pt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
											{item.answer}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
