"use client";

import Image from "next/image";
import { useState } from "react";
import { Screenshot, resolveSrc, screenshotDims } from "@/components/screenshot";

export function ProjectGallery({ images, name, screenLabel }: { images: string[]; name: string; screenLabel: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];
  const dims = screenshotDims(current);
  const portrait = dims ? dims[1] > dims[0] : false;

  return (
    <div>
      <figure>
        <div className="border border-border bg-card">
          {portrait && dims ? (
            <div className="flex justify-center bg-muted py-6">
              <Image
                src={resolveSrc(current)}
                alt={`${name} — ${screenLabel} ${active + 1}`}
                width={dims[0]}
                height={dims[1]}
                sizes="(min-width: 1024px) 24vw, 60vw"
                className="h-auto max-h-[70vh] w-auto rounded-[10px] border-[5px] border-foreground"
                priority={active === 0}
              />
            </div>
          ) : (
            <Screenshot src={current} alt={`${name} — ${screenLabel} ${active + 1}`} sizes="(min-width: 1024px) 66vw, 100vw" priority={active === 0} />
          )}
        </div>
        <figcaption className="mt-3 flex gap-3 text-sm text-muted-foreground">
          <span className="fig-label pt-[3px]" dir="ltr">
            FIG. {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <span>{name}</span>
        </figcaption>
      </figure>

      {images.length > 1 && (
        <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${screenLabel} ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-[4/3] overflow-hidden border bg-muted transition-[border-color,opacity] duration-150 ${
                i === active ? "border-foreground" : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={resolveSrc(img)} alt="" fill sizes="120px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
