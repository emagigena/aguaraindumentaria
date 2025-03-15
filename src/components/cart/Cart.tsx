// src/components/cart/Cart.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import useCart from "@/components/hooks/useCart"; // Importar el hook

const Cart: React.FC = () => {
  const { cart } = useCart(); // Obtener el carrito del hook

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed right-0 top-0 w-80 bg-black shadow-lg p-4"
    >
      <h2 className="text-lg font-semibold">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center mt-2">
              <span>{item.name} (x{item.quantity})</span>
              {/* Aquí puedes agregar un botón para eliminar el producto del carrito si lo deseas */}
            </li>
          ))}
        </ul>
      )}
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
        <FaWhatsapp /> Finalizar compra
      </button>
    </motion.div>
  );
};

export default Cart;