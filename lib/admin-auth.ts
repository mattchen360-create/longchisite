import { env } from "cloudflare:workers";
function secret() {
  return (env as unknown as Record<string, string | undefined>).ADMIN_PASSWORD;
}
async function signature(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret() || ""),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const bytes = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(bytes))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
export function adminConfigured() {
  return Boolean(secret() && secret()!.length >= 16);
}
export async function checkPassword(password: string) {
  if (!adminConfigured()) return false;
  const hash = async (v: string) =>
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v)),
    );
  const [a, b] = await Promise.all([hash(password), hash(secret()!)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
export async function createSession() {
  const expiry = String(Math.floor(Date.now() / 1000) + 28800);
  return `${expiry}.${await signature(expiry)}`;
}
export async function isAdmin(request: Request) {
  if (!adminConfigured()) return false;
  const cookie = request.headers.get("cookie") || "";
  const value = cookie
    .split(";")
    .map((x) => x.trim())
    .find((x) => x.startsWith("lc_admin="))
    ?.slice(9);
  if (!value) return false;
  const [expiry, sig] = value.split(".");
  if (
    !/^\d+$/.test(expiry) ||
    Number(expiry) < Date.now() / 1000 ||
    !sig ||
    sig.length !== 64
  )
    return false;
  return sig === (await signature(expiry));
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
