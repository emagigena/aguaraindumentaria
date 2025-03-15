import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '../../../../lib/models/Product';

export async function GET(_request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await dbConnect();

    if (!params.id) {
      return NextResponse.json({ error: 'ID de producto no especificado' }, { status: 400 });
    }

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Error al obtener el producto' }, { status: 500 });
  }
}
