import { useState } from "react";
import { acceptCookies, declineCookies, getStoredConsent } from "@/lib/analytics";

/** A simple cookie-consent banner for Google Analytics. Shown once, bottom
 * of screen, until the visitor picks accept or decline - then remembered
 * in their browser so they're not asked again. */
export default function CookieConsent() {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#1a3a2a] text-white px-4 py-4 sm:py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/90 flex-1">
          We use a cookie to understand how visitors use this site, so we can keep improving it. No
          personal or sensitive information is collected. See our{" "}
          <a href="/privacy" className="underline font-semibold">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              declineCookies();
              setVisible(false);
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white/90 border border-white/30 hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              acceptCookies();
              setVisible(false);
            }}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-[#1a7a4a] text-white hover:bg-[#166240] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
