import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata('/services/deep-cleaning');

export default function DeepCleaningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
