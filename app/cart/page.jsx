"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { products } from "@/assets/productData";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, updateCartQuantity, getCartAmount } = useAppContext();
  const cartProductIds = Object.keys(cartItems);
  const cartProducts = products.filter((p) => cartProductIds.includes(p.id.toString()));

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {cartProducts.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <Link href="/" className="text-blue-600 hover:underline">Go shopping</Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          {cartProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-6 border-b py-4 last:border-b-0">
              <Image src={product.imgSrc} alt={product.name} width={80} height={80} className="object-contain rounded" />
              <div className="flex-1">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateCartQuantity(product.id, Math.max(1, cartItems[product.id] - 1))}
                  disabled={cartItems[product.id] <= 1}
                >
                  -
                </button>
                <span className="px-2">{cartItems[product.id]}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateCartQuantity(product.id, cartItems[product.id] + 1)}
                >
                  +
                </button>
                <button
                  className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => updateCartQuantity(product.id, 0)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-6">
            <span className="text-xl font-bold">Total: ${getCartAmount()}</span>
          </div>
          <div className="text-right mt-4">
            <Link href="/checkout" className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
