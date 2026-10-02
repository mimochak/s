import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Messages — Admin",
};

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink-950">Messages</h1>
      <p className="mt-1 text-sm text-ink-950/50">{messages.length} message(s) reçu(s) via le formulaire de contact.</p>

      <div className="mt-6 overflow-hidden rounded-lg border border-ink-950/10 bg-white">
        {messages.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-ink-950/50">Aucun message.</p>
        ) : (
          <ul className="divide-y divide-ink-950/10">
            {messages.map((message) => (
              <li key={message.id}>
                <Link
                  href={`/admin/messages/${message.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 text-sm transition hover:bg-cream-50"
                >
                  <div className="flex items-center gap-3">
                    {!message.read && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-gold-500" />}
                    <div>
                      <p className={message.read ? "text-ink-950/80" : "font-medium text-ink-950"}>{message.subject}</p>
                      <p className="text-xs text-ink-950/50">
                        {message.name} · {message.email}
                      </p>
                    </div>
                  </div>
                  <p className="flex-shrink-0 text-xs text-ink-950/40">
                    {message.createdAt.toLocaleDateString("fr-FR")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
