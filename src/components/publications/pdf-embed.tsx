"use client";

import dynamic from "next/dynamic";

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
    loading: () => (
      <p className="publication-pdf-status">Loading PDF viewer...</p>
    ),
  },
);

export function PdfEmbed(props: PdfEmbedProps) {
  return <PdfViewer {...props} />;
}
