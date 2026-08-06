import { Suspense } from "react";
import ContactPageClient from "./ContactPageClient";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ContactPageClient />
    </Suspense>
  );
}
