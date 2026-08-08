import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata('/residential');

export default function ResidentialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
