import { type NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await dbConnect();
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

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const data = await request.json();

    const product = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        error: 'Error al actualizar el producto',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        error: 'Error al eliminar el producto',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
};
