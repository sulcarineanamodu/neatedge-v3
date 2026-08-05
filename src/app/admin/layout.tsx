import { verifyAdmin } from '@/lib/admin/auth';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/admin/SignOutButton';

export const metadata = {
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await verifyAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Neatedge Admin</h1>
            <p className="text-sm text-gray-600">Signed in as {admin.email}</p>
          </div>
          <SignOutButton />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
