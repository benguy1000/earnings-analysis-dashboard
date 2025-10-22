import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DataProvider } from './context/DataContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Earnings Analysis Dashboard - Automate Insights & Execute Faster',
  description: 'AI-powered earnings call analysis. Turn hours of manual work into minutes with automated insights and actionable opportunities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
