'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import imagelogo from '../public/aguaralogo.png'
import Image from 'next/image';
import ThemeToggle from './theme-toggle';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'Remeras', href: '/?categoria=remeras' },
    { name: 'Pantalones', href: '/?categoria=pantalones' },
    { name: 'Camperas', href: '/?categoria=camperas' },
    { name: 'Accesorios', href: '/?categoria=accesorios' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow ${isScrolled ? 'shadow-md' : ''
        }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center'
            >
              <Image
                src={imagelogo}
                alt='logo'
                width={60} // Ancho de la imagen (ajusta según tus necesidades)
                height={40} // Alto de la imagen (ajusta según tus necesidades)
                className='object-cover'
              />
              <span className='text-xl font-bold text-primary'>AGUARÁ</span>
              <span className='text-xs font-semibold bg-primary text-white px-1.5 py-0.5 ml-2 rounded'>
                MAYORISTA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {/* <div className='hidden md:flex md:flex-1 md:justify-center md:px-4'>
            <div className='relative w-full max-w-md'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Buscar productos...'
                className='w-full bg-background pl-8'
              />
            </div>
          </div> */}

          <nav className='hidden md:flex items-center space-x-20'>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                {category.name}
              </Link>
            ))}
            {/* /* Dark Mode */}
            <ThemeToggle />

            <Link href='/cart'>
              <Button
                variant='outline'
                size='icon'
                className='relative'
              >
                <ShoppingBag className='h-5 w-5' />
                {itemCount > 0 && (
                  <Badge className='absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs'>
                    {itemCount}
                  </Badge>
                )}
                <span className='sr-only'>Carrito</span>
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className='flex md:hidden items-center gap-4'>
            {/* /* Dark Mode */}
            <ThemeToggle />
            <Link href='/cart'>
              <Button
                variant='outline'
                size='icon'
                className='relative'
              >
                <ShoppingBag className='h-5 w-5' />
                {itemCount > 0 && (
                  <Badge className='absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs'>
                    {itemCount}
                  </Badge>
                )}
                <span className='sr-only'>Carrito</span>
              </Button>
            </Link>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Abrir menú</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        {/* <div className='pb-4 md:hidden'>
          <div className='relative w-full'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Buscar productos...'
              className='w-full bg-background pl-8'
            />
          </div>
        </div> */}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 md:hidden transition-all duration-300 ease-in-out shadow-md">
          <div className="flex h-16 items-center justify-between px-4 border-b border-muted">
            <Link href="/" className="flex items-center">
              {/* <span className="text-xl font-bold text-primary">AGUARÁ</span>
              <span className="text-xs font-semibold bg-primary text-white px-1.5 py-0.5 ml-2 rounded">
                MAYORISTA
              </span> */}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Cerrar menú</span>
            </Button>
          </div>
          <nav className="mt-4 px-4 grid gap-2 ">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center py-3 text-base font-medium border-b border-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

    </header>
  );
}
