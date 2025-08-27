import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = "primary", size = "md", children, ...props },
		ref
	) => {
		const baseClasses =
			"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

		const variants = {
			primary:
				"bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring",
			secondary:
				"bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring",
			outline:
				"border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
			ghost:
				"text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
		};

		const sizes = {
			sm: "h-9 px-3 text-sm",
			md: "h-11 px-4 py-2",
			lg: "h-13 px-6 py-3 text-lg",
		};

		return (
			<button
				className={cn(baseClasses, variants[variant], sizes[size], className)}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
