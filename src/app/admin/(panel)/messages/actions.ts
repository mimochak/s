"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function deleteMessage(messageId: string) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id: messageId } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  redirect("/admin/messages");
}
