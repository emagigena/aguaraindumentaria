"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsappLogo } from "@/components/icons/whatsapp-logo"
import { useCart } from "@/lib/cart-context"

export default function CartSummary() {
  const { cartItems, getCartTotal, getWhatsAppLink } = useCart()

  const total = getCartTotal()
  const whatsappLink = getWhatsAppLink()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del pedido</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full flex items-center justify-center gap-2" size="lg" disabled={cartItems.length === 0}>
            <WhatsappLogo className="h-5 w-5" />
            Consultar por WhatsApp
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}

