// Renders body/description text that was written with the admin's rich
// text (WYSIWYG) editor - it saves real HTML (bold, links, bullet lists,
// etc.), so this renders that HTML directly rather than treating it as
// plain text. `className` lets each page match its existing text colour.
export default function RichText({ html, className = "" }: { html: string; className?: string }) {
  return (
    <div
      className={`prose prose-sm sm:prose-base max-w-none prose-p:mb-3 prose-a:text-[#1a7a4a] prose-a:font-bold prose-strong:text-[#1a3a2a] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
