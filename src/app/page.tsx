// src/app/page.tsx
"use client"; // Agrega esta línea
import React, { useState } from "react";
import ProductGallery from "@/components/productGallery/ProductGallery";
import ProductModal from "@/components/productModal/ProductModal";
import Header from "@/components/header/Header";
import NavBar from "@/components/navBar/NavBar";
import { Product } from "@/types/product";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  // src/app/page.tsx
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya existe, aumentar la cantidad solo si hay stock disponible
        if (existingProduct.quantity < product.stock) {
          return prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          alert("No hay suficiente stock disponible.");
          return prevCart; // No se modifica el carrito si no hay stock
        }
      } else {
        // Si no existe, agregar el producto con cantidad 1 solo si hay stock
        if (product.stock > 0) {
          return [...prevCart, { ...product, quantity: 1 }]; // Agregar quantity aquí
        } else {
          alert("No hay suficiente stock disponible.");
          return prevCart; // No se agrega el producto si no hay stock
        }
      }
    });
    setSelectedProduct(null); // Cierra el modal después de agregar al carrito
  };

  return (
    <>
      <NavBar />
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <ProductGallery onSelectProduct={setSelectedProduct} />
 </main>
      <footer className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Tienda de Productos de Caza, Pesca y Camping
        </p>
      </footer>
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          addToCart={addToCart} // Asegúrate de pasar esta propiedad
        />
      )}
    </>
  );
}