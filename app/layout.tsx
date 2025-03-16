import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { CartProvider } from '@/lib/cart-context';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aguara Indumentaria - Catálogo de Productos',
  description: 'Descubre nuestra selección de productos de alta calidad',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
