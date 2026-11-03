import type { CSSProperties, ReactNode } from "react";

// A row of items that slides continuously from right to left (or left to right with `reverse`).
// - Pauses when someone hovers over it or tabs into it, so links can be read and clicked.
// - Respects "reduce motion": the animation stops and the row becomes a normal sideways scroll.
// The items are drawn twice (the second copy hidden from screen readers) so the loop is seamless.
type MarqueeProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  // `hidden` is true for the duplicate copies - use it to take links out of the tab order.
  renderItem: (item: T, hidden: boolean) => ReactNode;
  label: string;
  // Seconds for one full loop - bigger number = slower.
  duration?: number;
  // How many times to repeat the items in each half (use 2+ for short lists so the row is always full).
  repeat?: number;
  // Slide left-to-right instead of right-to-left.
  reverse?: boolean;
  className?: string;
};

export default function Marquee<T>({
  items,
  getKey,
  renderItem,
  label,
  duration = 40,
  repeat = 1,
  reverse = false,
  className = "",
}: MarqueeProps<T>) {
  const sequence = Array.from({ length: repeat }).flatMap((_, r) =>
    items.map((item) => ({ item, key: `${r}-${getKey(item)}`, dup: r > 0 }))
  );

  return (
    <div
      className={`marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] ${className}`}
      role="region"
      aria-label={label}
    >
      <div className={`marquee-track flex w-max${reverse ? " marquee-track--reverse" : ""}`} style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 gap-4 pr-4" aria-hidden={half === 1 ? true : undefined}>
            {sequence.map(({ item, key, dup }) => {
              const hidden = half === 1 || dup;
              return (
                <li
                  key={key}
                  className="shrink-0"
                  aria-hidden={hidden ? true : undefined}
                  data-marquee-dup={hidden ? "" : undefined}
                >
                  {renderItem(item, hidden)}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
