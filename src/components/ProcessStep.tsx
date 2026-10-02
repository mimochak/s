export function ProcessStep({
  index,
  title,
  description,
  bullets,
}: {
  index: string;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="border-t border-cream-100/10 py-10 first:border-t-0 md:grid md:grid-cols-[80px_1fr_1fr] md:gap-8 md:py-12">
      <span className="font-serif text-2xl text-gold-500">{index}</span>
      <h3 className="mt-3 font-serif text-2xl text-cream-50 md:mt-0">{title}</h3>
      <div className="mt-4 md:mt-0">
        <p className="text-cream-100/70">{description}</p>
        <ul className="mt-4 space-y-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-cream-100/60">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold-500" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
