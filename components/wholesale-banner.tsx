import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function WholesaleBanner() {
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
