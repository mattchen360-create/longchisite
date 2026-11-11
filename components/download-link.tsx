"use client";
import { Download } from "lucide-react";
import { track } from "@/lib/tracking";
export function DownloadLink({ href, model }: { href: string; model: string }) {
  return (
    <a
      className="text-link"
      href={href}
      download
      onClick={() =>
        track("file_download", {
          model,
          file_name: href.split("/").pop() || "",
        })
      }
    >
      Download <Download size={16} aria-hidden="true" />
    </a>
  );
}
