'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ProductForm from '@/components/admin/product-form';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage(props: EditProductPageProps) {
  const params = use(props.params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`);

        if (!res.ok) {
          throw new Error('Error al cargar el producto');
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error',
          description: 'No se pudo cargar el producto',
          variant: 'destructive',
        });
        router.push('/admin/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router, toast]);

  if (loading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  if (!product) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground'>Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Editar Producto</h1>
        <p className='text-muted-foreground'>Modifique los detalles del producto</p>
      </div>

      <div className='border rounded-md p-6'>
        <ProductForm
          product={product}
          isEditing
        />
      </div>
    </div>
  );
}
