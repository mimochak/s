export function StatBadge({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="border-l border-cream-100/15 pl-5">
      <p className="font-serif text-3xl text-gold-500 sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest2 text-cream-100/70">{label}</p>
      {note && <p className="mt-1 text-xs text-cream-100/40">{note}</p>}
    </div>
  );
}
