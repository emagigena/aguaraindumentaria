"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Edit, Trash2, PlusCircle, Search, Loader2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"
import Image from "next/image"

type SortConfig = {
  key: keyof Product | null
  direction: "asc" | "desc"
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (
      !window.sessionStorage.getItem("admin_token") ||
      window.sessionStorage.getItem("admin_token") !== "aguaradmintoken"
    ) {
      router.push("/admin/login")
    } else {
      fetchProducts()
    }
  }, [])

  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Product]
        const bValue = b[sortConfig.key as keyof Product]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
        }
        return 0
      })
    }

    setFilteredProducts(result)
  }, [searchTerm, products, sortConfig])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/products")

      if (!res.ok) {
        throw new Error("Error al cargar productos")
      }

      const data = await res.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      setDeleteLoading(id)
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Error al eliminar el producto")
      }

      // Remove product from state
      setProducts(products.filter((product) => product._id !== id))

      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(null)
    }
  }

  const requestSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc"

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof Product) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
    }

    return sortConfig.direction === "asc" ? (
      <ArrowUpDown className="ml-1 h-4 w-4 text-primary" />
    ) : (
      <ArrowUpDown className="ml-1 h-4 w-4 text-primary rotate-180" />
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">Gestione los productos de su catálogo</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2 w-full sm:w-auto">
            <PlusCircle className="h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No se encontraron productos</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => requestSort("imagen")}>
                  <div className="flex items-center">
                    Imagen
                    {getSortIcon("nombre")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort("nombre")}>
                  <div className="flex items-center">
                    Nombre
                    {getSortIcon("nombre")}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort("categoria")}>
                  <div className="flex items-center">
                    Categoría
                    {getSortIcon("categoria")}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => requestSort("precio")}>
                  <div className="flex items-center justify-end">
                    Precio
                    {getSortIcon("precio")}
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => requestSort("stock")}>
                  <div className="flex items-center justify-end">
                    Stock
                    {getSortIcon("stock")}
                  </div>
                </TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="text-right">
                    <Image
                      alt="Imagen de producto"
                      src={product.imagen}
                      width={50}  // Ajusta el ancho según tus preferencias
                      height={50} // Ajusta el alto según tus preferencias
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.nombre}</TableCell>
                  <TableCell>{product.categoria}</TableCell>
                  <TableCell className="text-right">${product.precio.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                      >
                        <Edit className="h-4 w-4 sm:mr-1" />
                        <span className="sr-only sm:not-sr-only">Editar</span>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4 sm:mr-1" />
                            <span className="sr-only sm:not-sr-only">Eliminar</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Esto eliminará permanentemente el producto "
                              {product.nombre}" de su catálogo.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProduct(product._id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              disabled={deleteLoading === product._id}
                            >
                              {deleteLoading === product._id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Eliminando...
                                </>
                              ) : (
                                "Eliminar"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

