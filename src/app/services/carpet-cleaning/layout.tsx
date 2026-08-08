import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata('/services/carpet-cleaning');

export default function CarpetCleaningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
