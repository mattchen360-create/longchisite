"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
const photos = [
  {
    src: "/images/factory-assembly.webp",
    title: "Lighting assembly",
    alt: "People assembling lighting products at workstations along a production line",
  },
  {
    src: "/images/factory-line.webp",
    title: "Lighting production line",
    alt: "Supplied photograph of the Hunan LONGCHI lighting manufacturing line",
  },
  {
    src: "/images/company/engineering.webp",
    title: "Technical workspace",
    alt: "People at computers with electrical components and a test meter",
  },
  {
    src: "/images/company/testing.webp",
    title: "Lighting checks",
    alt: "Rows of LED street lights connected and illuminated on production benches",
  },
  {
    src: "/images/company/team.webp",
    title: "Technical workspace overview",
    alt: "Wider view of the technical workspace with people and lighting components",
  },
  {
    src: "/images/company/facility.webp",
    title: "Manufacturing facility exterior",
    alt: "Hunan LONGCHI manufacturing entrance and blue-roofed buildings",
  },
];
export function CompanyGallery({ currentImage }: { currentImage: string }) {
  const modal = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const photo = photos[active];
  function move(by: number) {
    setActive((i) => (i + by + photos.length) % photos.length);
  }
  function open(i: number) {
    setActive(i);
    modal.current?.showModal();
  }
  return (
    <>
      <button
        type="button"
        className="gallery-open"
        onClick={() =>
          open(
            Math.max(
              0,
              photos.findIndex((p) => p.src === currentImage),
            ),
          )
        }
      >
        <Maximize2 size={15} aria-hidden="true" />
        View company photos
      </button>
      <dialog
        className="feature-dialog gallery-dialog"
        ref={modal}
        aria-labelledby="gallery-title"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
        }}
      >
        <div className="feature-dialog-header">
          <div>
            <span>Hunan LONGCHI company photography</span>
            <h2 id="gallery-title">{photo.title}</h2>
          </div>
          <button
            type="button"
            className="dialog-close"
            aria-label="Close photo gallery"
            onClick={() => modal.current?.close()}
            autoFocus
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <figure>
          <img src={photo.src} alt={photo.alt} width="1600" height="1000" />
          <figcaption aria-live="polite">
            {active + 1} / {photos.length} · {photo.title}
          </figcaption>
        </figure>
        <div className="gallery-navigation">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous company photo"
          >
            <ChevronLeft size={20} aria-hidden="true" />
            Previous
          </button>
          <div className="gallery-thumbnails">
            {photos.map((p, i) => (
              <button
                type="button"
                key={p.src}
                aria-label={`View ${p.title}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <img
                  src={p.src}
                  alt=""
                  width="100"
                  height="65"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next company photo"
          >
            Next
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}
