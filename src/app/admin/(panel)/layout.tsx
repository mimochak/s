import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  const unreadMessages = await prisma.contactMessage.count({ where: { read: false } });

  return (
    <div className="flex">
      <AdminSidebar unreadMessages={unreadMessages} />
      <main className="min-h-screen flex-1 overflow-x-hidden px-8 py-8">{children}</main>
    </div>
  );
}
