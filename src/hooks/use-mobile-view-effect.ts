"use client";

import { useEffect, useState, RefObject } from "react";
import { useInView } from "framer-motion";
export const VIEWPORT_MARGIN_PERCENT = 40;

function getDistanceToBottom(target: EventTarget | null) {
  if (target instanceof Element) {
    return target.scrollHeight - (target.scrollTop + target.clientHeight);
  }

  const root = document.documentElement;
  return root.scrollHeight - ((window.scrollY || root.scrollTop) + window.innerHeight);
}

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

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}

// Shared Scroll State
let sharedScrollY = 0
let scrollListeners: Array<() => void> = []
let isScrollInitialized = false

function initSharedScroll() {
  if (isScrollInitialized) return
  isScrollInitialized = true

  window.addEventListener("scroll", () => {
    sharedScrollY = window.scrollY || document.documentElement.scrollTop || 0
    scrollListeners.forEach(fn => fn())
  }, { passive: true, capture: true })
}

function subscribe(fn: () => void) {
  scrollListeners.push(fn)
  return () => {
    scrollListeners = scrollListeners.filter(f => f !== fn)
  }
}

export function useAtTopHighlight(isMobile: boolean, threshold = 20) {
  const [isAtTop, setIsAtTop] = useState(() => {
    if (typeof window === "undefined") return false;
    return isMobile && (window.scrollY || document.documentElement.scrollTop) < threshold;
  });

  useEffect(() => {
    if (!isMobile) return;

    initSharedScroll()

    const update = () => {
      setIsAtTop(sharedScrollY < threshold)
    }

    update()
    const unsub = subscribe(update)
    return unsub
  }, [isMobile, threshold]);

  return isMobile ? isAtTop : false;
}
export function useAtBottomHighlight(isMobile: boolean, threshold = 20) {
  const [isAtBottom, setIsAtBottom] = useState(() => {
    if (typeof window === "undefined") return false;
    return isMobile && getDistanceToBottom(document) < threshold;
  });

  useEffect(() => {
    if (!isMobile) return;

    initSharedScroll()

    const update = () => {
      setIsAtBottom(getDistanceToBottom(document) < threshold)
    }

    update()
    const unsub = subscribe(update)
    return unsub
  }, [isMobile, threshold]);

  return isMobile ? isAtBottom : false;
}