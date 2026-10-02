"use client";

import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-sage-500/30 bg-sage-500/10 p-6 text-sage-700">
        Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest2 text-ink-950/50">Nom</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-ink-950/15 px-4 py-3 focus:border-sage-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-widest2 text-ink-950/50">E-mail *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-ink-950/15 px-4 py-3 focus:border-sage-500 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs uppercase tracking-widest2 text-ink-950/50">Sujet</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-md border border-ink-950/15 px-4 py-3 focus:border-sage-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs uppercase tracking-widest2 text-ink-950/50">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-md border border-ink-950/15 px-4 py-3 focus:border-sage-500 focus:outline-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Une erreur est survenue, veuillez réessayer.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-ink-950 px-8 py-3 text-sm font-medium uppercase tracking-widest2 text-cream-50 transition hover:bg-ink-800 disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
