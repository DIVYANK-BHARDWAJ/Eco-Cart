"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, products } from "@/data/products";

interface CartContextType {
  cartItems: Product[];
  isCartSwapped: boolean;
  addToCart: (product: Product) => void;
  replaceInCart: (oldId: string, newProduct: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  bulkSwap: () => void;
  setIsCartSwapped: (swapped: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartSwapped, setIsCartSwapped] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const replaceInCart = (oldId: string, newProduct: Product) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === oldId ? newProduct : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setIsCartSwapped(false);
  };

  const bulkSwap = () => {
    setCartItems((prev) => 
      prev.map((item) => {
        if (!item.isEco) {
          const alternative = products.find((p) => p.id === item.alternativeId);
          return alternative || item;
        }
        return item;
      })
    );
    setIsCartSwapped(true);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartSwapped,
        addToCart,
        replaceInCart,
        removeFromCart,
        clearCart,
        bulkSwap,
        setIsCartSwapped,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
