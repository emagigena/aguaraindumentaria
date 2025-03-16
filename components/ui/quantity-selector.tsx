"use client"

import type React from "react"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(value)

  useEffect(() => {
    setQuantity(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value)
    if (isNaN(newValue)) {
      setQuantity(min)
      return
    }

    updateQuantity(newValue)
  }

  const updateQuantity = (newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue))
    setQuantity(clampedValue)
    onChange(clampedValue)
  }

  const increment = () => {
    if (quantity < max) {
      updateQuantity(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > min) {
      updateQuantity(quantity - 1)
    }
  }

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-r-none"
        onClick={decrement}
        disabled={quantity <= min}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease</span>
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        value={quantity}
        onChange={handleInputChange}
        className="h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-l-none"
        onClick={increment}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  )
}

