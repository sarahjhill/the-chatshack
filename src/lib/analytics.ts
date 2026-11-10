// Loads Google Analytics (GA4), but only after the visitor has accepted
// cookies - GA sets tracking cookies, so UK/EU rules mean we need consent
// first. The consent choice itself lives in localStorage so we don't nag
// returning visitors.
//
// VITE_GA_MEASUREMENT_ID is only set in .env.production, so local
// development (npm run dev) never sends data to Google Analytics - only
// the live chatshack.app site does.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CONSENT_KEY = "chatshack-cookie-consent";

export type ConsentChoice = "accepted" | "declined";

let scriptLoaded = false;

export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

function loadGtagScript() {
  if (scriptLoaded || !MEASUREMENT_ID) return;
  scriptLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  // send_page_view is off here because this is a single-page app - we send
  // page_view events ourselves on route change instead (see trackPageView),
  // otherwise every page would get credited as the homepage.
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
}

/** Call once when the app starts, so a returning visitor who already said
 * yes doesn't have to say yes again. */
export function initAnalyticsIfConsented() {
  if (getStoredConsent() === "accepted") {
    loadGtagScript();
  }
}

export function acceptCookies() {
  try {
    localStorage.setItem(CONSENT_KEY, "accepted");
  } catch {
    // localStorage unavailable (private browsing, etc.) - analytics just
    // won't load this visit, which is a safe fallback.
  }
  loadGtagScript();
}

export function declineCookies() {
  try {
    localStorage.setItem(CONSENT_KEY, "declined");
  } catch {
    // ignore - nothing to persist, and nothing loads either way
  }
}

/** Call on every route change. No-ops until the visitor has accepted
 * cookies and the script has actually loaded. */
export function trackPageView(path: string) {
  if (!scriptLoaded || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}
