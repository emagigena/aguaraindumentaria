"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import WholesaleBanner from "@/components/wholesale-banner"
import { Badge } from "@/components/ui/badge"
import { WhatsappLogo } from "@/components/icons/whatsapp-logo"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductPage(props: ProductPageProps) {
  const params = use(props.params)
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(10) // Default to minimum wholesale quantity
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`)

        if (!res.ok) {
          if (res.status === 404) {
            notFound()
          }
          throw new Error("Failed to fetch product")
        }

        const data = await res.json()
        setProduct(data)
      } catch (err) {
        setError("Error al cargar el producto")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    addToCart(product, quantity)

    toast({
      title: "Producto añadido",
      description: `${quantity} x ${product.nombre} añadido al carrito`,
    })
  }

  // Extract features from description for badges
  const extractFeatures = (description: string): string[] => {
    const featureKeywords = [
      "UV",
      "Protección solar",
      "Secado rápido",
      "Impermeable",
      "Transpirable",
      "DRY-FIT",
      "Liviana",
      "Térmica",
      "Camuflaje",
      "Repelente",
      "Antimosquitos",
      "Resistente",
    ]

    const features: string[] = []

    featureKeywords.forEach((keyword) => {
      if (description.toLowerCase().includes(keyword.toLowerCase())) {
        features.push(keyword)
      }
    })

    return features
  }

  // Get all available images for the product
  const getAllProductImages = (): string[] => {
    if (!product) return []

    // If product has the imagenes array and it's not empty
    if (product.imagenes && Array.isArray(product.imagenes) && product.imagenes.length > 0) {
      return product.imagenes
    }

    // Fallback to single image
    return [product.imagen]
  }

  // Handle image carousel navigation
  const nextImage = () => {
    const images = getAllProductImages()
    if (images.length <= 1) return

    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    const images = getAllProductImages()
    if (images.length <= 1) return

    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextImage()
    }
    if (isRightSwipe) {
      prevImage()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Get current image source
  const getCurrentImageSrc = () => {
    if (!product) return "/placeholder.svg"

    const images = getAllProductImages()
    return images[currentImageIndex] || "/placeholder.svg"
  }

  // Check if product has multiple images
  const hasMultipleImages = () => {
    const images = getAllProductImages()
    return images.length > 1
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  console.log(product);

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">Error</h2>
          <p className="mt-2">{error || "No se pudo cargar el producto"}</p>
          <Link href="/" className="mt-4 inline-block">
            <Button>Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getWhatsAppLink = () => {
    const phoneNumber = "5493404519318" // Replace with your actual WhatsApp number

    let message = "Hola, me interesa realizar un pedido mayorista: \n\n"

    message += "Por favor, necesito comprar sus productos. Gracias."

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  const whatsappLink = getWhatsAppLink()

  const features = product.caracteristicas || extractFeatures(product.descripcion)
  const productImages = getAllProductImages()

  return (
    <main className="container mx-auto px-4 py-8">
      <WholesaleBanner />

      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a productos
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div
            className="relative aspect-square bg-muted rounded-lg overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={getCurrentImageSrc() || "/placeholder.svg"}
              alt={product.nombre}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized={getCurrentImageSrc().startsWith("data:image")}
            />

            {hasMultipleImages() && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full p-1.5 backdrop-blur-sm transition-colors z-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/60 hover:bg-background/80 rounded-full p-1.5 backdrop-blur-sm transition-colors z-10"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-primary" : "bg-background/60"
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute top-4 left-4">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                {product.categoria}
              </Badge>
            </div>
          </div>

          {hasMultipleImages() && (
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                    index === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.nombre} - vista ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 10vw"
                    unoptimized={image.startsWith("data:image")}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-2">
            {features.map((feature, index) => (
              <span key={index} className="feature-badge">
                {feature}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold">{product.nombre}</h1>

          <div className="flex items-center mt-2 mb-4">
            <span className="text-3xl font-bold">${product.precio.toFixed(2)}</span>
            <span className="wholesale-badge ml-3">Precio mayorista</span>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 mb-6">
            <div className="flex items-center text-sm text-primary mb-2">
              <Check className="h-4 w-4 mr-1" />
              <span className="font-medium">Venta exclusiva mayorista</span>
            </div>
            <p className="text-sm text-muted-foreground">Compra mínima: 10 unidades por producto.</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium mb-2">Descripción</h2>
            <p className="text-muted-foreground">{product.descripcion}</p>
          </div>

          <div className="mt-8 space-y-4">
            {/* <div className='flex items-center gap-4'>
              <span className='font-medium'>Cantidad:</span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={10} // Minimum wholesale quantity
                max={product.stock}
              />
              <span className='text-sm text-muted-foreground'>{product.stock} disponibles</span>
            </div>

            <Button
              size='lg'
              className='w-full sm:w-auto bg-primary hover:bg-primary/90'
              onClick={handleAddToCart}
            >
              <ShoppingCart className='mr-2 h-5 w-5' />
              Sumar al Pedido
            </Button>  */}
            <div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto hover:bg-primary/90"
              >
                <Button
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90"
                  size="lg"
                >
                  <WhatsappLogo className="h-5 w-5 text-black" />
                  <p className="text-black">Consultar por WhatsApp</p>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

