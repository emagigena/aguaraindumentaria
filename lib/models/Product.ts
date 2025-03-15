import mongoose, { Schema } from "mongoose"

export interface IProduct {
  _id: string
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  stock: number
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
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
})

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)

