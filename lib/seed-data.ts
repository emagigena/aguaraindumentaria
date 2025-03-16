import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

const sampleProducts = [
  {
    nombre: 'Remera UV Dorado Junior',
    descripcion:
      'Remera con protección UV 50+ para niños, ideal para pesca y actividades al aire libre. Tela liviana de secado rápido con tecnología DRY-FIT que mantiene al niño fresco y protegido del sol.',
    precio: 4500,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 50,
    categoria: 'Remeras',
    caracteristicas: ['Protección UV', 'Secado rápido', 'DRY-FIT'],
  },
  {
    nombre: 'Campera Softshell Camo 3D',
    descripcion:
      'Campera impermeable con patrón de camuflaje 3D para caza. Confeccionada con membrana impermeable y transpirable que mantiene el cuerpo seco en condiciones de lluvia mientras permite la evacuación del sudor.',
    precio: 18500,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 25,
    categoria: 'Camperas',
    caracteristicas: ['Impermeable', 'Transpirable', 'Camuflaje'],
  },
  {
    nombre: 'Pantalón Cargo Antimosquitos',
    descripcion:
      'Pantalón cargo con tratamiento antimosquitos y protección UV. Múltiples bolsillos y confeccionado con tela ripstop resistente a desgarros. Ideal para expediciones de pesca y caza en zonas con alta presencia de insectos.',
    precio: 12000,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 35,
    categoria: 'Pantalones',
    caracteristicas: ['Antimosquitos', 'Protección UV', 'Resistente'],
  },
  {
    nombre: 'Chaleco Multibolsillos Pescador',
    descripcion:
      'Chaleco técnico con múltiples bolsillos para pescadores. Confeccionado en tela liviana de secado rápido con tratamiento repelente al agua. Ideal para llevar todos los accesorios necesarios durante la jornada de pesca.',
    precio: 9800,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 40,
    categoria: 'Accesorios',
    caracteristicas: ['Secado rápido', 'Repelente al agua', 'Multibolsillos'],
  },
  {
    nombre: 'Remera Térmica Primera Capa',
    descripcion:
      'Remera térmica de primera capa con tecnología de retención de calor. Ideal como base para actividades de caza en climas fríos. Su tejido elástico se adapta al cuerpo sin restringir movimientos.',
    precio: 5500,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 45,
    categoria: 'Remeras',
    caracteristicas: ['Térmica', 'Elástica', 'Primera capa'],
  },
  {
    nombre: 'Pantalón Impermeable Camuflado',
    descripcion:
      'Pantalón 100% impermeable con patrón de camuflaje para caza. Costuras selladas y membrana impermeable de alta calidad que garantiza protección en condiciones de lluvia intensa.',
    precio: 14500,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 30,
    categoria: 'Pantalones',
    caracteristicas: ['Impermeable', 'Camuflaje', 'Costuras selladas'],
  },
  {
    nombre: 'Gorra Protección UV Pescador',
    descripcion:
      'Gorra con protección UV y tapa cuello desmontable. Ideal para largas jornadas de pesca bajo el sol. Confeccionada en tela liviana de secado rápido con tratamiento antimicrobiano.',
    precio: 3800,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 60,
    categoria: 'Accesorios',
    caracteristicas: ['Protección UV', 'Secado rápido', 'Antimicrobiano'],
  },
  {
    nombre: 'Campera Polar Camo Bosque',
    descripcion:
      'Campera polar con patrón de camuflaje de bosque. Excelente como capa intermedia para actividades de caza en climas fríos. Alta capacidad térmica con peso reducido.',
    precio: 8900,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 35,
    categoria: 'Camperas',
    caracteristicas: ['Térmica', 'Camuflaje', 'Liviana'],
  },
  {
    nombre: 'Remera UV Manga Larga Pesca',
    descripcion:
      'Remera de manga larga con protección UV 50+ para pesca. Confeccionada con tecnología DRY-FIT que evacúa rápidamente la humedad del cuerpo. Ideal para largas jornadas bajo el sol.',
    precio: 6200,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 40,
    categoria: 'Remeras',
    caracteristicas: ['Protección UV', 'DRY-FIT', 'Manga larga'],
  },
  {
    nombre: 'Botas Impermeables Camufladas',
    descripcion:
      'Botas totalmente impermeables con patrón de camuflaje. Suela antideslizante y refuerzo en puntera. Ideales para caza en terrenos húmedos y pantanosos.',
    precio: 22000,
    imagen: '/placeholder.svg?height=500&width=500',
    stock: 20,
    categoria: 'Accesorios',
    caracteristicas: ['Impermeable', 'Camuflaje', 'Antideslizante'],
  },
];

export default async function GET() {
  try {
    console.log('Seed API: Connecting to MongoDB...');
    await dbConnect();
    console.log('Seed API: MongoDB connected');

    // Check if we already have products
    const count = await Product.countDocuments();
    console.log(`Seed API: Found ${count} existing products`);

    if (count === 0) {
      console.log('Seed API: Seeding database with sample products...');
      await Product.insertMany(sampleProducts);
      console.log('Seed API: Database seeded successfully!');
      return NextResponse.json({ success: true, message: 'Database seeded successfully' });
    } else {
      // Option to reset and reseed
      await Product.deleteMany({});
      await Product.insertMany(sampleProducts);
      console.log('Seed API: Database reset and reseeded successfully!');
      return NextResponse.json({ success: true, message: 'Database reset and reseeded successfully' });
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error seeding database',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
