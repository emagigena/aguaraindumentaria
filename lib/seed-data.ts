import mongoose from "mongoose"
import dbConnect from "./mongodb"
import Product from "./models/Product"

const sampleProducts = [
  {
    nombre: "Auriculares Inalámbricos Premium",
    descripcion:
      "Disfruta de un sonido excepcional con estos auriculares inalámbricos premium. Cuentan con tecnología de cancelación activa de ruido, hasta 30 horas de duración de batería y un diseño ergonómico para máxima comodidad durante todo el día.",
    precio: 129.99,
    imagen: "/placeholder.svg?height=500&width=500",
    stock: 15,
  },
  {
    nombre: "Smartwatch Fitness Pro",
    descripcion:
      "El Smartwatch Fitness Pro es tu compañero ideal para mantener un estilo de vida activo. Con GPS integrado, monitor de frecuencia cardíaca, seguimiento del sueño y más de 20 modos deportivos, te ayuda a alcanzar tus objetivos de fitness mientras mantienes el estilo.",
    precio: 199.99,
    imagen: "/placeholder.svg?height=500&width=500",
    stock: 8,
  },
  {
    nombre: "Cámara Mirrorless 4K",
    descripcion:
      "Captura momentos inolvidables con una calidad excepcional. Esta cámara mirrorless cuenta con un sensor APS-C de 24.2MP, grabación de video 4K/60fps, estabilización de imagen de 5 ejes y un sistema de enfoque automático rápido y preciso.",
    precio: 899.99,
    imagen: "/placeholder.svg?height=500&width=500",
    stock: 5,
  },
  {
    nombre: "Zapatillas Running Ultra",
    descripcion:
      "Las zapatillas Running Ultra están diseñadas para corredores que buscan rendimiento y comodidad. Con una mediasuela de espuma reactiva, parte superior transpirable y suela de goma duradera, te ofrecen una experiencia de carrera suave y energética.",
    precio: 149.99,
    imagen: "/placeholder.svg?height=500&width=500",
    stock: 20,
  },
  {
    nombre: "Laptop Ultradelgada Pro",
    descripcion:
      "La Laptop Ultradelgada Pro combina potencia y portabilidad en un diseño elegante. Con un procesador de última generación, gráficos dedicados, pantalla 4K y un chasis de aluminio ultraligero, es perfecta para profesionales creativos y usuarios exigentes.",
    precio: 1299.99,
    imagen: "/placeholder.svg?height=500&width=500",
    stock: 3,
  },
  {
    nombre: "Altavoz Inteligente 360",
    descripcion:
      "Llena cualquier habitación con un sonido envolvente de 360 grados. Este altavoz inteligente cuenta con un asistente de voz integrado, conectividad multi-habitación y un diseño elegante que complementa cualquier espacio.",
    precio: 179.99,
    imagen: "/placeholder.svg?height=500&width=500",
    stock: 12,
  },
]

export async function seedDatabase() {
  try {
    await dbConnect()

    // Check if we already have products
    const count = await Product.countDocuments()

    if (count === 0) {
      console.log("Seeding database with sample products...")
      await Product.insertMany(sampleProducts)
      console.log("Database seeded successfully!")
    } else {
      console.log("Database already has products, skipping seed.")
    }
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    // Close the connection
    await mongoose.disconnect()
  }
}

// Run this file directly to seed the database
// if (require.main === module) {
//   seedDatabase()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error)
//       process.exit(1)
//     })
// }

