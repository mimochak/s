"use server";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";

function parseEuroToCents(raw: FormDataEntryValue | null): number | null {
  if (typeof raw !== "string" || raw.trim() === "") return null;
  const normalized = raw.replace(",", ".").trim();
  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100);
}

function parseInt10(raw: FormDataEntryValue | null): number | null {
  if (typeof raw !== "string" || raw.trim() === "") return null;
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value)) return null;
  return value;
}

function readProductForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const profile = String(formData.get("profile") ?? "").trim();
  const shortDesc = String(formData.get("shortDesc") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || name);

  const volumeMl = parseInt10(formData.get("volumeMl"));
  const stock = parseInt10(formData.get("stock")) ?? 0;
  const harvestYear = parseInt10(formData.get("harvestYear"));
  const priceCents = parseEuroToCents(formData.get("price"));
  const compareAtRaw = formData.get("compareAtPrice");
  const compareAtCents =
    typeof compareAtRaw === "string" && compareAtRaw.trim() !== ""
      ? parseEuroToCents(compareAtRaw)
      : null;

  const featured = formData.get("featured") === "on";

  if (
    !name ||
    !profile ||
    !shortDesc ||
    !description ||
    !region ||
    !slug ||
    volumeMl === null ||
    volumeMl <= 0 ||
    priceCents === null ||
    priceCents <= 0 ||
    harvestYear === null
  ) {
    return {
      error: "Merci de remplir tous les champs obligatoires avec des valeurs valides.",
      data: null,
    };
  }

  return {
    error: null,
    data: {
      name,
      profile,
      shortDesc,
      description,
      region,
      slug,
      volumeMl,
      stock,
      harvestYear,
      priceCents,
      compareAtCents,
      featured,
    },
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const parsed = readProductForm(formData);
  if (parsed.error || !parsed.data) {
    redirect(`/admin/produits/nouveau?error=${encodeURIComponent(parsed.error ?? "Erreur de validation.")}`);
  }

  try {
    await prisma.product.create({ data: parsed.data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      redirect(
        `/admin/produits/nouveau?error=${encodeURIComponent("Ce slug est déjà utilisé par un autre produit.")}`
      );
    }
    throw error;
  }

  revalidatePath("/boutique");
  revalidatePath("/");
  redirect("/admin/produits?created=1");
}

export async function updateProduct(productId: string, formData: FormData) {
  await requireAdmin();
  const parsed = readProductForm(formData);
  if (parsed.error || !parsed.data) {
    redirect(`/admin/produits/${productId}?error=${encodeURIComponent(parsed.error ?? "Erreur de validation.")}`);
  }

  try {
    await prisma.product.update({ where: { id: productId }, data: parsed.data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      redirect(
        `/admin/produits/${productId}?error=${encodeURIComponent("Ce slug est déjà utilisé par un autre produit.")}`
      );
    }
    throw error;
  }

  revalidatePath("/boutique");
  revalidatePath(`/boutique/${parsed.data.slug}`);
  revalidatePath("/");
  redirect("/admin/produits?updated=1");
}

export async function setProductActive(productId: string, active: boolean) {
  await requireAdmin();
  await prisma.product.update({ where: { id: productId }, data: { active } });
  revalidatePath("/boutique");
  revalidatePath("/");
  revalidatePath("/admin/produits");
}
