"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  OliveBranchIcon,
  GridIcon,
  BottleIcon,
  PackageIcon,
  MailIcon,
  LogoutIcon,
  ExternalLinkIcon,
} from "@/components/Icons";
import { logout } from "@/app/admin/actions";

const NAV_LINKS = [
  { href: "/admin", label: "Tableau de bord", icon: GridIcon, exact: true },
  { href: "/admin/produits", label: "Produits", icon: BottleIcon, exact: false },
  { href: "/admin/commandes", label: "Commandes", icon: PackageIcon, exact: false },
  { href: "/admin/messages", label: "Messages", icon: MailIcon, exact: false },
];

export function AdminSidebar({ unreadMessages = 0 }: { unreadMessages?: number }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-ink-950/10 bg-ink-950 text-cream-50">
      <div className="flex items-center gap-2 border-b border-cream-100/10 px-6 py-5">
        <OliveBranchIcon className="h-5 w-8 text-gold-500" />
        <div>
          <p className="font-serif text-sm leading-tight">Golden Spoon Bio</p>
          <p className="text-[10px] uppercase tracking-widest2 text-cream-100/40">Administration</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {NAV_LINKS.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-cream-50/10 text-cream-50"
                  : "text-cream-100/60 hover:bg-cream-50/5 hover:text-cream-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {link.label}
              </span>
              {link.href === "/admin/messages" && unreadMessages > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1.5 text-[11px] font-semibold text-ink-950">
                  {unreadMessages}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-cream-100/10 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cream-100/60 transition hover:bg-cream-50/5 hover:text-cream-50"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          Voir le site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-cream-100/60 transition hover:bg-cream-50/5 hover:text-cream-50"
          >
            <LogoutIcon className="h-4 w-4" />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
