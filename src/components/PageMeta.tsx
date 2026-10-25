// Sets the browser tab title and description for the current page.
//
// React 19 will hoist <title>/<meta> rendered anywhere in the tree up into
// <head>, but it only *adds* a tag - it has no way to know that the static
// <meta name="description"> (and og:/twitter: equivalents) already sitting
// in index.html is "the same thing" and should be replaced. The result is
// two meta description tags on every page, with the generic homepage one
// listed first in the HTML - which means Google (and anything else reading
// the first matching tag) was picking up the SAME generic description on
// every single page, no matter what was passed in here. This component
// instead finds the existing tags straight away and updates their content
// in place, so there is always exactly one of each and it always matches
// the current page.
//
// Note: because this is a single static index.html (a client-side-rendered
// app), a link shared on Facebook/WhatsApp/etc. still always shows
// index.html's own title/description/image (set once, site-wide), since
// social media crawlers don't run JavaScript. Giving every page its own
// distinct share image would need a per-route prerendering step, which is a
// separate, bigger piece of work.
import { useEffect } from "react";

function setMetaContent(selector: string, content: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute("content", content);
}

export default function PageMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const fullTitle = `${title} | The Chat Shack`;

  useEffect(() => {
    document.title = fullTitle;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', fullTitle);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', fullTitle);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [fullTitle, description]);

  return null;
}
