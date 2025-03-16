import { Schema, model, models } from 'mongoose';

export interface IProduct {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  categoria: string;
  caracteristicas: string[];
}

const ProductSchema = new Schema<IProduct>({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
    maxlength: 5000000, // Approximately 5MB in base64
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Remeras', 'Pantalones', 'Camperas', 'Accesorios'],
  },
  caracteristicas: {
    type: [String],
    default: [],
  },
});

// Check if the model exists before creating a new one
// This is important for Next.js hot reloading
const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
