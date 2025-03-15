import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '../../../lib/models/Product';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error al obtener los productos' }, { status: 500 });
  }
}
