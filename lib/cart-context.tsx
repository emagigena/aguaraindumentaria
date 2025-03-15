"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem, Product } from "./types"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  updateCartItemQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getWhatsAppLink: () => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product._id === product._id)

      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        const updatedItems = [...prevItems]
        const newQuantity = prevItems[existingItemIndex].quantity + quantity
        updatedItems[existingItemIndex] = {
          ...prevItems[existingItemIndex],
          quantity: Math.min(newQuantity, product.stock), // Ensure we don't exceed stock
        }
        return updatedItems
      } else {
        // Add new item to cart
        return [...prevItems, { product, quantity }]
      }
    })
  }

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity: Math.min(quantity, item.product.stock) } : item,
      ),
    )
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.precio * item.quantity, 0)
  }

  const getWhatsAppLink = () => {
    if (cartItems.length === 0) return ""

    const phoneNumber = "5491100000000" // Replace with your actual WhatsApp number

    let message = "Hola, quiero consultar sobre estos productos:\n\n"

    cartItems.forEach((item) => {
      const subtotal = item.product.precio * item.quantity
      message += `${item.product.nombre} (x${item.quantity}) - $${subtotal.toFixed(2)}\n`
    })

    message += `\nTotal: $${getCartTotal().toFixed(2)}`

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

