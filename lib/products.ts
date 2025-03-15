import type { Product } from "./types"

export const products: Product[] = [
  {
    id: "1",
    name: "Auriculares Inalámbricos Premium",
    price: 129.99,
    image: "/placeholder.svg?height=500&width=500",
    shortDescription: "Auriculares con cancelación de ruido y 30 horas de batería",
    description:
      "Disfruta de un sonido excepcional con estos auriculares inalámbricos premium. Cuentan con tecnología de cancelación activa de ruido, hasta 30 horas de duración de batería y un diseño ergonómico para máxima comodidad durante todo el día.",
    features: [
      "Cancelación activa de ruido",
      "30 horas de batería",
      "Conexión Bluetooth 5.2",
      "Micrófono incorporado para llamadas",
      "Diseño plegable y ligero",
    ],
    stock: 15,
  },
  {
    id: "2",
    name: "Smartwatch Fitness Pro",
    price: 199.99,
    image: "/placeholder.svg?height=500&width=500",
    shortDescription: "Reloj inteligente con GPS y monitor de salud avanzado",
    description:
      "El Smartwatch Fitness Pro es tu compañero ideal para mantener un estilo de vida activo. Con GPS integrado, monitor de frecuencia cardíaca, seguimiento del sueño y más de 20 modos deportivos, te ayuda a alcanzar tus objetivos de fitness mientras mantienes el estilo.",
    features: [
      "GPS integrado",
      "Monitor de frecuencia cardíaca",
      "Resistente al agua (5 ATM)",
      "Batería de 7 días",
      "Pantalla AMOLED de alta resolución",
    ],
    stock: 8,
  },
  {
    id: "3",
    name: "Cámara Mirrorless 4K",
    price: 899.99,
    image: "/placeholder.svg?height=500&width=500",
    shortDescription: "Cámara profesional con sensor APS-C y grabación 4K",
    description:
      "Captura momentos inolvidables con una calidad excepcional. Esta cámara mirrorless cuenta con un sensor APS-C de 24.2MP, grabación de video 4K/60fps, estabilización de imagen de 5 ejes y un sistema de enfoque automático rápido y preciso.",
    features: [
      "Sensor APS-C de 24.2MP",
      "Grabación de video 4K/60fps",
      "Estabilización de imagen de 5 ejes",
      "Pantalla táctil abatible",
      "Conectividad WiFi y Bluetooth",
    ],
    stock: 5,
  },
  {
    id: "4",
    name: "Zapatillas Running Ultra",
    price: 149.99,
    image: "/placeholder.svg?height=500&width=500",
    shortDescription: "Zapatillas ligeras con amortiguación reactiva",
    description:
      "Las zapatillas Running Ultra están diseñadas para corredores que buscan rendimiento y comodidad. Con una mediasuela de espuma reactiva, parte superior transpirable y suela de goma duradera, te ofrecen una experiencia de carrera suave y energética.",
    features: [
      "Mediasuela de espuma reactiva",
      "Parte superior de malla transpirable",
      "Suela de goma con patrón de tracción",
      "Peso ligero (250g)",
      "Disponible en varios colores",
    ],
    stock: 20,
  },
  {
    id: "5",
    name: "Laptop Ultradelgada Pro",
    price: 1299.99,
    image: "/placeholder.svg?height=500&width=500",
    shortDescription: "Portátil potente con pantalla 4K y procesador de última generación",
    description:
      "La Laptop Ultradelgada Pro combina potencia y portabilidad en un diseño elegante. Con un procesador de última generación, gráficos dedicados, pantalla 4K y un chasis de aluminio ultraligero, es perfecta para profesionales creativos y usuarios exigentes.",
    features: [
      "Procesador de última generación",
      "16GB de RAM DDR4",
      "SSD de 512GB",
      "Pantalla 4K de 15.6 pulgadas",
      "Batería de hasta 12 horas",
    ],
    stock: 3,
  },
  {
    id: "6",
    name: "Altavoz Inteligente 360",
    price: 179.99,
    image: "/placeholder.svg?height=500&width=500",
    shortDescription: "Altavoz con sonido envolvente y asistente de voz integrado",
    description:
      "Llena cualquier habitación con un sonido envolvente de 360 grados. Este altavoz inteligente cuenta con un asistente de voz integrado, conectividad multi-habitación y un diseño elegante que complementa cualquier espacio.",
    features: [
      "Sonido envolvente de 360 grados",
      "Asistente de voz integrado",
      "Conectividad WiFi y Bluetooth",
      "Control mediante aplicación móvil",
      "Resistente al agua IPX4",
    ],
    stock: 12,
  },
]

