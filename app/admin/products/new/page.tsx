import ProductForm from '@/components/admin/product-form';

export default function NewProductPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Crear Producto</h1>
        <p className='text-muted-foreground'>Añada un nuevo producto a su catálogo</p>
      </div>

      <div className='border rounded-md p-6'>
        <ProductForm />
      </div>
    </div>
  );
}
