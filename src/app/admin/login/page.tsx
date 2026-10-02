import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { OliveBranchIcon } from "@/components/Icons";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Connexion admin — Golden Spoon Bio",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6">
      <div className="w-full max-w-sm rounded-xl border border-cream-100/10 bg-ink-900 p-8 text-cream-50">
        <div className="mb-8 flex items-center gap-2">
          <OliveBranchIcon className="h-6 w-10 text-gold-500" />
          <div>
            <p className="font-serif text-lg leading-tight">Golden Spoon Bio</p>
            <p className="text-xs uppercase tracking-widest2 text-cream-100/50">Administration</p>
          </div>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1 block text-xs uppercase tracking-widest2 text-cream-100/60">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-md border border-cream-100/20 bg-transparent px-4 py-3 text-cream-50 focus:border-gold-500 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">Mot de passe incorrect. Réessayez.</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gold-500 px-6 py-3 text-sm font-medium uppercase tracking-widest2 text-ink-950 transition hover:bg-gold-400"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
