export interface Product {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  stock: number
}

export interface CartItem {
  product: Product
  quantity: number
}

