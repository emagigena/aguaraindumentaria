import { type NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET() {
  try {
    console.log('API: Connecting to MongoDB...');
    await dbConnect();
    console.log('API: MongoDB connected, fetching products...');

    const products = await Product.find({});
    console.log(`API: Found ${products.length} products`);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        error: 'Error al obtener los productos',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    const data = await request.json();

    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        error: 'Error al crear el producto',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
};
