import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export { ADMIN_SESSION_COOKIE, createSessionToken, SESSION_DURATION_MS } from "@/lib/session";

/** Server Components / Server Actions guard: redirects to the login page if not authenticated. */
export async function requireAdmin(): Promise<void> {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) {
    redirect("/admin/login");
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
