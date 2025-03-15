export interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  categoria: string;
  caracteristicas: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
