import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${product._id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <Image
            src={product.imagen || "/placeholder.svg"}
            alt={product.nombre}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg line-clamp-1">{product.nombre}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {product.descripcion.substring(0, 100)}
            {product.descripcion.length > 100 ? "..." : ""}
          </p>
          <p className="font-bold text-xl mt-2">${product.precio.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Link href={`/products/${product._id}`} className="w-full">
          <Button className="w-full">Ver más</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

