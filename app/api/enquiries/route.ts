import { env } from "cloudflare:workers";
import { validateEnquiry } from "@/lib/enquiry-validation";
export const dynamic = "force-dynamic";
function reply(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return reply({ error: "Please send your enquiry from this website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "Unsupported request format." }, 415);
  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > 16000)
      return reply({ error: "Your message is too long." }, 413);
    raw = JSON.parse(body);
  } catch {
    return reply({ error: "Please check your enquiry and try again." }, 400);
  }
  if (
    raw &&
    typeof raw === "object" &&
    (raw as Record<string, unknown>).website
  )
    return reply({ error: "Unable to process this enquiry." }, 400);
  let data;
  try {
    data = validateEnquiry(raw);
  } catch (error) {
    return reply(
      {
        error:
          error instanceof Error ? error.message : "Please check your details.",
      },
      400,
    );
  }
  if (!env.DB)
    return reply(
      {
        error:
          "Enquiry storage is temporarily unavailable. Please email matt@longchismart.com.",
      },
      503,
    );
  const db = env.DB;
  try {
    const existing = await db
      .prepare("SELECT id FROM enquiries WHERE idempotency_key = ?")
      .bind(data.idempotencyKey)
      .first<{ id: string }>();
    if (existing) return reply({ reference: existing.id, received: true });
    const now = Math.floor(Date.now() / 1000),
      windowStart = Math.floor(now / 3600) * 3600;
    const ip = request.headers.get("cf-connecting-ip") || "local";
    const bytes = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(`${ip}:${windowStart}`),
    );
    const rateKey = Array.from(new Uint8Array(bytes))
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
    const rate = await db
      .prepare(
        "INSERT INTO rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
      )
      .bind(rateKey, windowStart + 3600)
      .first<{ count: number }>();
    if (rate && rate.count > 12)
      return reply(
        {
          error:
            "Too many enquiries from this connection. Please try later or email our team.",
        },
        429,
      );
    const id = `LC-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const createdAt = new Date().toISOString();
    await db
      .prepare(
        "INSERT INTO enquiries (id,idempotency_key,name,email,category,country,model,message,source_path,attribution,consent,created_at,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      )
      .bind(
        id,
        data.idempotencyKey,
        data.name,
        data.email,
        data.category,
        data.country,
        data.model,
        data.message,
        data.sourcePath,
        JSON.stringify(data.attribution),
        JSON.stringify({
          contact: true,
          ...data.measurementConsent,
          version: "2026-11-11",
        }),
        createdAt,
        "new",
      )
      .run();
    await db
      .prepare("DELETE FROM rate_limits WHERE expires_at < ?")
      .bind(now)
      .run();
    return reply({ reference: id, received: true }, 201);
  } catch (error) {
    const existing = await db
      .prepare("SELECT id FROM enquiries WHERE idempotency_key = ?")
      .bind(data.idempotencyKey)
      .first<{ id: string }>()
      .catch(() => null);
    if (existing) return reply({ reference: existing.id, received: true });
    console.error(
      "Enquiry persistence failed",
      error instanceof Error ? error.name : "UnknownError",
    );
    return reply(
      {
        error:
          "We could not save your enquiry. Your details are still in the form. Try again or email matt@longchismart.com.",
      },
      503,
    );
  }
}
