'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (
      window.sessionStorage.getItem('admin_token') &&
      window.sessionStorage.getItem('admin_token') === 'aguaradmintoken'
    ) {
      router.push('/admin');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      toast({
        title: 'Error',
        description: 'Por favor ingrese la contraseña',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const userAdminCredentials = {
        password: 'admin',
      };

      if (password !== userAdminCredentials.password) {
        throw new Error('Contraseña incorrecta');
      }

      toast({
        title: 'Acceso concedido',
        description: 'Bienvenido al panel de administración',
      });
      window.sessionStorage.setItem('admin_token', 'aguaradmintoken');
      router.push('/admin');
    } catch (error) {
      toast({
        title: 'Error de autenticación',
        description: error instanceof Error ? error.message : 'Contraseña incorrecta',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted/40 px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>Panel de Administración</CardTitle>
          <CardDescription className='text-center'>
            Ingrese la contraseña para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <div className='relative'>
                <Input
                  id='password'
                  type='password'
                  placeholder='Contraseña'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pr-10'
                />
                <Lock className='absolute right-3 top-2.5 h-5 w-5 text-muted-foreground' />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type='submit'
              className='w-full bg-primary hover:bg-primary/90'
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Acceder'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
