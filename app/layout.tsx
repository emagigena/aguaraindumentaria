import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { CartProvider } from '@/lib/cart-context';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Head from 'next/head';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aguara Indumentaria - Catálogo de Productos',
  description: 'Descubre nuestra selección de productos de alta calidad',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
