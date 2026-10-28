import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';
import { BottomNav } from '../components/layout/BottomNav';
import { Footer } from '../components/layout/Footer';
import { Toast } from '../components/ui/Toast';

export const metadata: Metadata = {
  title: 'Crema Collective | The Independent Roasters Club',
  description:
    'A curated specialty coffee membership connecting discerning coffee lovers with independent neighborhood roasters. Predictable craft beverage credits, verified retail perks, and transparent economics.',
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
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,600&family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-50 text-espresso-950 font-sans antialiased selection:bg-caramel-200 selection:text-espresso-950">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
