export function PdfLoadingStage({ message }: { message: string }) {
  return (
    <div
      className="publication-pdf-stage flex items-center justify-center"
      style={{ aspectRatio: "16 / 9" }}
    >
      <p className="publication-pdf-status">{message}</p>
    </div>
  );
}

export function PdfLoadingPlaceholder() {
  return (
    <div className="publication-pdf-embed" aria-busy="true">
      <div className="publication-pdf-viewer">
        <PdfLoadingStage message="Loading PDF viewer..." />
      </div>
    </div>
  );
}
