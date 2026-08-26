import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import PresentationShell from '@/components/PresentationShell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'AI4IT Workshop Presentation',
  description: 'Interactive AI presentation for IT professionals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <PresentationShell>
          {children}
        </PresentationShell>
      </body>
    </html>
  );
}

