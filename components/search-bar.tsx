'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', searchTerm);
      router.push(`/?${params.toString()}`);
    } else {
      clearSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='relative w-full max-w-md'
    >
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Buscar productos...'
        className='w-full bg-background pl-8 pr-10'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='absolute right-0 top-0 h-9 w-9 px-0'
          onClick={clearSearch}
        >
          <X className='h-4 w-4' />
          <span className='sr-only'>Limpiar búsqueda</span>
        </Button>
      )}
    </form>
  );
}
