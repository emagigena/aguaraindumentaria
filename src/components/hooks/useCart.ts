// src/hooks/useCart.ts
import { useState } from "react";
import { CartItem } from "@/types/cartItem";
import { Product } from "@/types/product";

// src/hooks/useCart.ts
const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
  
    const addToCart = (product: Product, quantity: number) => {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity }]);
      }
      console.log(cart); // Verificar el estado del carrito
    };
  
    const removeFromCart = (id: number) => {
      setCart(cart.filter(item => item.id !== id));
    };
  
    return { cart, addToCart, removeFromCart };
  };

export default useCart;