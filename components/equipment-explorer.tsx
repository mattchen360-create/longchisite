"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { products, solutions } from "@/content/site";
import { track } from "@/lib/tracking";

const comparisonGroups = [
  {
    label: "Power / configuration",
    keys: ["Rated power", "Power options", "This configuration"],
  },
  {
    label: "Speed measurement range",
    keys: ["Speed range", "Radar speed range"],
  },
  {
    label: "Specified measurement accuracy",
    keys: ["Specified accuracy", "Specified radar error"],
  },
];
const comparisonLabel = (key: string) =>
  comparisonGroups.find((group) => group.keys.includes(key))?.label || key;

export function EquipmentExplorer() {
  const [active, setActive] = useState(0);
  const [compared, setCompared] = useState<string[]>([]);
  const modal = useRef<HTMLDialogElement>(null);
  const line = solutions[active];
  const models = products.filter((p) => p.category === line.slug);
  const selected = models.filter((p) => compared.includes(p.slug));
  const fields = [
    ...new Set(
      selected.flatMap((p) => p.specs.map(([key]) => comparisonLabel(key))),
    ),
  ];
  function select(i: number) {
    setActive(i);
    setCompared([]);
    track("explore_equipment", { product_line: solutions[i].slug });
  }
  function keys(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let n: number;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft")
      n = (i + (e.key === "ArrowRight" ? 1 : 3)) % 4;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 3;
    else return;
    e.preventDefault();
    select(n);
    document.getElementById(`equipment-tab-${n}`)?.focus();
  }
  function toggle(slug: string) {
    setCompared((current) =>
      current.includes(slug)
        ? current.filter((v) => v !== slug)
        : current.length < 3
          ? [...current, slug]
          : current,
    );
  }
  return (
    <div className="equipment-explorer">
      <div
        className="equipment-tabs"
        role="tablist"
        aria-label="Equipment product lines"
      >
        {solutions.map((s, i) => (
          <button
            type="button"
            role="tab"
            key={s.slug}
            id={`equipment-tab-${i}`}
            aria-selected={active === i}
            aria-controls="equipment-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => keys(e, i)}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div
        id="equipment-panel"
        role="tabpanel"
        aria-labelledby={`equipment-tab-${active}`}
        tabIndex={0}
      >
        <div className="equipment-heading">
          <div>
            <h3>{line.name}</h3>
            <p>{line.intro}</p>
          </div>
          <a href={`/solutions/${line.slug}/`} className="text-link">
            Explore this product line
          </a>
        </div>
        {models.length > 0 ? (
          <>
            <p className="prem-browse-hint">Swipe or scroll to explore models. Select up to three to compare.</p>
            <div
              className={`equipment-models ${models.length === 4 ? "equipment-models-four" : ""}`}
              role="region"
              aria-label={`${line.name} models`}
              tabIndex={0}
            >
              {models.map((p) => (
                <article className="equipment-model" key={p.slug}>
                  <a
                    className="equipment-model-image"
                    href={`/products/${p.slug}/`}
                  >
                    <img
                      src={p.image}
                      alt={`${p.model} ${p.title}`}
                      width="400"
                      height="340"
                      loading="lazy"
                    />
                  </a>
                  <div className="equipment-model-copy">
                    <span>{p.model}</span>
                    <h4>
                      <a href={`/products/${p.slug}/`}>{p.title}</a>
                    </h4>
                    <ul>
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <div className="equipment-model-actions">
                      <a href={`/products/${p.slug}/`} className="text-link">
                        View model
                      </a>
                      <label>
                        <input
                          type="checkbox"
                          checked={compared.includes(p.slug)}
                          disabled={
                            compared.length >= 3 && !compared.includes(p.slug)
                          }
                          onChange={() => toggle(p.slug)}
                        />
                        Compare<span className="sr-only"> {p.model}</span>
                      </label>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="equipment-compare-bar">
              <p aria-live="polite">
                {selected.length
                  ? `${selected.length} of 3 models selected`
                  : "Select 2 or 3 models to compare their specifications."}
              </p>
              <button
                type="button"
                className="button"
                disabled={selected.length < 2}
                onClick={() => {
                  modal.current?.showModal();
                  track("compare_models", {
                    product_line: line.slug,
                    models: selected.map((p) => p.model).join(","),
                  });
                }}
              >
                Compare models{selected.length ? ` (${selected.length})` : ""}
              </button>
              {selected.length > 0 && (
                <button
                  type="button"
                  className="equipment-clear"
                  onClick={() => setCompared([])}
                >
                  Clear selection
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="equipment-category-overview">
            <img
              src={line.image}
              alt={line.imageAlt}
              width="600"
              height="440"
              loading="lazy"
            />
            <div>
              <h4>
                {line.slug === "smart-parking"
                  ? "Plan the entrance equipment."
                  : "Define the access workflow."}
              </h4>
              <p>{line.description}</p>
              <ul>
                {line.options.map((o) => (
                  <li key={o.title}>
                    <strong>{o.title}</strong>
                    <p>{o.text}</p>
                  </li>
                ))}
              </ul>
              <p className="equipment-category-note">
                Category overview. Ask for model-specific dimensions and
                documents.
              </p>
              <a className="button" href={`/contact/?category=${line.slug}`}>
                Discuss {line.shortName.toLowerCase()} equipment
              </a>
            </div>
          </div>
        )}
      </div>
      <dialog
        className="feature-dialog comparison-dialog"
        ref={modal}
        aria-labelledby="comparison-title"
      >
        <div className="feature-dialog-header">
          <div>
            <span>{line.name}</span>
            <h2 id="comparison-title">Compare model specifications</h2>
          </div>
          <button
            type="button"
            className="dialog-close"
            aria-label="Close model comparison"
            onClick={() => modal.current?.close()}
            autoFocus
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <p className="comparison-note">
          Values come from the available model specifications. “Not listed”
          means the supplied file does not list that field. Confirm final
          configurations with your quotation.
        </p>
        <div
          className="comparison-scroll"
          tabIndex={0}
          role="region"
          aria-label="Model specification comparison"
        >
          <table>
            <caption className="sr-only">{line.name} model comparison</caption>
            <thead>
              <tr>
                <th scope="col">Specification</th>
                {selected.map((p) => (
                  <th scope="col" key={p.slug}>
                    <a href={`/products/${p.slug}/`}>{p.model}</a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field}>
                  <th scope="row">{field}</th>
                  {selected.map((p) => (
                    <td key={p.slug}>
                      {p.specs.find(
                        ([k]) => comparisonLabel(k) === field,
                      )?.[1] || "Not listed"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a
          className="button"
          href={`/contact/?category=${line.slug}&models=${selected.map((p) => p.slug).join(",")}`}
        >
          Ask about these models
        </a>
      </dialog>
    </div>
  );
}
