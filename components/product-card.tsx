import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Extract features from description for badges
  const features = extractFeatures(product.descripcion);

  return (
    <Card className='overflow-hidden transition-all hover:shadow-md border-border/60'>
      <Link href={`/products/${product._id}`}>
        <div className='aspect-square relative overflow-hidden bg-muted'>
          <Image
            src={
              product.imagen.startsWith('data:image') ? product.imagen : product.imagen || '/placeholder.svg'
            }
            alt={product.nombre}
            fill
            className='object-cover transition-transform hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            unoptimized={product.imagen.startsWith('data:image')}
          />
          {product.stock > 0 && (
            <div className='absolute top-2 right-2'>
              <Badge
                variant='secondary'
                className='bg-primary text-white'
              >
                Stock disponible
              </Badge>
            </div>
          )}
          <div className='absolute bottom-2 left-2'>
            <Badge
              variant='outline'
              className='bg-background/80 backdrop-blur-sm'
            >
              {product.categoria}
            </Badge>
          </div>
        </div>
        <CardContent className='p-4'>
          <div className='flex flex-wrap gap-1 mb-2'>
            {features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className='feature-badge'
              >
                {feature}
              </span>
            ))}
          </div>
          <h3 className='font-medium text-lg line-clamp-1'>{product.nombre}</h3>
          <p className='text-muted-foreground text-sm line-clamp-2 mt-1'>
            {product.descripcion.substring(0, 100)}
            {product.descripcion.length > 100 ? '...' : ''}
          </p>
          <div className='mt-2 flex items-center justify-between'>
            <p className='font-bold text-xl'>${product.precio.toFixed(2)}</p>
            <span className='wholesale-badge'>Mayorista</span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className='p-4 pt-0'>
        <Link
          href={`/products/${product._id}`}
          target='_blank'
          className='w-full'
        >
          <Button className='w-full bg-primary hover:bg-primary/90'>Ver más</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// Helper function to extract features from description
function extractFeatures(description: string): string[] {
  const featureKeywords = [
    'UV',
    'Protección solar',
    'Secado rápido',
    'Impermeable',
    'Transpirable',
    'DRY-FIT',
    'Liviana',
    'Térmica',
    'Camuflaje',
    'Repelente',
    'Antimosquitos',
    'Resistente',
  ];

  const features: string[] = [];

  featureKeywords.forEach((keyword) => {
    if (description.toLowerCase().includes(keyword.toLowerCase())) {
      features.push(keyword);
    }
  });

  return features;
}
