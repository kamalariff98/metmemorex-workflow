import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="dark bg-[#0f1419] text-white">
        {children}
      </body>
    </html>
  );
}


