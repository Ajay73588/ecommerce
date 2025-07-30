"use client"
import { useParams } from "next/navigation";
import { products } from "@/assets/productData";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useAppContext();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-8 max-w-3xl w-full">
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={product.imgSrc}
            alt={product.name}
            width={350}
            height={350}
            className="object-contain rounded"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-4">{product.price}</p>
            <p className="text-yellow-500 mb-4">Rating: {product.rating} ⭐</p>
          </div>
          <button onClick={handleAddToCart} className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition font-semibold mt-4">
            Add to Cart
          </button>
          {added && <span className="text-green-600 mt-2">Added to cart!</span>}
          <Link href="/cart" className="mt-4 text-blue-600 hover:underline">Go to Cart</Link>
          <Link href="/" className="mt-2 text-blue-600 hover:underline">Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;