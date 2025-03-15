// src/components/productGallery/ProductGallery.tsx
import React from "react";
import products from "../../data/products.json";
import ProductCard from "../productCard/ProductCard";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import Cart from "@/components/cart/Cart";
import { Product } from "@/types/product";
import useCart from "@/components/hooks/useCart"; // Importar el hook
import ProductModal from "../productModal/ProductModal"; // Asegúrate de importar el modal

interface ProductGalleryProps {
  onSelectProduct: (product: Product) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ onSelectProduct }) => {
  const { addToCart, cart } = useCart(); // Usar el hook para obtener addToCart y cart
  const [showCart, setShowCart] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null); // Estado para el producto seleccionado

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product); // Establecer el producto seleccionado
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Aguará Indumentaria</h1>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-900"
          onClick={() => setShowCart(!showCart)}
 >
          <FaShoppingCart /> ({cart.length})
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={addToCart} // Pasar la función addToCart
            onSelectProduct={handleSelectProduct} // Cambiar a la función que maneja la selección
          />
        ))}
      </div>
      {showCart && <Cart />} {/* No necesitas pasar el carrito como prop, ya que se obtiene del hook */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} // Cerrar el modal
          addToCart={addToCart} // Pasar la función addToCart al modal
        />
      )}
    </div>
  );
};

export default ProductGallery;