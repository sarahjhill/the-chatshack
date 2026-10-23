// Sets the browser tab title and description for the current page. React 19
// automatically moves <title>/<meta> rendered anywhere in the tree up into
// the document <head>, so this works just by rendering it at the top of a
// page component - no extra routing/head library needed.
//
// Note: because this is a single static index.html (a client-side-rendered
// app), these per-page tags update the tab title and what Google sees when
// it crawls the page - but a link shared on Facebook/WhatsApp/etc. always
// shows index.html's own title/description/image (set once, site-wide),
// since social media crawlers don't run JavaScript. Giving every page its
// own distinct share image would need a per-route prerendering step, which
// is a separate, bigger piece of work.
export default function PageMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const fullTitle = `${title} | The Chat Shack`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
