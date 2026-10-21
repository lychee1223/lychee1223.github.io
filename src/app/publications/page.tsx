import { Suspense } from "react";
import { PublicationsClientPage } from "./publications-client-page";
import { sortedPublicationData } from "@/data/publication";
import { toPublicationListItem } from "@/lib/publications";

const publications = sortedPublicationData.map(toPublicationListItem);

export default function PublicationsPage() {
  return (
    <Suspense fallback={null}>
      <PublicationsClientPage publications={publications} />
    </Suspense>
  );
}
