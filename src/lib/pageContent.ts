import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api.ts";

// Shared data-shape for the "everything editable on a page" API
// (GET /api/pages/<page>/) - a hero banner, freeform content blocks
// grouped by section, and repeatable list items/cards grouped by section.
// Every page component below merges this over its own hardcoded defaults,
// so the page looks exactly as it does today until Scott edits something
// in the admin - and never breaks if the backend is unreachable.

export type RemoteHero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string | null;
} | null;

export type RemoteBlock = {
  section: string;
  order: number;
  heading: string;
  body: string;
  image: string | null;
  link_text: string;
  link_url: string;
};

export type RemoteItem = {
  section: string;
  order: number;
  title: string;
  description: string;
  image: string | null;
};

export type PageContent = {
  hero: RemoteHero;
  blocks: Record<string, RemoteBlock[]>;
  items: Record<string, RemoteItem[]>;
};

const EMPTY: PageContent = { hero: null, blocks: {}, items: {} };

async function fetchPageContent(page: string): Promise<PageContent> {
  if (!API_URL) return EMPTY;
  try {
    const res = await fetch(`${API_URL}/api/pages/${page}/`, { cache: "no-store" });
    if (res.ok) return (await res.json()) as PageContent;
  } catch {
    // API unreachable - keep showing the page's built-in defaults.
  }
  return EMPTY;
}

/** Fetches a page's editable content once on mount. Always returns a safe
 * (possibly empty) PageContent, so callers can merge with `?? defaultValue`
 * without any extra null-checking. */
export function usePageContent(page: string): PageContent {
  const [content, setContent] = useState<PageContent>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    fetchPageContent(page).then((data) => {
      if (!cancelled) setContent(data);
    });
    return () => {
      cancelled = true;
    };
  }, [page]);

  return content;
}

/** The first (usually only) content block in a given section, or null. */
export function block(content: PageContent, section: string): RemoteBlock | null {
  return content.blocks[section]?.[0] ?? null;
}

/** All list items in a given section, in order (empty array if none yet). */
export function items(content: PageContent, section: string): RemoteItem[] {
  return content.items[section] ?? [];
}

/** Splits a plain-text body (blank line between paragraphs, as typed in
 * the admin) into an array of paragraph strings for rendering as <p>s. */
export function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

// --- Site-wide settings (navbar/footer branding, contact details) --------

export type SiteSettings = {
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  facebook_url: string;
  messenger_handle: string;
  site_name: string;
  tagline_1: string;
  tagline_2: string;
  logo: string | null;
  footer_quote: string;
  footer_copyright_text: string;
};

const EMPTY_SETTINGS: SiteSettings | null = null;

async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (!API_URL) return EMPTY_SETTINGS;
  try {
    const res = await fetch(`${API_URL}/api/settings/`, { cache: "no-store" });
    if (res.ok) return (await res.json()) as SiteSettings;
  } catch {
    // API unreachable - keep showing the built-in defaults.
  }
  return EMPTY_SETTINGS;
}

/** Site-wide branding/contact settings, editable in admin (Site settings).
 * Returns null until loaded (or if unavailable) - callers fall back to
 * their own hardcoded defaults with `settings?.field || "default"`. */
export function useSiteSettings(): SiteSettings | null {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings().then((data) => {
      if (!cancelled && data) setSettings(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
