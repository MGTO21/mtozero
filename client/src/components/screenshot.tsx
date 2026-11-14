import Image from "next/image";
import dims from "@/lib/screenshot-dims.json";

const DIMS = dims as unknown as Record<string, [number, number]>;

// Desktop captures in /storage are full 1920×1080 screens: 109px of browser
// chrome on top and a 50px Windows taskbar below. Frame only the page itself.
const CHROME_TOP = 109;
const VISIBLE_H = 921;
const VISIBLE_W = 1900;

export function storagePath(src: string) {
  return src.replace(/^\/?storage\//, "");
}

export function screenshotDims(src: string): [number, number] | undefined {
  return src.startsWith("http") ? undefined : DIMS[storagePath(src)];
}

export function resolveSrc(src: string) {
  return src.startsWith("http") ? src : `/storage/${storagePath(src)}`;
}

export function Screenshot({
  src,
  alt,
  sizes,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const url = resolveSrc(src);
  const known = src.startsWith("http") ? undefined : DIMS[storagePath(src)];

  if (known && known[0] === 1920 && known[1] === 1080) {
    return (
      <span className={`relative block overflow-hidden ${className}`} style={{ aspectRatio: `${VISIBLE_W} / ${VISIBLE_H}` }}>
        <Image
          src={url}
          alt={alt}
          width={1920}
          height={1080}
          sizes={sizes}
          priority={priority}
          className="block max-w-none"
          style={{ width: `${(1920 / VISIBLE_W) * 100}%`, marginTop: `-${((CHROME_TOP / 1080) * (1080 / 1920) * (1920 / VISIBLE_W) * 100).toFixed(3)}%` }}
        />
      </span>
    );
  }

  if (known && known[1] > known[0]) {
    // Phone captures: show the device screen inside the same wide frame as desktop shots.
    return (
      <span
        className={`relative flex items-center justify-center overflow-hidden bg-muted ${className}`}
        style={{ aspectRatio: `${VISIBLE_W} / ${VISIBLE_H}` }}
      >
        <Image
          src={url}
          alt={alt}
          width={known[0]}
          height={known[1]}
          sizes="(min-width: 1024px) 14vw, 30vw"
          priority={priority}
          className="h-[88%] w-auto rounded-[8px] border-[4px] border-foreground"
        />
      </span>
    );
  }

  if (known) {
    return (
      <Image
        src={url}
        alt={alt}
        width={known[0]}
        height={known[1]}
        sizes={sizes}
        priority={priority}
        className={`block h-auto w-full ${className}`}
      />
    );
  }

  return (
    <span className={`relative block aspect-[16/9] overflow-hidden bg-muted ${className}`}>
      <Image src={url} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </span>
  );
}
