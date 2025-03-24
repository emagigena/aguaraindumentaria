'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { WhatsappLogo } from '@/components/icons/whatsapp-logo';
import { useCart } from '@/lib/cart-context';

export default function CartSummary() {
  const { cartItems, getCartTotal, getWhatsAppLink } = useCart();

  const total = getCartTotal();
  const whatsappLink = getWhatsAppLink();

  // Check if minimum wholesale quantity is met (10 units per product)
  const hasMinimumQuantity = cartItems.every((item) => item.quantity >= 10);

  return (
    <Card className='border-border/60'>
      <CardHeader className='bg-primary/5 border-b border-border/60'>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 pt-6'>
        <div className='flex justify-between font-bold text-lg'>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <Separator />

        <div className='text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Información importante:</p>
          <ul className='list-disc pl-5 space-y-1'>
            <li>Venta exclusiva para mayoristas</li>
            <li>Compra únicamente Mayorista</li>
            <li>Envíos a todo el país</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={whatsappLink}
          target='_blank'
          rel='noopener noreferrer'
          className='w-full'
        >
          <Button
            className='w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90'
            size='lg'
            disabled={cartItems.length === 0 || !hasMinimumQuantity}
          >
            <WhatsappLogo className='h-5 w-5 text-black' />
            <p className='text-black'>Consultar por WhatsApp</p>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
