// src/components/productCard/ProductCard.tsx
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Product } from "@/types/product";
import useCart from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void; // Cambiar la firma
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelectProduct }) => {
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad
  const { addToCart } = useCart();

  // src/components/productCard/ProductCard.tsx
const handleAddToCart = () => {
  if (quantity > 0 && quantity <= product.stock) {
    addToCart(product, quantity); // Asegúrate de que esto esté correcto
  } else {
    alert("Cantidad no válida.");
  }
};
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-xl overflow-hidden p-4 flex flex-col items-center"
    >
      <Image src={product.image} alt={product.name} width={150} height={150} className="rounded-lg" />
      <h2 className="text-lg font-semibold mt-2 text-gray-800">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <span className="text-md font-bold text-gray-900 mt-1">${product.price}</span>
      <span className="text-sm text-gray-600 mt-1">
        {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
      </span>
      <div className="flex items-center mt-2">
        <button
          className="bg-gray-200 px-2 py-1 rounded-l"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min="1"
          max={product.stock}
          onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, Number(e.target.value))))}
          className="w-12 text-center border"
        />
        <button
          className="bg-gray-200 px-2 py-1 rounded-r"
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
        >
          +
        </button>
      </div>
      <button
        className={`mt-2 ${product.stock > 0 ? "bg-green-500" : "bg-gray-400"} text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 `}
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        <FaShoppingCart /> Agregar al carrito
      </button>
      <button className="mt-2 text-blue-500" onClick={() => onSelectProduct(product)}>
        Ver detalles
      </button>
    </motion.div>
  );
};

export default ProductCard;