'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CartItemComponent from '@/components/cart/cart-item';
import CartSummary from '@/components/cart/cart-summary';
import WholesaleBanner from '@/components/wholesale-banner';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { cartItems } = useCart();

  // Check if minimum wholesale quantity is met (10 units per product)
  const hasMinimumQuantity = cartItems.every((item) => item.quantity >= 10);

  return (
    <main className='container mx-auto px-4 py-8'>
      <WholesaleBanner />

      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold'>Carrito de compras</h1>
        <Link
          href='/'
          className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Continuar comprando
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <ShoppingBag className='h-16 w-16 text-muted-foreground mb-4' />
          <h2 className='text-xl font-semibold mb-2'>Tu carrito está vacío</h2>
          <p className='text-muted-foreground mb-6'>
            Parece que aún no has añadido ningún producto a tu carrito.
          </p>
          <Link href='/'>
            <Button className='bg-primary hover:bg-primary/90'>Explorar productos</Button>
          </Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='md:col-span-2'>
            <div className='rounded-lg border bg-card'>
              <div className='p-4 sm:p-6'>
                <h2 className='text-lg font-semibold mb-4'>
                  Productos ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                </h2>

                {!hasMinimumQuantity && (
                  <Alert className='mb-4 bg-destructive/10 border-destructive/20'>
                    <AlertCircle className='h-4 w-4 text-destructive' />
                    <AlertTitle className='text-destructive'>Cantidad mínima no alcanzada</AlertTitle>
                    <AlertDescription className='text-sm'>
                      Recuerda que la compra debe ser Mayorista.
                    </AlertDescription>
                  </Alert>
                )}

                <div>
                  {cartItems.map((item) => (
                    <CartItemComponent
                      key={item.product._id}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </main>
  );
}
