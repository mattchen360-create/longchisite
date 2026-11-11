"use client";
import { useEffect, useState, type FormEvent } from "react";
import { Download, LogOut, RefreshCw, ArrowUpRight } from "lucide-react";
type Lead = {
  id: string;
  name: string;
  email: string;
  category: string;
  country: string;
  model: string;
  message: string;
  source_path: string;
  attribution: string;
  consent: string;
  created_at: string;
  status: string;
};
export default function Leads() {
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  async function load(cursor?: string) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/admin/leads/${cursor ? `?before=${encodeURIComponent(cursor)}` : ""}`,
      );
      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = (await response.json()) as {
        error?: string;
        leads: Lead[];
        nextCursor: string | null;
      };
      if (!response.ok)
        throw new Error(data.error || "Unable to load enquiries.");
      setAuthenticated(true);
      setLeads((previous) =>
        cursor ? [...previous, ...data.leads] : data.leads,
      );
      setNextCursor(data.nextCursor);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);
  async function login(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to sign in.");
      setPassword("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }
  async function update(id: string, status: string) {
    setError("");
    try {
      const response = await fetch("/api/admin/leads/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) throw new Error("Could not update enquiry status.");
      setLeads((previous) =>
        previous.map((l) => (l.id === id ? { ...l, status } : l)),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    }
  }
  function csv() {
    const escape = (value: unknown) => {
      let s = String(value ?? "");
      if (/^[=+@\-]/.test(s)) s = "'" + s;
      return `"${s.replace(/"/g, '""')}"`;
    };
    const headers = [
      "reference",
      "created_at",
      "status",
      "product_line",
      "country",
      "model",
      "name",
      "email",
      "message",
      "source_page",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "gbraid",
      "wbraid",
      "msclkid",
      "consent",
    ];
    const rows = leads.map((l) => {
      let a: Record<string, string> = {};
      try {
        a = JSON.parse(l.attribution);
      } catch {}
      return [
        l.id,
        l.created_at,
        l.status,
        l.category,
        l.country,
        l.model,
        l.name,
        l.email,
        l.message,
        l.source_path,
        ...[
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_term",
          "utm_content",
          "gclid",
          "gbraid",
          "wbraid",
          "msclkid",
        ].map((k) => a[k] || ""),
        l.consent,
      ];
    });
    const blob = new Blob(
      [
        "\ufeff" +
          [headers, ...rows]
            .map((row) => row.map(escape).join(","))
            .join("\r\n"),
      ],
      { type: "text/csv;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `longchi-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <main id="main-content" className="container section admin-page">
      <div className="page-heading">
        <span className="eyebrow">Private workspace</span>
        <h1>Project enquiries.</h1>
        <p>
          Review incoming requests, update their status and export the records
          you have loaded.
        </p>
      </div>
      {!authenticated ? (
        <form className="enquiry-form admin-login" onSubmit={login}>
          <h2>Administrator sign in</h2>
          <label style={{ marginTop: 25 }}>
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="button" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
            <ArrowUpRight size={17} />
          </button>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
        </form>
      ) : (
        <>
          <div className="admin-toolbar">
            <div className="filter-tabs">
              {["all", "new", "contacted", "qualified", "won", "closed"].map(
                (status) => (
                  <button
                    className={filter === status ? "active" : ""}
                    key={status}
                    onClick={() => setFilter(status)}
                  >
                    {status[0].toUpperCase() + status.slice(1)}
                  </button>
                ),
              )}
            </div>
            <div className="admin-actions">
              <button
                className="text-link"
                onClick={() => load()}
                disabled={loading}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <button className="text-link" onClick={csv}>
                <Download size={16} />
                Export loaded
              </button>
              <button
                className="text-link"
                onClick={async () => {
                  await fetch("/api/admin/session/", { method: "DELETE" });
                  setAuthenticated(false);
                  setLeads([]);
                }}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <p className="admin-count">{leads.length} enquiries loaded</p>
          <div className="admin-leads">
            {leads
              .filter((l) => filter === "all" || l.status === filter)
              .map((l) => (
                <article key={l.id} className="admin-lead">
                  <div className="admin-lead-top">
                    <div>
                      <strong>{l.id}</strong>
                      <span>
                        {new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(l.created_at))}
                      </span>
                    </div>
                    <label>
                      Status
                      <select
                        value={l.status}
                        onChange={(e) => update(l.id, e.target.value)}
                      >
                        {["new", "contacted", "qualified", "won", "closed"].map(
                          (s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                  </div>
                  <h2>
                    {l.name || "Project enquiry"} · {l.country}
                  </h2>
                  <a href={`mailto:${l.email}`}>{l.email}</a>
                  <p>
                    <strong>{l.category}</strong>
                    {l.model ? ` / ${l.model}` : ""}
                  </p>
                  <p className="admin-message">
                    {l.message || "No additional message supplied."}
                  </p>
                  <details>
                    <summary>Source & measurement details</summary>
                    <pre>
                      {JSON.stringify(
                        {
                          page: l.source_path,
                          attribution: JSON.parse(l.attribution),
                          consent: JSON.parse(l.consent),
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </details>
                </article>
              ))}
          </div>
          {!leads.length && (
            <p className="resource-note">
              No enquiries yet. New project requests will appear here.
            </p>
          )}
          {nextCursor && (
            <button
              className="button"
              onClick={() => load(nextCursor)}
              disabled={loading}
            >
              Load earlier enquiries
            </button>
          )}
        </>
      )}
    </main>
  );
}
