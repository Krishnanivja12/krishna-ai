"use client";

import { useEffect, useState, RefObject } from "react";
import { useInView } from "framer-motion";
export const VIEWPORT_MARGIN_PERCENT = 40;

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(max-width: 1024px)").matches;
	});

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 1024px)");

		const handler = (event: MediaQueryListEvent) =>
			setIsMobile(event.matches);
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	return isMobile;
}

export function useAutoHighlight(
	ref: RefObject<HTMLElement | null>,
	isMobile: boolean,
) {
	const isInView = useInView(ref, {
		margin: `-${VIEWPORT_MARGIN_PERCENT}% 0px -${VIEWPORT_MARGIN_PERCENT}% 0px`,
	});
	return isMobile && isInView;
}
