'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/product-grid';
import FilterSidebar from '@/components/filter-sidebar';
import SearchBar from '@/components/search-bar';
import WholesaleBanner from '@/components/wholesale-banner';
import type { Product } from '@/lib/types';

export default function Home() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get search params
  const query = searchParams.get('q') || '';
  const categorias = searchParams.get('categoria')?.split(',') || [];
  const caracteristicas = searchParams.get('caracteristica')?.split(',') || [];
  const precioMin = searchParams.get('precio_min') ? Number(searchParams.get('precio_min')) : null;
  const precioMax = searchParams.get('precio_max') ? Number(searchParams.get('precio_max')) : null;
  const enStock = searchParams.get('en_stock') === 'true';

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${apiUrl}/api/products`);

        if (!res.ok) {
          throw new Error(`Error al obtener productos: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Apply filters when products or filter parameters change
  useEffect(() => {
    // Solo se ejecuta si products o alguna de las dependencias cambia
    const filterProducts = () => {
      let result = [...products];

      // Filter by search query
      if (query) {
        const searchTerms = query.toLowerCase().split(' ');
        result = result.filter((product) =>
          searchTerms.every(
            (term) =>
              product.nombre.toLowerCase().includes(term) || product.descripcion.toLowerCase().includes(term),
          ),
        );
      }

      // Filter by category
      if (categorias.length > 0) {
        result = result.filter((product) => categorias.includes(product.categoria.toLowerCase()));
      }

      // Filter by features
      if (caracteristicas.length > 0) {
        result = result.filter((product) =>
          caracteristicas.some(
            (feature) =>
              product.caracteristicas.some((c) => c.toLowerCase().includes(feature.toLowerCase())) ||
              product.descripcion.toLowerCase().includes(feature.toLowerCase()),
          ),
        );
      }

      // Filter by price
      if (precioMin !== null) {
        result = result.filter((product) => product.precio >= precioMin);
      }

      if (precioMax !== null) {
        result = result.filter((product) => product.precio <= precioMax);
      }

      // Filter by stock
      if (enStock) {
        result = result.filter((product) => product.stock > 0);
      }

      return result;
    };

    const filtered = filterProducts();
    setFilteredProducts(filtered);
  }, [products, searchParams]);

  return (
    <main className='container mx-auto px-4 py-8'>
      <WholesaleBanner />

      <div className='flex flex-col md:flex-row justify-between items-start gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Indumentaria Profesional</h1>
          <p className='text-muted-foreground'>
            Descubre nuestra selección de indumentaria para caza y pesca
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full md:w-auto'>
          <div className='w-full sm:w-auto'>
            <SearchBar />
          </div>
          <FilterSidebar />
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
        </div>
      ) : error ? (
        <div className='text-center py-12'>
          <p className='text-lg text-destructive mb-4'>{error}</p>
          <p className='text-sm text-muted-foreground'>
            Intenta recargar la página o visita{' '}
            <code className='bg-muted px-1 py-0.5 rounded'>/api/seed</code> para inicializar la base de datos
          </p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <div className='mb-4 text-sm text-muted-foreground'>
            {filteredProducts.length} productos encontrados
          </div>
          <ProductGrid products={filteredProducts} />
        </>
      ) : (
        <div className='text-center py-12'>
          <p className='text-lg mb-4'>No se encontraron productos con los filtros seleccionados</p>
          <p className='text-sm text-muted-foreground'>
            Prueba con otros filtros o visita <code className='bg-muted px-1 py-0.5 rounded'>/api/seed</code>{' '}
            para inicializar la base de datos
          </p>
        </div>
      )}
    </main>
  );
}
