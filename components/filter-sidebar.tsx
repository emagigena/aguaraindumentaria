'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

const categories = [
  { id: 'remeras', label: 'Remeras' },
  { id: 'pantalones', label: 'Pantalones' },
  { id: 'camperas', label: 'Camperas' },
  { id: 'accesorios', label: 'Accesorios' },
];

const features = [
  { id: 'uv', label: 'Protección UV' },
  { id: 'secado-rapido', label: 'Secado Rápido' },
  { id: 'impermeable', label: 'Impermeable' },
  { id: 'transpirable', label: 'Transpirable' },
  { id: 'camuflaje', label: 'Camuflaje' },
  { id: 'antimosquitos', label: 'Antimosquitos' },
];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categoria')?.split(',') || [],
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    searchParams.get('caracteristica')?.split(',') || [],
  );
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('precio_min') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('precio_max') || '');
  const [inStock, setInStock] = useState<boolean>(searchParams.get('en_stock') === 'true');

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, featureId]);
    } else {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set('categoria', selectedCategories.join(','));
    }

    if (selectedFeatures.length > 0) {
      params.set('caracteristica', selectedFeatures.join(','));
    }

    if (minPrice) {
      params.set('precio_min', minPrice);
    }

    if (maxPrice) {
      params.set('precio_max', maxPrice);
    }

    if (inStock) {
      params.set('en_stock', 'true');
    }

    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFeatures([]);
    setMinPrice('');
    setMaxPrice('');
    setInStock(false);
    router.push('/');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center gap-2'
        >
          <Filter className='h-4 w-4' />
          Filtrar
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-[300px] sm:w-[400px] overflow-y-auto'
      >
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtra los productos según tus necesidades</SheetDescription>
        </SheetHeader>

        <div className='py-4 space-y-6'>
          {/* Categories */}
          <div>
            <h3 className='text-sm font-medium mb-3'>Categorías</h3>
            <div className='space-y-2'>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className='flex items-center space-x-2'
                >
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div>
            <h3 className='text-sm font-medium mb-3'>Características</h3>
            <div className='space-y-2'>
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className='flex items-center space-x-2'
                >
                  <Checkbox
                    id={`feature-${feature.id}`}
                    checked={selectedFeatures.includes(feature.id)}
                    onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
                  />
                  <Label htmlFor={`feature-${feature.id}`}>{feature.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className='text-sm font-medium mb-3'>Rango de Precio</h3>
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <Label
                  htmlFor='min-price'
                  className='text-xs'
                >
                  Mínimo
                </Label>
                <Input
                  id='min-price'
                  type='number'
                  placeholder='$0'
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div>
                <Label
                  htmlFor='max-price'
                  className='text-xs'
                >
                  Máximo
                </Label>
                <Input
                  id='max-price'
                  type='number'
                  placeholder='$10000'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Stock */}
          <div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='in-stock'
                checked={inStock}
                onCheckedChange={(checked) => setInStock(checked as boolean)}
              />
              <Label htmlFor='in-stock'>Solo productos en stock</Label>
            </div>
          </div>
        </div>

        <SheetFooter className='flex flex-col sm:flex-row gap-2 sm:justify-between pt-4'>
          <Button
            variant='outline'
            onClick={clearFilters}
            className='w-full sm:w-auto'
          >
            <X className='h-4 w-4 mr-2' />
            Limpiar filtros
          </Button>
          <SheetClose asChild>
            <Button
              onClick={applyFilters}
              className='w-full sm:w-auto bg-primary hover:bg-primary/90'
            >
              Aplicar filtros
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
