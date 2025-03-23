import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

const sampleProducts = [
    {
        nombre: 'CAMISA AGUARA MICRO SECADO RAPIDO CAMO 3D',
        descripcion: 'Camisa de secado rápido con diseño camuflado 3D, ideal para actividades al aire libre y deportes de aventura.',
        precio: 25600,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Secado rápido', 'Diseño camuflado 3D', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'CAMISA AGUARA MICRO SECADO RAPIDO LISA',
        descripcion: 'Camisa lisa de secado rápido, cómoda y liviana, perfecta para climas cálidos y actividades al aire libre.',
        precio: 23200,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Secado rápido', 'Cómoda', 'Liviana']
    },
    {
        nombre: 'CAMISA GABARDINA CAMO 3D',
        descripcion: 'Camisa de gabardina con diseño camuflado 3D, resistente y versátil para uso diario o actividades en la naturaleza.',
        precio: 31450,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Resistente', 'Versátil', 'Diseño camuflado 3D']
    },
    {
        nombre: 'CAMPERA SOFTSHELL AGUARA COYOTE FORRADA POLAR INT 2XL-3XL-4XL',
        descripcion: 'Campera softshell con interior forrado en polar, ideal para mantener el calor en climas fríos y ventosos.',
        precio: 65450,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Forrada en polar', 'Resistente al viento', 'Ideal para climas fríos']
    },
    {
        nombre: 'CAMPERA SOFTSHELL AGUARA COYOTE FORRADA POLAR INT M-L-XL',
        descripcion: 'Campera softshell con interior de polar, resistente al viento y al agua, perfecta para actividades al aire libre.',
        precio: 59500,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Forrada en polar', 'Resistente al agua', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'CAMPERA SOFTSHELL AGUARA CAMO SECO M-L-XL',
        descripcion: 'Campera softshell con diseño camuflado seco, ideal para senderismo y aventuras en la naturaleza.',
        precio: 45900,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Diseño camuflado seco', 'Ideal para senderismo', 'Resistente']
    },
    {
        nombre: 'PANTALON AGUARÁ SOFTSHELL CAMO 3D',
        descripcion: 'Pantalón softshell con diseño camuflado 3D, resistente al agua y al viento, ideal para caza y trekking.',
        precio: 40800,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Resistente al agua', 'Diseño camuflado 3D', 'Ideal para caza y trekking']
    },
    {
        nombre: 'PANTALON AGUARÁ SOFTSHELL NEGRO -- VERDE',
        descripcion: 'Pantalón softshell en colores negro y verde, flexible y cómodo para actividades al aire libre.',
        precio: 38250,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Flexible', 'Cómodo', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'REMERA AGUARA UV PEJERREY C/CAPUCHA',
        descripcion: 'Remera UV con diseño de pejerrey y capucha, protege contra los rayos solares, ideal para pesca y deportes acuáticos.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Diseño de pejerrey', 'Ideal para pesca']
    },
    {
        nombre: 'REMERA AGUARA UV CAMO SECO',
        descripcion: 'Remera UV con diseño camuflado seco, protección solar y secado rápido, perfecta para actividades en exteriores.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Secado rápido', 'Diseño camuflado seco']
    },
    {
        nombre: 'REMERA AGUARÁ UV CIERVO',
        descripcion: 'Remera de protección UV para actividades al aire libre, ideal para protegerse del sol durante pesca o caminatas. Disponible en talles S, M, L, XL, XXL, XXXL.',
        precio: 12410,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Ideal para pesca', 'Disponible en varios talles']
    },
    {
        nombre: 'REMERA AGUARÁ UV DORADO 2 CON CAPUCHA Y TAPA BOCA',
        descripcion: 'Remera con capucha y tapa boca, diseñada para protegerte del sol. Perfecta para el uso en actividades al aire libre como pesca o trekking.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Con capucha', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'REMERA AGUARÁ UV DORADO CAMO CON CAPUCHA Y TAPA BOCA',
        descripcion: 'Remera camuflada con capucha y tapa boca. Protección UV para largas exposiciones al sol en actividades al aire libre.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Diseño camuflado', 'Ideal para largas exposiciones al sol']
    },
    {
        nombre: 'REMERA AGUARÁ UV DORADO PAWER CON CAPUCHA Y TAPA BOCA',
        descripcion: 'Remera con tecnología UV y protección adicional para la cara y cuello, ideal para quienes disfrutan de deportes al aire libre.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Con capucha', 'Protección adicional para cara y cuello']
    },
    {
        nombre: 'REMERA AGUARÁ UV EDICIÓN LIMITADA',
        descripcion: 'Edición limitada de remera con protección UV, ideal para actividades al aire libre. Perfecta para los amantes de la pesca y el camping.',
        precio: 12000,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Edición limitada', 'Protección UV', 'Ideal para pesca y camping']
    },
    {
        nombre: 'REMERA AGUARÁ UV LADY 2 C/CAPUCHA',
        descripcion: 'Remera femenina con capucha y protección UV, disponible en talles S, M, L, XL, XXL. Ideal para actividades de verano.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Femenina', 'Protección UV', 'Ideal para actividades de verano']
    },
    {
        nombre: 'REMERA AGUARÁ UV LADY FUXIA C/CAPUCHA',
        descripcion: 'Remera femenina en color fucsia, con capucha y protección UV. Talles disponibles S, M, L, XL, XXL. Perfecta para actividades al aire libre.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Femenina', 'Color fucsia', 'Protección UV']
    },
    {
        nombre: 'REMERA AGUARÁ UV M/CORTA CAMO SECO',
        descripcion: 'Remera de manga corta camuflada, ideal para actividades de pesca y deportes al aire libre bajo el sol.',
        precio: 12000,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Manga corta', 'Diseño camuflado', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'REMERA AGUARÁ UV PATO C/CAPUCHA TAPA BOCA',
        descripcion: 'Remera con capucha y tapa boca, protección UV en un diseño único. Ideal para los amantes de la pesca y actividades al aire libre.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Con capucha', 'Diseño único']
    },
    {
        nombre: 'REMERA AGUARÁ UV SURUBI 2 CON CAPUCHA Y TAPA BOCA',
        descripcion: 'Remera con capucha y tapa boca, protección UV, ideal para actividades al aire libre como pesca o trekking.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Con capucha', 'Ideal para pesca y trekking']
    },
    {
        nombre: 'REMERA AGUARÁ UV SURUBI 3 C/CAPUCHA',
        descripcion: 'Remera con capucha y protección UV, disponible en talles S, M, L, XL, 2XL, 3XL, 4XL, 5XL. Ideal para pesca y otras actividades al aire libre.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Con capucha', 'Disponible en varios talles']
    },
    {
        nombre: 'REMERA AGUARÁ UV SURUBI 4 AZUL CON CAPUCHA Y TAPA BOCA',
        descripcion: 'Remera azul con capucha y tapa boca, con protección UV. Perfecta para largas exposiciones al sol en actividades al aire libre.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Color azul', 'Ideal para largas exposiciones al sol']
    },
    {
        nombre: 'REMERA AGUARÁ UV SURUBI 4 NARANJA CON CAPUCHA Y TAPA BOCA',
        descripcion: 'Remera naranja con capucha y tapa boca, protección UV, ideal para actividades como pesca, trekking y deportes al aire libre.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Color naranja', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'REMERA AGUARÁ UV SURUBI BLACK WHITE CON CAPUCHA Y TAPA BOCA',
        descripcion: 'Remera negra y blanca con capucha y tapa boca, protección UV. Perfecta para actividades al aire libre en condiciones de sol intenso.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Color negro y blanco', 'Ideal para sol intenso']
    },
    {
        nombre: 'REMERA AGUARÁ UV SURUBI CAMO CON CAPUCHA Y TAPA BOCA',
        descripcion: 'Remera camuflada con capucha y tapa boca, con protección UV. Ideal para actividades al aire libre, como pesca o senderismo.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Diseño camuflado', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'REMERA AGUARÁ UV TARUCHA C/CAPUCHA',
        descripcion: 'Remera con capucha y protección UV, ideal para actividades al aire libre. Disponible en talles XS, S, M, L, XL, XXL.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Protección UV', 'Con capucha', 'Disponible en varios talles']
    },
    {
        nombre: 'REMERA AGUARÁ UV TARUCHA RED 2025 C/CAPUCHA TAPA BOCA',
        descripcion: 'Remera de edición limitada con capucha y tapa boca. Protección UV ideal para pesca y deportes al aire libre.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Edición limitada', 'Protección UV', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'REMERAS AGUARÁ UV JUNIOR C/CAPUCHA T/MODELOS (TALLES 4-6-8)',
        descripcion: 'Remeras para niños con capucha y protección UV. Disponibles en talles 4, 6 y 8. Perfectas para actividades al aire libre.',
        precio: 10860,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Para niños', 'Protección UV', 'Disponibles en varios talles']
    },
    {
        nombre: 'REMERAS AGUARÁ UV JUNIOR C/CAPUCHA T/MODELOS (TALLE 10-12-14-16)',
        descripcion: 'Remeras para niños con capucha y protección UV, disponibles en talles 10, 12, 14 y 16. Ideales para actividades al aire libre.',
        precio: 12415,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Para niños', 'Protección UV', 'Disponibles en varios talles']
    },
    {
        nombre: 'REMERAS AGUARÁ UV SURTIDAS C/CAPUCHA',
        descripcion: 'Remeras surtidas con capucha y protección UV, ideales para actividades al aire libre como pesca y trekking.',
        precio: 15268,
        imagen: '',
        stock: 10,
        categoria: 'Ropa',
        caracteristicas: ['Surtidas', 'Protección UV', 'Ideal para actividades al aire libre']
    },
    {
        nombre: 'CAÑA AGUARÁ BOGA 2,40 2T GATILLO M/CORCHO PELO MASISO CARBON',
        descripcion: 'Caña de pescar de alta resistencia, ideal para pesca en agua dulce. Con gatillo y corcho para mayor precisión, hecha de material carbono para mayor durabilidad y ligereza.',
        precio: 69500,
        imagen: '',
        stock: 10,
        categoria: 'Pesca',
        caracteristicas: ['Alta resistencia', 'Material carbono', 'Ideal para agua dulce']
    },
    {
        nombre: 'CAÑA AGUARÁ BOGA 2,40 2T GATILLO M/CORCHO PELO MASISO FIBRA',
        descripcion: 'Caña de pesca con gatillo y corcho, ideal para pesca en ambientes exigentes. Fabricada en fibra de alta calidad para mayor resistencia y flexibilidad.',
        precio: 65000,
        imagen: '',
        stock: 10,
        categoria: 'Pesca',
        caracteristicas: ['Alta calidad', 'Resistente', 'Flexible']
    },
    {
        nombre: 'FUNDA P/ ARMAS ACOLCHADA AGUARÁ CAMO 1,30 mtr',
        descripcion: 'Funda acolchada de alta resistencia para proteger armas de fuego. Diseño camuflado, ideal para transporte y almacenamiento seguro.',
        precio: 21300,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Acolchada', 'Diseño camuflado', 'Alta resistencia']
    },
    {
        nombre: 'FUNDA P/ ARMAS ACOLCHADA AGUARÁ CAMO 1,10 Y 1,20 mtr',
        descripcion: 'Funda acolchada para armas con medidas de 1,10 a 1,20 metros. Diseño camuflado para mayor discreción y protección.',
        precio: 20950,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Acolchada', 'Diseño camuflado', 'Protección']
    },
    {
        nombre: 'FUNDA P/ ARMAS ACOLCHADA AGUARÁ CAMO ECONOMICA 1,30 mtr',
        descripcion: 'Funda acolchada económica para armas de 1,30 metros, con diseño camuflado. Protege y conserva las armas en condiciones seguras durante el transporte.',
        precio: 17800,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Económica', 'Diseño camuflado', 'Protección']
    },
    {
        nombre: 'FUNDA P/ ARMAS ACOLCHADA AGUARÁ LISA 1,30 mtr',
        descripcion: 'Funda acolchada lisa de 1,30 metros para el transporte seguro de armas. Ideal para quienes buscan protección y durabilidad.',
        precio: 18800,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Acolchada', 'Lisa', 'Durabilidad']
    },
    {
        nombre: 'FUNDA P/ ARMAS ACOLCHADA AGUARÁ 1,10 Y 1,20 LISA',
        descripcion: 'Funda acolchada lisa para armas con medidas de 1,10 a 1,20 metros. Perfecta para quienes necesitan un transporte discreto y seguro.',
        precio: 18400,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Acolchada', 'Lisa', 'Transporte seguro']
    },
    {
        nombre: 'GORRA AGURÁ SUBLIMADA',
        descripcion: 'Gorra sublimada de estilo casual, con materiales de alta calidad para uso diario. Cómoda y de diseño único.',
        precio: 4300,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Estilo casual', 'Materiales de alta calidad', 'Cómoda']
    },
    {
        nombre: 'GORRA AGUARÁ CAMO BORDADO',
        descripcion: 'Gorra con diseño camuflado y bordado, perfecta para actividades al aire libre. Resistente y cómoda para todo tipo de aventuras.',
        precio: 6890,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Diseño camuflado', 'Bordado', 'Resistente']
    },
    {
        nombre: 'GORRA AGUARÁ CAMO CON LUZ BORDADO',
        descripcion: 'Gorra camuflada con bordado y luz incorporada, ideal para quienes practican actividades nocturnas o de aventura.',
        precio: 13740,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Con luz', 'Diseño camuflado', 'Ideal para actividades nocturnas']
    },
    {
        nombre: 'GORRA AGUARÁ COLORES BORDADO',
        descripcion: 'Gorra bordada en varios colores, diseñada para el confort y estilo en actividades al aire libre.',
        precio: 5800,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Bordada', 'Varios colores', 'Confortable']
    },
    {
        nombre: 'BOLSO DE MANO MEDIANO CAMO',
        descripcion: 'Bolso de mano mediano con diseño camuflado, resistente y práctico para actividades diarias y excursiones.',
        precio: 12500,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Diseño camuflado', 'Resistente', 'Práctico']
    },
    {
        nombre: 'BOLSO DE PESCA AGUARÁ CHICO + BOLSITO SUPERIOR CAMO',
        descripcion: 'Bolso de pesca compacto con bolsito superior, ideal para almacenar equipo de pesca. Diseño camuflado para mayor discreción.',
        precio: 41000,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Compacto', 'Diseño camuflado', 'Ideal para pesca']
    },
    {
        nombre: 'BOLSO DE PESCA AGUARÁ CHICO + BOLSITO SUPERIOR LISO',
        descripcion: 'Bolso de pesca chico con bolsito superior, perfecto para llevar lo esencial. Diseño liso y resistente para actividades de pesca.',
        precio: 39500,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Chico', 'Diseño liso', 'Resistente']
    },
    {
        nombre: 'BOLSO DE PESCA AGUARÁ CHICO CAMO',
        descripcion: 'Bolso de pesca chico con diseño camuflado. Ideal para almacenar todo lo necesario para un día de pesca en exteriores.',
        precio: 29900,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Chico', 'Diseño camuflado', 'Ideal para pesca']
    },
    {
        nombre: 'BOLSO DE PESCA AGUARÁ CHICO LISO',
        descripcion: 'Bolso compacto para pesca, diseño liso, ideal para transportar el equipo esencial de forma segura y organizada.',
        precio: 28800,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Compacto', 'Diseño liso', 'Organizado']
    },
    {
        nombre: 'BOLSO DE PESCA AGUARÁ MEDIANO LISO',
        descripcion: 'Bolso de pesca mediano con diseño liso, amplio y resistente para llevar todo el equipo de pesca de manera ordenada y segura.',
        precio: 31000,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Mediano', 'Diseño liso', 'Amplio']
    },
    {
        nombre: 'BOLSO DE PESCA AGUARÁ PREMIUN ROSA',
        descripcion: 'Bolso de pesca Premium, de tamaño medio y color rosa, con amplio espacio para transportar equipo de pesca de manera cómoda.',
        precio: 27000,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Premium', 'Color rosa', 'Amplio espacio']
    },
    {
        nombre: 'MOCHILA AGUARÁ TACTICA 25L LISA',
        descripcion: 'Mochila táctica de 25L, diseño liso y resistente. Ideal para aventuras al aire libre y actividades que requieran portabilidad.',
        precio: 21875,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Táctica', '25L', 'Resistente']
    },
    {
        nombre: 'MOCHILA AGUARÁ TACTICA 25L CAMO 3D',
        descripcion: 'Mochila táctica de 25L, diseño camuflado 3D. Resistente, ideal para actividades al aire libre y exigentes condiciones.',
        precio: 25175,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Táctica', 'Diseño camuflado 3D', 'Resistente']
    },
    {
        nombre: 'MOCHILA AGUARÁ TACTICA 50L LISA',
        descripcion: 'Mochila táctica de 50L, diseño liso y duradero, ideal para cargar equipo en excursiones largas o viajes.',
        precio: 27300,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Táctica', '50L', 'Duradera']
    },
    {
        nombre: 'MOCHILA AGUARÁ TACTICA 50L CAMO 3D',
        descripcion: 'Mochila táctica de 50L con diseño camuflado 3D, perfecta para aventuras exigentes y para cargar todo el equipo necesario.',
        precio: 31200,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Táctica', 'Diseño camuflado 3D', 'Amplio espacio']
    },
    {
        nombre: 'RIÑONERA AGUARÁ CAMO ECONOMICA',
        descripcion: 'Riñonera económica con diseño camuflado, ideal para quienes buscan un accesorio práctico y resistente para actividades al aire libre.',
        precio: 3099,
        imagen: '',
        stock: 10,
        categoria: 'Accesorios',
        caracteristicas: ['Económica', 'Diseño camuflado', 'Práctica']
    }
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
