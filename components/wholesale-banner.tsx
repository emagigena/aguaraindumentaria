import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function WholesaleBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // Ocultar después de 5 segundos

    return () => clearTimeout(timer); // Limpiar el timer cuando el componente se desmonte
  }, []);

  if (!visible) return null; // Si no está visible, no renderizar nada

  return (
    <Alert className='bg-primary/10 border-primary/20 mb-6'>
      <AlertCircle className='h-4 w-4 text-primary' />
      <AlertTitle className='text-primary font-medium'>Venta exclusiva mayorista</AlertTitle>
      <AlertDescription className='text-sm'>
        Aguará Indumentaria opera únicamente bajo modalidad mayorista. Compra mínima: 10 unidades.
      </AlertDescription>
    </Alert>
  );
}
