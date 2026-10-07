import type { LucideIcon } from "lucide-react";

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
    <section className="bg-[#1a2e1a] py-14 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <div className="w-14 h-14 rounded-full bg-[#1a7a4a]/20 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-7 h-7 text-amber-400" />
        </div>
        <p className="text-amber-400 text-sm font-bold uppercase tracking-wide mb-2">{eyebrow}</p>
        <h1 className="text-white font-black text-3xl md:text-4xl mb-3">{title}</h1>
        <p className="text-white/70">{subtitle}</p>
      </div>
    </section>
  );
}
