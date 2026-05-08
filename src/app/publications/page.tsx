import { Suspense } from "react";
import { PublicationsClientPage } from "./publications-client-page";

export default function PublicationsPage() {
  return (
    <Suspense fallback={null}>
      <PublicationsClientPage />
    </Suspense>
  );
}
