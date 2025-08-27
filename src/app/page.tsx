import Hero from "@/components/sections/Hero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import ConsultantReasonsChart from "@/components/sections/ConsultantReasonsChart";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
	return (
		<main>
			<Hero />
			<ServicesOverview />
			<CallToAction />
			<ConsultantReasonsChart />
			<Testimonials />
			<FAQ />
		</main>
	);
}
