'use client';

import { Toaster as Sonner } from 'sonner';

export default function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
        },
      }}
    />
  );
}
