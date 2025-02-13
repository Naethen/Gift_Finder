'use client';

import { FavoritesProvider } from '@/context/FavoritesContext';
import { Toaster } from 'sonner';
import Header from './Header';
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
          {children}
        </main>
        <ScrollToTop />
        <Toaster />
      </div>
    </FavoritesProvider>
  );
}
