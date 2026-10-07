import type { LucideIcon } from "lucide-react";

/**
 * Plain banner header for legal/policy pages (no photo) — left-aligned to
 * match the look of the photo heroes used elsewhere on the site.
 */
export default function PolicyPageHeader({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-[#1a2e1a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#1a7a4a]/20 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-amber-400 text-sm font-bold uppercase tracking-wide">{eyebrow}</p>
          </div>
          <h1 className="text-white font-black text-4xl md:text-5xl leading-tight mb-3">{title}</h1>
          <p className="text-white/70 text-lg">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
