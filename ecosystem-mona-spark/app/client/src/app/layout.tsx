import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MONA x SPARK - Écosystème de Gestion Artistique',
  description: 'Écosystème complet de gestion artistique et laboratoire créatif',
  keywords: 'MONA, SPARK, artiste, gestion, créatif, laboratoire',
  authors: [{ name: 'MONA x SPARK Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 