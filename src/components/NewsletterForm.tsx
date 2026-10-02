"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter",
          email,
          subject: "Inscription newsletter",
          message: "Inscription à la newsletter depuis la page d'accueil.",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm text-gold-400">
        Merci ! Vous recevrez nos prochaines récoltes et offres en avant-première.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse e-mail"
        className="flex-1 rounded-full border border-cream-100/20 bg-transparent px-5 py-3 text-sm text-cream-50 placeholder:text-cream-100/40 focus:border-gold-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-gold-500 px-6 py-3 text-sm font-medium uppercase tracking-widest2 text-ink-950 transition hover:bg-gold-400 disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "S'inscrire"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400 sm:absolute">Une erreur est survenue, réessayez.</p>
      )}
    </form>
  );
}
