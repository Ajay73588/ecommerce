"use client";
import React from "react";
import { products } from "@/assets/productData";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { assets } from "@/assets/assets";

const HomePage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

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

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src={assets.logo} alt="QuickCart" width={120} height={40} />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600 transition">Home</Link>
              <Link href="/" className="text-gray-700 hover:text-orange-600 transition">Shop</Link>
              <Link href="/" className="text-gray-700 hover:text-orange-600 transition">About Us</Link>
              <Link href="/" className="text-gray-700 hover:text-orange-600 transition">Contact</Link>
              {isSignedIn && (
                <Link href="/admin" className="text-gray-700 hover:text-orange-600 transition">Seller Dashboard</Link>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Image
                  src={assets.search_icon}
                  alt="Search"
                  className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                  width={16}
                  height={16}
                />
              </div>
              {isSignedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!</span>
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8",
                      },
                    }}
                  />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="flex-1 text-white">
              <p className="text-sm font-medium mb-2">Limited Time Offer 30% Off</p>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Experience Pure Sound - Your Perfect Headphones Awaits!</h1>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Buy now
                </button>
                <button className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition">
                  Find more
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Image
                src={assets.header_headphone_image}
                alt="Headphones"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular products</h2>
            <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
              See more →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={product.imgSrc}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                    <Link 
                      href={`/product/${product.id}`}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                    >
                      Buy now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe now & get 20% off</h2>
          <p className="text-orange-100 mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-r-lg hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image src={assets.logo} alt="QuickCart" width={120} height={40} className="mb-4" />
              <p className="text-gray-400 text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/" className="hover:text-white transition">About us</Link></li>
                <li><Link href="/" className="hover:text-white transition">Contact us</Link></li>
                <li><Link href="/" className="hover:text-white transition">Privacy policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Get in touch</h3>
              <div className="space-y-2 text-gray-400">
                <p>+1-234-567-890</p>
                <p>contact@greatstack.dev</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow us</h3>
              <div className="flex space-x-4">
                <Image src={assets.facebook_icon} alt="Facebook" width={24} height={24} className="cursor-pointer" />
                <Image src={assets.twitter_icon} alt="Twitter" width={24} height={24} className="cursor-pointer" />
                <Image src={assets.instagram_icon} alt="Instagram" width={24} height={24} className="cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>Copyright 2025 © GreatStack.dev All Right Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;