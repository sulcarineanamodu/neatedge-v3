import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata('/areas');

export default function AreasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
