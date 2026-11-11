"use client";
import { useState } from "react";
import { solutions } from "@/content/site";
export function ProductBrief() {
  const [selected, setSelected] = useState<string[]>([]);
  const href = selected.length
    ? `/contact/?category=${selected.length === 1 ? selected[0] : "multiple"}&lines=${selected.join(",")}`
    : "/contact/";
  return (
    <div className="product-brief">
      <div>
        <h3>Planning across product lines?</h3>
        <p>Select the areas you would like to discuss.</p>
      </div>
      <fieldset>
        <legend className="sr-only">
          Choose product lines for your enquiry
        </legend>
        {solutions.map((s) => (
          <label key={s.slug}>
            <input
              type="checkbox"
              checked={selected.includes(s.slug)}
              onChange={() =>
                setSelected((current) =>
                  current.includes(s.slug)
                    ? current.filter((v) => v !== s.slug)
                    : [...current, s.slug],
                )
              }
            />
            {s.shortName}
          </label>
        ))}
      </fieldset>
      <a className="button" href={href}>
        Discuss your project{selected.length > 0 ? ` (${selected.length})` : ""}
      </a>
    </div>
  );
}
