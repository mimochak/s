import { DiamondIcon } from "@/components/Icons";

const DEFAULT_WORDS = [
  "Pressée à froid",
  "Agriculture biologique",
  "Récolte à la main",
  "Analyses en laboratoire",
  "Origine Vallée des Baux",
];

export function Marquee({ words = DEFAULT_WORDS }: { words?: string[] }) {
  const sequence = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-cream-100/10 bg-ink-900 py-4">
      <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap">
        {[...sequence, ...sequence].map((word, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="text-sm uppercase tracking-widest2 text-cream-100/70">
              {word}
            </span>
            <DiamondIcon className="h-2 w-2 text-gold-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
