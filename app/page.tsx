import { Suspense } from 'react';
import ProductGrid from '@/components/product-grid';
import type { Product } from '@/lib/types';

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/products`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-2'>Productos destacados</h1>
      <p className='text-gray-600 mb-8'>Descubre nuestra selección de productos de alta calidad</p>

      <Suspense fallback={<div>Cargando productos...</div>}>
        <ProductGrid products={products} />
      </Suspense>
    </main>
  );
}
