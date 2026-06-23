"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// ─── Types ───────────────────────────────────────────────────
interface AccessibilityState {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
}

interface AccessibilityContextValue extends AccessibilityState {
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  lowPerformance: boolean;
}

const STORAGE_KEY = "a11y-settings";

const defaults: AccessibilityState = {
  reducedMotion: false,
  highContrast: false,
  largeText: false,
};

// ─── Context ─────────────────────────────────────────────────
const AccessibilityContext = createContext<AccessibilityContextValue>({
  ...defaults,
  lowPerformance: false,
  toggleReducedMotion: () => {},
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
});

// ─── Hook ────────────────────────────────────────────────────
export function useAccessibility() {
  return useContext(AccessibilityContext);
}

// ─── Provider ────────────────────────────────────────────────
export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AccessibilityState>(() => {
    if (typeof window === "undefined") {
      return defaults;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AccessibilityState>;
        return { ...defaults, ...parsed };
      }
    } catch {
      // ignore
    }

    return defaults;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  // Detect low-performance devices: mobile (touch+small screen) OR low CPU cores
  const [lowPerformance, setLowPerformance] = useState(false)

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    const isSmallScreen = window.innerWidth < 768
    const lowCores = (navigator.hardwareConcurrency || 8) <= 4
    const isMobileOS = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    setLowPerformance((isTouchDevice && isSmallScreen) || lowCores || isMobileOS)
  }, [])

  // Apply CSS classes to <html> element
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("a11y-reduced-motion", state.reducedMotion);
    root.classList.toggle("a11y-high-contrast", state.highContrast);
    root.classList.toggle("a11y-large-text", state.largeText);
    root.classList.toggle("low-performance", state.reducedMotion || lowPerformance);
  }, [state, lowPerformance]);

  const toggleReducedMotion = useCallback(
    () => setState((s) => ({ ...s, reducedMotion: !s.reducedMotion })),
    []
  );
  const toggleHighContrast = useCallback(
    () => setState((s) => ({ ...s, highContrast: !s.highContrast })),
    []
  );
  const toggleLargeText = useCallback(
    () => setState((s) => ({ ...s, largeText: !s.largeText })),
    []
  );

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        toggleReducedMotion,
        toggleHighContrast,
        toggleLargeText,
        lowPerformance,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
