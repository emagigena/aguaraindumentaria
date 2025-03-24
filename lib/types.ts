export type Product = {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria: string
  imagen: string
  imagenes?: string[] // Array of image URLs for the carousel (optional for backward compatibility)
  caracteristicas?: string[] // Optional array of product features/characteristics
}

export interface CartItem {
  product: Product;
  quantity: number;
}
