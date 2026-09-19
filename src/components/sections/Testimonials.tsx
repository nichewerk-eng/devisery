const steps = [
	{ id: 1, number: "01", title: "Diagnose", content: "We identify the constraint, define the desired outcome, and agree on the measurements that matter." },
	{ id: 2, number: "02", title: "Prioritize", content: "You receive a focused roadmap that separates immediate wins from longer-term investments." },
	{ id: 3, number: "03", title: "Execute", content: "We help implement the plan, review progress, and adjust based on real operating results." },
];

export default function Testimonials() {
	return (
		<div className="bg-primary py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-xl text-center">
					<h2 className="text-lg font-semibold leading-8 tracking-tight text-secondary">
						A Practical Consulting Process
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
						From uncertainty to clear next steps
					</p>
				</div>

				<div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{steps.map((step) => (
							<div
								key={step.id}
								className="bg-card p-8 rounded-2xl border border-border shadow-elegant hover:shadow-glow transition-all duration-300 hover-scale"
							>
								<div className="text-3xl font-bold text-primary mb-4">{step.number}</div>
								<h3 className="text-xl font-semibold text-card-foreground">{step.title}</h3>
								<p className="mt-3 text-sm leading-6 text-muted-foreground">{step.content}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
