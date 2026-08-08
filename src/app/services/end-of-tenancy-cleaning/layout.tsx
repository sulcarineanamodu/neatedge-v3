import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata('/services/end-of-tenancy-cleaning');

export default function EndOfTenancyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
