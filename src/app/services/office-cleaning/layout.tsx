import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata('/services/office-cleaning');

export default function OfficeCleaningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
