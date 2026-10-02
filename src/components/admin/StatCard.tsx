export function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-lg border border-ink-950/10 bg-white p-5">
      <p className="text-xs uppercase tracking-widest2 text-ink-950/50">{label}</p>
      <p className="mt-2 font-serif text-3xl text-ink-950">{value}</p>
      {note && <p className="mt-1 text-xs text-ink-950/40">{note}</p>}
    </div>
  );
}
