// src/types/cartItem.ts
import { Product } from "./product";

export interface CartItem extends Product {
    quantity: number; // Agregar la propiedad quantity aquí
}