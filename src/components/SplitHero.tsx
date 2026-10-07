import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Photo hero banner blending two background images (e.g. one group on the
 * left, another on the right) with a soft crossfade between them — rather
 * than a hard vertical cut — plus a dark vignette so the title stays
 * readable over either photo. Matches the style of PageHero.
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
  const crossfadeMask =
    "linear-gradient(to right, black 0%, black 38%, transparent 62%, transparent 100%)";

  return (
    <section className="relative min-h-[460px] flex items-center overflow-hidden bg-[#0d1f12]">
      {/* Right photo, full width, as the base layer */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageRight})` }} />
      {/* Left photo on top, masked so it fades out into the right photo instead of a hard seam */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageLeft})`,
          WebkitMaskImage: crossfadeMask,
          maskImage: crossfadeMask,
        }}
      />
      {/* Vertical gradient for top/bottom legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/70" />
      {/* Soft center vignette so the title reads cleanly over either photo */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 70% at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 100%)" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-14 h-14 rounded-full bg-[#1a7a4a]/40 border border-white/30 flex items-center justify-center mx-auto mb-4">
            <Icon className="w-7 h-7 text-amber-400" />
          </div>
          <p className="text-amber-400 text-sm font-bold uppercase tracking-wide mb-2">{eyebrow}</p>
          <h1
            className="text-white font-black text-3xl md:text-5xl mb-3"
            style={{ textShadow: "2px 2px 12px rgba(0,0,0,0.8)" }}
          >
            {title}
          </h1>
          <p className="text-white/90 text-lg max-w-xl mx-auto" style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.8)" }}>
            {subtitle}
          </p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
