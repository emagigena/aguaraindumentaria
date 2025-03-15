"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuantitySelector from "@/components/ui/quantity-selector"
import type { CartItem } from "@/lib/types"
import { useCart } from "@/lib/cart-context"

interface CartItemProps {
  item: CartItem
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateCartItemQuantity, removeFromCart } = useCart()
  const subtotal = item.product.precio * item.quantity

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b gap-4">
      <div className="relative aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
        <Image
          src={item.product.imagen || "/placeholder.svg"}
          alt={item.product.nombre}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.product._id}`} className="font-medium hover:underline">
          {item.product.nombre}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{item.product.descripcion.substring(0, 100)}</p>
        <p className="mt-1 text-sm font-medium">${item.product.precio.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <QuantitySelector
          value={item.quantity}
          onChange={(value) => updateCartItemQuantity(item.product._id, value)}
          min={1}
          max={item.product.stock}
        />

        <div className="w-20 text-right font-medium">${subtotal.toFixed(2)}</div>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => removeFromCart(item.product._id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </div>
    </div>
  )
}

