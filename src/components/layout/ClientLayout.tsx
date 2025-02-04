'use client';

import { FavoritesProvider } from '@/context/FavoritesContext';
import Header from './Header';
import Toaster from '@/components/ui/Toaster';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FavoritesProvider>
      <div className="min-h-full">
        <Header />
        <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
        <ScrollToTop />
        <Toaster />
      </div>
    </FavoritesProvider>
  );
}
