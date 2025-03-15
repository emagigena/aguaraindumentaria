'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import ImageUpload from './image-upload';
import { resizeImage } from '@/lib/image-utils';

interface ProductFormProps {
  product?: Product;
  isEditing?: boolean;
}

export default function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '/placeholder.svg?height=500&width=500',
      stock: 0,
      categoria: '',
      caracteristicas: [],
    },
  );

  const [caracteristicasInput, setCaracteristicasInput] = useState(
    product?.caracteristicas?.join(', ') || '',
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'precio' || name === 'stock') {
      setFormData({
        ...formData,
        [name]: Number.parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      categoria: value,
    });
  };

  const handleCaracteristicasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaracteristicasInput(e.target.value);

    // Split by comma and trim whitespace
    const caracteristicas = e.target.value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    setFormData({
      ...formData,
      caracteristicas,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.descripcion || !formData.categoria) {
      toast({
        title: 'Error',
        description: 'Por favor complete todos los campos obligatorios',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Resize the image if it's a base64 image
      const processedData = { ...formData };

      if (formData.imagen && formData.imagen.startsWith('data:image')) {
        try {
          const resizedImage = await resizeImage(formData.imagen, 1200, 0.8);
          processedData.imagen = resizedImage;
        } catch (imageError) {
          console.error('Error resizing image:', imageError);
          // Continue with the original image if resizing fails
        }
      }

      const url = isEditing ? `/api/products/${product?._id}` : '/api/products';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }

      toast({
        title: isEditing ? 'Producto actualizado' : 'Producto creado',
        description: isEditing
          ? 'El producto ha sido actualizado correctamente'
          : 'El producto ha sido creado correctamente',
      });

      router.push('/admin');
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar el producto',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6'
    >
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='nombre'>Nombre del producto *</Label>
          <Input
            id='nombre'
            name='nombre'
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='categoria'>Categoría *</Label>
          <Select
            value={formData.categoria}
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder='Seleccione una categoría' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Remeras'>Remeras</SelectItem>
              <SelectItem value='Pantalones'>Pantalones</SelectItem>
              <SelectItem value='Camperas'>Camperas</SelectItem>
              <SelectItem value='Accesorios'>Accesorios</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='descripcion'>Descripción *</Label>
        <Textarea
          id='descripcion'
          name='descripcion'
          value={formData.descripcion}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='precio'>Precio *</Label>
          <Input
            id='precio'
            name='precio'
            type='number'
            min='0'
            step='0.01'
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='stock'>Stock *</Label>
          <Input
            id='stock'
            name='stock'
            type='number'
            min='0'
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='imagen'>Imagen del producto</Label>
        <ImageUpload
          initialImage={formData.imagen}
          onImageChange={(base64Image: string) => {
            setFormData({
              ...formData,
              imagen: base64Image,
            });
          }}
        />
        <p className='text-xs text-muted-foreground'>
          Arrastre una imagen o haga clic para seleccionar un archivo
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='caracteristicas'>Características (separadas por comas)</Label>
        <Input
          id='caracteristicas'
          name='caracteristicas'
          value={caracteristicasInput}
          onChange={handleCaracteristicasChange}
          placeholder='Protección UV, Secado rápido, Impermeable'
        />
      </div>

      <div className='flex gap-2'>
        <Button
          type='button'
          variant='outline'
          onClick={() => router.push('/admin/products')}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              {isEditing ? 'Actualizando...' : 'Creando...'}
            </>
          ) : (
            <>{isEditing ? 'Actualizar' : 'Crear'} Producto</>
          )}
        </Button>
      </div>
    </form>
  );
}
