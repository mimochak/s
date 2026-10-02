type ProductFormValues = {
  name: string;
  slug: string;
  profile: string;
  volumeMl: number;
  priceCents: number;
  compareAtCents: number | null;
  stock: number;
  harvestYear: number;
  region: string;
  shortDesc: string;
  description: string;
  featured: boolean;
};

export function ProductForm({
  action,
  defaultValues,
  error,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Partial<ProductFormValues>;
  error?: string;
  submitLabel: string;
}) {
  const v: ProductFormValues = {
    name: defaultValues?.name ?? "",
    slug: defaultValues?.slug ?? "",
    profile: defaultValues?.profile ?? "",
    volumeMl: defaultValues?.volumeMl ?? 500,
    priceCents: defaultValues?.priceCents ?? 0,
    compareAtCents: defaultValues?.compareAtCents ?? null,
    stock: defaultValues?.stock ?? 100,
    harvestYear: defaultValues?.harvestYear ?? new Date().getFullYear(),
    region: defaultValues?.region ?? "",
    shortDesc: defaultValues?.shortDesc ?? "",
    description: defaultValues?.description ?? "",
    featured: defaultValues?.featured ?? false,
  };

  return (
    <form action={action} className="max-w-3xl space-y-6">
      {error && <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom du produit *">
          <input name="name" defaultValue={v.name} required className={inputClass} />
        </Field>
        <Field label="Slug (URL)" hint="Laissez vide pour le générer automatiquement.">
          <input name="slug" defaultValue={v.slug} placeholder="auto" className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Profil *" hint='Ex. "Fruité Vert"'>
          <input name="profile" defaultValue={v.profile} required className={inputClass} />
        </Field>
        <Field label="Format (ml) *">
          <input name="volumeMl" type="number" min={1} defaultValue={v.volumeMl} required className={inputClass} />
        </Field>
        <Field label="Stock">
          <input name="stock" type="number" min={0} defaultValue={v.stock} className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Prix (€) *">
          <input
            name="price"
            type="text"
            inputMode="decimal"
            defaultValue={(v.priceCents / 100).toFixed(2)}
            required
            className={inputClass}
          />
        </Field>
        <Field label="Prix barré (€)" hint="Optionnel, pour une promotion.">
          <input
            name="compareAtPrice"
            type="text"
            inputMode="decimal"
            defaultValue={v.compareAtCents ? (v.compareAtCents / 100).toFixed(2) : ""}
            className={inputClass}
          />
        </Field>
        <Field label="Année de récolte *">
          <input name="harvestYear" type="number" defaultValue={v.harvestYear} required className={inputClass} />
        </Field>
      </div>

      <Field label="Région *">
        <input name="region" defaultValue={v.region} required className={inputClass} />
      </Field>

      <Field label="Résumé court *" hint="Affiché sur les cartes produit.">
        <input name="shortDesc" defaultValue={v.shortDesc} required className={inputClass} />
      </Field>

      <Field label="Description *">
        <textarea name="description" rows={5} defaultValue={v.description} required className={inputClass} />
      </Field>

      <label className="flex items-center gap-2 text-sm text-ink-950/70">
        <input type="checkbox" name="featured" defaultChecked={v.featured} className="h-4 w-4 rounded border-ink-950/30" />
        Mettre en avant sur la page d&rsquo;accueil
      </label>

      <button
        type="submit"
        className="rounded-full bg-ink-950 px-7 py-3 text-sm font-medium uppercase tracking-widest2 text-cream-50 transition hover:bg-ink-800"
      >
        {submitLabel}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-ink-950/15 px-4 py-2.5 text-sm focus:border-sage-500 focus:outline-none";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-widest2 text-ink-950/50">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-ink-950/40">{hint}</p>}
    </div>
  );
}
