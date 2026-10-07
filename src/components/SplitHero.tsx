import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Photo hero banner split between two background images (e.g. one group on
 * the left, another on the right) with a dark gradient overlay for text
 * legibility, matching the style of PageHero.
 */
export default function SplitHero({
  imageLeft,
  imageRight,
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  imageLeft: string;
  imageRight: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[460px] flex items-center overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageLeft})` }} />
        <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${imageRight})` }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/55 to-black/30" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-14 h-14 rounded-full bg-[#1a7a4a]/30 border border-white/30 flex items-center justify-center mx-auto mb-4">
            <Icon className="w-7 h-7 text-amber-400" />
          </div>
          <p className="text-amber-400 text-sm font-bold uppercase tracking-wide mb-2">{eyebrow}</p>
          <h1
            className="text-white font-black text-3xl md:text-5xl mb-3"
            style={{ textShadow: "2px 2px 10px rgba(0,0,0,0.6)" }}
          >
            {title}
          </h1>
          <p className="text-white/85 text-lg max-w-xl mx-auto">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
