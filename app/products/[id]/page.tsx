'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import QuantitySelector from '@/components/ui/quantity-selector';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage(props: ProductPageProps) {
  const params = use(props.params);
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);

        if (!res.ok) {
          if (res.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch product');
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);

    toast({
      title: 'Producto añadido',
      description: `${quantity} x ${product.nombre} añadido al carrito`,
    });
  };

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-destructive'>Error</h2>
          <p className='mt-2'>{error || 'No se pudo cargar el producto'}</p>
          <Link
            href='/'
            className='mt-4 inline-block'
          >
            <Button>Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className='container mx-auto px-4 py-8'>
      <Link
        href='/'
        className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Volver a productos
      </Link>

      <div className='grid md:grid-cols-2 gap-8'>
        <div className='relative aspect-square bg-muted rounded-lg overflow-hidden'>
          <Image
            src={product.imagen || '/placeholder.svg'}
            alt={product.nombre}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority
          />
        </div>

        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>{product.nombre}</h1>
          <p className='text-3xl font-bold mt-2'>${product.precio.toFixed(2)}</p>

          <div className='mt-6 space-y-6'>
            <div>
              <h2 className='text-lg font-medium mb-2'>Descripción</h2>
              <p className='text-muted-foreground'>{product.descripcion}</p>
            </div>
          </div>

          <div className='mt-8 space-y-4'>
            <div className='flex items-center gap-4'>
              <span className='font-medium'>Cantidad:</span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={product.stock}
              />
              <span className='text-sm text-muted-foreground'>{product.stock} disponibles</span>
            </div>

            <Button
              size='lg'
              className='w-full sm:w-auto'
              onClick={handleAddToCart}
            >
              <ShoppingCart className='mr-2 h-5 w-5' />
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
