import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Full-bleed photo hero, left-aligned to match the homepage hero's look:
 * edge-to-edge background image, a left-to-right dark gradient, and a big
 * bold title sitting over the left side of the photo rather than a small
 * centered badge.
 */
export default function PageHero({
  image,
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  image: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[460px] md:min-h-[560px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#1a7a4a]/30 border border-white/30 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-amber-400 text-sm font-bold uppercase tracking-wide">{eyebrow}</p>
          </div>
          <h1
            className="text-white font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-3"
            style={{ textShadow: "2px 2px 10px rgba(0,0,0,0.6)" }}
          >
            {title}
          </h1>
          <p className="text-white/90 text-lg">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
