"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { PdfLoadingPlaceholder } from "@/components/publications/pdf-loading-placeholder";

interface PdfEmbedProps {
  src: string;
  title?: string;
}

const PdfViewer = dynamic(
  () =>
    import("@/components/publications/pdf-viewer").then(
      (module) => module.PdfViewer,
    ),
  {
    ssr: false,
    loading: PdfLoadingPlaceholder,
  },
);

export function PdfEmbed(props: PdfEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      // Browser capability detection must happen after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <PdfViewer key={props.src} {...props} />
      ) : (
        <PdfLoadingPlaceholder />
      )}
    </div>
  );
}
