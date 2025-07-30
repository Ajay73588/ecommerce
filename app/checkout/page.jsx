"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { products } from "@/assets/productData";
import Image from "next/image";
import Link from "next/link";

const CheckoutPage = () => {
  const { cartItems, getCartAmount } = useAppContext();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: ""
  });

  const cartProductIds = Object.keys(cartItems);
  const cartProducts = products.filter((p) => cartProductIds.includes(p.id.toString()));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    // For now, we'll just show a success message
    setOrderPlaced(true);
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <Link href="/" className="text-blue-600 hover:underline">Go shopping</Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
          <Link href="/" className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Details Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingDetails.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={shippingDetails.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <Image src={product.imgSrc} alt={product.name} width={60} height={60} className="object-contain rounded" />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-600">Qty: {cartItems[product.id]}</p>
                </div>
                <p className="font-medium">{product.price}</p>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${getCartAmount()}</span>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 