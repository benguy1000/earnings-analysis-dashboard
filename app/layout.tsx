import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from './context/DataContext';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
