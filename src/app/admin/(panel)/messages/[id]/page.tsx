import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteMessage } from "../actions";

export const metadata: Metadata = {
  title: "Message — Admin",
};

export default async function AdminMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) notFound();

  if (!message.read) {
    await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  }

  return (
    <div>
      <Link href="/admin/messages" className="text-xs uppercase tracking-widest2 text-ink-950/50 hover:text-ink-950">
        ← Messages
      </Link>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-ink-950">{message.subject}</h1>
          <p className="mt-1 text-sm text-ink-950/50">
            {message.name} · {message.email} ·{" "}
            {message.createdAt.toLocaleDateString("fr-FR")} à{" "}
            {message.createdAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <form action={deleteMessage.bind(null, message.id)}>
          <button
            type="submit"
            className="rounded-full bg-red-50 px-4 py-2 text-xs font-medium uppercase tracking-widest2 text-red-700 hover:bg-red-100"
          >
            Supprimer
          </button>
        </form>
      </div>

      <div className="mt-6 max-w-2xl whitespace-pre-wrap rounded-lg border border-ink-950/10 bg-white p-6 text-sm leading-relaxed text-ink-950/80">
        {message.message}
      </div>

      <a
        href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
        className="mt-6 inline-block rounded-full bg-ink-950 px-6 py-3 text-sm font-medium uppercase tracking-widest2 text-cream-50 hover:bg-ink-800"
      >
        Répondre par e-mail
      </a>
    </div>
  );
}
