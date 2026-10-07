import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Photo hero banner blending two background images (e.g. one group on the
 * left, another on the right) with a soft crossfade between them — rather
 * than a hard vertical cut — and left-aligned content to match the
 * homepage hero's look (big bold title over the left side of the photo).
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
    <section className="relative min-h-[460px] md:min-h-[560px] flex items-center overflow-hidden bg-[#0d1f12]">
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
      {/* Left-to-right gradient so the title reads cleanly, matching the homepage hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/25" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#1a7a4a]/40 border border-white/30 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-amber-400 text-sm font-bold uppercase tracking-wide">{eyebrow}</p>
          </div>
          <h1
            className="text-white font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-3"
            style={{ textShadow: "2px 2px 12px rgba(0,0,0,0.8)" }}
          >
            {title}
          </h1>
          <p className="text-white/90 text-lg" style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.8)" }}>
            {subtitle}
          </p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
