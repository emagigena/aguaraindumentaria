'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  initialImage?: string;
  onImageChange: (base64Image: string) => void;
}

export default function ImageUpload({ initialImage, onImageChange }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialImage && !initialImage.includes('placeholder.svg') ? initialImage : null,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Por favor seleccione una imagen');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es demasiado grande. El tamaño máximo es 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate new dimensions (max 1200px width or height while maintaining aspect ratio)
        const MAX_SIZE = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }

        // Resize image
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        // Get compressed image as base64 string (0.8 quality)
        const optimizedImage = canvas.toDataURL(file.type, 0.8);

        setPreviewImage(optimizedImage);
        onImageChange(optimizedImage);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange('/placeholder.svg?height=500&width=500');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className='space-y-2'>
      <div
        className={cn(
          'relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors',
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          previewImage ? 'h-[300px]' : 'h-[200px]',
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleChange}
        />

        {previewImage ? (
          <>
            <div className='relative w-full h-full'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage || '/placeholder.svg'}
                alt='Vista previa'
                className='w-full h-full object-contain'
              />
              <Button
                type='button'
                variant='destructive'
                size='icon'
                className='absolute top-2 right-2'
                onClick={handleRemoveImage}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col items-center justify-center space-y-2 text-center'>
              <div className='rounded-full bg-primary/10 p-3'>
                <ImageIcon className='h-6 w-6 text-primary' />
              </div>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>Arrastre y suelte una imagen aquí</p>
                <p className='text-xs text-muted-foreground'>
                  O haga clic para seleccionar un archivo (PNG, JPG, GIF hasta 5MB)
                </p>
              </div>
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='mt-2'
                onClick={handleButtonClick}
              >
                <Upload className='h-4 w-4 mr-2' />
                Seleccionar archivo
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
