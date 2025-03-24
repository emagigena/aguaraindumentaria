"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"
import ImageUpload from "./image-upload"
import { resizeImage } from "@/lib/image-utils"

interface ProductFormProps {
  product?: Product
  isEditing?: boolean
}

export default function ProductForm({ product, isEditing = false }: ProductFormProps) {
  // Initialize images array from product or create a new one
  const initialImages =
    product?.imagenes && Array.isArray(product.imagenes)
      ? product.imagenes
      : product?.imagen && product.imagen !== "/placeholder.svg?height=500&width=500"
        ? [product.imagen]
        : []

  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      nombre: "",
      descripcion: "",
      precio: 0,
      imagen: "/placeholder.svg?height=500&width=500",
      imagenes: [],
      stock: 0,
      categoria: "",
      caracteristicas: [],
    },
  )

  const [images, setImages] = useState<string[]>(initialImages)

  const [caracteristicasInput, setCaracteristicasInput] = useState(product?.caracteristicas?.join(", ") || "")

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Update formData.imagenes whenever images array changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      imagenes: images,
      // Always set the main image to the first image in the array if available
      imagen: images.length > 0 ? images[0] : "/placeholder.svg?height=500&width=500",
    }))
  }, [images])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "precio" || name === "stock") {
      setFormData({
        ...formData,
        [name]: Number.parseFloat(value) || 0,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      categoria: value,
    })
  }

  const handleCaracteristicasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaracteristicasInput(e.target.value)

    // Split by comma and trim whitespace
    const caracteristicas = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "")

    setFormData({
      ...formData,
      caracteristicas,
    })
  }

  const handleImageChange = async (base64Image: string) => {
    // Add the image to the array if it's not already there and it's not empty
    if (base64Image && !images.includes(base64Image)) {
      const updatedImages = [...images, base64Image]
      setImages(updatedImages)
    }
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }

  const handleSetMainImage = (index: number) => {
    const updatedImages = [...images]
    const newMainImage = updatedImages[index]

    // Move the selected image to the first position
    updatedImages.splice(index, 1)
    updatedImages.unshift(newMainImage)

    setImages(updatedImages)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre || !formData.descripcion || !formData.categoria) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    // Ensure we have at least one image
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Por favor agregue al menos una imagen del producto",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Resize all images if they're base64 images
      const resizedImages = await Promise.all(
        images.map(async (img) => {
          if (img.startsWith("data:image")) {
            try {
              return await resizeImage(img, 1200, 0.8)
            } catch (imageError) {
              console.error("Error resizing image:", imageError)
              return img // Use original if resize fails
            }
          }
          return img
        }),
      )

      // Prepare the data to be sent to the API
      const processedData = {
        ...formData,
        imagen: resizedImages[0], // First image is the main one
        imagenes: resizedImages, // All images including the main one
      }

      const url = isEditing ? `/api/products/${product?._id}` : "/api/products"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      })

      if (!response.ok) {
        throw new Error("Error al guardar el producto")
      }

      toast({
        title: isEditing ? "Producto actualizado" : "Producto creado",
        description: isEditing
          ? "El producto ha sido actualizado correctamente"
          : "El producto ha sido creado correctamente",
      })

      router.push("/admin")
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el producto",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre del producto *</Label>
          <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">Categoría *</Label>
          <Select value={formData.categoria} onValueChange={handleSelectChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Remeras">Remeras</SelectItem>
              <SelectItem value="Pantalones">Pantalones</SelectItem>
              <SelectItem value="Camperas">Camperas</SelectItem>
              <SelectItem value="Accesorios">Accesorios</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción *</Label>
        <Textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="precio">Precio *</Label>
          <Input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="0.01"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="block mb-2">Imágenes del producto *</Label>

          {/* Image gallery preview */}
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group aspect-square border rounded-md overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      {index !== 0 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => handleSetMainImage(index)}
                          className="bg-white/80 hover:bg-white text-black"
                        >
                          Principal
                        </Button>
                      )}
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveImage(index)}
                        className="bg-white/80 hover:bg-destructive text-destructive hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                      Principal
                    </div>
                  )}
                </div>
              ))}

              {/* Add more images button */}
              <div className="flex items-center justify-center aspect-square border border-dashed rounded-md">
                <ImageUpload
                  initialImage=""
                  onImageChange={handleImageChange}
                  buttonText="Añadir imagen"
                  compact={true}
                  className="h-full w-full"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <ImageUpload initialImage="" onImageChange={handleImageChange} />
              <p className="text-xs text-muted-foreground">
                Arrastre una imagen o haga clic para seleccionar un archivo
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="caracteristicas">Características (separadas por comas)</Label>
        <Input
          id="caracteristicas"
          name="caracteristicas"
          value={caracteristicasInput}
          onChange={handleCaracteristicasChange}
          placeholder="Protección UV, Secado rápido, Impermeable"
        />
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Actualizando..." : "Creando..."}
            </>
          ) : (
            <>{isEditing ? "Actualizar" : "Crear"} Producto</>
          )}
        </Button>
      </div>
    </form>
  )
}

