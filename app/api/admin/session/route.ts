import { env } from "cloudflare:workers";
import {
  adminConfigured,
  checkPassword,
  createSession,
  sameOrigin,
} from "@/lib/admin-auth";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!adminConfigured())
    return Response.json(
      { error: "Administrator access is not configured." },
      { status: 503 },
    );
  let password: string;
  try {
    const text = await request.text();
    if (text.length > 1000) throw new Error();
    const data = JSON.parse(text);
    password = typeof data.password === "string" ? data.password : "";
  } catch {
    return Response.json(
      { error: "Please enter your password." },
      { status: 400 },
    );
  }
  if (env.DB) {
    const bucket = Math.floor(Date.now() / 900000);
    const bytes = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(
        `admin:${request.headers.get("cf-connecting-ip") || "local"}:${bucket}`,
      ),
    );
    const key = Array.from(new Uint8Array(bytes))
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
    const rate = await env.DB.prepare(
      "INSERT INTO rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
    )
      .bind(key, (bucket + 1) * 900)
      .first<{ count: number }>();
    if (rate && rate.count > 20)
      return Response.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 },
      );
  }
  if (!(await checkPassword(password)))
    return Response.json(
      { error: "The password is incorrect." },
      { status: 401 },
    );
  const cookie = `lc_admin=${await createSession()}; HttpOnly; Path=/api/admin; SameSite=Strict; Max-Age=28800${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
  return Response.json(
    { authenticated: true },
    { headers: { "Set-Cookie": cookie, "Cache-Control": "no-store" } },
  );
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Invalid origin." }, { status: 403 });
  return Response.json(
    { authenticated: false },
    {
      headers: {
        "Set-Cookie":
          "lc_admin=; HttpOnly; Path=/api/admin; SameSite=Strict; Max-Age=0",
        "Cache-Control": "no-store",
      },
    },
  );
}
