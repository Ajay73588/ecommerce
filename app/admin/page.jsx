"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { products } from "@/assets/productData";
import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

const AdminPanel = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Earphone"
  });

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not signed in, show sign-in prompt
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Admin Access Required
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to access the admin panel
            </p>
          </div>
          <div className="mt-8">
            <SignInButton mode="modal">
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Sign In to Access Admin Panel
              </button>
            </SignInButton>
          </div>
          <div className="mt-4">
            <Link href="/" className="text-orange-600 hover:text-orange-500">
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Here you would typically add the product to your database
    console.log("Adding product:", newProduct);
    alert("Product added successfully! (This is a demo - no actual database update)");
    setNewProduct({ name: "", description: "", price: "", category: "Earphone" });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!</span>
            <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
              Back to Store
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Earphone">Earphone</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Watch">Watch</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Camera">Camera</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
              >
                Add Product
              </button>
            </form>
          </div>

          {/* Current Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Current Products</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 border rounded">
                  <Image
                    src={product.imgSrc}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="object-contain rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.price}</p>
                  </div>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 