import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!email || !message) {
    return NextResponse.json(
      { error: "L'e-mail et le message sont obligatoires." },
      { status: 400 }
    );
  }

  const contactMessage = await prisma.contactMessage.create({
    data: {
      name: name || "Anonyme",
      email,
      subject: subject || "Sans objet",
      message,
    },
  });

  return NextResponse.json({ id: contactMessage.id });
}
