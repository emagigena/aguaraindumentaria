import React, { useState } from "react";
import { Product } from "@/types/product"; // Asegúrate de que este tipo esté definido correctamente

interface ProductModalProps {
    product: Product;
    onClose: () => void;
    addToCart: (product: Product, quantity: number) => void; // Asegúrate de que esta línea esté presente
  }

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, addToCart }) => {
    const [quantity, setQuantity] = useState(1); 

    const handleAddToCart = () => {
        addToCart(product, quantity);
        onClose(); // Cerrar el modal después de agregar
      };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-black p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
        <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
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
          className={`mt-2 ${product.stock > 0 ? "bg-green-500" : "bg-gray-400"} text-white px-4 py-2 rounded-lg`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Agregar al carrito
        </button>
        <button className="mt-2 text-red-500" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProductModal;