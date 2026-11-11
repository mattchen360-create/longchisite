"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { site, solutions } from "@/content/site";
import { readAttribution, track } from "@/lib/tracking";
export function EnquiryForm({
  category = "",
  model = "",
  compact = false,
  initialMessage = "",
  selectedLines = [],
}: {
  category?: string;
  model?: string;
  compact?: boolean;
  initialMessage?: string;
  selectedLines?: string[];
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [selected, setSelected] = useState(category);
  const started = useRef(false);
  const requestKey = useRef("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    setError("");
    const values = Object.fromEntries(new FormData(form).entries());
    requestKey.current = requestKey.current || crypto.randomUUID();
    try {
      const response = await fetch("/api/enquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          idempotencyKey: requestKey.current,
          model,
          sourcePath: location.pathname,
          attribution: readAttribution(),
          measurementConsent: window.longchiConsent || {
            analytics: false,
            advertising: false,
          },
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        reference?: string;
        received?: boolean;
      };
      if (!response.ok)
        throw new Error(
          result.error ||
            "We could not save your enquiry. Please try again or email us.",
        );
      if (result.received !== true || !result.reference)
        throw new Error("We could not confirm your enquiry. Please try again.");
      setReference(result.reference);
      setStatus("success");
      track("generate_lead", {
        product_line: String(values.category),
        model,
        lead_reference: result.reference,
      });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send. Please try again.",
      );
    }
  }
  return (
    <div className={`enquiry-form ${compact ? "compact-form" : ""}`}>
      {status === "success" ? (
        <div className="form-success" role="status">
          <CheckCircle2 size={38} aria-hidden="true" />
          <h3>Your enquiry is received.</h3>
          <p>
            Keep your reference <strong>{reference}</strong>. Our team will
            review your requirements.
          </p>
          <p>
            You can also email <a href={`mailto:${site.email}`}>{site.email}</a>{" "}
            and include this reference.
          </p>
          <a href="/products/" className="text-link">
            Explore the product range <ArrowUpRight size={16} />
          </a>
        </div>
      ) : (
        <form
          onSubmit={submit}
          onFocus={() => {
            if (!started.current) {
              started.current = true;
              track("form_start", {
                product_line: category || "general",
                model,
              });
            }
          }}
        >
          <div className="form-heading">
            <span className="eyebrow">Your project starts here</span>
            <h3>Get your project quote.</h3>
            <p>
              Tell us the product line and project location. We’ll help with
              equipment and configuration.
            </p>
          </div>
          {selectedLines.length > 0 && <p className="brief-prefill">Your selected lines: <strong>{selectedLines.join(", ")}</strong>. Add your site details below.</p>}
          <div className="form-grid">
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                maxLength={100}
                placeholder="Your name"
              />
            </label>
            <label>
              Work email <span aria-label="required">*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                placeholder="name@company.com"
              />
            </label>
          </div>
          <div className="form-grid">
            <label>
              Product line <span aria-label="required">*</span>
              <select
                name="category"
                required
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="" disabled>
                  Select a product line
                </option>
                {solutions.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
                <option value="multiple">Multiple product lines</option>
              </select>
            </label>
            <label>
              Project country <span aria-label="required">*</span>
              <input
                name="country"
                autoComplete="country-name"
                required
                maxLength={80}
                placeholder="e.g. Australia"
              />
            </label>
          </div>
          <label>
            Project details
            <textarea
              name="message"
              rows={3}
              maxLength={4000}
              defaultValue={initialMessage}
              placeholder={
                model
                  ? `Quantity, location or questions about ${model}…`
                  : "Equipment, quantity, site requirements or questions…"
              }
            />
          </label>
          <div className="form-honeypot" aria-hidden="true">
            <label>
              Leave this field empty
              <input name="website" autoComplete="off" tabIndex={-1} />
            </label>
          </div>
          {model && (
            <p className="form-model">
              Enquiring about <strong>{model}</strong>
            </p>
          )}
          <label className="checkbox-label">
            <input name="contactConsent" type="checkbox" value="yes" required />
            <span>
              I agree to be contacted about this enquiry and have read the{" "}
              <a href="/privacy/">privacy notice</a>.
            </span>
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error} Email <a href={`mailto:${site.email}`}>{site.email}</a> if
              the issue continues.
            </p>
          )}
          <button
            className="button form-submit"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <LoaderCircle className="spin" size={18} />
                Sending your enquiry…
              </>
            ) : (
              <>
                Request a project quote{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </>
            )}
          </button>
          <p className="form-note">
            Your details are used to respond to your project enquiry.
          </p>
        </form>
      )}
    </div>
  );
}
