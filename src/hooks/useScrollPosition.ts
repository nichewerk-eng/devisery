import { useState, useEffect } from "react";

interface ScrollPosition {
	x: number;
	y: number;
}

interface UseScrollPositionOptions {
	throttleMs?: number;
	element?: Element | null;
}

export function useScrollPosition(
	options: UseScrollPositionOptions = {}
): ScrollPosition {
	const { throttleMs = 100, element } = options;
	const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null;

		const updatePosition = () => {
			if (element) {
				setScrollPosition({
					x: element.scrollLeft,
					y: element.scrollTop,
				});
			} else {
				setScrollPosition({
					x: window.pageXOffset || document.documentElement.scrollLeft,
					y: window.pageYOffset || document.documentElement.scrollTop,
				});
			}
		};

		const handleScroll = () => {
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(updatePosition, throttleMs);
		};

		const target = element || window;
		target.addEventListener("scroll", handleScroll);

		// Set initial position
		updatePosition();

		return () => {
			target.removeEventListener("scroll", handleScroll);
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
			}
		};
	}, [element, throttleMs]);

	return scrollPosition;
}

// Hook to detect if user has scrolled past a certain point
export function useScrollTrigger(threshold: number = 100): boolean {
	const [isTriggered, setIsTriggered] = useState(false);
	const scrollPosition = useScrollPosition({ throttleMs: 50 });

	useEffect(() => {
		setIsTriggered(scrollPosition.y > threshold);
	}, [scrollPosition.y, threshold]);

	return isTriggered;
}

// Hook to get scroll direction
export function useScrollDirection(): "up" | "down" | null {
	const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
		null
	);
	const [lastScrollTop, setLastScrollTop] = useState(0);
	const scrollPosition = useScrollPosition({ throttleMs: 50 });

	useEffect(() => {
		const currentScrollTop = scrollPosition.y;

		if (currentScrollTop > lastScrollTop) {
			setScrollDirection("down");
		} else if (currentScrollTop < lastScrollTop) {
			setScrollDirection("up");
		}

		setLastScrollTop(currentScrollTop);
	}, [scrollPosition.y, lastScrollTop]);

	return scrollDirection;
}

// Hook to detect if element is in viewport
export function useInViewport(
	elementRef: React.RefObject<Element>,
	options: IntersectionObserverInit = {}
): boolean {
	const [isInViewport, setIsInViewport] = useState(false);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInViewport(entry.isIntersecting);
			},
			{
				threshold: 0.1,
				...options,
			}
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [elementRef, options]);

	return isInViewport;
}

// Hook for smooth scrolling to element
export function useSmoothScroll() {
	const scrollToElement = (
		elementId: string,
		options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
	) => {
		const element = document.getElementById(elementId);
		if (element) {
			element.scrollIntoView(options);
		}
	};

	const scrollToTop = (options: ScrollToOptions = { behavior: "smooth" }) => {
		window.scrollTo({
			top: 0,
			left: 0,
			...options,
		});
	};

	const scrollToPosition = (
		x: number,
		y: number,
		options: ScrollToOptions = { behavior: "smooth" }
	) => {
		window.scrollTo({
			top: y,
			left: x,
			...options,
		});
	};

	return { scrollToElement, scrollToTop, scrollToPosition };
}
