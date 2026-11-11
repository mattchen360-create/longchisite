import { env } from "cloudflare:workers";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
export async function GET(request: Request) {
  if (!(await isAdmin(request)))
    return Response.json(
      { error: "Sign in to view enquiries." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  if (!env.DB)
    return Response.json({ error: "Storage unavailable." }, { status: 503 });
  const url = new URL(request.url);
  const before = url.searchParams.get("before") || "9999";
  const results = await env.DB.prepare(
    "SELECT * FROM enquiries WHERE created_at < ? ORDER BY created_at DESC LIMIT 51",
  )
    .bind(before)
    .all();
  const rows = results.results.slice(0, 50);
  return Response.json(
    {
      leads: rows,
      nextCursor:
        results.results.length > 50 ? rows[rows.length - 1].created_at : null,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function PATCH(request: Request) {
  if (!sameOrigin(request) || !(await isAdmin(request)))
    return Response.json({ error: "Not authorised." }, { status: 403 });
  if (!env.DB)
    return Response.json({ error: "Storage unavailable." }, { status: 503 });
  let data;
  try {
    const body = await request.text();
    if (body.length > 1000) throw new Error();
    data = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (
    !/^LC-[A-F0-9]{8}$/.test(data.id) ||
    !["new", "contacted", "qualified", "won", "closed"].includes(data.status)
  )
    return Response.json({ error: "Invalid status update." }, { status: 400 });
  const result = await env.DB.prepare(
    "UPDATE enquiries SET status=? WHERE id=?",
  )
    .bind(data.status, data.id)
    .run();
  return Response.json(
    { updated: Boolean(result.meta.changes) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
